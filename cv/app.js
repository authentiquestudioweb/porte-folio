import { CONFIG } from "./config.js";
import { hasStarred, hasCommented, userExists, isValidLogin, VerifyError } from "./verify.js";
import { buildCv, fileName, TEMPLATES } from "./templates.js";

const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* navigation privée : on continue sans */ } },
};

/* =====================================================================
   01 · DÉBLOCAGE (étoile + commentaire)
   ===================================================================== */
const { owner, starRepo, commentRepo, commentIssue } = CONFIG;
const needStar = Boolean(starRepo);
const needComment = Boolean(commentRepo && commentIssue);
const configured = needStar || needComment;
const isLocal = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(location.hostname);

$("year").textContent = new Date().getFullYear();
if (CONFIG.portfolioUrl) $("backLink").href = CONFIG.portfolioUrl;

function setupTask(id, linkId, stateId, needed, href, label) {
  const link = $(linkId), state = $(stateId);
  if (needed) { link.href = href; return; }
  link.setAttribute("aria-disabled", "true"); link.classList.add("ghost"); link.style.pointerEvents = "none"; link.style.opacity = "0.45";
  link.removeAttribute("href"); link.textContent = "Bientôt";
  state.textContent = label;
}
setupTask("taskStar", "starLink", "starState", needStar, `https://github.com/${owner}/${starRepo}`, "à venir");
setupTask("taskComment", "commentLink", "commentState", needComment, `https://github.com/${owner}/${commentRepo}/issues/${commentIssue}#issuecomment-new`, "à venir");

const msg = $("verifyMsg");
const say = (text, kind = "") => { msg.textContent = text; msg.className = `msg ${kind}`; };
const mark = (taskId, stateId, ok) => {
  const t = $(taskId);
  t.classList.toggle("ok", ok === true); t.classList.toggle("ko", ok === false);
  $(stateId).textContent = ok === true ? "✓ validé" : ok === false ? "✗ pas trouvé" : "vérification…";
};

function unlock(scroll) {
  $("builder").classList.remove("locked");
  if (scroll) $("builder").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

if (!configured) {
  $("verifyBtn").disabled = true; $("login").disabled = true;
  const note = $("setupNote"); note.hidden = false;
  note.innerHTML = isLocal
    ? "Vérification pas encore configurée : renseigne <code>starRepo</code> et/ou <code>commentRepo</code> + <code>commentIssue</code> dans <code>cv/config.js</code>."
    : "Le générateur ouvre très bientôt. Reviens dans quelques jours !";
  if (isLocal) { $("devBanner").hidden = false; unlock(false); }
} else if (store.get("cv-unlock")?.ok) {
  say(`Déjà débloqué pour @${store.get("cv-unlock").login}.`, "good");
  unlock(false);
}

$("verifyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const login = $("login").value.trim().replace(/^@/, "");
  if (!isValidLogin(login)) { say("Saisis ton pseudo GitHub (lettres, chiffres et tirets).", "bad"); $("login").focus(); return; }
  const btn = $("verifyBtn");
  btn.disabled = true; say("Vérification en cours…");
  if (needStar) mark("taskStar", "starState"); if (needComment) mark("taskComment", "commentState");
  try {
    if (!(await userExists(login))) {
      say("Ce pseudo GitHub n'existe pas. Vérifie l'orthographe.", "bad");
      if (needStar) mark("taskStar", "starState", false); if (needComment) mark("taskComment", "commentState", false);
      return;
    }
    const [starred, commented] = await Promise.all([
      needStar ? hasStarred(owner, starRepo, login) : true,
      needComment ? hasCommented(owner, commentRepo, commentIssue, login) : true,
    ]);
    if (needStar) mark("taskStar", "starState", starred);
    if (needComment) mark("taskComment", "commentState", commented);
    if (starred && commented) {
      store.set("cv-unlock", { ok: true, login });
      say(`Merci @${login} ! Ton générateur est débloqué.`, "good");
      unlock(true);
    } else {
      const missing = [!starred && "l'étoile", !commented && "le commentaire"].filter(Boolean).join(" et ");
      say(`Il manque encore ${missing}. Fais-le sur GitHub avec le compte @${login}, puis reclique sur « Vérifier ».`, "bad");
    }
  } catch (err) {
    if (needStar) mark("taskStar", "starState", undefined); if (needComment) mark("taskComment", "commentState", undefined);
    $("starState").textContent = $("commentState").textContent = "";
    say(err instanceof VerifyError ? err.message : "Une erreur est survenue. Réessaie.", "bad");
  } finally {
    btn.disabled = false;
  }
});

