# Audit SEO complet : authentique.is-a.dev

**Date :** 24 novembre 2026
**Site :** https://authentique.is-a.dev/ (une seule page + outil `/cv/`, hébergé sur Vercel)
**Fiche Google Entreprise :** « Authentique-dev », catégorie « Concepteur de sites web », Bobo-Dioulasso
**Type d'activité détecté :** prestataire de services locaux (freelance / studio web), sans adresse physique

---

## Résumé

### Score de santé SEO : **36 / 100**

| Catégorie | Poids | Score | Points |
|---|---|---|---|
| SEO technique | 22 % | 38 | 8,4 |
| Qualité du contenu | 23 % | 36 | 8,3 |
| SEO on-page | 20 % | 40 | 8,0 |
| Données structurées (Schema) | 10 % | 0 | 0,0 |
| Performance (Core Web Vitals) | 10 % | 55 | 5,5 |
| Recherche IA (GEO) | 10 % | 27 | 2,7 |
| Images | 5 % | 67 | 3,4 |
| **Total** | | | **36** |

Score à part (non pondéré) : **SEO local et fiche Google : 23 / 100**.

Le site est beau et rapide à charger côté serveur. Ses faiblesses SEO viennent presque toutes de trois causes :
1. Google ne connaît pas encore le site (aucune page indexée, ni sitemap ni robots.txt).
2. Le texte important n'existe qu'en JavaScript et ne dit pas ce que tu vends.
3. Ton nom, ta ville et ta marque ne sont pas les mêmes sur le site, la fiche Google et GitHub.

### Les 5 problèmes les plus graves
1. **Aucune page indexée par Google** : `site:authentique.is-a.dev` ne renvoie rien.
2. **Pas de `robots.txt` ni de `sitemap.xml`** (les deux répondent 404). Tu n'as rien à soumettre dans Search Console.
3. **`<h1>` vide dans le HTML** : `index.html` ligne 601. Le mot « authentique » n'est ajouté qu'en JavaScript.
4. **57 % du texte et 9 liens sur 16 n'existent qu'après le JavaScript** : frise, projets, pied de page et contacts (`mount.innerHTML`, lignes 3325, 3438 et 3499). ChatGPT, Perplexity et Claude ne les voient pas.
5. **Nom, adresse et téléphone incohérents** :
   - Fiche Google : « Authentique-dev », Bobo-Dioulasso, et l'adresse « 265 24 57 », qui ressemble à un numéro de téléphone.
   - Site : « Authentique Studio », Ouagadougou.

### Les 5 corrections rapides
1. Ajouter `robots.txt` et `sitemap.xml`, puis soumettre le sitemap dans Search Console (10 min).
2. Écrire le H1 directement dans le HTML, avec ton métier et ta ville (10 min).
3. Ajouter le canonical, les balises Open Graph, un favicon et le JSON-LD Person + ProfessionalService (30 min, le code est prêt dans `schema-recommended.json`).
4. Réécrire le titre et la meta description avec « création de site web » et la ville (5 min).
5. Corriger la fiche Google : supprimer la fausse adresse, choisir une seule ville et mettre le même nom partout (15 min).

---

## 1. SEO technique : 38/100
Détails : `findings/technical.md`

**Ce qui fonctionne**
- HTTPS avec HSTS, et HTTP redirige vers HTTPS en un seul saut (308).
- `lang="fr"`, viewport correct, titre et description présents.
- Pas de `noindex`, et le 404 renvoie bien un statut 404.

**Problèmes**

| Gravité | Problème | Correction |
|---|---|---|
| Critique | `robots.txt` et `sitemap.xml` absents | Créer les deux fichiers à la racine |
| Critique | Pas de `<link rel="canonical">` | Ajouter le canonical `https://authentique.is-a.dev/` (et `/cv/`) |
| Critique | H1 vide sans JavaScript (l.601) | Mettre le texte dans le HTML, le JS ne fait que l'animer |
| Élevée | Frise, projets et pied de page injectés en JS | Écrire ces sections en HTML statique |
| Élevée | Images sans `src` (`data-asset` complété en JS) | `src` réel au moins pour les images importantes |
| Élevée | Aucun Open Graph, favicon ni JSON-LD | Voir la section 4 |
| Élevée | En-têtes de sécurité : seul HSTS est présent | Ajouter un `vercel.json` (CSP, nosniff, Referrer-Policy) |
| Moyenne | `/cv/` : contenu mince, pas de canonical, lien `../index.html` qui crée un doublon | Lien vers `/`, canonical, titre plus riche |
| Moyenne | Page 404 en texte brut | Créer un `404.html` avec des liens vers l'accueil |
| Faible | `access-control-allow-origin: *` sur le HTML | À restreindre |

