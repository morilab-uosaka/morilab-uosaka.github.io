/* ==========================================================================
   people.js — students, alumni and presentations.
   --------------------------------------------------------------------------
   You never edit this file. The content lives in:
     data/students.js       who is in the lab (and their awards)
     data/presentations.js  conference talks
   Pages call:
     renderRoster()     members.html   — Students / Alumni tables
     renderStudent()    student.html   — one person's page (?id=…)
     renderTalks()      presentations.html
   ========================================================================== */

const GRADE_LABEL = {
  D: n => [`博士後期課程 ${n}年`, `Doctoral course, year ${n}`],
  M: n => [`博士前期課程 ${n}年`, `Master's course, year ${n}`],
  B: n => [`学部 ${n}年`, `Undergraduate, year ${n}`],
};
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

function esc(s) { return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function students() { return Array.isArray(window.STUDENTS) ? window.STUDENTS : []; }
function talks() { return Array.isArray(window.PRESENTATIONS) ? window.PRESENTATIONS : []; }
function studentUrl(s) { return `student.html?id=${encodeURIComponent(s.id)}`; }

// "中根 晴太" / "○Hareta NAKANE" / "<u>X</u>" → comparable key
function nameKey(s) { return String(s).replace(/<[^>]*>/g, "").replace(/[○\s　.\-‐]/g, "").toLowerCase(); }

/* ---- Talks ------------------------------------------------------------------ */
function splitTalkAuthors(t) {
  return String(t.authors || "").split(/[，,、]/).map(x => x.trim()).filter(Boolean)
    .map(raw => ({ raw, presenter: /^○/.test(raw), name: raw.replace(/^○\s*/, "") }));
}
// Same person? Word order doesn't matter, so "Nyamdash Bolortuya" (family name
// first, as in a Japanese author list) matches "Bolortuya NYAMDASH".
function sortedKey(s) { return String(s).replace(/<[^>]*>/g, "").replace(/○/g, "").split(/[\s　]+/).filter(Boolean).map(nameKey).sort().join(""); }
function sameName(a, b) {
  if (!a || !b) return false;
  return nameKey(a) === nameKey(b) || sortedKey(a) === sortedKey(b);
}
function personForName(name) {
  return students().find(s => sameName(s.ja, name) || sameName(s.en, name));
}
function talkIncludes(t, s) {
  return splitTalkAuthors(t).some(a => sameName(s.ja, a.name) || sameName(s.en, a.name));
}
// Academic year (April – March): 2026-03-18 → 2025, 2025-04-01 → 2025
function academicYear(date) {
  const [y, m] = String(date || "").split("-").map(Number);
  return m >= 4 ? y : y - 1;
}
function formatTalkDate(t) {
  const [y, m, d] = String(t.date || "").split("-").map(Number);
  if (!y) return "";
  if (t.scope === "international") return `${MONTHS_EN[m - 1]} ${d}, ${y}`;
  return `${y}年${m}月${d}日`;
}
// highlight: a student object whose name should be emphasised (student page);
// otherwise lab students' names become links to their pages.
function talkHTML(t, highlight) {
  const intl = t.scope === "international";
  const sep = intl ? ", " : "，";
  const authors = splitTalkAuthors(t).map(a => {
    let n = esc(a.name);
    const p = personForName(a.name);
    if (highlight && p === highlight) n = `<span class="me">${n}</span>`;
    else if (!highlight && p) n = `<a href="${studentUrl(p)}">${n}</a>`;
    if (a.presenter) n = intl ? `<u>${n}</u>` : `○${n}`;
    return n;
  }).join(sep);
  const title = t.url ? `<a href="${esc(t.url)}">${esc(t.title)}</a>` : esc(t.title);
  const parts = [`<b>${title}</b>`, authors, esc(t.event), esc(t.code), formatTalkDate(t), esc(t.place)].filter(Boolean);
  return `<li${intl ? ' lang="en"' : ""}>${parts.join(sep)}</li>`;
}

function renderTalks(elId = "talks") {
  const el = document.getElementById(elId);
  const all = talks().slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
  if (!all.length) { el.innerHTML = `<p class="muted">No presentations yet. Add them in data/presentations.js.</p>`; return; }
  // grouped by academic year (April – March), newest first
  const years = [...new Set(all.map(t => academicYear(t.date)))].sort((a, b) => b - a);
  el.innerHTML = years.map(y => {
    const inY = all.filter(t => academicYear(t.date) === y);
    const dom = inY.filter(t => t.scope !== "international");
    const intl = inY.filter(t => t.scope === "international");
    return `<section id="ay${y}">
      <h2 class="year-head">AY${y}<small>${y}.4 – ${y + 1}.3</small></h2>
      ${dom.length ? `<h3>国内学会 <span class="muted" lang="en">Domestic Conferences</span></h3>
        <ol class="talks">${dom.map(t => talkHTML(t)).join("")}</ol>` : ""}
      ${intl.length ? `<h3>国際学会 <span class="muted" lang="en">International Conferences</span></h3>
        <ol class="talks">${intl.map(t => talkHTML(t)).join("")}</ol>` : ""}
    </section>`;
  }).join("");
}

/* ---- Members page: Students (3 groups) / Alumni table ---------------------- */
const COHORTS = [
  { key: "D", en: "Ph.D. Course",      ja: "博士後期課程" },
  { key: "M", en: "Master Course",      ja: "博士前期課程" },
  { key: "B", en: "Undergraduate", ja: "学部生" },
];
// Japanese name with the English name right under it. linked=false gives the
// same look without a link (for people whose page would still be empty).
function nameBlock(s, linked = true) {
  const main = s.ja || s.en, sub = s.ja ? s.en : "";    // no Japanese name → English name only
  const inner = `<span class="person__ja"${s.ja ? "" : ' lang="en"'}>${esc(main)}</span>` +
                (sub ? `<span class="person__en" lang="en">${esc(sub)}</span>` : "");
  return linked ? `<a class="person" href="${studentUrl(s)}">${inner}</a>`
                : `<span class="person person--plain">${inner}</span>`;
}

/* ---- Does this person have anything to show on their own page? ------------ */
function papersOf(s, bib) {
  const names = [s.en, ...(s.paperNames || [])];
  return (bib || []).filter(p => p.authors.some(a => names.some(n => authorIs(a, n))));
}
function hasRecords(s, bib) {
  return (s.awards || []).length > 0 ||
         talks().some(t => talkIncludes(t, s)) ||
         papersOf(s, bib).length > 0;
}
function yearLabel(y) { return /^\d{4}$/.test(String(y).trim()) ? `${String(y).trim()}年度` : String(y); }
// Names link to a person's page only when it has a publication, presentation
// or award. Talks and awards are known at once; papers once papers.bib has
// loaded, after which the lists are drawn again.
function renderRoster() {
  drawRoster(null);
  if (typeof loadBib === "function") loadBib().then(bib => drawRoster(bib)).catch(() => {});
}
function drawRoster(bib) {
  const linked = s => hasRecords(s, bib);
  const cur = students().filter(s => !s.alumni);
  const alu = students().filter(s => s.alumni);
  const gEl = document.getElementById("students-groups");
  if (gEl) {
    const groups = COHORTS.map(c => ({ ...c, people: cur.filter(s => String(s.grade || "").startsWith(c.key)) }));
    const others = cur.filter(s => !COHORTS.some(c => String(s.grade || "").startsWith(c.key)));
    if (others.length) groups.push({ key: "other", en: "Others", ja: "その他", people: others });
    gEl.innerHTML = groups.filter(g => g.people.length).map(g => `
      <section class="cohort">
        <h3>${g.en}<small>${g.ja}</small></h3>
        <ul>${g.people.map(s => `
          <li class="roster-item"><span class="badge">${esc(s.grade || "")}</span>${nameBlock(s, linked(s))}</li>`).join("")}
        </ul>
      </section>`).join("");
  }
  const aEl = document.getElementById("alumni-groups");
  if (aEl) {
    // one block per year they left, newest first; inside it, people flow in a grid
    const years = [...new Set(alu.map(s => String(s.alumni)))]
      .sort((a, b) => (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0));
    aEl.innerHTML = years.map(y => `
      <section class="alumni-year">
        <h3>${esc(yearLabel(y))}</h3>
        <ul class="alumni-grid">${alu.filter(s => String(s.alumni) === y).map(s => `
          <li class="roster-item">${nameBlock(s, linked(s))}
            <span class="person__meta">${[s.degree || s.note, s.period].filter(Boolean).map(esc).join("<br>")}</span></li>`).join("")}
        </ul>
      </section>`).join("");
  }
}

/* ---- One student's page ----------------------------------------------------- */
function gradeText(s) {
  if (s.alumni) return [`卒業生（${yearLabel(s.alumni)}）`, "Alumni"];
  const m = /^([DMB])(\d)$/.exec(s.grade || "");
  if (m && GRADE_LABEL[m[1]]) return GRADE_LABEL[m[1]](m[2]);
  return [s.grade || "", ""];
}
// does a parsed bib author ({first,last}) match "Given FAMILY"?
function authorIs(a, en) {
  const parts = String(en).trim().split(/\s+/);
  if (parts.length < 2) return false;
  const fam = parts.pop(), giv = parts.join(" ");
  const n = x => String(x || "").toLowerCase().replace(/[^a-z]/g, "");
  return n(a.last) === n(fam) && n(a.first) === n(giv);
}

function renderStudent() {
  const id = new URLSearchParams(location.search).get("id") || "";
  const s = students().find(x => x.id === id);
  const head = document.getElementById("student-head");
  if (!s) {
    head.innerHTML = `<h1>Not found</h1><p class="muted">「${esc(id)}」というメンバーは見つかりませんでした．
      There is no member with this address. <a href="members.html#students">See all members</a>.</p>`;
    return;
  }
  document.title = `${s.ja || s.en} | Mori Lab @UOsaka`;
  const [gJa, gEn] = gradeText(s);
  head.innerHTML = `
    <p class="student-head__grade">${s.alumni ? "" : `<span class="badge">${esc(s.grade)}</span>`}${esc(gJa)}${gEn ? `<span lang="en">${esc(gEn)}</span>` : ""}</p>
    <h1${s.ja ? "" : ' lang="en"'}>${esc(s.ja || s.en)}</h1>
    ${s.ja ? `<p class="lead" lang="en">${esc(s.en)}</p>` : ""}
    ${s.alumni && (s.degree || s.note || s.period) ? `<p class="muted">${[s.degree || s.note, s.period && `在学期間 ${s.period}`].filter(Boolean).map(esc).join("<br>")}</p>` : ""}
    ${s.theme ? `<p class="student-head__theme">${esc(s.theme)}</p>` : ""}`;

  // awards
  const aw = (s.awards || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  showSection("sec-awards", aw.length, () => {
    document.getElementById("stu-awards").innerHTML = aw.map(a => `
      <li><time datetime="${esc(a.date)}">${esc(String(a.date).replace(/-/g, "."))}</time>
          <span><b>${esc(a.title)}</b>${a.event ? `<br><span class="muted">${esc(a.event)}</span>` : ""}</span></li>`).join("");
  });

  // presentations (newest first)
  const tk = talks().filter(t => talkIncludes(t, s)).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  showSection("sec-talks", tk.length, () => {
    document.getElementById("stu-talks").innerHTML = tk.map(t => talkHTML(t, s)).join("");
  });

  // publications (from papers.bib, via pubs.js)
  const names = [s.en, ...(s.paperNames || [])];
  const pubEl = document.getElementById("stu-pubs");
  wireList(pubEl);
  loadBib().then(all => {
    const mine = papersOf(s, all);
    showSection("sec-pubs", mine.length, () => {
      // highlight this student in the author lists, too
      LAB_MEMBERS.push(...names.map(n => { const q = n.trim().split(/\s+/); const last = q.pop(); return { last, first: q.join(" ") }; }));
      pubEl.innerHTML = mine.map(pubHTML).join("");
      observeBadges(pubEl);
    });
    if (!mine.length && !tk.length && !aw.length) document.getElementById("stu-empty").hidden = false;
  }).catch(() => {
    if (!tk.length && !aw.length) document.getElementById("stu-empty").hidden = false;
  });
}
function showSection(id, n, fill) {
  const sec = document.getElementById(id);
  if (!sec) return;
  sec.hidden = !n;
  if (n) fill();
}
