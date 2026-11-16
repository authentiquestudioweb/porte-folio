/* Génère un CV complet : un seul fichier HTML, styles intégrés, sans dépendance. */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const multiline = (s) => esc(s).replace(/\n/g, "<br>");
const safeUrl = (u) => {
  u = String(u || "").trim();
  if (!u) return "";
  if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
  if (/^[\w-]+(\.[\w-]+)+(\/|$)/.test(u)) return `https://${u}`;
  return "";
};
const shown = (u) => String(u).replace(/^(https?:\/\/|mailto:|tel:)/i, "").replace(/\/$/, "");
const slug = (s) => String(s || "cv").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cv";

export const TEMPLATES = [
  { id: "sobre", label: "Sobre", hint: "Clair, classique, très lisible" },
  { id: "moderne", label: "Moderne", hint: "Bandeau coloré, colonne latérale" },
  { id: "sombre", label: "Sombre", hint: "Fond noir et accent cyan" },
];

const CSS = `
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font:15px/1.55 "Space Grotesk",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--fg)}
a{color:inherit}
.page{max-width:880px;margin:0 auto;background:var(--paper);min-height:100vh}
.hd{display:flex;gap:26px;align-items:center;padding:42px 44px 30px;background:var(--hd-bg);color:var(--hd-fg);border-bottom:var(--hd-line)}
.hd img{width:116px;height:116px;object-fit:cover;border-radius:var(--ph-r);flex:none}
h1{margin:0;font-family:var(--font-h);font-size:var(--h1);line-height:1.02;letter-spacing:-.02em;text-transform:var(--h1-case);font-weight:700}
.role{margin-top:8px;color:var(--role);font-weight:600;font-size:18px}
.meta{display:flex;flex-wrap:wrap;gap:4px 18px;margin:12px 0 0;padding:0;list-style:none;font-size:13.5px;opacity:.92}
.cols{display:grid;grid-template-columns:2.2fr 1fr;gap:36px;padding:30px 44px 46px}
.side{background:var(--side-bg);padding:var(--side-pad);margin:var(--side-margin)}
h2{margin:0 0 12px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:700}
section{margin:0 0 26px}
.item{margin:0 0 16px}
.item b{display:block;font-size:16px}
.sub{color:var(--muted);font-size:13.5px}
.item p{margin:5px 0 0}
.tags{display:flex;flex-wrap:wrap;gap:7px;margin:0;padding:0;list-style:none}
.tags li{border:1px solid var(--line);padding:3px 10px;font-size:13.5px;border-radius:var(--tag-r)}
.links{margin:0;padding:0;list-style:none;font-size:14px;word-break:break-word}
.links li{margin:0 0 6px}
.links span{display:block;color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.08em}
.credit{margin:0;padding:0 44px 28px;font-size:12px;color:var(--muted)}
@media(max-width:700px){.hd{flex-direction:column;align-items:flex-start;padding:28px 22px}.cols{grid-template-columns:1fr;padding:22px;gap:6px}.side{margin:0}.credit{padding:0 22px 22px}}
@media print{body{background:var(--paper)}.page{max-width:none;min-height:0}.cols{padding-bottom:20px}}
`;

const THEMES = {
  sobre: `:root{--bg:#e8ebef;--paper:#fff;--fg:#1a1d24;--muted:#5a6270;--line:#d3d8df;--accent:#1d4ed8;--role:#1d4ed8;--hd-bg:#fff;--hd-fg:#1a1d24;--hd-line:2px solid #1a1d24;--ph-r:50%;--tag-r:99px;--font-h:inherit;--h1:36px;--h1-case:none;--side-bg:transparent;--side-pad:0;--side-margin:0}`,
  moderne: `:root{--bg:#e3eeee;--paper:#fff;--fg:#17202a;--muted:#5b6770;--line:#cfe0e0;--accent:#0f766e;--role:#c8f5ee;--hd-bg:#0f766e;--hd-fg:#fff;--hd-line:0;--ph-r:18px;--tag-r:6px;--font-h:inherit;--h1:38px;--h1-case:none;--side-bg:transparent;--side-pad:0;--side-margin:0}`,
  sombre: `:root{--bg:#090a0b;--paper:#0e0f14;--fg:#fff;--muted:#b6c1c8;--line:#2a2d36;--accent:#02d2e3;--role:#02d2e3;--hd-bg:#0e0f14;--hd-fg:#fff;--hd-line:1px solid #2a2d36;--ph-r:0;--tag-r:0;--font-h:"Oswald",Impact,sans-serif;--h1:46px;--h1-case:uppercase;--side-bg:transparent;--side-pad:0;--side-margin:0}`,
};