## 2. Qualité du contenu : 36/100
Détails : `findings/content.md`

- **Critique : aucune offre visible.** La page raconte ton parcours d'étudiant, mais ne dit jamais ce qu'un client peut t'acheter. Les mots qu'il tape sont absents : site vitrine, e-commerce, Mobile Money, devis, tarif, délai.
- **Contenu mince** : environ 200 mots de vraie prose. Le reste, ce sont des lettres d'animation dupliquées et la liste des technologies répétée deux fois.
- **E-E-A-T 38/100** (expérience, expertise, autorité, confiance) :
  - les 4 projets n'ont qu'un nom ;
  - aucun témoignage ;
  - le prix IA 2025 n'est appuyé par aucune source ;
  - e-mail Gmail et pas de mentions légales.
- Tutoiement et entrée « CV gratuit » dans le menu : peu adaptés à une clientèle d'entreprises.
- Lisibilité bonne (environ 14 mots par phrase).

## 3. SEO on-page : 40/100

| Élément | Actuel | Proposé |
|---|---|---|
| Title | `Authentique — Emmanuel Baguemzanre, développeur full stack` | `Création de sites web à Ouagadougou \| Authentique Studio` |
| Meta description | reprend le titre, sans appel à l'action | « Développeur full stack à Ouagadougou : sites web, boutiques en ligne et applications pour entreprises, écoles et commerces au Burkina Faso. Devis gratuit. » |
| H1 | « authentique » (en JS) | « Emmanuel Baguemzanre (Authentique), développeur web à Ouagadougou » |
| H2 | accroches sans mots-clés | « Mes services », « Mes réalisations », « Mon parcours », « Me contacter » |

Remplace « Ouagadougou » par ta vraie ville si ce n'est pas celle-là (voir la section 8).

Il n'existe qu'une seule URL, donc aucune page ne peut se positionner sur un service ou un projet en particulier.

## 4. Données structurées : 0/100, environ 85 une fois en place
Détails : `findings/schema.md`. Code prêt dans `schema-recommended.json`.

- Il n'y a aucune donnée structurée aujourd'hui.
- Le code proposé est un `@graph` avec WebSite, ProfilePage, Person (Emmanuel Baguemzanre), Organization (Authentique Studio et Allo Gaz) et ProfessionalService (Authentique-dev, zone desservie : Burkina Faso). Pour `/cv/`, c'est un WebApplication gratuit.
- La ville n'est pas encore renseignée : il faut d'abord trancher entre Ouagadougou et Bobo-Dioulasso.
- Inutile d'ajouter une FAQ en schema : Google n'affiche plus ces résultats enrichis.

## 5. Performance : environ 55/100
Détails : `findings/performance.md`. Mesures de labo avec Lighthouse ; il n'y a pas de données terrain faute de clé API.

| | Mobile | Desktop |
|---|---|---|
| Score Lighthouse | 62 | 32 |
| LCP | 2,8 s | 4,7 s |
| TBT | **2 290 ms** | 740 ms |
| CLS | 0,008 (bon) | 0,003 (bon) |
| Poids de la page | 2,15 Mo | 2,63 Mo |

- L'élément LCP est un texte du héros, retardé par le CSS Google Fonts qui bloque le rendu et par l'écran de chargement qui attend Three.js.
- Three.js et le JS inline bloquent le fil principal : une tâche de 1,6 s sur mobile. Le risque INP est élevé.
- Les images sont chargées en JS, donc invisibles pour le préchargeur. Les JPEG `about/` sont surdimensionnés.
- Le fichier `assets/Portrait professionnel en costume noir.png` (1,57 Mo) n'est jamais utilisé. Il est à supprimer.

