# GEO / AI Search Readiness : https://authentique.is-a.dev/

Date de l'audit : 24/11/2026. Sources : fetch brut (`homepage-render.json`), rendu Playwright avec sandbox Chromium actif (`homepage-rendered.json`), `index.html`, requêtes HTTP sur les fichiers well-known, API publique GitHub pour les deux comptes liés depuis le site.

## Score AI Search Readiness : 27/100 (faible)

| Dimension | Poids | Score | Pondéré |
|---|---|---|---|
| Citabilité | 25 % | 30 | 7,5 |
| Lisibilité structurelle | 20 % | 25 | 5,0 |
| Contenu multimodal | 15 % | 35 | 5,3 |
| Autorité et signaux de marque | 20 % | 15 | 3,0 |
| Accessibilité technique | 20 % | 30 | 6,0 |
| **Total** | | | **≈ 27** |

### Scores par plateforme (estimation)

| Plateforme | Score | Pourquoi |
|---|---|---|
| Google AI Overviews / AI Mode | 30 | Googlebot exécute le JS, donc il voit le contenu complet. Mais il n'y a ni entité (pas de JSON-LD Person, pas de sameAs), ni sitemap, ni canonical, et la localisation est incohérente. Ça explique la réponse « aucune information vérifiable ». |
| ChatGPT Search (OAI-SearchBot) | 18 | Pas d'exécution JS : il ne voit que 43 % du texte. Le H1 est vide, il n'y a ni projets ni frise, et aucune mention tierce de la marque. |
| Perplexity (PerplexityBot) | 18 | Même limite JS. Perplexity s'appuie beaucoup sur les sources tierces (Reddit, LinkedIn, annuaires), et il n'y en a aucune. |
| Bing Copilot | 22 | Bingbot rend partiellement le JS. Pas d'IndexNow, pas de sitemap. |
| Claude (Claude-SearchBot) | 18 | Pas de JS : même vue partielle que ChatGPT. |

## 1. Accès des crawlers IA

`/robots.txt` renvoie **404**. Par convention, l'absence de robots.txt autorise tous les robots. Aucun bot n'est donc bloqué, mais il n'y a pas non plus de directive `Sitemap:`, et `/sitemap.xml` renvoie aussi 404.

