# Audit technique SEO - https://authentique.is-a.dev/

Score technique : **38/100**

| Catégorie | Statut |
|---|---|
| Crawlabilité | Échec (pas de robots.txt ni sitemap) |
| Indexabilité | Échec partiel (pas de canonical, H1 vide, contenu JS) |
| Sécurité | Partiel (HSTS seul) |
| Structure URL / redirections | Réussite |
| Mobile | Réussite (viewport OK) |
| Core Web Vitals (potentiel) | Risque élevé |
| Données structurées | Échec (aucune) |
| Rendu JS | Échec partiel |

Note : le rendu n'a pas été relancé. Les chiffres de rendu viennent des fichiers JSON déjà produits.

## Critique
1. **robots.txt et sitemap.xml absents (404).** Vercel renvoie un 404 texte brut. Fix : créer `/robots.txt` avec `User-agent: *`, `Allow: /` et `Sitemap: https://authentique.is-a.dev/sitemap.xml`. Créer `/sitemap.xml` avec `/` et `/cv/` (ou `<noindex>` sur /cv/ et ne lister que `/`). Soumettre ensuite dans Search Console.
2. **Aucun canonical** (`index.html` l.4-16 : seuls charset, viewport, title, description). Fix : `<link rel="canonical" href="https://authentique.is-a.dev/">` dans le head. Sur `/cv/` : `<link rel="canonical" href="https://authentique.is-a.dev/cv/">`.
3. **H1 vide dans le HTML brut** (l.601 : `<h1 class="hero-name"><span class="rv" ... data-text="authentique"></span></h1>`). Le texte n'est injecté que par JS. Fix : mettre le texte dans le HTML (`<span ...>Authentique</span>`, ou un `<span class="sr-only">Authentique - Emmanuel Baguemzanre</span>` si l'effet de révélation le remplace), et laisser le JS animer à partir de là.

## Élevée
4. **Contenu critique injecté par JS** : timeline (l.3325), projets (l.3438) et footer/contact (l.3499) viennent de `mount.innerHTML`. Cela représente 57 % des mots et 9 liens sur 16. Fix : écrire ces sections en HTML statique dans `index.html` et laisser le JS ne faire que l'enrichissement. Sinon, prérendre au build.
5. **Images en `data-asset` sans `src`** (par ex. l.589, 603). Elles n'ont pas de `src` dans le HTML brut, donc aucune image n'est indexable et il n'y a pas de LCP précoce. Fix : mettre un vrai `src` et un `alt` pertinent. Les `alt=""` des images décoratives (l.575-576) sont corrects.
6. **Pas de balises Open Graph, Twitter, favicon ni JSON-LD.** Fix :
   - `og:title`, `og:description`, `og:image` (1200x630), `og:url`, `og:type=website`, `og:locale=fr_FR` et `twitter:card=summary_large_image` ;
   - `<link rel="icon" href="/favicon.ico">` et `apple-touch-icon` ;
   - un JSON-LD `Person` (name, jobTitle, url, address Ouagadougou, sameAs vers GitHub/LinkedIn) et `Organization` pour Authentique Studio.
