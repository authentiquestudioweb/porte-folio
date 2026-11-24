# Audit visuel / mobile — authentique.is-a.dev

Captures : `screenshots/desktop-atf.png`, `desktop-full.png`, `mobile-atf.png`, `mobile-full.png`, `cv-mobile-atf.png`, ainsi que les captures `*-t1.5s.png` (état à 1,5 s) et celles de l'outil (`authentique_is-a_dev_*.png`, prises pendant le loader/fondu d'entrée).

## Verdict
Note visuelle/UX : 7,5/10. Score Images : 67/100.

## Above-the-fold (test des 3 secondes)
- Desktop 1920x1080 : le nom (AUTHENTIQUE, 128 px), « Développeur full stack », « Burkina Faso » et « Fondateur · Authentique Studio » se lisent immédiatement. Le CTA « [ RÉSERVER UN APPEL → ] » est en haut à droite (WhatsApp wa.me/22665189025, 254x19 px). Le gros bouton « ME CONTACTER » est centré en bas (293x67). Le panneau « CONTACT / WHATSAPP +226 65 18 90 25 / OUAGADOUGOU » donne le numéro et la ville. Le « quoi, où, comment contacter » est donc clair.
- Mobile 375x812 : H1 « AUTHENTIQUE », puis Burkina Faso, Développeur full stack, Fondateur. « ME CONTACTER » (327x56, y=732) est visible sans scroll. Mais :
  - le CTA « Réserver un appel » est masqué en mobile (taille 0x0). Seul subsiste « ME CONTACTER », dont le libellé ne dit pas que c'est WhatsApp ni un appel ;
  - le numéro et « Ouagadougou » ne sont pas visibles au-dessus de la ligne de flottaison ;
  - le H1 est juste le nom de marque. Le métier n'est que dans une ligne secondaire, et aucun texte ne dit ce que tu proposes (sites, apps, etc.).
- Le loader/fondu d'entrée : les premières captures (outil, ~0-1 s) montrent un écran quasi vide (silhouette + « AUTHENTIQUE »), puis un hero délavé. Le contenu complet n'apparaît qu'après quelques secondes. Sur connexion lente, les 3 secondes risquent d'être entamées par ce loader.

