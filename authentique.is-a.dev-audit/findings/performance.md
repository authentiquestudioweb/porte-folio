# Audit performance / Core Web Vitals — https://authentique.is-a.dev/

Date : 2026-11-24. Méthode : Lighthouse 13.6.0 local (headless Chrome, throttling simulé par défaut ; mobile et preset desktop). PSI sans clé : quota partagé dépassé (erreur 429). Aucune donnée terrain CrUX n'est disponible : tous les chiffres sont des mesures de laboratoire, à confirmer en terrain. Une seule passe par profil, donc variance possible (le score desktop de 32 est surtout dû à un LCP de 4,7 s, probablement amplifié par le runner local).

## Synthèse

| | Mobile | Desktop |
|---|---|---|
| Score performance | **62** | **32** |
| FCP | 2,8 s | 4,7 s |
| LCP | 2,8 s (bon, mais limite) | 4,7 s (mauvais, > 4,0 s) |
| TBT (proxy INP) | 2 290 ms (très mauvais) | 740 ms (mauvais) |
| CLS | 0,008 (bon) | 0,003 (bon) |
| Speed Index | 3,2 s | 4,7 s |
| TTI | 17,2 s | 6,6 s |
| TTFB document | 560 ms (mesuré Lighthouse) ; 0,50 s via curl | 300 ms |
| Poids total | 2,15 Mo | 2,63 Mo |

Statut CWV (lab) : LCP mobile OK / desktop KO ; CLS OK ; INP non mesurable en labo, risque élevé vu le TBT (travail principal mobile : 24,9 s, bootup JS 5,3 s).

## Constats

1. **Élément LCP** : texte, `div.hero-name-wrap > ul.meta-list > li.meta-row > span` (ligne de méta du héros). LCP = FCP, donc le blocage est le rendu initial, pas une image. Décomposition : TTFB 0,92 s (mobile) / 1,02 s (desktop) + délai de rendu de l'élément 1,86 s (mobile) / 1,20 s (desktop).
2. **Ressource bloquant le rendu** : la feuille CSS Google Fonts (Oswald + Space Grotesk, 6 graisses), économie estimée 1 540 ms mobile / 1 000 ms desktop. Elle est en `<link rel=stylesheet>` classique, et `display=swap` ne supprime pas le blocage du CSS lui-même.
3. **Chaîne de chargement JS** : l'unique `<script type="module">` (162 Ko inline) dépend d'une importmap pointant vers cdn.jsdelivr.net (three.module.js 104 Ko, three.core.js 207 Ko, lenis.mjs). Le CDN est une origine tierce sans `preconnect` ni `modulepreload` : l'arbre de dépendances réseau est noté 0. Lab : 52 % de three.core.js et 30 % de three.module.js inutilisés (137 Ko).
4. **Tâches longues / TBT** : mobile, 20 tâches longues dont three.core.js 1 635 ms (évaluation du module), 433 ms non attribuée, 346 ms et 293 ms dans le document (init inline). Desktop : lenis.mjs 525 ms, three.core.js 315 ms. Ce sont les principaux risques pour l'INP, car le fil principal est saturé pendant plusieurs secondes après chargement.
5. **Voile de chargement (veil)** : le héros affiche un loader jusqu'à ce que la scène Three.js soit prête (garde-fou à 3 s, ligne 2132). Cela retarde le contenu visible et peut repousser le LCP si le paint est masqué par le voile.
6. **Poids des images** : `image-delivery-insight` économie 434 Ko mobile / 883 Ko desktop. Principaux fichiers : hero/scene/alt-diffuse.webp 410 Ko, footer/figure.webp 274 Ko, person-diffuse.webp 213 Ko, about/portrait.jpg 196 Ko, about/musique.jpg 140 Ko, sport.jpg 127 Ko, lecture.jpg 105 Ko, person-normal.webp 115 Ko, timeline/01..03.webp 107-174 Ko. Toutes les images utilisent `data-asset` renseigné par JS (`wireAssets`, ligne ~810) : le préchargeur du navigateur ne les voit pas, et elles ne démarrent qu'après exécution du module. Les images about/* (JPEG) n'ont pas de width/height ni `loading="lazy"` : elles sont chargées tôt alors qu'elles sont à plus de 2 000 px de scroll sur mobile.
7. **Fichier inutilisé** : `assets/Portrait professionnel en costume noir.png` (1,57 Mo) n'est référencé nulle part dans index.html (0 occurrence) et n'a pas été chargé. Aucun impact CWV, mais à retirer du déploiement (poids, nom avec espaces).
8. **CLS** : très bon (0,008 / 0,003). Deux décalages mineurs dans `hero-ident` / `meta-list` (apparition des lignes méta, swap de police). À surveiller avec les polices en `swap`.
9. **HTML** : 274 Ko sur disque mais 77 Ko transférés en brotli (bon). Cache-Control du document `max-age=0, must-revalidate` (normal pour du HTML Vercel). Pas de DOM trop gros signalé.
10. **Cache assets** : l'audit cache-insight est vert (assets Vercel statiques avec cache long, à vérifier pour les fichiers non fingerprintés).

