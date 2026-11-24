# Audit SEO local — Authentique (authentique.is-a.dev)

Date : 2026-11-24. Source du site : /Users/macbookpro/projet-web/portefolio/index.html (lecture seule). Données GBP : fournies par le propriétaire (panneau Google public), non revérifiées en direct.

## Score SEO local : 23 / 100

| Dimension | Poids | Note | Commentaire |
|---|---|---|---|
| Signaux GBP | 25 | 9 | Catégorie principale pertinente, téléphone et site corrects. Adresse erronée, description qui contredit la ville, aucun autre contenu confirmé. |
| Avis et réputation | 20 | 4 | 1 seul avis (5,0). Aucun avis sur le site, aucun schéma aggregateRating. |
| SEO local on-page | 20 | 4 | "Ouagadougou, BF" en meta et hero, mais aucune page service, aucune mention de Bobo-Dioulasso comme zone, aucun bloc NAP texte. |
| NAP et citations | 15 | 3 | Ville incohérente (Ouaga / Bobo), nom en 3 variantes, adresse GBP invalide. Aucune citation confirmée. |
| Schéma local | 10 | 0 | Aucun JSON-LD LocalBusiness / ProfessionalService. |
| Liens et autorité locale | 10 | 3 | GitHub, WhatsApp, TikTok. Domaine is-a.dev (sous-domaine gratuit), aucune mention locale. |
| Total | 100 | 23 | |

Note : la proximité pèse environ 55 % de la variance de classement local (étude Search Atlas) et n'est pas maîtrisable. Pour une requête "création de site web Ouagadougou", un profil classé Bobo-Dioulasso part avec un handicap de proximité structurel.

## 1. Type d'entreprise
- Détecté : entreprise de service à distance / SAB (zone de service). Le site n'affiche aucune adresse, aucun embed Maps, aucun lien itinéraire. La prise de contact passe par WhatsApp (wa.me/22665189025) et e-mail.
- Recommandation : configurer le GBP en SAB (adresse masquée, zones de service). Un freelance sans local ouvert au public n'est pas éligible à un affichage d'adresse (règles Google). Ne jamais mettre de faux local ni de boîte postale/adresse virtuelle.
- Vertical : services professionnels / web et marketing digital (pas de vertical type restaurant, santé, etc.). Sous-type schema.org recommandé : `ProfessionalService` (ou `LocalBusiness` en repli), avec `areaServed`.

## 2. Cohérence NAP

| Élément | Site web | GBP | Verdict |
|---|---|---|---|
| Nom | "Authentique" (title), "Authentique Studio" (hero/footer), "Emmanuel Baguemzanre" | "Authentique-dev" | Incohérent : 4 variantes. Choisir une seule marque. |
| Ville | Ouagadougou (meta, hero, footer, bloc about) | Bobo-Dioulasso (champ ville) ; la description dit Ouagadougou | Contradiction critique |
| Adresse | Aucune | "265 24 57, Bobo-Dioulasso" (ressemble à un numéro de téléphone, ou un code incomplet) | Erreur à corriger |
| Téléphone | +226 65 18 90 25 (WhatsApp, format international) | 65 18 90 25 (format local) | Même numéro, formats différents. Acceptable mais à uniformiser. |
| E-mail | authentique.studio.web@gmail.com | non précisé | Gmail : peu de signal de marque |
| Coordonnées | 12.3714 N, 1.5197 O (Ouagadougou) mentionnées dans le contenu | zone non définie | À ne pas exposer comme adresse. Absentes du schéma. |
| Site | — | https://authentique.is-a.dev/ | OK |
| Schéma JSON-LD | aucun | — | Manquant |

Remarque : le champ "Licence 3 à l'université de Bobo-Dioulasso" explique sans doute le choix de la ville GBP, mais cela crée une incohérence avec le positionnement affiché (Ouagadougou). Les moteurs et Google ne peuvent pas désambiguïser.

Autre point : le site est un portfolio personnel (titre "Emmanuel Baguemzanre, développeur full stack"), alors que le GBP décrit une "agence digitale". Le décalage freelance / agence nuit à la confiance et à la cohérence d'entité. Choisir et s'y tenir.

## 3. Décision stratégique : ville principale

