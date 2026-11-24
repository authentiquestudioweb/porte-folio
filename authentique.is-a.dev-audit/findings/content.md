# Qualité du contenu, E-E-A-T et SEO on-page : https://authentique.is-a.dev/

Date de l'audit : 24/11/2026. Source analysée : `index.html` (identique à la version en ligne) et le rendu Playwright (`homepage-rendered.json`).

## Synthèse

| Indicateur | Score |
|---|---|
| **Qualité du contenu** | **36 / 100** |
| **SEO on-page** | **40 / 100** |
| E-E-A-T (moyenne pondérée) | 38 / 100 |
| Préparation aux citations par l'IA | 22 / 100 |
| Lisibilité | Bonne (environ 14 mots par phrase) |
| Risque de métadonnées templatées | Faible (`site_risk: low`, `templated_ratio: 0.0`, aucune CTA partagée) |

Le site est une vitrine personnelle visuellement soignée, mais il ne se positionne pas sur l'intention commerciale locale visée (« création site web Burkina Faso », « développeur web Ouagadougou »). Il raconte un parcours étudiant (club, université, prix, passions) et ne dit nulle part ce qu'un client peut acheter, à quel prix, dans quel délai, ni avec quel résultat. La fiche Google Business Profile « Authentique-dev » (catégorie « Concepteur de sites web », agence pour entreprises, écoles, commerces et indépendants) promet donc une offre que la page d'atterrissage ne confirme pas. Ce décalage pénalise à la fois la conversion et la pertinence locale.

---

## 1. Métadonnées (title / meta description)

| Élément | Actuel | Longueur | Verdict |
|---|---|---|---|
| Title | `Authentique — Emmanuel Baguemzanre, développeur full stack` | 58 car. | Longueur correcte, mais pas de ville, pas de « site web », la marque passe avant l'intention |
| Meta description | `Authentique (Emmanuel Baguemzanre) — développeur full stack à Ouagadougou, fondateur d'Authentique Studio et cofondateur d'Allo Gaz.` | 132 car. | Un peu courte (cible de 145 à 160), répète le titre, aucun bénéfice client ni appel à l'action |

Contrôle de templating (`metadata_template.py`) : `templated: false`, aucun drapeau. Pas de problème de métadonnées générées en masse.

**Constats**
- **HAUTE** : le title ne contient ni « Ouagadougou », ni « Burkina », ni « site web » / « création de site ». « Développeur full stack » est un terme de recruteur, pas de client : un commerçant de Ouaga cherche « création site web », « faire un site internet », « développeur web ».
- **MOYENNE** : la description commence par répéter le nom déjà présent dans le titre et cite Allo Gaz, qui n'a aucun sens pour un prospect. Elle n'a aucun appel à l'action (devis, WhatsApp).
- **MOYENNE** : pas de balise `<link rel="canonical">`, pas d'Open Graph ni de Twitter Card. Les partages WhatsApp et Facebook, qui sont essentiels au Burkina, n'affichent donc ni image ni titre maîtrisé. Pas de favicon.

**Réécritures proposées**

Title (au choix) :
1. `Création de sites web à Ouagadougou | Authentique Studio` (56 car.). Intention commerciale et marque.
2. `Développeur web à Ouagadougou, Burkina Faso | Authentique Studio` (64 car.).

Le nom « Emmanuel Baguemzanre » va dans le H1, dans le premier paragraphe et dans le JSON-LD `Person`. Les requêtes sur le nom propre seront captées sans sacrifier le title. Si vous préférez garder le nom dans le title : `Emmanuel Baguemzanre, développeur web à Ouagadougou | Authentique` (65 car.).

Meta description (environ 152 car.) :
> Développeur full stack à Ouagadougou : sites web, boutiques en ligne et applications pour entreprises, écoles et commerces au Burkina Faso. Devis gratuit.

Open Graph minimal à ajouter : `og:title`, `og:description`, `og:image` (portrait ou visuel 1200×630), `og:url`, `og:locale=fr_FR`, `og:type=website`.

---

## 2. Hiérarchie des titres