| Crawler | Rôle | Statut |
|---|---|---|
| OAI-SearchBot | Citations dans ChatGPT Search | Autorisé (par défaut) |
| Claude-SearchBot | Citations dans la recherche Claude | Autorisé (par défaut) |
| PerplexityBot | Index et citations Perplexity | Autorisé (par défaut) |
| Googlebot | Google Search **et** AI Overviews / AI Mode | Autorisé (par défaut) |
| Bingbot | Bing et Copilot | Autorisé (par défaut) |
| Applebot | Siri, Spotlight, Safari | Autorisé (par défaut) |
| GPTBot | Entraînement des modèles OpenAI (n'affecte **pas** ChatGPT Search) | Autorisé (par défaut) |
| ClaudeBot | Entraînement des modèles Anthropic (n'affecte **pas** la recherche Claude) | Autorisé (par défaut) |
| Google-Extended | Entraînement et grounding Gemini/Vertex. N'affecte **pas** l'inclusion dans Search ni dans les AI Overviews | Autorisé (par défaut) |
| Applebot-Extended | Entraînement Apple Intelligence uniquement | Autorisé (par défaut) |
| CCBot, cohere-ai | Entraînement (Common Crawl, Cohere) | Autorisé (par défaut) |

Pour un portfolio qui cherche à se faire connaître, il est conseillé de **laisser tous ces robots autorisés**, y compris ceux d'entraînement. Être présent dans les données d'entraînement aide les modèles à « connaître » l'entité Authentique.

### robots.txt recommandé

```
# robots.txt : authentique.is-a.dev
User-agent: *
Allow: /

# Moteurs de recherche IA (citations)
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Entraînement / grounding : autorisés volontairement pour renforcer la notoriété de l'entité
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://authentique.is-a.dev/sitemap.xml
```

Créez aussi un `sitemap.xml` minimal qui liste `/` et, plus tard, `/cv`, `/projets/...`, `/llms.txt`, avec un `<lastmod>`.

## 2. llms.txt, Markdown et RSL

- `/llms.txt` : **absent (404)**. `/llms-full.txt` : absent. `/index.md` : absent. `/.well-known/ai.txt` : absent.
- Licence RSL 1.0 : absente. Ce n'est pas prioritaire pour un portfolio. À envisager seulement pour encadrer la réutilisation des contenus.

### llms.txt recommandé

```markdown
# Authentique (Emmanuel Baguemzanre)

> Emmanuel Baguemzanre, connu sous le nom « Authentique », est un développeur full stack burkinabè, fondateur d'Authentique Studio (studio de développement web, applications et automatisations) et cofondateur d'Allo Gaz. Basé à Ouagadougou (Burkina Faso), étudiant en Licence 3 de génie logiciel à l'Université Aube Nouvelle (Bobo-Dioulasso). Prix du meilleur ingénieur en intelligence artificielle de son université en 2025.

## Identité
- Nom : Emmanuel Baguemzanre
- Nom de marque : Authentique (ne pas confondre avec d'autres usages du mot « authentique »)
- Studio : Authentique Studio (https://authentique.is-a.dev/)
- Rôle communautaire : Leader des Dév-Innovateurs du Burkina
- Contact : authentique.studio.web@gmail.com, WhatsApp +226 65 18 90 25

## Compétences
JavaScript, TypeScript, React, Next.js, Node.js, Python, Flutter, SQL, Docker, Tailwind, Figma.

## Projets
- [Allo Gaz](https://allo-gaz-seven.vercel.app) : application de vente et livraison de gaz (cofondateur)
- [Boutik OS](https://boutik-os.vercel.app) : SaaS de gestion de boutiques
- [Bot Telegram de suivi des dépenses](https://github.com/AUthENTIQUEyeager/bot-telegram)
- Modèle 3D BMW M3 E30 (Three.js)

## Profils
- [GitHub Authentique Studio](https://github.com/authentiquestudioweb/)
- [GitHub personnel](https://github.com/AUthENTIQUEyeager)

## Optional
- [Portfolio complet en Markdown](https://authentique.is-a.dev/index.md)
```

Note : vérifiez les faits (ville de résidence, liste des projets) avant publication. Le llms.txt doit dire **exactement** la même chose que le site et que le JSON-LD.

## 3. Le rendu JS bloque les crawlers IA

- HTML brut : **278 mots, 7 liens, H1 vide**. Rendu : **651 mots, 16 liens**. **57 %** des mots et **56 %** des liens n'existent qu'après exécution du JS.
- Invisible pour OAI-SearchBot, Claude-SearchBot et PerplexityBot (qui n'exécutent pas le JS) :
  - le **H1** (« authentique » n'est injecté qu'au rendu, et en double : « authentique authentique ») ;
  - les **chiffres clés** (L3, 1 prix IA 2025, 4 projets) ;
  - la **frise 2022 à 2026** (« Le déclic », « L'université », « Transmettre », « Authentique ») ;
  - la **section projets** (Boutik, bot Telegram, Allo-Gaz, BMW M3 E30, Studio Authentique) ;
  - le **footer** (« Basé à… Ouagadougou », copyright Authentique Studio).
- Les H2 « du code au studio », « mes projets » et « construisons ensemble » sont générés depuis des templates JS (`${rvWords(...)}`). Dans le HTML brut, les H2 `seasonH`, `tlH`, `padH` et `foot-h` sont vides.
- Le texte animé est découpé lettre par lettre (« p r o j e t s », « 2 0 2 6 »). Le texte extrait par les agents et les parseurs devient bruité et les mots sont doublés. Un `aria-label` sur le conteneur et `aria-hidden="true"` sur les lettres corrige le problème pour l'arbre d'accessibilité, mais **le texte réel doit être présent dans le HTML statique**.

**Correctif** : écrire en dur dans `index.html` le H1 (« Emmanuel Baguemzanre, développeur full stack, Authentique »), tous les H2, la frise, les projets et le footer. Le JS ne doit servir qu'à l'animation (amélioration progressive), pas à injecter le contenu.

## 4. Citabilité des passages

Passages réellement extractibles (dans le HTML brut) :

| Passage | Mots | Évaluation |
|---|---|---|
| « En Licence 3 de génie logiciel à l'Université Aube Nouvelle de Bobo-Dioulasso… » | ~45 | Bon fait vérifiable, mais trop court. Le sujet n'est pas nommé (« je »). |
| « En 2025, j'ai reçu le prix du meilleur ingénieur en intelligence artificielle de mon université… » | ~35 | Fait le plus citable du site, mais l'université n'est pas nommée dans la phrase et aucune source n'est liée (article, photo, post de l'université). |
| « Leader des Dév-Innovateurs du Burkina… » | ~35 | Bon signal communautaire. Pas de lien vers la communauté. |
| « Création d'applications, de sites web et d'automatisations évolutives. » | 8 | Trop vague pour être cité. |

Problèmes :
- **Aucun passage autonome** de 130 à 170 mots qui réponde à « Qui est Authentique ? » ou « Qu'est-ce qu'Authentique Studio ? ». (Ce format est une heuristique tierce : Google indique qu'il n'est pas nécessaire de découper le contenu pour l'IA. Un paragraphe de présentation clair reste toutefois le meilleur candidat à la citation.)
- Rédaction à la première personne sans nom propre. Une fois extraite, la phrase « j'ai reçu le prix… » ne dit pas qui a reçu le prix.
- Titres décoratifs (« mon parcours jusqu'ici. », « état d'esprit »), jamais sous forme de questions.
- Les projets n'ont **aucune description** : juste un nom et un type. Pas de problème résolu, de stack, de résultat ni de chiffre. Pourtant GitHub montre une vingtaine d'applications déployées (Boutik OS, Netpass Pro, Bazin Pro, Barber Manager, Livreur Plus, gestion d'école, etc.). Le portfolio n'en mentionne que 4.

**Bloc « À propos » recommandé** (statique, juste sous le H1) :

> **Qui est Authentique ?** Emmanuel Baguemzanre, dit « Authentique », est un développeur full stack basé à Ouagadougou, au Burkina Faso. Il a fondé Authentique Studio, un studio qui conçoit des sites web, des applications mobiles et des automatisations pour les commerces et les PME d'Afrique de l'Ouest, et il a cofondé Allo Gaz, une application de commande de gaz. Étudiant en Licence 3 de génie logiciel à l'Université Aube Nouvelle de Bobo-Dioulasso, il a reçu en 2025 le prix du meilleur ingénieur en intelligence artificielle de son université. Il anime aussi la communauté des Dév-Innovateurs du Burkina. Il travaille en JavaScript, TypeScript, React, Next.js, Node.js, Python et Flutter, et il est ouvert aux missions freelance et aux collaborations.

Ajoutez aussi une mini-FAQ (H3 sous forme de questions) : « Que fait Authentique Studio ? », « Quels projets a réalisés Authentique ? », « Comment contacter Authentique ? ».

## 5. Clarté de l'entité et cohérence de la marque

Le constat le plus important pour expliquer la réponse de Google (« aucune information vérifiable sur Authentique-dev à Bobo-Dioulasso ») :

**Localisation contradictoire**
- Meta description, hero (« ouagadougou, bf »), carte (coordonnées 12.3714° N, 1.5197° W, qui correspondent à Ouagadougou) et footer : **Ouagadougou**.
- Université : **Bobo-Dioulasso**. La requête Google portait sur Bobo-Dioulasso, une ville que le site n'associe jamais à la personne en tant que lieu de résidence.
- Correctif : une seule formule partout, par exemple « basé à Ouagadougou, étudiant à Bobo-Dioulasso », ou l'inverse si c'est la réalité. Elle doit être reprise à l'identique dans le JSON-LD (`address`, `alumniOf`), sur GitHub, LinkedIn et la fiche Google.

**Noms utilisés**

| Variante | Où |
|---|---|
| Authentique | Title, H1, alt, frise |
| Authentique Studio | Logo, footer, meta description |
| Studio Authentique | Carte projets |
| Authentique studio web | Bio GitHub, adresse e-mail, fiche Google Maps « Authentique studio » |
| Authentique-d | Nom affiché sur GitHub `authentiquestudioweb` |
| Authentique-dev | Requête testée sur Google (n'apparaît nulle part sur le site) |
| AUthENTIQUEyeager | Second compte GitHub (34 dépôts, aucun nom ni bio) |
| Allo Gaz / Allo-Gaz | Les deux graphies coexistent |

« Authentique » est un mot courant en français, donc ambigu pour une IA. Il faut **toujours l'ancrer au nom complet** : « Authentique (Emmanuel Baguemzanre) » et « Authentique Studio ». Choisissez une forme canonique pour le studio et pour Allo Gaz. Si « Authentique-dev » est le nom souhaité, utilisez-le sur le site et dans `alternateName`.

**JSON-LD absent** : aucun bloc structuré, pas d'Open Graph, pas de Twitter Card, pas de `<link rel="canonical">`. Ajoutez au minimum, dans le HTML statique :
- `Person` : `name` « Emmanuel Baguemzanre », `alternateName` [« Authentique », « Authentique-dev »], `jobTitle`, `address` (Ouagadougou, BF), `alumniOf`/`affiliation` (Université Aube Nouvelle), `award` (« Meilleur ingénieur en IA, Université Aube Nouvelle, 2025 »), `knowsAbout`, `email`, `image`, `sameAs` [GitHub ×2, LinkedIn, TikTok, fiche Google Maps] ;
- `Organization` (ou `ProfessionalService`) pour Authentique Studio, avec `founder` pointant vers la Person et `url` ;
- `WebSite` et `ProfilePage` (`mainEntity` pointant vers la Person, `dateModified`).

## 6. Mentions de marque hors site

| Plateforme | Constat | Impact |
|---|---|---|
| Wikipedia / Wikidata | Aucune entité. Wikipedia n'est pas réaliste à ce stade. Wikidata est possible plus tard si des sources tierces existent (prix, presse). | Élevé à long terme |
| YouTube | Aucun lien depuis le site. C'est le signal le plus corrélé aux citations IA (~0,74). | Très élevé |
| Reddit | Aucune présence détectée ou liée. | Élevé |
| LinkedIn | **Aucun lien** depuis le site. | Élevé (Perplexity et ChatGPT citent beaucoup LinkedIn pour les personnes) |
| TikTok | Mentionné par le commanditaire, mais **non lié** depuis le site. | Moyen (ajouter en `sameAs` et en lien) |
| GitHub `authentiquestudioweb` | Créé le 15/11/2026, 0 abonné, 8 dépôts. Nom affiché « Authentique-d ». **Le champ site web est vide** (pas de lien retour vers le portfolio). La localisation est une URL Google Maps et non une ville. | À corriger tout de suite |
| GitHub `AUthENTIQUEyeager` | 34 dépôts, beaucoup d'apps déployées sur Vercel, mais **aucun nom, aucune bio, aucun lien vers le site**. Pour une IA, ce compte n'est pas relié à l'entité. | À corriger tout de suite |
| Google Maps / fiche d'établissement | Une fiche « Authentique studio » existe (référencée dans la localisation GitHub). Elle n'est pas liée depuis le site. | Élevé pour Google AIO |

Aucune donnée DataForSEO n'était disponible : la visibilité actuelle dans ChatGPT et les mentions LLM n'ont pas été mesurées en direct.

## 7. Agent-readiness (bref)

- llms.txt, Markdown alternatif, sitemap : absents. Ajoutez `/llms.txt`, `/index.md` (version Markdown du portfolio) et `<link rel="alternate" type="text/markdown" href="/index.md">`.
- Arbre d'accessibilité (rendu) : `main` et une `region` nommée « Authentique — Emmanuel Baguemzanre » sont présents, les liens ont des noms (« Authentique Studio »). En revanche :
  - le loader `status "Chargement"` est le premier contenu exposé ;
  - le H1 rendu se lit « authentique authentique » (texte doublé) ;
  - le texte découpé lettre par lettre est bruité ;
  - 11 images sur 18 ont un `alt=""`, ce qui est acceptable si elles sont décoratives, mais les visuels de projets doivent être décrits ;
  - les chiffres clés n'ont aucun libellé accessible dans le HTML brut.
- Liens de contact (mailto, WhatsApp, GitHub) présents dans le HTML brut : bon point pour les agents.
- Date : aucune date visible ni `dateModified`. Seul l'en-tête HTTP `Last-Modified` existe (23/11/2026). La « publication_date 2026-01-01 » détectée vient probablement du « © 2026 » et n'est pas fiable.
- Bons points : HTTPS + HSTS, Vercel CDN, `lang="fr"`, title descriptif, meta description présente.

## 8. Top 5 des actions à plus fort impact

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Rendre le contenu statique** : H1, H2, frise, projets, chiffres et footer écrits en dur dans `index.html`, le JS ne servant qu'à l'animation. Corriger le texte doublé et découpé (aria-label + aria-hidden). | Fait passer la part de contenu visible par ChatGPT, Claude et Perplexity de 43 % à 100 % | 3 à 5 h |
| 2 | **JSON-LD Person + Organization + ProfilePage** avec `sameAs`, plus `canonical` et Open Graph. | Crée l'entité pour Google AIO et le Knowledge Graph | 1 h |
| 3 | **Unifier l'entité** : une seule localisation (Ouagadougou ou Bobo-Dioulasso, avec la formule exacte), un nom canonique (« Authentique (Emmanuel Baguemzanre) » / « Authentique Studio »), la même graphie d'Allo Gaz. Corriger les profils GitHub (nom complet, bio, ville, champ site web = authentique.is-a.dev) et la fiche Google. | Supprime la confusion qui explique la réponse « aucune information vérifiable » | 1 h |
| 4 | **Bloc « Qui est Authentique ? » de 130 à 170 mots + FAQ en questions + fiches projets** (problème, stack, résultat, lien démo) pour au moins 6 des apps déployées. Mettre en avant la source du prix IA 2025 (lien vers une publication de l'université). | Fournit des passages citables et vérifiables | 3 à 4 h |
| 5 | **robots.txt + sitemap.xml + llms.txt + index.md** (contenus ci-dessus), puis inscription dans Google Search Console et Bing Webmaster Tools (avec IndexNow). Ensuite, créer un profil LinkedIn et une chaîne YouTube ou des vidéos TikTok qui démontrent les projets, en liant toujours vers le site. | Rend le site découvrable et commence à bâtir les mentions tierces | 1 h (fichiers) + travail continu (off-site) |

## 9. Données structurées pour audit-data.json (catégorie AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 27,
  "dimensions": {"citability": 30, "structural_readability": 25, "multimodal": 35, "authority_brand": 15, "technical_accessibility": 30},
  "platform_scores": {"google_aio": 30, "chatgpt_search": 18, "perplexity": 18, "bing_copilot": 22, "claude_search": 18},
  "findings": [
    {"id": "geo-js-only-content", "severity": "critical", "title": "57 % du texte et 56 % des liens rendus uniquement en JS ; H1 et H2 vides dans le HTML brut", "evidence": "raw 278 mots / rendered 651 mots"},
    {"id": "geo-no-structured-data", "severity": "high", "title": "Aucun JSON-LD (Person/Organization), ni Open Graph, ni canonical"},
    {"id": "geo-entity-location-conflict", "severity": "high", "title": "Localisation contradictoire Ouagadougou (meta, hero, carte, footer) / Bobo-Dioulasso (université)"},
    {"id": "geo-brand-name-variants", "severity": "medium", "title": "Variantes de nom : Authentique, Authentique Studio, Studio Authentique, Authentique studio web, Authentique-d, Authentique-dev, AUthENTIQUEyeager"},
    {"id": "geo-no-robots-sitemap", "severity": "medium", "title": "robots.txt et sitemap.xml en 404 (tous les bots autorisés par défaut)"},
    {"id": "geo-no-llmstxt", "severity": "medium", "title": "llms.txt, llms-full.txt et index.md absents"},
    {"id": "geo-weak-offsite", "severity": "high", "title": "Pas de LinkedIn, YouTube, Reddit ni TikTok liés ; GitHub sans lien retour, compte studio créé le 15/11/2026, 0 abonné"},
    {"id": "geo-thin-passages", "severity": "medium", "title": "Pas de passage autonome « Qui est… », première personne sans nom, projets sans description"},
    {"id": "geo-letter-split-text", "severity": "low", "title": "Texte découpé lettre par lettre et doublé (« p r o j e t s », H1 « authentique authentique »)"}
  ]
}
```
