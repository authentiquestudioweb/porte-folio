# Plan d'action SEO : authentique.is-a.dev

Score actuel : **36/100**. Objectif après les phases 1 et 2 : **70 ou plus**.

> **Décision à prendre avant tout :** quelle est ta ville principale, Ouagadougou ou Bobo-Dioulasso ? Quel est ton nom de marque unique, « Authentique Studio » ou « Authentique-dev » ? Tout le reste (titre, schema, fiche Google, llms.txt) en dépend.

## Phase 1 : Critique (semaine 1)
| # | Action | Où | Effort |
|---|---|---|---|
| 1 | Créer `robots.txt` (tout autoriser + ligne `Sitemap:`) | racine du site | 5 min |
| 2 | Créer `sitemap.xml` avec `/` et `/cv/` | racine du site | 5 min |
| 3 | Vérifier Search Console, soumettre le sitemap, demander l'indexation de `/` | Search Console | 10 min |
| 4 | Écrire le H1 en HTML : « Emmanuel Baguemzanre (Authentique), développeur web à [ville] » | `index.html` l.601 | 10 min |
| 5 | Ajouter le canonical, les balises Open Graph et Twitter, le favicon et le JSON-LD | `<head>` de `index.html` et `cv/index.html` | 30 min |
| 6 | Nouveau title et nouvelle meta description, avec le service et la ville | `index.html` l.6-7 | 5 min |
| 7 | Fiche Google : supprimer l'adresse « 265 24 57 », passer en zone de service, aligner la ville et la description | Google Business Profile | 15 min |

## Phase 2 : Fort impact (semaines 2-3)
| # | Action | Effort |
|---|---|---|
| 8 | Écrire la frise, les projets, les chiffres et le pied de page en HTML statique, le JS ne servant qu'à animer. Utiliser `aria-label` et `aria-hidden` pour le texte découpé en lettres | 3-5 h |
| 9 | Ajouter une section « Services » : site vitrine, e-commerce et Mobile Money, applications, automatisations. Avec à partir de combien en FCFA, les délais et un appel « Devis gratuit » | 2 h |
| 10 | Décrire chaque projet en 3-4 phrases (problème, solution, technologies, résultat, lien vers la démo) | 2 h |
| 11 | Ajouter un paragraphe « Qui est Authentique ? » d'environ 150 mots, juste sous le H1 | 30 min |
| 12 | Auto-héberger les polices en woff2 avec `font-display: swap` et un preload | 1 h |
| 13 | Ajouter `preconnect`/`modulepreload` pour jsdelivr, lancer Three.js et Lenis quand le navigateur est libre, afficher le héros sans attendre la 3D | 2-3 h |
| 14 | Images : `src` réels, WebP/AVIF aux bonnes dimensions, `width`/`height`, `loading="lazy"`, alt descriptifs | 1-2 h |
| 15 | Supprimer `assets/Portrait professionnel en costume noir.png` (1,57 Mo, inutilisé) | 1 min |
| 16 | Mobile : bouton « Réserver un appel sur WhatsApp » visible, zones tactiles d'au moins 44 px, textes d'au moins 14-16 px, meilleur contraste | 1-2 h |
| 17 | Créer `vercel.json` (en-têtes de sécurité, cache long pour `/assets/`) et une page `404.html` | 30 min |
| 18 | Publier `/llms.txt` (modèle dans `findings/geo.md`) | 10 min |

## Phase 3 : Contenu et autorité (mois 2)
| # | Action |
|---|---|
| 19 | Pages dédiées : `/services/creation-site-web-[ville]/`, `/realisations/[projet]/`, `/a-propos/` |
| 20 | Récolter 10 vrais avis Google en 90 jours (lien d'avis envoyé par WhatsApp après chaque livraison) |
| 21 | Fiches Bing Places, Apple Business Connect, page Facebook, LinkedIn, WhatsApp Business et annuaires burkinabè, toutes avec le même nom, la même ville et le même téléphone |
| 22 | GitHub : nom, bio et lien vers le site sur les deux comptes. Mettre en avant les meilleurs des 34 dépôts |
| 23 | Ajouter une source pour le prix IA 2025 (article, photo, page de l'université) |
| 24 | À moyen terme : un domaine à toi (par exemple `.bf` ou `.com`) avec un e-mail professionnel et une redirection 301 |

## Phase 4 : Suivi (en continu)
- Chaque semaine : Search Console (pages indexées, requêtes, clics) et posts sur la fiche Google.
- Chaque mois : relancer `/seo audit https://authentique.is-a.dev/` et `/seo drift compare`.
- Activer Vercel Speed Insights pour mesurer les vrais LCP et INP.
- Bing Webmaster Tools et IndexNow, pour être visible dans Copilot.