Structure rendue actuelle :
```
H1  authentique                     (span vide dans le HTML brut, texte injecté en JS via data-text)
H2  mon parcours jusqu'ici.
    H3  état d'esprit
    H3  savoir-faire
H2  du code au studio.
H2  mes projets.
H2  construisons ensemble.
```

- **CRITIQUE** : le H1 est vide dans le HTML source (`<h1 class="hero-name"><span ... data-text="authentique"></span></h1>`). Google rend le JavaScript, mais en différé, et d'autres crawlers (Bing en partie, les robots d'IA comme GPTBot, ClaudeBot et PerplexityBot) ne voient aucun H1. Une fois rendu, le H1 ne contient qu'un pseudonyme en minuscules, sans métier ni ville.
- **HAUTE** : les H2 sont des accroches créatives sans aucun mot-clé (« du code au studio. », « construisons ensemble. »). Ils ne disent rien du sujet de la section.
- **MOYENNE** : les animations de texte découpent les mots lettre par lettre dans le DOM (« p r o j e t s », « g é n i e l o g i c i e l », « 2 0 2 5 ») et dupliquent chaque titre (version accessible plus version animée). Le texte extrait par les moteurs est bruité : un rendu contient environ 630 mots, dont à peine 200 de prose réelle. Il faut s'assurer que les fragments animés sont en `aria-hidden="true"` et que le texte complet existe en clair dans un seul nœud, idéalement dans le HTML statique.
- **BASSE** : des gabarits de H2 (`${rvWords(...)}`) apparaissent dans le DOM rendu. Vérifiez qu'ils restent dans des `<template>` ou des chaînes JS et ne sont pas indexables.

**Proposition**
```
H1  Emmanuel Baguemzanre (Authentique), développeur web à Ouagadougou
    (sous-titre visuel : « Création de sites web, boutiques en ligne et applications au Burkina Faso »)
H2  Mes services : sites web, e-commerce et applications
    H3  Site vitrine pour entreprises et indépendants
    H3  Site pour écoles et établissements
    H3  Boutique en ligne et paiement Mobile Money
    H3  Applications web et automatisations (bots, IA)
H2  Projets réalisés : études de cas
    H3  Allo Gaz : commande de gaz en ligne au Burkina Faso
    H3  Boutik : …
H2  Comment je travaille : de l'appel au site en ligne
H2  Tarifs et délais
H2  Mon parcours : génie logiciel, prix IA 2025, communauté
H2  Questions fréquentes
H2  Demander un devis à Ouagadougou
```
Le style visuel en minuscules peut être conservé avec `text-transform` en CSS, tandis que le texte source reste descriptif.

---

## 3. Ciblage des mots-clés et intention locale