7. **Pas de CSP ni d'en-têtes de sécurité.** Observé sur `/` : seul `strict-transport-security: max-age=63072000` est présent. Manquent :
   - `Content-Security-Policy` ;
   - `X-Content-Type-Options` ;
   - `Referrer-Policy` ;
   - `Permissions-Policy` ;
   - `X-Frame-Options` / `frame-ancestors`.
   Fix : créer `vercel.json` (aucun n'existe dans le projet) :
   ```json
   {"headers":[{"source":"/(.*)","headers":[
   {"key":"X-Content-Type-Options","value":"nosniff"},
   {"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"},
   {"key":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=()"},
   {"key":"X-Frame-Options","value":"DENY"},
   {"key":"Content-Security-Policy","value":"default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://cdn.jsdelivr.net; worker-src blob:"}]}]}
   ```
   Tester la CSP en `Content-Security-Policy-Report-Only` d'abord, car le JS inline, Three.js et Draco peuvent exiger d'autres sources.
   HSTS : ajouter `includeSubDomains; preload` seulement si c'est voulu.
8. **Performance / Core Web Vitals (risque).**
   - HTML de 274 KB (54 KB de CSS inline, 162 KB de JS inline, non cacheable séparément).
   - Three.js, Lenis et le décodeur Draco viennent de jsdelivr (importmap l.8-13, l.740). Cela ajoute une dépendance tierce bloquante.
   - Les polices Google (l.17-19) passent par une feuille de style bloquante.
   - LCP : le H1 et les images n'apparaissent qu'après JS, donc le LCP risque de dépasser 4 s sur mobile.
   - CLS : les contenus injectés (timeline, projets) peuvent décaler la mise en page.
   - INP : le JS de 162 KB et le rendu WebGL peuvent charger le thread principal.
   Fix :
   - sortir le JS et le CSS en fichiers versionnés avec cache long ;
   - héberger Three/Lenis en local ou sous un hash `integrity` ;
   - utiliser `font-display:swap` et `preload` sur la police principale ;
   - réserver l'espace (width/height) pour le contenu injecté ;
   - charger la scène 3D après le premier rendu, avec une image de secours (`hero-fallback`, l.575) déjà dans le HTML.
   Mesurer ensuite avec PageSpeed Insights et CrUX.

## Moyenne
9. **Page `/cv/` : indexable mais faible, et sans canonical ni OG.**
   - Statut 200, `lang="fr"`, viewport présent, pas de noindex.
   - Title : « CV gratuit - Authentique » (court, générique). Description présente.
   - H1 unique « Un CV en HTML, prêt à publier. » (l.22). Contenu mince : 7,5 KB.
   - Les liens `#starLink` et `#commentLink` (l.34, 40) ont `href="#"` et sont remplis par JS.
   - Le lien de retour pointe vers `../index.html` (l.15), ce qui crée une URL dupliquée `/index.html`.
   - Les assets (`style.css`, `app.js`) sont relatifs : cela fonctionne sur `/cv/` mais pas sur `/cv` sans slash. Vérifier que Vercel redirige bien vers `/cv/`.
   Fix : title « CV HTML gratuit pour développeur - Authentique Studio », canonical vers `/cv/`, lien de retour vers `/`. Si la page ne sert que de lead magnet, mettre `<meta name="robots" content="noindex,follow">` et la retirer du sitemap.
10. **Gestion du 404.** `/nope-xyz` renvoie bien un statut 404 (bon signal pour les soft-404), mais en `text/plain` brut de 79 octets, sans page de marque ni lien de retour. Fix : créer `404.html` à la racine (Vercel le sert automatiquement) avec un lien vers `/` et un `noindex`.
11. **Menu : le lien « CV gratuit » (l.593) est `cv/`** (relatif). Il est correct depuis `/`, mais préférer `/cv/` en absolu. Le logo (l.589) pointe vers `/`, ce qui est correct.
12. **En-tête de cache** : `cache-control: public, max-age=0, must-revalidate` sur le HTML. C'est correct, mais les assets statiques (`/assets/`) devraient avoir un cache long et immuable via `vercel.json` (`Cache-Control: public, max-age=31536000, immutable` pour les fichiers versionnés).

## Faible
13. **`access-control-allow-origin: *`** sur le HTML : sans risque pour du contenu public, mais inutile.
14. **Ancres de navigation** : `#main`, `#season`, `#timeline`, `#paddock`, `#footer` existent bien (l.568, 644, 3325, 3438, 3499). Mais `#timeline`, `#paddock` et `#footer` n'existent qu'après exécution du JS. Sans JS, ces liens du menu ne mènent nulle part. Ils sont corrigés par le fix n°4.
15. **hreflang : inutile.** Le site est monolingue (français) avec `<html lang="fr">` (l.2). Aucun hreflang n'est requis. Option : `hreflang="fr"` + `x-default` auto-référencés, sans valeur réelle.
16. **Ordre des titres et `title`** : le title de l'accueil est correct (« Authentique - Emmanuel Baguemzanre, développeur full stack »). Il fait moins de 60 caractères. Ajouter « Ouagadougou » ou « Burkina Faso » dans la description si le ciblage local est voulu.

## Points validés
- HTTPS en place ; HTTP renvoie un 308 vers HTTPS en un seul saut. Aucune chaîne de redirection.
- `www.authentique.is-a.dev` ne se résout pas en DNS (sous-domaine d'is-a.dev, non configuré). Il n'y a pas de duplication www, rien à faire sauf si on le souhaite.
- HSTS présent (`max-age=63072000`, soit 2 ans).
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` (l.5) : OK. Aucune restriction de zoom.
- `lang="fr"`, charset utf-8, title et meta description présents sur `/` et `/cv/`.
- Structure d'URL propre : page unique plus `/cv/`, sans paramètres.
- Pas de `noindex` : le site n'est pas indexé (`site:` = 0 résultat) par absence de signaux et de liens, pas par blocage.

## Ordre de correction recommandé
1. robots.txt, sitemap.xml et canonical.
2. H1 et contenu en HTML statique (timeline, projets, contact).
3. OG, favicon et JSON-LD.
4. `vercel.json` avec en-têtes de sécurité, et page 404.
5. Optimisation perf (JS externe, CDN local, polices).
6. Soumission dans Google Search Console, et des liens entrants (GitHub, LinkedIn, is-a.dev) pour déclencher l'exploration.