const EXTRA = {
  sobre: "",
  moderne: `.cols{grid-template-columns:1fr 2.2fr;padding-top:0;padding-bottom:0;gap:0}
.side{order:-1;padding:30px 26px 46px 0;border-right:1px solid var(--line);margin-right:34px}
.main{padding:30px 0 46px}
@media(max-width:700px){.cols{grid-template-columns:1fr}.side{border:0;margin:0;padding:22px 0 0}.main{padding:10px 0 22px}}`,
  sombre: `.hd img{border:1px solid var(--accent)}
.item b{font-family:"Oswald",sans-serif;font-weight:500;letter-spacing:.01em;text-transform:uppercase;font-size:17px}`,
};

export function buildCv(d, tplId = "sobre", { credit = "" } = {}) {
  const tpl = THEMES[tplId] ? tplId : "sobre";
  const name = d.name?.trim() || "Votre nom";
  const url = (u) => safeUrl(u);

  const contact = [
    d.city && esc(d.city),
    d.email && `<a href="mailto:${esc(d.email)}">${esc(d.email)}</a>`,
    d.phone && `<a href="tel:${esc(d.phone.replace(/\s+/g, ""))}">${esc(d.phone)}</a>`,
  ].filter(Boolean);

  const links = [["GitHub", d.github], ["LinkedIn", d.linkedin], ["Site web", d.site]]
    .map(([label, v]) => [label, url(v)]).filter(([, v]) => v);

  const list = (arr) => (arr || []).filter(Boolean);
  const skills = list(d.skills), langs = list(d.langs);
  const exp = (d.exp || []).filter((e) => e.role || e.org || e.desc);
  const edu = (d.edu || []).filter((e) => e.title || e.org);
  const projects = (d.projects || []).filter((p) => p.name || p.desc);

  const itemHtml = (title, sub, desc) => `<div class="item"><b>${esc(title)}</b>${sub ? `<span class="sub">${esc(sub)}</span>` : ""}${desc ? `<p>${multiline(desc)}</p>` : ""}</div>`;

  const main = [
    d.summary?.trim() && `<section><h2>Profil</h2><p>${multiline(d.summary.trim())}</p></section>`,
    exp.length && `<section><h2>Expériences</h2>${exp.map((e) => itemHtml(e.role || e.org, [e.role ? e.org : "", e.period].filter(Boolean).join(" · "), e.desc)).join("")}</section>`,
    projects.length && `<section><h2>Projets</h2>${projects.map((p) => {
      const u = url(p.url);
      const title = u ? `<a href="${esc(u)}" rel="noopener">${esc(p.name || shown(u))}</a>` : esc(p.name);
      return `<div class="item"><b>${title}</b>${u ? `<span class="sub">${esc(shown(u))}</span>` : ""}${p.desc ? `<p>${multiline(p.desc)}</p>` : ""}</div>`;
    }).join("")}</section>`,
    edu.length && `<section><h2>Formation</h2>${edu.map((e) => itemHtml(e.title || e.org, [e.title ? e.org : "", e.period].filter(Boolean).join(" · "), "")).join("")}</section>`,
  ].filter(Boolean).join("");

  const side = [
    skills.length && `<section><h2>Compétences</h2><ul class="tags">${skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>`,
    langs.length && `<section><h2>Langues</h2><ul class="tags">${langs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>`,
    links.length && `<section><h2>Liens</h2><ul class="links">${links.map(([l, v]) => `<li><span>${l}</span><a href="${esc(v)}" rel="noopener">${esc(shown(v))}</a></li>`).join("")}</ul></section>`,
  ].filter(Boolean).join("");

  const creditHtml = credit ? `<p class="credit">CV créé avec <a href="${esc(credit)}" rel="noopener">Authentique</a></p>` : "";

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(name)}${d.title ? ` — ${esc(d.title)}` : ""}</title>
<meta name="description" content="${esc(d.title ? `${name}, ${d.title}` : name)}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Space+Grotesk:wght@400;500;700&display=swap">
<style>${THEMES[tpl]}${CSS}${EXTRA[tpl]}</style>
</head>
<body>
<div class="page">
<header class="hd">
${d.photo ? `<img src="${d.photo}" alt="Photo de ${esc(name)}">` : ""}
<div>
<h1>${esc(name)}</h1>
${d.title ? `<div class="role">${esc(d.title)}</div>` : ""}
${contact.length ? `<ul class="meta">${contact.map((c) => `<li>${c}</li>`).join("")}</ul>` : ""}
</div>
</header>
<div class="cols">
<main class="main">${main || `<section><p class="sub">Remplis le formulaire pour voir ton CV apparaître ici.</p></section>`}</main>
<aside class="side">${side}</aside>
</div>
${creditHtml}
</div>
</body>
</html>`;
}

export const fileName = (d) => `cv-${slug(d.name)}.html`;