## Recommandations priorisées

1. **Supprimer le blocage des polices (impact LCP fort, -1,0 à -1,5 s).** Auto-héberger Oswald 700/500 et Space Grotesk 400/500 en woff2 (sous-ensemble latin), `@font-face` avec `font-display: swap` (ou `optional`), et `<link rel="preload" as="font" type="font/woff2" crossorigin>` pour les 1-2 fichiers du héros. Réduire à 4 graisses maximum. Supprimer les preconnect Google. Au minimum : charger la feuille Google en non bloquant (`media="print" onload="this.media='all'"`) avec une police de secours ajustée (`size-adjust`).
2. **Précharger la chaîne Three/Lenis (impact LCP/TBT moyen).** Ajouter `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>` et des `<link rel="modulepreload">` pour three.module.js, three.core.js et lenis.mjs. Mieux : auto-héberger sur le même domaine (HTTP/2 déjà actif, pas de DNS/TLS supplémentaire) avec un bundle tree-shaké (esbuild/Vite) qui n'importe que les classes utilisées (gain estimé 100-140 Ko).
3. **Ne plus conditionner le premier rendu au 3D (impact LCP/FCP fort).** Rendre le texte du héros immédiatement (sans attendre le veil), n'initialiser WebGL qu'après `requestIdleCallback`/premier paint, et garder l'image `hero-fallback` comme poster. Réduire le délai du garde-fou (3 s) ou retirer le veil sur connexion lente / `saveData`.
4. **Réduire le TBT et le risque INP (impact INP fort).** Découper l'init du module inline (162 Ko) en modules chargés à la demande par section (`import()` pour timeline, paddock, footer, about), via `IntersectionObserver`. Yielder (`scheduler.yield()` ou `setTimeout 0`) entre les étapes d'init lourdes (création du renderer, compilation de shaders, chargement des textures : utiliser `renderer.compileAsync`). Démarrer Lenis après l'idle. Sur mobile, désactiver le rendu 3D complet (déjà `maxDpr: 1`) ou le geler quand le héros sort du viewport. Objectif TBT mobile < 300 ms.
5. **Optimiser les images (impact poids -0,8 à -1,2 Mo).** Recompresser en AVIF/WebP qualité 70-75 : alt-diffuse (410 Ko) et person-diffuse (213 Ko) en textures plus petites (2048 max, ou KTX2/Basis pour WebGL), footer/figure.webp à la taille affichée, about/*.jpg en WebP/AVIF (-60 %), timeline/* redimensionnées à la largeur réelle d'affichage (et `srcset`). Ajouter `width`/`height` et `loading="lazy" decoding="async"` à toutes les images sous le pli (about, paddock, footer), et utiliser `fetchpriority="low"` pour les textures non critiques. Remplacer l'assignation JS de `src` par des `src` directs dans le HTML pour les images de la zone visible (logo, drapeau, icônes du héros).
6. **Nettoyage** : supprimer `assets/Portrait professionnel en costume noir.png` (1,57 Mo, inutilisé) du dépôt/déploiement.
7. **Mesure terrain** : activer Vercel Speed Insights ou la lib `web-vitals` pour obtenir un vrai INP/LCP p75 ; configurer une clé PSI/CrUX pour comparer. Relancer Lighthouse 3 fois par profil après corrections (variance).
8. **CLS** : réserver la hauteur de `.meta-list` / `.hero-ident` (min-height) et utiliser `size-adjust` sur les polices de secours pour éliminer les deux décalages résiduels.

## Gains attendus (estimation)

Après 1 + 2 + 3 : LCP mobile ~1,8-2,2 s, desktop ~1,5-2,0 s. Après 4 : TBT mobile < 500 ms, INP probablement < 200 ms. Après 5 : poids page environ 1,0-1,3 Mo. Score mobile cible 80-90, desktop 85-95.

Fichiers bruts de mesure : /private/tmp/claude-501/-Users-macbookpro--claude-spares-spare-jCzBSu/1fbea987-dac2-4a3a-9492-44497666b1c1/scratchpad/lh/mobile.json et desktop.json