## Problèmes de mise en page repérés
1. Desktop : la photo du hero (z-index au-dessus ou en dessous du texte) passe sous la nav. « PARCOURS », « HISTOIRE », « PROJETS », « CV GRATUIT » sont superposés au visage et au toupet. Contraste faible et lisibilité réduite (zone x 660-1250, y 20-50).
2. Desktop : « GITHUB » en bas à droite chevauche le bord de la veste, et il est difficile à lire (x~1570, y~1044).
3. Desktop : le libellé « WHATSAPP » et le numéro sont collés (interligne serré) dans le panneau Contact.
4. Mobile : la ligne « FONDATEUR · AUTHENTIQUE STUDIO » chevauche les cheveux de la photo (y~470 en px CSS 235). Lisible mais surcharge visuelle.
5. Mobile : sous-titre « EMMANUEL BAGUEMZANRE » en gris clair sur fond ice-50 (#f7fafb), contraste ~2,5:1, sous 4,5:1 (WCAG AA). Même problème pour « Open source » et pour le gris du libellé sur desktop.
6. Mobile, page entière : la capture full page montre de grands blocs noirs vides et des damiers. C'est vraisemblablement le contenu révélé au scroll (animations 3D/Lenis), donc un artefact de capture, à vérifier au scroll réel.
7. Aucun scroll horizontal : scrollWidth = 375 (mobile) et 1920 (desktop). Bon point.
8. Décalage de mise en page (CLS) : 0,0076 mobile, 0,0034 desktop, 0,0008 sur /cv/. Excellent, très en dessous de 0,1.

## Cibles tactiles (mobile 375 px)
- Bouton menu « Open menu » : 40x23 px, trop petit (cible recommandée 48x48 px, minimum 44x44).
- Logo Authentique Studio : 105x24, lien trop bas.
- Liens du footer GITHUB / WHATSAPP / MAIL : 45x13, 66x13, 30x13 px. Beaucoup trop petits et rapprochés.
- Liens de nav du footer (ACCUEIL, PARCOURS, HISTOIRE, PROJETS, CONTACT) : hauteur 38 px, en dessous de 44 px.
- « ME CONTACTER » (327x56) et « WHATSAPP » du footer (327x50) : conformes.
- /cv/ : lien « ← PORTFOLIO » 82x20 px, trop petit. Les boutons « OUVRIR LE PROJET » sont corrects (~44 px+).
- Desktop : nav 27 px de haut, CTA « Réserver un appel » 19 px de haut. Zone cliquable minimale à agrandir par du padding.

## Tailles de police
- Mobile : 52 éléments à 14 px, 24 à 13 px, 14 à 12 px, 35 à 13,78 px. Le corps de texte est donc souvent en dessous de 16 px. Les 12-13 px (eyebrows, libellés, footer) sont à relever à au moins 14 px, idéalement 16 px pour le texte courant.
- /cv/ mobile : intro à ~17-18 px, très lisible. Libellés 12-13 px à augmenter.
- Desktop : html passe en `font-size: 0.833vw` (rem fluide) : sous 1440 px, le texte se réduit avec la fenêtre, d'où des corps de texte trop petits sur laptop. À borner avec `clamp()`.

## Images et alt
Inventaire (via le DOM) :
- `about/sport.jpg`, `about/lecture.jpg`, `about/musique.jpg` : `alt=""`. Elles montrent ses centres d'intérêt (sport, lecture, musique) : l'information a du sens dans la section « À propos ». Recommandation : alt descriptif, par exemple « Authentique pratiquant le sport », « Authentique en train de lire », « Authentique jouant de la musique », à adapter à ce que montrent réellement les photos. Si elles sont purement décoratives, `alt=""` serait acceptable, mais leur légende doit alors être dans le texte visible.
- `about/portrait.jpg` : alt « Authentique » trop court. Préférer « Portrait d'Emmanuel Baguemzanre, développeur full stack ».
- `hero/ui/logo-studio.webp`, `icon-rookie.svg`, `play-button.svg`, `paddock/icon-*.svg`, `flag-bf.webp` (2e occurrence) : `alt=""`, décoratifs, acceptable. Vérifier que les icônes `paddock` (drapeau, barres, trophée, jauge) n'accompagnent pas de texte absent.
- Hero principal (portrait) : la photo est chargée via un canvas ou un fond 3D. Elle n'a pas d'élément `img` visible avec alt. Le H1 et le texte portent le sens, mais ajouter un `aria-label`/`role="img"` sur le canvas.
- Alts présents et pertinents : logo « Authentique Studio », drapeau « Burkina Faso », timeline 01-07 (alts bien descriptifs en français), `paddock/portrait.webp` « Authentique en costume », `footer/figure.webp` « Authentique, en costume ».
- Deux `img` ont `src` vide au chargement (naturalWidth 0) et sont remplies plus tard, et les images de timeline 02-07 sont en `loading="lazy"`. Bon pour la performance, mais prévoir `width`/`height` partout (OK pour la timeline, absents sur `about/*.jpg` et `portrait.jpg`, ce qui est un risque de CLS).

### Formats et tailles
- Bon : timeline, hero UI, `paddock/portrait.webp` (1254x1254) et `footer/figure.webp` (1400x1400) en WebP. Les icônes en SVG.
- À améliorer : `about/sport.jpg`, `lecture.jpg`, `musique.jpg` (507x900) et `portrait.jpg` (731x1300) en JPEG. Convertir en WebP/AVIF. Affichées à 101-248 px de large, soit des images 2 à 5 fois trop grandes (ex. 101x186 affichées pour 507x900 natifs).
- `paddock/portrait.webp` 1254 px affichée à 599 px mobile (2,1x, correct en 2x DPR). `footer/figure.webp` 1400 px : prévoir `srcset` pour mobile.
- Pas de `srcset`/`sizes` détecté sur les images. Les images du hero et de l'à-propos ne sont pas en `lazy`.

### Score Images : 67/100
- Alt text : 18/30 (3 images porteuses de sens avec alt vide, portrait trop court, bons alts ailleurs).
- Formats : 20/30 (WebP/SVG majoritaires, 4 JPEG restants, pas d'AVIF).
- Dimensionnement : 14/25 (surdimensionnement, pas de srcset, width/height partiels).
- Chargement : 15/15 (lazy sur la timeline, CLS faible).
Total : 18+20+14+15 = 67/100.

## Page /cv/ (mobile 375x812)
- Très lisible : fond sombre, H1 « UN CV EN HTML, PRÊT À PUBLIER. » en Oswald, intro ~17 px, bon contraste (blanc/gris clair sur #090a0b, cyan #02d2e3 sur noir ~11:1).
- Pas de scroll horizontal (scrollWidth 375), CLS 0,0008.
- Le H1 est un peu comprimé (interligne 0,9) : les accents « PRÊT » et le point du « . » touchent presque la ligne du dessus.
- Boutons « OUVRIR LE PROJET » pleine largeur, bonne taille. Le lien « ← PORTFOLIO » (82x20) est trop petit.
- Pas de CTA WhatsApp sur cette page, contrairement à la page d'accueil. Une section « Besoin d'un site ? Réserver un appel » serait utile.
- Étape « Bientôt / À venir » (champ pseudo GitHub + VÉRIFIER) : vérifier l'état désactivé (contraste des libellés 12-13 px).

## Priorités
1. Mobile : agrandir le bouton menu (48x48), les liens du footer (hauteur 44 px+), « ← PORTFOLIO » sur /cv/.
2. Mobile : remonter la mention « WhatsApp / appel » et « Ouagadougou » dans le hero ; renommer « ME CONTACTER » en « Réserver un appel sur WhatsApp ».
3. Donner un alt aux 3 images `about/*` (ou les rendre décoratives avec légende) et allonger l'alt du portrait.
4. Corriger le contraste du texte gris clair (Emmanuel Baguemzanre, Open source) et de la nav desktop au-dessus de la photo (fond flouté ou mix-blend).
5. Passer `about/*.jpg` en WebP/AVIF aux dimensions affichées, avec `srcset` et `width`/`height`.
6. Remonter les tailles de texte < 14 px à 14-16 px, et borner le rem fluide avec `clamp()`.
7. Raccourcir ou alléger le loader initial.
