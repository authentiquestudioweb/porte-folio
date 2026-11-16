/* Vérification via l'API publique de GitHub — aucun jeton, aucun serveur.
   (Limite GitHub : 60 requêtes/heure par visiteur, largement suffisant.) */
const API = "https://api.github.com";
const MAX_PAGES = 10; /* jusqu'à 1000 commentaires parcourus */
const LOGIN_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export class VerifyError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

async function gh(path) {
  let res;
  try {
    res = await fetch(API + path, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" });
  } catch {
    throw new VerifyError("NETWORK", "Impossible de joindre GitHub. Vérifie ta connexion et réessaie.");
  }
  if (res.status === 403 || res.status === 429) {
    throw new VerifyError("RATE", "GitHub limite le nombre de vérifications. Réessaie dans quelques minutes.");
  }
  return res;
}

export const isValidLogin = (login) => LOGIN_RE.test(login);

export async function userExists(login) {
  const res = await gh(`/users/${encodeURIComponent(login)}`);
  if (res.status === 404) return false;
  if (!res.ok) throw new VerifyError("API", "GitHub a répondu une erreur inattendue.");
  return true;
}

/* parcourt les pages d'une liste jusqu'à trouver un élément qui satisfait `match` */
async function scan(path, match, maxPages) {
  for (let page = 1; page <= maxPages; page += 1) {
    const res = await gh(`${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`);
    if (res.status === 404) throw new VerifyError("NOTFOUND", "Le dépôt ou l'issue est introuvable (vérifie cv/config.js).");
    if (!res.ok) throw new VerifyError("API", "GitHub a répondu une erreur inattendue.");
    const list = await res.json();
    if (list.some(match)) return true;
    if (list.length < 100) return false;
  }
  return false;
}

/* Étoile : GitHub n'autorise plus la liste publique des « stargazers » d'un dépôt sans jeton,
   donc on lit à la place les étoiles récentes du visiteur (les plus récentes d'abord :
   quelqu'un qui vient de mettre une étoile la retrouve dès la 1re page). */
export const hasStarred = (owner, repo, login) => {
  const want = `${owner}/${repo}`.toLowerCase();
  return scan(`/users/${encodeURIComponent(login)}/starred?sort=created&direction=desc`, (r) => (r.full_name || "").toLowerCase() === want, 5);
};

export const hasCommented = (owner, repo, issue, login) => {
  const want = login.toLowerCase();
  return scan(`/repos/${owner}/${repo}/issues/${issue}/comments`, (c) => (c.user?.login || "").toLowerCase() === want, MAX_PAGES);
};