## 6. Images : 67/100
Détails : `findings/visual.md`

- `about/sport.jpg`, `lecture.jpg` et `musique.jpg` ont un `alt=""` alors qu'elles ont du sens.
- Le portrait a pour alt « Authentique », c'est trop court.
- `circuit-spa.webp` a pour alt « Logo Authentique Studio », ce qui est inexact.
- Les JPEG font 507 à 731 px de large mais s'affichent à 101-248 px : à passer en WebP/AVIF avec `srcset`, `width`/`height` et `loading="lazy"`.

**Visuel et mobile (7,5/10)**
- Pas de défilement horizontal et un CLS excellent.
- Sur mobile, le bouton « Réserver un appel » est masqué, le numéro et la ville ne sont pas visibles sans défiler, et l'écran reste presque vide pendant le chargement.
- Plusieurs zones tactiles sont trop petites : menu 40×23 px, liens du pied de page 13 px de haut.
- Une centaine de textes font 12 à 14 px. Contraste faible sur « EMMANUEL BAGUEMZANRE » et sur la navigation par-dessus la photo.

## 7. Recherche IA (GEO) : 27/100
Détails : `findings/geo.md`. Le `robots.txt` et le `llms.txt` y sont prêts à copier.

- L'aperçu IA de Google dit aujourd'hui qu'aucune information vérifiable n'associe « Authentique-dev » à Bobo-Dioulasso.
- Les robots IA ne voient ni le H1, ni les projets, ni les contacts, car tout cela est en JavaScript.
- La marque a trop de variantes : Authentique, Authentique Studio, Studio Authentique, Authentique-dev, et deux comptes GitHub (`authentiquestudioweb` et `AUthENTIQUEyeager`). Aucun des deux ne renvoie vers le site.
- Le compte `AUthENTIQUEyeager` contient 34 dépôts, dont beaucoup ont une démo en ligne. Le portfolio n'en montre que 4.
- Il manque un paragraphe autonome du type « Qui est Authentique ? » que les IA pourraient citer.

## 8. SEO local et fiche Google : 23/100
Détails : `findings/local.md`, qui contient la checklist complète du tableau de bord Google Entreprise.

| Élément | Fiche Google | Site |
|---|---|---|
| Nom | Authentique-dev | Authentique / Authentique Studio |
| Ville | Bobo-Dioulasso | Ouagadougou |
| Adresse | « 265 24 57 » (invalide) | aucune |
| Téléphone | 65 18 90 25 | +226 65 18 90 25 |
| Description | « agence digitale basée à Ouagadougou » | portfolio de développeur |
| Avis | 1 (5,0) | aucun |

**Recommandations**
- Déclarer l'activité en **zone de service** : adresse masquée, zones Bobo-Dioulasso, Ouagadougou et Burkina Faso.
- Choisir **une** ville principale, celle où tu travailles réellement, et l'utiliser partout.
- Garder **un seul** nom.
- Viser 10 vrais avis en 90 jours, en les demandant par WhatsApp après chaque livraison.
- Créer des fiches sur Bing Places, Apple Business Connect, Facebook, LinkedIn et dans les annuaires burkinabè.

## 9. Search Console
- La propriété est en cours de vérification. Les données Search Console n'ont pas été lues, car aucun identifiant API n'est configuré.
- À faire dès qu'elle est vérifiée :
  1. soumettre `https://authentique.is-a.dev/sitemap.xml` ;
  2. demander l'indexation de `/` dans « Inspection de l'URL » ;
  3. répéter pour `/cv/`.
- Optionnel : connecter l'API (OAuth) pour que l'outil suive tes clics, impressions et l'indexation.

---

## Limites de l'audit
- Aucune donnée terrain : pas de CrUX, PageSpeed, Search Console ni GA4, faute de clé API. L'API PageSpeed sans clé a renvoyé une erreur 429.
- Pas de volumes de recherche ni de positions locales (DataForSEO n'est pas configuré).
- La fiche Google a été lue depuis le panneau public, pas depuis ton tableau de bord.
- Le rendu des pages s'est fait avec le bac à sable du navigateur activé.