/* =====================================================================
   02 · GÉNÉRATEUR
   ===================================================================== */
const form = $("cvForm");
const frame = $("frame");
const REP = {
  exp: { mount: "repExp", groups: [[["role", "Poste", "Développeur web"], ["org", "Structure", "Allo-Gaz"]], [["period", "Période", "2024 – 2025"]], [["desc", "Description", "Ce que tu y as fait, en 2 ou 3 lignes.", true]]] },
  projects: { mount: "repProjects", groups: [[["name", "Nom", "Mon projet"], ["url", "Lien", "monprojet.com"]], [["desc", "Description", "À quoi sert-il ? Avec quelles technologies ?", true]]] },
  edu: { mount: "repEdu", groups: [[["title", "Diplôme", "Licence en génie logiciel"], ["org", "Établissement", "Université Aube Nouvelle"]], [["period", "Période", "2023 – 2026"]]] },
};
const state = { tpl: TEMPLATES[0].id, photo: "" };

/* modèles */
$("tpls").innerHTML = TEMPLATES.map((t, i) => `<label class="tpl"><input type="radio" name="tpl" value="${t.id}"${i === 0 ? " checked" : ""}><span><b>${t.label}</b><small>${t.hint}</small></span></label>`).join("");

/* listes répétables */
function addEntry(kind, values = {}) {
  const def = REP[kind], mount = $(def.mount);
  const el = document.createElement("div");
  el.className = "entry"; el.dataset.kind = kind;
  el.innerHTML = `<button class="x" type="button" aria-label="Supprimer">×</button>` + def.groups.map((g) =>
    `<div class="${g.length > 1 ? "two" : ""}">${g.map(([k, label, ph, area]) =>
      `<label>${label}${area ? `<textarea data-k="${k}" rows="3" placeholder="${ph}"></textarea>` : `<input data-k="${k}" placeholder="${ph}">`}</label>`).join("")}</div>`).join("");
  el.querySelectorAll("[data-k]").forEach((f) => { f.value = values[f.dataset.k] || ""; });
  mount.appendChild(el);
  return el;
}
document.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => { addEntry(b.dataset.add).querySelector("input,textarea").focus(); }));
form.addEventListener("click", (e) => {
  const x = e.target.closest(".x");
  if (x) { x.closest(".entry").remove(); update(); }
});

const readEntries = (kind) => [...$(REP[kind].mount).querySelectorAll(".entry")].map((el) =>
  Object.fromEntries([...el.querySelectorAll("[data-k]")].map((f) => [f.dataset.k, f.value.trim()])));
const csv = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);

function collect() {
  const f = new FormData(form);
  const g = (k) => String(f.get(k) || "").trim();
  return {
    name: g("name"), title: g("title"), email: g("email"), phone: g("phone"), city: g("city"), summary: g("summary"),
    github: g("github"), linkedin: g("linkedin"), site: g("site"),
    skills: csv(g("skills")), langs: csv(g("langs")),
    exp: readEntries("exp"), projects: readEntries("projects"), edu: readEntries("edu"),
    photo: state.photo, tpl: String(f.get("tpl") || state.tpl),
  };
}

