# Audit Schema.org - https://authentique.is-a.dev/

## Détection
Aucun JSON-LD, Microdata ni RDFa (vérifié). Score : **0/100 actuel** ; ~85/100 après déploiement du graphe recommandé.

## Validation
Rien à valider côté site. `schema-recommended.json` : syntaxe JSON valide (python json.load OK), @context https://schema.org, URLs absolues, aucun placeholder dans le JSON.

## Points à trancher (utilisateur)
1. **Incohérence NAP** : site = Ouagadougou, Google Business Profile = Bobo-Dioulasso. Recommandation : **Bobo-Dioulasso** (GBP + université). Le JSON n'a volontairement que addressCountry "BF" ; ajouter ensuite `"addressLocality": "Bobo-Dioulasso"` (et `streetAddress` si adresse publique) dans ProfessionalService. Mettre la même ville dans le HTML visible et le GBP.
2. **Horaires** : seule la fermeture (22:00) est connue. Une fois l'ouverture confirmée, ajouter à ProfessionalService : `"openingHoursSpecification": [{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"HH:MM","closes":"22:00"}]` (jours à confirmer).
3. Ajouter `geo` (latitude/longitude), `image`/`logo` (URL absolue), `hasMap` (lien GBP) et `priceRange` une fois connus (non inventés ici).

## Contenu du graphe (home)
WebSite, ProfilePage (mainEntity = Person), Person (alumniOf, award, knowsAbout, founder, sameAs GitHub), Organization Authentique Studio, Organization Allo Gaz (Person = founder ; Allo Gaz "cofondateur" : le schéma n'a pas de propriété cofounder, `founder` est utilisé), ProfessionalService "Authentique-dev" (areaServed Burkina Faso, téléphone +22665189025). Tout est relié par @id.
Bloc séparé pour /cv/ : WebApplication gratuit (Offer 0 XOF).

## Notes
- `email` : valeur "mailto:" acceptée ; WhatsApp n'a pas de propriété dédiée (on pourrait ajouter un `contactPoint` avec `availableLanguage: "fr"`).
- Le titre "meilleur ingénieur IA" est un `award` texte libre ; Person.alumniOf indique l'université, la mention "Licence 3 génie logiciel" n'est pas exprimable proprement, laissée dans le texte visible.
- ProfessionalService/Person/ProfilePage ne donnent pas de rich result Google garanti : le gain est surtout la désambiguïsation d'entité (Knowledge Graph, IA/GEO) et la cohérence avec le GBP.
- **FAQPage** : rich results retirés pour tous les sites (7 mai 2026) -> ne pas en ajouter pour le SERP. **HowTo** : retiré (sept. 2023), ne pas utiliser. Pour de vraies Q&R d'utilisateurs, QAPage.
- Ajouter aussi BreadcrumbList sur /cv/ (Accueil > Générateur de CV).
- Étendre `sameAs` avec LinkedIn, X, GBP (URL de la fiche) si ces profils existent.

## Mise en place
Coller le bloc `home_page_graph` (sans la clé externe) dans `<script type="application/ld+json">` du `<head>` de index.html, et le bloc `cv_page_block__to_place_on_/cv/` sur /cv/. Tester ensuite avec le Rich Results Test et validator.schema.org.

## Score détaillé (cible après déploiement)
Présence 30/30, Person/identité 20/20, Entités reliées 15/15, Local (NAP/horaires/geo) 8/20 en attente, sameAs 7/15 (GitHub seul).