| Requête cible | Présence actuelle | Verdict |
|---|---|---|
| développeur web Ouagadougou | « développeur full stack » et « Ouagadougou » apparaissent séparément ; « développeur web » est absent | Faible |
| création site web Burkina Faso | « sites web » une fois (« Création d'applications, de sites web… ») ; « création de site » absent | Très faible |
| développeur full stack Burkina | « développeur full stack » plus « Burkina Faso » dans le hero | Moyen |
| Authentique Studio | présent (hero, timeline, footer, alt) | Correct |
| Emmanuel Baguemzanre | une seule occurrence textuelle (hero) | Faible : à renforcer |

- **CRITIQUE** : il n'y a aucune section ni page de services. Le vocabulaire commercial (site vitrine, site internet, e-commerce, boutique en ligne, Mobile Money, Orange Money, Moov Money, hébergement, nom de domaine, référencement, devis, tarif, délai) est absent. La page ne peut pas être jugée pertinente pour « création site web Burkina Faso », et elle contredit la fiche GBP.
- **HAUTE** : le signal géographique est confus. La page dit « Basé à Ouagadougou » mais cite l'Université Aube Nouvelle de Bobo-Dioulasso. Il faut préciser la situation (par exemple « basé à Ouagadougou, j'interviens aussi à Bobo-Dioulasso et à distance dans tout le Burkina »). Bobo-Dioulasso devient alors une seconde zone ciblée légitime.
- **MOYENNE** : le site tutoie le visiteur (« ton projet », « cv gratuit », lien vers la page CV qui s'adresse aux étudiants). Le tutoiement convient à une audience de développeurs, pas à des directeurs d'école ou des gérants de PME. Le vouvoiement est recommandé sur les pages commerciales.
- **MOYENNE** : le nom de marque n'est pas cohérent. Le site dit « Authentique Studio », la fiche GBP « Authentique-dev », le domaine `authentique.is-a.dev` et les projets renvoient à deux comptes GitHub (`authentiquestudioweb` et `AUthENTIQUEyeager`). Il faut unifier le nom (idéalement « Authentique Studio » partout, y compris sur la fiche GBP, sans bourrer celle-ci de mots-clés) pour consolider l'entité.
- **BASSE (stratégique)** : un sous-domaine gratuit `is-a.dev` affaiblit la perception de marque et de confiance pour un prestataire. À moyen terme, un domaine propre (`authentiquestudio.com`, `.bf`) avec une adresse e-mail professionnelle est recommandé, en mettant en place des redirections 301.

Aucun bourrage de mots-clés n'a été détecté.

---

## 4. Contenu mince (thin content)

- Mots rendus : environ 630, mais la prose réelle se limite à environ 200 mots, soit 14 phrases. Le reste est du bruit d'animation (lettres découpées, doublons), des étiquettes, une liste de technologies répétée deux fois (carrousel) et des chiffres.
- HTML brut sans JavaScript : environ 278 mots.
- Plancher pour une page d'accueil qui fait office de page de services : 500 à 800 mots de contenu utile. **Le site est en dessous.**

Constats :
- **HAUTE** : les quatre projets (Boutik, bot Telegram, Allo-Gaz, BMW M3 E30 3D) n'ont qu'un nom et un tag (« web », « outil », « cofondateur », « modèle 3d »). Il n'y a ni problème, ni solution, ni stack, ni capture, ni résultat. Deux liens renvoient vers des dépôts GitHub d'un autre compte, sans contexte pour un client non technique.
- **MOYENNE** : dans la frise chronologique, 2023 et 2024 (doublon) n'ont aucun texte, et le texte de 2026 répète mot pour mot le contenu de la section précédente (club, université, prix). La redondance interne est forte : le prix IA est mentionné quatre fois, le club trois fois.
- **MOYENNE** : le bloc « en chiffres » (4 projets, 1 prix, L3) met en avant des métriques qui soulignent un profil junior plutôt que de rassurer. Il vaut mieux le remplacer par des chiffres orientés client : délai moyen de livraison, nombre de sites livrés, clients servis, disponibilité de réponse WhatsApp.
- **MOYENNE** : il n'y a ni FAQ, ni tarifs, ni processus, ni témoignages, ni logos clients.

---

## 5. E-E-A-T

| Facteur | Poids | Score | Justification |
|---|---|---|---|
| Expérience | 20 % | 45 | Points forts : photos réelles (machine en 2022, bibliothèque, formation Python), frise personnelle, projets réels en ligne (Allo Gaz). Point faible : aucune étude de cas ni récit à la première personne d'un projet client. |
| Expertise | 25 % | 40 | Formation L3 génie logiciel, liste de technologies, prix IA. Pas de démonstration : pas d'article, pas d'explication technique, pas de détail sur l'architecture des projets. |
| Autorité | 25 % | 28 | Prix IA 2025 et rôle de leader des Dév-Innovateurs du Burkina, mais sans lien de preuve (article, post, photo de la remise, page du club). Pas de mentions presse, pas de LinkedIn, pas de profil sur une plateforme externe. |
| Fiabilité | 30 % | 38 | Points forts : téléphone et WhatsApp visibles, e-mail, ville, portrait. Points faibles : e-mail Gmail, pas d'adresse ni de zone desservie, pas de mentions légales ou d'identité d'entreprise (RCCM/IFU si le studio est enregistré), pas d'avis clients, pas de politique de confidentialité, pas de date de mise à jour. |
| **Pondéré** | | **38** | |

Recommandations E-E-A-T :
1. **HAUTE** : ajouter des témoignages clients nommés (nom, fonction, entreprise, ville), et afficher ou lier la note des avis Google de la fiche GBP.
2. **HAUTE** : rattacher chaque distinction à une preuve, par exemple « Prix du meilleur ingénieur en IA 2025, Université Aube Nouvelle » avec un lien vers la publication de l'université ou du club, ou une photo de la remise avec une légende.
3. **MOYENNE** : ajouter un bloc « À propos de l'entreprise » : Authentique Studio, date de création, statut juridique, numéro RCCM/IFU le cas échéant, zone d'intervention, horaires, comme sur la fiche GBP.
4. **MOYENNE** : ajouter des liens `sameAs` (LinkedIn, GitHub, Facebook, fiche Google Maps) dans le JSON-LD et dans le pied de page.
5. **BASSE** : corriger les attributs alt. Le portrait est en `alt="Authentique"` ; il devrait être `alt="Emmanuel Baguemzanre (Authentique), développeur web à Ouagadougou"`. L'image `circuit-spa.webp` porte `alt="Logo Authentique Studio"` alors que ce n'est pas le logo. Les photos sport, lecture et musique ont un alt vide alors qu'elles sont porteuses de sens.

---

## 6. Lisibilité

- Environ 14 mots par phrase en moyenne : un niveau standard en français, facile à lire. Le score Kandel-Moles brut est d'environ 44, mais il est faussé à la baisse par le comptage des « e » muets ; l'estimation corrigée se situe entre 60 et 65, soit « assez facile ».
- Le ton est chaleureux mais très abstrait : « des solutions concrètes », « solutions innovantes », « faire grandir les idées », « je crée bien plus que des logiciels ». Ce sont des formulations génériques sans fait vérifiable. Elles relèvent du marqueur « manque de spécificité » de la QRG, même si le contenu ne paraît pas généré par IA.
- **MOYENNE** : il faut remplacer chaque formule générique par un fait (« Allo Gaz permet de commander une bouteille de gaz livrée à domicile à Ouagadougou » plutôt que « des solutions concrètes »).

---

## 7. Maillage interne et CTA

- **HAUTE** : le site est une page unique avec des ancres (#season, #timeline, #paddock, #footer) et un seul lien interne vers une autre page, `cv/`, qui est un aimant à prospects pour développeurs (« CV gratuit ») hors de la cible commerciale. Aucune page ne peut se positionner sur une requête distincte (services, études de cas, ville).
- **MOYENNE** : la CTA principale « [ Réserver un appel → ] » renvoie vers WhatsApp. C'est un bon canal pour le Burkina, mais le message n'est pas pré-rempli. Utiliser par exemple `https://wa.me/22665189025?text=Bonjour%20Authentique%20Studio%2C%20je%20souhaite%20un%20devis%20pour%20un%20site%20web` et répéter une CTA de devis après les services et après chaque étude de cas.
- **BASSE** : l'entrée « CV gratuit » du menu principal dilue le message. Il vaut mieux la déplacer dans le pied de page ou dans une section « Communauté ».
- **BASSE** : ajouter un lien depuis la page CV vers l'accueil et vers les services, pour faire circuler l'autorité.

---

## 8. Préparation aux citations par l'IA (22 / 100)

- Pas de JSON-LD (`Person`, `ProfessionalService` / `LocalBusiness`, `WebSite`) : les moteurs et les IA n'ont aucune entité structurée à relier à « Authentique Studio » ou à « Emmanuel Baguemzanre ». **HAUTE.**
- Pas de passage citable autonome du type « Authentique Studio est une agence de création de sites web basée à Ouagadougou, fondée en 2025 par Emmanuel Baguemzanre… ». **HAUTE.**
- Les titres ne sont pas des questions ou des sujets explicites, il n'y a ni FAQ, ni tarifs chiffrés, ni délais chiffrés.
- Le contenu dépend du JavaScript et le H1 est vide : les robots d'IA qui ne rendent pas le JS voient une page quasi vide de sens. **HAUTE.**
- Pas de date de publication ou de mise à jour (`publication_date` absent du rendu).

Paragraphe d'entité à placer en clair dans le HTML statique, juste sous le H1 :
> **Authentique Studio** est un studio de création de sites web et d'applications basé à Ouagadougou (Burkina Faso), fondé par **Emmanuel Baguemzanre**, dit « Authentique », développeur full stack et étudiant en Licence 3 de génie logiciel à l'Université Aube Nouvelle. Il conçoit des sites vitrines, des boutiques en ligne avec paiement Mobile Money et des automatisations pour les entreprises, les écoles, les commerces et les indépendants du Burkina Faso. Il est aussi cofondateur d'Allo Gaz et a reçu le prix du meilleur ingénieur en intelligence artificielle de son université en 2025.

Squelette JSON-LD à ajouter dans le `<head>` :
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {"@type": "Person", "@id": "https://authentique.is-a.dev/#person",
     "name": "Emmanuel Baguemzanre", "alternateName": "Authentique",
     "jobTitle": "Développeur full stack", "worksFor": {"@id": "https://authentique.is-a.dev/#studio"},
     "alumniOf": {"@type": "CollegeOrUniversity", "name": "Université Aube Nouvelle"},
     "award": "Meilleur ingénieur en intelligence artificielle 2025, Université Aube Nouvelle",
     "image": "https://authentique.is-a.dev/assets/about/portrait.jpg",
     "sameAs": ["https://github.com/authentiquestudioweb/", "<LinkedIn>", "<URL fiche Google Maps>"]},
    {"@type": "ProfessionalService", "@id": "https://authentique.is-a.dev/#studio",
     "name": "Authentique Studio", "url": "https://authentique.is-a.dev/",
     "telephone": "+22665189025", "email": "authentique.studio.web@gmail.com",
     "address": {"@type": "PostalAddress", "addressLocality": "Ouagadougou", "addressCountry": "BF"},
     "geo": {"@type": "GeoCoordinates", "latitude": 12.3714, "longitude": -1.5197},
     "areaServed": ["Ouagadougou", "Bobo-Dioulasso", "Burkina Faso"],
     "founder": {"@id": "https://authentique.is-a.dev/#person"},
     "sameAs": ["<URL fiche Google Maps>"]}
  ]
}
```
Le nom doit être identique sur le site, dans le JSON-LD et sur la fiche GBP.

---

## 9. Fraîcheur

- Seul signal de fraîcheur : « © 2026 », plus une timeline qui va jusqu'en 2026. Il n'y a pas de `dateModified`, pas de blog et pas d'actualité.
- **BASSE** : ajouter « Dernière mise à jour : mois année » dans le pied de page et `dateModified` dans le JSON-LD `WebPage`. Publier une étude de cas ou un article par mois.

---

## 10. Plan de contenu à ajouter (avec propositions de texte)

### A. Accueil (restructurée, environ 800 mots)
1. **Hero** : le H1 ci-dessus. Sous-titre : « Je crée des sites web rapides, modernes et faciles à gérer pour les entreprises, écoles et commerces de Ouagadougou et du Burkina Faso. » Deux CTA : « Demander un devis gratuit » (WhatsApp pré-rempli) et « Voir mes réalisations ».
2. **Paragraphe d'entité** (section 8).
3. **Services en quatre cartes**, chacune avec deux phrases et un lien vers sa page.
4. **Réalisations** : trois études de cas avec un visuel, une phrase de résultat et un lien.
5. **Méthode en quatre étapes** : « 1. Appel découverte gratuit sur WhatsApp, 2. Maquette sous 5 jours, 3. Développement et validation, 4. Mise en ligne, formation et suivi. »
6. **Témoignages** (2 ou 3) et note Google.
7. **Parcours** : version condensée de la section actuelle (club, L3, prix, avec preuves).
8. **FAQ**.
9. **CTA final** : « Un projet de site web à Ouagadougou ? Écrivez-moi sur WhatsApp, je réponds sous 24 h. »

### B. Page `/services/creation-site-web-ouagadougou/` (de 1 000 à 1 200 mots)
- H1 : « Création de site web à Ouagadougou »
- Introduction : « Vous êtes une entreprise, une école ou un commerce à Ouagadougou et vous voulez être trouvé sur Google ? Authentique Studio conçoit votre site vitrine ou votre boutique en ligne, de la maquette à la mise en ligne, avec nom de domaine, hébergement et référencement local inclus. »
- H2 : Pour qui (entreprises et PME, écoles et centres de formation, commerces et restaurants, indépendants et artisans)
- H2 : Ce qui est inclus (design adapté au mobile, rédaction, formulaire WhatsApp, fiche Google Business, référencement de base, formation)
- H2 : Tarifs indicatifs (formules en FCFA : vitrine, e-commerce, sur mesure). **Le chiffrage est le signal de confiance le plus fort et le plus rare sur ce marché.**
- H2 : Délais
- H2 : Exemples de réalisations (liens vers les études de cas)
- H2 : FAQ
- CTA devis

Pages filles possibles ensuite, chacune avec un contenu réellement distinct et pas une simple duplication de ville : « Site web pour école au Burkina Faso », « Boutique en ligne avec Orange Money / Moov Money », « Applications et automatisations (bots Telegram/WhatsApp, IA) ». Une page « Développeur web à Bobo-Dioulasso » se justifie uniquement si vous y intervenez réellement.

### C. Études de cas `/realisations/<projet>/` (de 500 à 800 mots chacune)
Gabarit : Contexte et client, problème, solution (fonctionnalités, stack), captures, résultats chiffrés, ce que j'ai appris, lien vers le site en ligne, CTA.
- **Allo Gaz** : « Au Burkina Faso, trouver une bouteille de gaz disponible peut prendre des heures. Avec mon associé, nous avons créé Allo Gaz, une application web qui permet de… » (ajouter des chiffres réels : utilisateurs, commandes, quartiers couverts).
- **Boutik** : décrire le besoin commerçant (gestion de stock et de ventes ?) et le public visé.
- **Bot Telegram** : quel processus il automatise, et le temps gagné.
- **BMW M3 E30 en 3D** : à présenter comme une démonstration d'expertise Three.js / WebGL (« sites immersifs pour lancement de produit »).

### D. Page À propos `/a-propos/`
Biographie complète d'Emmanuel Baguemzanre, preuves du prix IA 2025, rôle aux Dév-Innovateurs du Burkina (activités, nombre de membres, événements), photos de formations, liens vers les profils externes. C'est le hub E-E-A-T de l'entité `Person`.

### E. Blog ou ressources (optionnel, fraîcheur et longue traîne)
« Combien coûte un site web au Burkina Faso en 2026 ? », « Intégrer Orange Money sur son site », « Créer sa fiche Google Business à Ouagadougou ». Ces requêtes informationnelles ont une intention locale forte et une concurrence faible.

---

## 11. Récapitulatif des constats par sévérité

| Sévérité | Constat |
|---|---|
| CRITIQUE | Aucune section ou page de services. Décalage avec la fiche GBP « Concepteur de sites web ». |
| CRITIQUE | H1 vide dans le HTML statique ; une fois rendu, il ne contient qu'un pseudonyme, sans métier ni ville. |
| HAUTE | Title sans ville ni « site web ». |
| HAUTE | Contenu mince : environ 200 mots de prose ; projets sans description. |
| HAUTE | Aucun JSON-LD Person ou ProfessionalService ; pas de paragraphe d'entité citable. |
| HAUTE | Page unique : aucune URL ne peut se positionner sur les services ou les études de cas. |
| HAUTE | Aucun témoignage ni avis ; distinctions sans preuve. |
| HAUTE | Signal géographique confus (Ouagadougou ou Bobo-Dioulasso) et vocabulaire commercial local absent. |
| MOYENNE | Meta description courte, sans bénéfice ni CTA. |
| MOYENNE | Pas de canonical, d'Open Graph ni de favicon. |
| MOYENNE | H2 créatifs sans mots-clés ; texte découpé lettre par lettre et dupliqué dans le DOM. |
| MOYENNE | Nom de marque incohérent (Authentique Studio, Authentique-dev, deux comptes GitHub). |
| MOYENNE | Tutoiement et CTA « CV gratuit » inadaptés à une clientèle B2B. |
| MOYENNE | Formulations génériques et redondances (prix IA cité quatre fois, frise 2023/2024 vide). |
| MOYENNE | Pas de mentions légales, d'identité d'entreprise ni d'adresse e-mail sur un domaine propre. |
| BASSE | Attributs alt faibles ou incorrects (portrait, circuit-spa). |
| BASSE | Lien WhatsApp sans message pré-rempli. |
| BASSE | Pas de date de mise à jour. |
| BASSE | Sous-domaine `is-a.dev` : envisager un domaine propre à moyen terme. |

## 12. Scores finaux

- **Qualité du contenu : 36 / 100.** Contenu authentique, avec de vraies photos et des projets réels, mais mince, générique et hors de l'intention commerciale.
- **SEO on-page : 40 / 100.** Title et description présents et non templatés, `lang="fr"`, bonne lisibilité, NAP partiel. En revanche : H1 et H2 non optimisés, pas de données structurées, pas de canonical ni d'Open Graph, une seule page, ciblage local quasi absent.

Gain attendu si les sections 1, 2, 8 et 10A/B sont appliquées : environ 65 à 70 sur les deux scores, et une page d'accueil enfin alignée avec la fiche Google Business.

---

## Données structurées pour audit-data.json (catégorie Content Quality)

```json
{
  "category": "Content Quality",
  "scores": {"content_quality": 36, "onpage_seo": 40, "eeat": {"experience": 45, "expertise": 40, "authoritativeness": 28, "trustworthiness": 38, "weighted": 38}, "ai_citation_readiness": 22},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "word_count": {"rendered_total": 632, "prose_estimate": 200, "raw_html": 278, "minimum_homepage": 500},
  "findings": [
    {"id": "no-services-content", "severity": "critical", "title": "Aucune offre de services ; décalage avec la fiche GBP"},
    {"id": "h1-js-only-no-keywords", "severity": "critical", "title": "H1 injecté en JS, réduit au pseudonyme"},
    {"id": "title-missing-local-intent", "severity": "high", "title": "Title sans ville ni 'site web'"},
    {"id": "thin-content", "severity": "high", "title": "Environ 200 mots de prose ; projets sans description"},
    {"id": "no-structured-data", "severity": "high", "title": "Aucun JSON-LD Person/ProfessionalService"},
    {"id": "single-page-architecture", "severity": "high", "title": "Aucune page dédiée aux services ou aux études de cas"},
    {"id": "no-social-proof", "severity": "high", "title": "Ni témoignages ni preuves des distinctions"},
    {"id": "geo-signal-confusion", "severity": "high", "title": "Ouagadougou ou Bobo-Dioulasso ; vocabulaire local absent"},
    {"id": "meta-description-weak", "severity": "medium", "title": "Description de 132 car. sans bénéfice ni CTA"},
    {"id": "missing-canonical-og-favicon", "severity": "medium", "title": "Pas de canonical, d'Open Graph ni de favicon"},
    {"id": "headings-no-keywords-split-text", "severity": "medium", "title": "H2 créatifs ; texte découpé lettre par lettre dans le DOM"},
    {"id": "brand-name-inconsistency", "severity": "medium", "title": "Authentique Studio, Authentique-dev, deux comptes GitHub"},
    {"id": "tone-b2b-mismatch", "severity": "medium", "title": "Tutoiement et CTA CV gratuit"},
    {"id": "generic-redundant-copy", "severity": "medium", "title": "Formules génériques ; prix IA répété quatre fois"},
    {"id": "trust-business-identity", "severity": "medium", "title": "Pas de mentions légales ; e-mail Gmail"},
    {"id": "image-alt-quality", "severity": "low", "title": "Alt du portrait et de circuit-spa incorrects"},
    {"id": "whatsapp-no-prefill", "severity": "low", "title": "Lien WhatsApp sans message pré-rempli"},
    {"id": "no-freshness-signal", "severity": "low", "title": "Aucune date de mise à jour"},
    {"id": "free-subdomain", "severity": "low", "title": "Sous-domaine is-a.dev"}
  ]
}
```