Choisir UNE ville principale pour le GBP et le site. Critères :
1. Où le propriétaire réside et travaille réellement (obligatoire pour la validation Google et la vérification).
2. Où se trouve la demande : Ouagadougou (capitale, plus d'entreprises, d'écoles, d'ONG) est plus concurrentiel mais plus lucratif ; Bobo-Dioulasso est moins concurrentiel.
- Si le propriétaire est réellement à Bobo : ville GBP = Bobo-Dioulasso, réécrire la description et le site en "basé à Bobo-Dioulasso, intervient aussi à Ouagadougou et partout au Burkina (à distance)". Zone de service : Bobo-Dioulasso, Ouagadougou, Burkina Faso.
- Si le propriétaire est réellement à Ouagadougou : un GBP localisé à Bobo n'est pas conforme. Mettre à jour la ville/zone vers Ouagadougou.
- Ne pas annoncer une ville où on ne réside pas pour grappiller du trafic : risque de suspension.
Le site doit refléter la même chose (meta, hero, footer, bloc about, schéma).

## 4. Checklist exacte du tableau de bord GBP

A. Immédiat (aujourd'hui)
1. Infos > Adresse : supprimer "265 24 57". Cocher "Je ne sers pas mes clients à cette adresse" / "Masquer l'adresse" (SAB). Si une adresse domicile a été saisie pour la vérification, elle reste privée.
2. Infos > Zones de service : ajouter Bobo-Dioulasso, Ouagadougou, (Burkina Faso). 20 zones maximum. Rester réaliste.
3. Infos > Nom de l'entreprise : choisir une forme unique (par exemple "Authentique Studio"), la même sur le site, TikTok, WhatsApp Business, GitHub. Ne pas ajouter de mots-clés ni de ville dans le nom (règle Google).
4. Infos > Description (750 caractères max) : réécrire en cohérence avec la ville choisie. Mentionner : création de sites web, sites vitrines, e-commerce, refonte, hébergement/maintenance, clients (entreprises, écoles, commerces, indépendants), villes servies. Pas de lien, pas de promotion, pas de MAJUSCULES.
5. Infos > Téléphone : garder 65 18 90 25 ou saisir +226 65 18 90 25 de façon identique au site. Vérifier que le numéro est joignable en appel (pas seulement WhatsApp), ou assumer WhatsApp via un lien dans le profil.
6. Infos > Horaires : mettre les vrais horaires (ex. lundi-samedi). "Ferme à 22:00" est inhabituel : à confirmer. Ne pas afficher 24/7 si faux. Ajouter horaires spéciaux pour jours fériés.
7. Catégorie principale : garder "Concepteur de sites web". Catégories secondaires (3 à 5 selon disponibilité en français) : "Développeur de logiciels", "Agence de marketing Internet" ou "Service de marketing", "Agence de design graphique", "Fournisseur d'hébergement Web" (uniquement si réellement proposé). Vérifier que la catégorie existe au Burkina via le sélecteur.

B. Dans les 7 jours
8. Services : ajouter chaque service avec nom, description courte, prix indicatif en FCFA si possible : Site vitrine, Site e-commerce, Refonte de site, Site pour école, Landing page, Maintenance, Optimisation SEO local, Logo/identité.
9. Produits : créer 3 "packs" (ex. Pack Vitrine, Pack Boutique, Pack École) avec photo, description, prix "à partir de", lien vers WhatsApp.
10. Photos : logo (carré 250x250 min), photo de couverture (16:9), 10 à 20 captures de projets réels, photos du propriétaire au travail, équipe. Pas de photos d'illustration banque d'images. Ajouter au moins 1 photo / semaine au début.
11. Lien de réservation / bouton : ajouter "Prendre rendez-vous" vers WhatsApp (wa.me/22665189025).
12. Liens de profil : TikTok est déjà lié ; ajouter Facebook, LinkedIn, GitHub, Instagram si existants.
13. Questions-réponses : poser et répondre soi-même à 5 questions (prix, délais, moyens de paiement Orange Money / Moov Money, zones couvertes, langues). Garder des réponses courtes.
14. Attributs : cocher "Rendez-vous en ligne", "Services à distance" si proposés, langues parlées (français, mooré, dioula si pertinent).

C. Récurrent
15. Publications (posts) : 1 à 2 par semaine (nouveau projet livré, offre, conseil). Ajouter un bouton WhatsApp.
16. Avis : voir section 5.
17. Suivi : activer les notifications d'avis, consulter les Performances (appels, clics site, messages) chaque mois.

## 5. Stratégie d'avis
- État : 1 avis (5,0). Le panneau affiche aussi "4,33 avis", valeur incohérente (probablement un artefact d'affichage ou une note composite) à surveiller ; ne pas la reproduire sur le site.
- Objectif : 10 avis authentiques en 90 jours, puis un rythme régulier (1 à 4 par mois). La régularité compte plus qu'un pic ; éviter de tout demander d'un coup.
- Méthode : envoyer à chaque client, après livraison, le lien court d'avis (GBP > "Demander des avis" > copier le lien) par WhatsApp avec un message personnalisé en français.
- Répondre à chaque avis sous 48 h, y compris le premier (remercier, citer le projet, sans mots-clés forcés).
- Interdit : acheter des avis, échanger, demander aux amis/famille sans usage réel, filtrer ("avis uniquement si positif"). Risque de suppression.
- Sur le site : afficher des témoignages réels avec nom et projet, et seulement ensuite ajouter aggregateRating au schéma quand le volume est suffisant et vérifiable. Ne pas baliser d'avis auto-publiés.

## 6. Site web : corrections on-page locales
Constat : page unique, fortement visuelle (WebGL/three.js), très peu de texte indexable, aucune page de service, aucun contenu local, aucune mention d'adresse ou de zone de service.
1. Créer des pages de service dédiées (facteur n°1 du SEO local organique) : /creation-site-web-ouagadougou/, /creation-site-web-bobo-dioulasso/, /site-ecole/, /site-ecommerce/, /refonte-site/. Chacune : contenu unique, FAQ, exemples de réalisations, prix indicatif, bouton WhatsApp. Éviter les pages "doorway" interchangeables (test d'échange de ville).
2. Ajouter un bloc contact en texte visible (pied de page) : nom unique, "Basé à [ville], intervient à [zones]", +226 65 18 90 25, e-mail, horaires. Même formulation que le GBP.
3. Mettre à jour title et meta description : actuellement "développeur full stack à Ouagadougou", sans mot-clé de service. Exemple : "Création de site web à [ville] | Authentique Studio". Garder la ville cohérente avec le GBP.
4. Lien du GBP vers la page d'accueil ou une page "Services" riche en texte (utiliser UTM : ?utm_source=gbp pour suivre).
5. Domaine : is-a.dev est un sous-domaine gratuit pour développeurs. Pour une entreprise locale, un domaine propre (.com / .bf) renforce la confiance, l'e-mail pro (contact@domaine) et l'autorité. Prévoir une redirection 301 lors de la migration.
6. Ajouter l'e-mail pro à la place de Gmail, quand le domaine existera.
7. Ajouter un embed Maps uniquement si une adresse publique est affichée (hors cas SAB, ne pas l'ajouter).

## 7. Schéma local recommandé (JSON-LD, SAB)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://authentique.is-a.dev/#organization",
  "name": "Authentique Studio",
  "url": "https://authentique.is-a.dev/",
  "telephone": "+22665189025",
  "email": "authentique.studio.web@gmail.com",
  "description": "Création de sites web professionnels pour entreprises, écoles, commerces et indépendants.",
  "address": { "@type": "PostalAddress", "addressLocality": "VILLE_CHOISIE", "addressCountry": "BF" },
  "areaServed": [
    { "@type": "City", "name": "Ouagadougou" },
    { "@type": "City", "name": "Bobo-Dioulasso" },
    { "@type": "Country", "name": "Burkina Faso" }
  ],
  "founder": { "@type": "Person", "name": "Emmanuel Baguemzanre" },
  "sameAs": ["https://github.com/authentiquestudioweb/", "URL_TIKTOK", "URL_FACEBOOK", "URL_LINKEDIN", "URL_GBP"]
}
```
Notes : pas de `streetAddress` pour un SAB sans local ; `geo` uniquement si une adresse publique existe (5 décimales). Ne pas utiliser les coordonnées de Ouagadougou si le GBP est à Bobo. Ajouter `openingHoursSpecification` seulement avec des horaires réels. Ajouter `aggregateRating` seulement avec des avis vérifiables. Valider avec le test de résultats enrichis.

## 8. Citations pertinentes pour le Burkina Faso
Principe : mêmes nom / téléphone / ville / URL partout. Les sources ci-dessous sont à vérifier une par une (existence et activité actuelles non confirmées par cet audit).
Priorité haute :
1. Bing Places for Business (import depuis GBP possible).
2. Apple Business Connect (cartes Apple, gratuit).
3. Facebook Page (catégorie "Service de conception de sites web", bouton WhatsApp, même nom).
4. LinkedIn Company Page (nom, secteur, localisation, site).
5. WhatsApp Business (profil avec catégorie, adresse/ville, site, horaires, catalogue).
6. TikTok / Instagram (déjà TikTok relié : mettre site et même nom en bio).
Priorité moyenne (annuaires locaux / africains, à vérifier) :
7. Goafrica (annuaire d'entreprises en Afrique de l'Ouest), annuaires d'entreprises du Burkina (Annuaire du Burkina et équivalents), pages jaunes locales.
8. Annuaires des CCI-BF / chambre de commerce, annuaires de startups et du numérique (communautés tech burkinabè, incubateurs).
9. Clutch / GoodFirms / Sortlist / Malt / Upwork (profil freelance, utile pour clients internationaux, liens et avis).
10. GitHub (organisation avec lien vers le site), Product Hunt / Behance / Dribbble pour les réalisations.
11. Yelp et BBB : peu pertinents au Burkina Faso, à ne pas prioriser.
Chaque fiche : lien vers le site, description cohérente avec le GBP, photos, même téléphone. Éviter la création massive de fiches de qualité faible.

## 9. Mots-clés locaux cibles

| Priorité | Mot-clé | Ville | Intention / usage |
|---|---|---|---|
| 1 | création de site web Ouagadougou | Ouaga | Page service dédiée, forte concurrence mais forte demande |
| 1 | création de site web Bobo-Dioulasso | Bobo | Page service dédiée, concurrence plus faible |
| 2 | développeur web Burkina Faso / freelance Burkina | national | Page d'accueil |
| 2 | agence web Ouagadougou / agence digitale Bobo-Dioulasso | villes | À cibler seulement si l'on accepte le positionnement "agence" |
| 3 | création site e-commerce Burkina, site pour école Burkina, site vitrine entreprise | national | Pages service thématiques |
| 3 | prix création site web Burkina FCFA | national | Article ou section tarifs |
Recommandation : si le propriétaire est basé à Bobo, viser Bobo comme cible locale n°1 (meilleure chance en carte Google), et capter Ouaga par contenu (page service) plutôt que par le GBP. La concurrence organique à Ouagadougou se joue surtout via les pages du site, pas via la carte.
Vérifier les volumes avec Google Keyword Planner / Search Console (non réalisé ici).

## 10. Top 10 actions priorisées

| # | Priorité | Action |
|---|---|---|
| 1 | Critique | Supprimer l'adresse "265 24 57" du GBP et passer en SAB (adresse masquée). |
| 2 | Critique | Choisir une ville principale réelle et aligner GBP (ville, zone, description), site (meta, hero, footer) et schéma. |
| 3 | Critique | Unifier le nom d'entreprise (Authentique-dev / Authentique / Authentique Studio) sur tous les canaux. |
| 4 | Haute | Réécrire la description GBP (cohérente, 750 caractères, services et zones). |
| 5 | Haute | Ajouter catégories secondaires, services, produits/packs, horaires réels, bouton WhatsApp. |
| 6 | Haute | Créer les pages de service locales et un bloc NAP texte sur le site. |
| 7 | Haute | Lancer la collecte d'avis (objectif 10 en 90 jours) et répondre à chaque avis. |
| 8 | Moyenne | Ajouter le JSON-LD ProfessionalService avec areaServed et sameAs. |
| 9 | Moyenne | Créer Bing Places, Apple Business Connect, Facebook, LinkedIn, WhatsApp Business, annuaires locaux. |
| 10 | Basse | Acheter un domaine propre (.com / .bf), e-mail pro, redirection 301 ; publier des posts GBP hebdomadaires. |

## 11. Limites de cet audit
- Les données GBP proviennent de la lecture du panneau public par le propriétaire ; le tableau de bord réel (statut de vérification, performances, suggestions de modification, doublons) n'a pas été consulté.
- Aucune donnée payante (DataForSEO, Whitespark, BrightLocal) : pas de suivi de position dans le pack local, pas d'audit de citations réelles, pas de volumes de recherche, pas de vélocité d'avis historique.
- L'existence et l'état actuel des annuaires burkinabè cités n'ont pas été vérifiés ; à confirmer manuellement.
- Le site utilise un rendu WebGL ; l'analyse repose sur le code source index.html (contenu indexable limité, ce qui reste à confirmer avec une inspection d'URL dans Search Console).
- Le chiffre "4,33 avis" est inexpliqué et non vérifiable.