/* exemple affiché tant que le formulaire est vide */
const SAMPLE = {
  name: "Awa Ouédraogo", title: "Développeuse web full stack", email: "awa@exemple.com", phone: "+226 70 00 00 00", city: "Ouagadougou, Burkina Faso",
  summary: "Développeuse curieuse et rigoureuse, j'aime transformer un besoin concret en application simple à utiliser. Je cherche une première expérience en équipe produit.",
  github: "github.com/awa", linkedin: "", site: "", skills: ["JavaScript", "React", "Node", "SQL", "Figma"], langs: ["Français", "Anglais"],
  exp: [{ role: "Stagiaire développeuse", org: "Studio Faso", period: "2025", desc: "Refonte du site vitrine et mise en place d'un formulaire de commande." }],
  projects: [{ name: "Ma boutique", url: "", desc: "Application de gestion de stock pour une boutique de quartier." }],
  edu: [{ title: "Licence en génie logiciel", org: "Université Aube Nouvelle", period: "2023 – 2026" }],
};
const isEmpty = (d) => !d.name && !d.summary && !d.exp.length && !d.projects.length && !d.edu.length && !d.skills.length;

let timer = 0;
function render() {
  const d = collect(); state.tpl = d.tpl;
  const html = buildCv(isEmpty(d) ? SAMPLE : d, d.tpl, { credit: CONFIG.creditUrl });
  frame.srcdoc = html.replace("<head>", '<head><base target="_blank">');
  store.set("cv-draft", d);
}
function update() { clearTimeout(timer); timer = setTimeout(render, 180); }
form.addEventListener("input", update);
form.addEventListener("change", update);

/* photo : recadrée en carré et réduite (reste dans le navigateur) */
const setPhoto = (url) => {
  state.photo = url;
  $("photoPrev").style.backgroundImage = url ? `url(${url})` : "";
  $("photoClear").hidden = !url;
};
$("photo").addEventListener("change", (e) => {
  const file = e.target.files[0]; if (!file) return;
  const img = new Image(), src = URL.createObjectURL(file);
  img.onload = () => {
    const size = Math.min(img.width, img.height), out = 360;
    const c = document.createElement("canvas"); c.width = c.height = out;
    c.getContext("2d").drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, out, out);
    URL.revokeObjectURL(src); setPhoto(c.toDataURL("image/jpeg", 0.85)); update();
  };
  img.onerror = () => URL.revokeObjectURL(src);
  img.src = src; e.target.value = "";
});
$("photoClear").addEventListener("click", () => { setPhoto(""); update(); });

/* export */
const dl = $("dlBtn");
dl.addEventListener("click", () => {
  const d = collect();
  if (!d.name) {
    form.elements.name.focus(); const old = dl.textContent;
    dl.textContent = "Ajoute ton nom d'abord"; setTimeout(() => { dl.textContent = old; }, 2200); return;
  }
  const blob = new Blob([buildCv(d, d.tpl, { credit: CONFIG.creditUrl })], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = fileName(d); document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
});
$("printBtn").addEventListener("click", () => { frame.contentWindow.focus(); frame.contentWindow.print(); });

/* brouillon restauré */
(function restore() {
  const d = store.get("cv-draft");
  if (d) {
    for (const [k, v] of Object.entries(d)) {
      const f = form.elements[k];
      if (f && typeof v === "string" && k !== "photo" && f.type !== "radio" && !f.length) f.value = v;
    }
    form.elements.skills.value = (d.skills || []).join(", "); form.elements.langs.value = (d.langs || []).join(", ");
    for (const kind of Object.keys(REP)) (d[kind] || []).forEach((v) => addEntry(kind, v));
    const r = [...form.querySelectorAll('input[name="tpl"]')].find((x) => x.value === d.tpl); if (r) r.checked = true;
    if (d.photo) setPhoto(d.photo);
  }
  render();
})();
