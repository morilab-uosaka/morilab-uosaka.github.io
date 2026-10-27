/* ==========================================================================
   pubs.js — reads data/papers.bib and draws the publication pages.
   --------------------------------------------------------------------------
   You normally never edit this file. To add a paper, add an entry to
   data/papers.bib (see GUIDE.md §6.4). The pages call:
     renderPublications({ types: [...] })   publications / papers / reviews
     renderCovers()                         covers.html
     renderSelected(["key1", "key2"])       a short hand-picked list (mori.html)
   ========================================================================== */

/* ---- Settings ------------------------------------------------------------ */
// Bump ?v= here together with the rest of the site whenever papers.bib changes.
const BIB_FILE = "data/papers.bib?v=21";

// Lab members whose names are highlighted in author lists.
// "first" is matched by its initial, so "Mori, T." also counts.
const LAB_MEMBERS = [
  { last: "Mori",   first: "Tadashi" },
  { last: "Tsunoi", first: "Shinji" },
  { last: "Wang",   first: "Zhe" },
];

// Bib fields that are only for this website and are hidden in the BIB panel.
const SITE_ONLY_FIELDS = ["bibtex_show", "preview", "tab", "dimensions", "altmetric",
  "abstract", "cover", "selected", "abbr", "pdf", "supp", "html", "code"];

const PREVIEW_DIR = "assets/img/publication_preview/";
const COVER_DIR = "assets/img/covers/";

/* ---- Loading -------------------------------------------------------------- */
let _bibPromise = null;
function loadBib() {
  if (!_bibPromise) {
    _bibPromise = fetch(siteUrl(BIB_FILE))
      .then(r => { if (!r.ok) throw new Error(`Could not load ${BIB_FILE} (HTTP ${r.status}).`); return r.text(); })
      .then(text => {
        const entries = parseBib(text);
        // Sanity check: every "@type{key," in the file should have become an entry.
        // If not, an entry above the missing one usually has an unbalanced { }.
        const declared = [...text.matchAll(/^\s*@\s*([A-Za-z]+)\s*\{\s*([^,\s]+)\s*,/gm)]
          .filter(m => !/^(comment|preamble|string)$/i.test(m[1])).map(m => m[2]);
        const got = new Set(entries.map(e => e.key));
        const lost = declared.filter(k => !got.has(k));
        if (lost.length) console.warn(`papers.bib: ${lost.length} entr${lost.length > 1 ? "ies were" : "y was"} swallowed — check the braces in the entry just ABOVE:`, lost);
        return entries.map(toPub).sort(byDate);
      });
  }
  return _bibPromise;
}

/* ---- A small BibTeX parser ------------------------------------------------
   Handles  field={...}  field="..."  field=123 , nested braces, @comment. */
function parseBib(text) {
  const out = [];
  const n = text.length;
  let i = 0;
  while (i < n) {
    const at = text.indexOf("@", i);
    if (at < 0) break;
    const head = /^@\s*([A-Za-z]+)\s*[{(]/.exec(text.slice(at, at + 60));
    if (!head) { i = at + 1; continue; }
    const type = head[1].toLowerCase();
    let p = at + head[0].length;
    if (type === "comment" || type === "preamble" || type === "string") {
      p = skipBalanced(text, p - 1); i = p; continue;
    }
    const comma = text.indexOf(",", p);
    if (comma < 0) break;
    const key = text.slice(p, comma).trim();
    p = comma + 1;
    const fields = {};
    while (p < n) {
      while (p < n && /[\s,]/.test(text[p])) p++;
      if (p >= n) break;
      if (text[p] === "}" || text[p] === ")") { p++; break; }
      const fm = /^([A-Za-z0-9_\-:.]+)\s*=\s*/.exec(text.slice(p, p + 80));
      if (!fm) {                                   // malformed line: skip it
        console.warn(`papers.bib: could not read a field in "${key}" near:`, text.slice(p, p + 40));
        const nl = text.indexOf("\n", p); p = nl < 0 ? n : nl + 1; continue;
      }
      const name = fm[1].toLowerCase();
      p += fm[0].length;
      let val = "";
      if (text[p] === "{") {
        const end = skipBalanced(text, p);
        val = text.slice(p + 1, end - 1); p = end;
      } else if (text[p] === '"') {
        let d = 0, s = ++p;
        for (; p < n; p++) {
          if (text[p] === "{") d++;
          else if (text[p] === "}") d--;
          else if (text[p] === '"' && d === 0) break;
        }
        val = text.slice(s, p); p++;
      } else {
        const vm = /^[^,}\s]+/.exec(text.slice(p, p + 200));
        val = vm ? vm[0] : ""; p += val.length;
      }
      fields[name] = val.replace(/\s+/g, " ").trim();
    }
    out.push({ type, key, fields });
    i = p;
  }
  return out;
}
function skipBalanced(text, p) {           // p points at an opening { or (
  const open = text[p], close = open === "(" ? ")" : "}";
  let d = 0;
  for (; p < text.length; p++) {
    if (text[p] === "\\") { p++; continue; }
    if (text[p] === open) d++;
    else if (text[p] === close) { d--; if (d === 0) return p + 1; }
  }
  return text.length;
}

/* ---- Text clean-up (a little LaTeX → readable HTML) ----------------------- */
const GREEK = { alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", kappa: "κ", lambda: "λ",
  mu: "μ", nu: "ν", pi: "π", sigma: "σ", tau: "τ", phi: "φ", chi: "χ", omega: "ω", Delta: "Δ", Sigma: "Σ", Omega: "Ω" };
function escapeHTML(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function tex(s) {
  if (!s) return "";
  return escapeHTML(s)
    .replace(/\\(alpha|beta|gamma|delta|epsilon|kappa|lambda|mu|nu|pi|sigma|tau|phi|chi|omega|Delta|Sigma|Omega)\b/g, (m, g) => GREEK[g])
    .replace(/\\textsuperscript\{([^}]*)\}|\^\{([^}]*)\}/g, (m, a, b) => `<sup>${a || b}</sup>`)
    .replace(/\\textsubscript\{([^}]*)\}|_\{([^}]*)\}/g, (m, a, b) => `<sub>${a || b}</sub>`)
    .replace(/\\textit\{([^}]*)\}|\\emph\{([^}]*)\}/g, (m, a, b) => `<i>${a || b}</i>`)
    .replace(/\\textbf\{([^}]*)\}/g, "<b>$1</b>")
    .replace(/\$([^$]*)\$/g, "$1")
    .replace(/---/g, "—").replace(/--/g, "–")
    .replace(/\\([&%$#_])/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ").trim();
}

/* ---- Authors -------------------------------------------------------------- */
function splitAuthors(s) {
  const out = []; let d = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "{") d++; else if (s[i] === "}") d--;
    else if (d === 0 && s.slice(i, i + 5).toLowerCase() === " and ") { out.push(s.slice(start, i)); start = i + 5; i += 4; }
  }
  out.push(s.slice(start));
  return out.map(a => a.trim()).filter(Boolean);
}
function parseName(raw) {
  const corr = raw.includes("*");
  const s = raw.replace(/\*/g, "").replace(/[{}]/g, "").trim();
  if (s.toLowerCase() === "others") return { others: true };
  let first = "", last = "";
  if (s.includes(",")) { [last, first] = s.split(",").map(x => x.trim()); }
  else { const parts = s.split(/\s+/); last = parts.pop(); first = parts.join(" "); }
  return { first, last, corr };
}
function isMember(a) {
  return LAB_MEMBERS.some(m => m.last.toLowerCase() === (a.last || "").toLowerCase() &&
    (a.first || "").trim().charAt(0).toUpperCase() === m.first.charAt(0).toUpperCase());
}
function authorsHTML(list) {
  return list.map(a => {
    if (a.others) return "et al.";
    const name = tex(`${a.first} ${a.last}`.trim());
    const star = a.corr ? "<sup>*</sup>" : "";
    return isMember(a) ? `<span class="me">${name}</span>${star}` : `${name}${star}`;
  }).join(", ");
}

/* ---- Entry → publication object ------------------------------------------ */
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function monthNum(m) {
  if (!m) return 0;
  if (/^\d+$/.test(m)) return +m;
  const k = MONTHS.indexOf(m.slice(0, 3).toLowerCase());
  return k + 1;
}
function toPub(e, order) {
  const f = e.fields;
  const authors = splitAuthors(f.author || "").map(parseName);
  const doi = (f.doi || "").trim();
  return {
    key: e.key,
    order,
    kind: (f.tab || "").toLowerCase() || "other",       // paper | review | other
    year: parseInt(f.year, 10) || 0,
    month: monthNum(f.month),
    title: tex(f.title),
    authors,
    journal: tex(f.journal || f.booktitle || f.publisher || ""),
    volume: tex(f.volume), number: tex(f.number || f.issue), pages: tex(f.pages),
    doi,
    url: f.url || (doi ? `https://doi.org/${doi}` : ""),
    abstract: tex(f.abstract),
    preview: f.preview ? (/^https?:/.test(f.preview) ? f.preview : siteUrl(PREVIEW_DIR + f.preview)) : "",
    cover: f.cover ? (/^https?:/.test(f.cover) ? f.cover : siteUrl(COVER_DIR + f.cover)) : "",
    links: { PDF: f.pdf, HTML: f.html, SI: f.supp, CODE: f.code },
    badges: (f.dimensions || "").toLowerCase() === "true" || (f.altmetric || "").toLowerCase() === "true",
    bibtex: cleanBibtex(e),
    search: [e.key, f.title, f.author, f.journal, f.year].join(" ").replace(/[{}*]/g, "").toLowerCase(),
  };
}
function byDate(a, b) { return (b.year - a.year) || (b.month - a.month) || (a.order - b.order); }

function cleanBibtex(e) {
  const lines = Object.entries(e.fields)
    .filter(([k, v]) => !SITE_ONLY_FIELDS.includes(k) && v !== "")
    .map(([k, v]) => `  ${k} = {${k === "author" ? v.replace(/\*/g, "") : v}}`);
  return `@${e.type}{${e.key},\n${lines.join(",\n")}\n}`;
}

/* ---- Rendering one publication ------------------------------------------- */
function venueHTML(p) {
  const bits = [];
  let first = p.journal ? `<i>${p.journal}</i>` : "";
  if (p.year) first += ` <b>${p.year}</b>`;
  if (first) bits.push(first.trim());
  if (p.volume) bits.push(`<i>${p.volume}</i>`);
  if (p.pages) bits.push(p.pages);
  return bits.join(", ") + (bits.length ? "." : "");
}
function pubHTML(p) {
  const btns = [];
  if (p.url)      btns.push(`<a class="pub-btn" href="${escapeHTML(p.url)}" target="_blank" rel="noopener">DOI</a>`);
  if (p.abstract) btns.push(`<button class="pub-btn" type="button" data-panel="abs" aria-expanded="false">ABS</button>`);
  btns.push(`<button class="pub-btn" type="button" data-panel="bib" aria-expanded="false">BIB</button>`);
  if (p.cover)    btns.push(`<button class="pub-btn" type="button" data-zoom="${p.cover}">COVER</button>`);
  Object.entries(p.links).forEach(([k, v]) => {
    if (v) btns.push(`<a class="pub-btn" href="${/^https?:/.test(v) ? v : siteUrl("assets/pdf/" + v)}" target="_blank" rel="noopener">${k}</a>`);
  });
  const tag = p.kind === "review" ? `<span class="pub__kind">Review</span>` : "";
  const thumb = p.preview
    ? `<button class="pub__thumb" type="button" data-zoom="${p.preview}" aria-label="Enlarge graphic"><img src="${p.preview}" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('missing')"></button>`
    : `<div class="pub__thumb missing" aria-hidden="true"></div>`;
  return `
  <article class="pub" id="${p.key}" data-doi="${p.badges ? escapeHTML(p.doi) : ""}">
    ${thumb}
    <div class="pub__body">
      <h3 class="pub__title">${tag}${p.title}</h3>
      <p class="pub__authors">${authorsHTML(p.authors)}</p>
      <p class="pub__venue">${venueHTML(p)}</p>
      <div class="pub__btns">${btns.join("")}</div>
      ${p.abstract ? `<div class="pub__panel" data-for="abs" hidden><p>${p.abstract}</p></div>` : ""}
      <div class="pub__panel" data-for="bib" hidden><button class="pub__copy" type="button">Copy</button><pre>${escapeHTML(p.bibtex)}</pre></div>
      <div class="pub__metrics"></div>
    </div>
  </article>`;
}

/* ---- Interactions: panels, copy, zoom ------------------------------------- */
function wireList(el) {
  el.addEventListener("click", e => {
    const zoom = e.target.closest("[data-zoom]");
    if (zoom) { openLightbox(zoom.dataset.zoom); return; }
    const btn = e.target.closest("[data-panel]");
    if (btn) {
      const pub = btn.closest(".pub");
      const panel = pub.querySelector(`.pub__panel[data-for="${btn.dataset.panel}"]`);
      const open = panel.hidden;
      pub.querySelectorAll(".pub__panel").forEach(x => { x.hidden = true; });
      pub.querySelectorAll("[data-panel]").forEach(x => x.setAttribute("aria-expanded", "false"));
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open);
      return;
    }
    const copy = e.target.closest(".pub__copy");
    if (copy) {
      const txt = copy.parentNode.querySelector("pre").textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject())
        .then(() => { copy.textContent = "Copied"; setTimeout(() => copy.textContent = "Copy", 1600); })
        .catch(() => { const r = document.createRange(); r.selectNodeContents(copy.parentNode.querySelector("pre"));
                       const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    }
  });
}

function openLightbox(src) {
  let lb = document.getElementById("lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `<button class="lightbox__close" type="button" aria-label="Close">×</button><img alt="">`;
    document.body.appendChild(lb);
    const close = () => { lb.classList.remove("open"); lb.querySelector("img").removeAttribute("src"); };
    lb.addEventListener("click", e => { if (e.target === lb || e.target.closest(".lightbox__close")) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }
  lb.querySelector("img").src = src;
  lb.classList.add("open");
  lb.querySelector(".lightbox__close").focus();
}

/* ---- Citation badges (Dimensions + Altmetric), loaded only when needed ----
   Badges are added to a paper only once it scrolls into view, so the page
   stays fast even with 200+ entries. */
let _badgeObserver = null, _badgeScripts = false;
function loadBadgeScripts() {
  if (_badgeScripts) return; _badgeScripts = true;
  [["https://badge.dimensions.ai/badge.js"], ["https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js"]].forEach(([src]) => {
    const s = document.createElement("script"); s.src = src; s.async = true; document.head.appendChild(s);
  });
}
function observeBadges(root) {
  if (!("IntersectionObserver" in window)) return;
  if (!_badgeObserver) {
    _badgeObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const pub = en.target; _badgeObserver.unobserve(pub);
        const box = pub.querySelector(".pub__metrics"); const doi = pub.dataset.doi;
        if (!box || !doi || box.childElementCount) return;
        box.innerHTML = `<span class="__dimensions_badge_embed__" data-doi="${doi}" data-style="small_rectangle"></span>
                         <div class="altmetric-embed" data-badge-type="2" data-badge-popover="right" data-doi="${doi}" data-hide-no-mentions="true"></div>`;
        loadBadgeScripts();
        refreshBadges(box);
      });
    }, { rootMargin: "200px 0px" });
  }
  root.querySelectorAll(".pub[data-doi]:not([data-doi=''])").forEach(p => _badgeObserver.observe(p));
}
// Boxes waiting for the badge scripts; processed in small batches.
const _pendingBadges = new Set();
let _badgeTimer = null;
function refreshBadges(box) {
  _pendingBadges.add(box);
  clearTimeout(_badgeTimer);
  _badgeTimer = setTimeout(function tick(tries = 0) {
    const dimOK = window.__dimensions_embed && typeof window.__dimensions_embed.addBadges === "function";
    const altOK = typeof window._altmetric_embed_init === "function";
    if (dimOK) window.__dimensions_embed.addBadges();
    if (altOK) {
      _pendingBadges.forEach(b => { try { window._altmetric_embed_init(b); } catch (e) {} });
      _pendingBadges.clear();
    }
    if ((!dimOK || !altOK) && tries < 30) {
      _badgeTimer = setTimeout(() => tick(tries + 1), 300);   // a script is still loading
    }
  }, 150);
}

/* ---- Citation counts (for "Most cited" sorting) ---------------------------
   Fetched from the Dimensions Metrics API only when a visitor picks
   "Most cited", then kept in their browser for 7 days. Same numbers as the
   Dimensions badges. */
const CITE_API = "https://metrics-api.dimensions.ai/doi/";
const CITE_CACHE_KEY = "dimensions-citations-v1";
const CITE_MAX_AGE = 7 * 24 * 3600 * 1000;
function readCiteCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CITE_CACHE_KEY) || "null");
    if (c && Date.now() - c.t < CITE_MAX_AGE) return c.counts || {};
  } catch (e) {}
  return {};
}
function writeCiteCache(counts) {
  try { localStorage.setItem(CITE_CACHE_KEY, JSON.stringify({ t: Date.now(), counts })); } catch (e) {}
}
async function loadCitations(items, onProgress) {
  const counts = readCiteCache();
  const todo = [...new Set(items.map(p => p.doi.toLowerCase()).filter(d => d && !(d in counts)))];
  const total = todo.length;
  let done = 0;
  async function worker() {
    while (todo.length) {
      const doi = todo.shift();
      try {
        const r = await fetch(CITE_API + doi.split("/").map(encodeURIComponent).join("/"));
        if (r.ok) counts[doi] = Number((await r.json()).times_cited) || 0;
        else if (r.status === 404) counts[doi] = null;          // Dimensions has no record
      } catch (e) { /* network problem: try again next time */ }
      done++;
      if (onProgress) onProgress(done, total);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  writeCiteCache(counts);
  return counts;
}
function citesOf(p, counts) {
  const n = counts[(p.doi || "").toLowerCase()];
  return typeof n === "number" ? n : -1;
}

/* ---- Publication list pages ----------------------------------------------- */
// opts.types: e.g. ["paper"], ["review"], or omit for everything.
function renderPublications(opts = {}) {
  const listEl = document.getElementById("pub-list");
  const yearEl = document.getElementById("pub-year");
  const filterEl = document.getElementById("pub-filter");
  const statusEl = document.getElementById("pub-status");
  const sortEl = document.getElementById("pub-sort");
  wireList(listEl);

  loadBib().then(all => {
    const items = opts.types ? all.filter(p => opts.types.includes(p.kind)) : all;
    fillCounts(all);
    if (!items.length) { listEl.innerHTML = `<p class="muted">No entries yet. Add one to data/papers.bib.</p>`; return; }

    const years = [...new Set(items.map(p => p.year))].sort((a, b) => b - a);
    // Year menu: "All years" + one entry per year. ?year=2015 (or the old
    // #y2015 links) opens the page with that year already chosen.
    const params = new URLSearchParams(location.search);
    let year = params.get("year") || ((/^#y(\d{4})$/.exec(location.hash) || [])[1]) || "";
    if (!years.includes(+year)) year = "";
    if (yearEl) {
      yearEl.insertAdjacentHTML("beforeend", years.map(y => `<option value="${y}">${y}</option>`).join(""));
      yearEl.value = year;
    }

    let mode = params.get("sort") === "cited" ? "cited" : "year";
    let counts = null;                       // citation counts, once loaded
    if (sortEl) sortEl.value = mode;

    function syncUrl() {                     // keep the address shareable
      const url = new URL(location.href);
      if (mode === "cited") url.searchParams.set("sort", "cited"); else url.searchParams.delete("sort");
      if (year) url.searchParams.set("year", year); else url.searchParams.delete("year");
      if (/^#y\d{4}$/.test(url.hash)) url.hash = "";
      history.replaceState(null, "", url);
    }

    function draw() {
      const q = filterEl ? filterEl.value : "";
      const words = (q || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
      const shown = items.filter(p => (!year || p.year === +year) && words.every(w => p.search.includes(w)));
      const none = `<p class="muted">No publications match${q ? ` “${escapeHTML(q)}”` : ""}${year ? ` in ${year}` : ""}. Try another word or “All years”.</p>`;

      if (mode === "cited" && counts) {
        const ranked = shown.slice().sort((a, b) => (citesOf(b, counts) - citesOf(a, counts)) || byDate(a, b));
        listEl.innerHTML = ranked.length ? `
          <p class="pub-cite-note">Citation counts from <a href="https://www.dimensions.ai/" rel="noopener">Dimensions</a>.</p>
          ${ranked.map(p => { const n = citesOf(p, counts); return `
          <div class="pub-rank">
            <div class="pub-cites">${n >= 0 ? `<b>${n}</b><span>${n === 1 ? "citation" : "citations"}</span>` : `<span>—</span>`}</div>
            ${pubHTML(p)}
          </div>`; }).join("")}` : none;
      } else {
        listEl.innerHTML = years.map(y => {
          const inYear = shown.filter(p => p.year === y);
          if (!inYear.length) return "";
          return `<section class="pub-group" id="y${y}" aria-label="${y}">
                    <h2 class="pub-year">${y}</h2>
                    <div class="pub-group__list">${inYear.map(pubHTML).join("")}</div>
                  </section>`;
        }).join("") || none;
      }
      if (statusEl) statusEl.textContent = words.length ? `${shown.length} found` : "";   // only while searching
      observeBadges(listEl);
    }

    async function setMode(m) {
      mode = m;
      syncUrl();
      if (m === "cited" && !counts) {
        if (sortEl) sortEl.disabled = true;
        listEl.innerHTML = `<p class="muted" id="cite-progress">Loading citation counts…</p>`;
        counts = await loadCitations(items, (d, t) => {
          const el = document.getElementById("cite-progress");
          if (el) el.textContent = `Loading citation counts… ${d} / ${t}`;
        });
        if (sortEl) sortEl.disabled = false;
      }
      draw();
      if (m === "cited") window.scrollTo({ top: listEl.offsetTop - 120 });
    }

    if (filterEl) {
      let t; filterEl.addEventListener("input", () => { clearTimeout(t); t = setTimeout(draw, 120); });
    }
    if (sortEl) sortEl.addEventListener("change", () => setMode(sortEl.value));
    if (yearEl) yearEl.addEventListener("change", () => {
      year = yearEl.value; syncUrl(); draw();
      window.scrollTo({ top: listEl.offsetTop - 120 });
    });

    syncUrl();
    if (mode === "cited") setMode("cited");
    else { draw(); jumpToHash(); }
  }).catch(err => {
    listEl.innerHTML = `<p class="error">${escapeHTML(err.message)} If you opened the file directly from disk, use preview.command instead (GUIDE.md §7).</p>`;
  });
}

// After the list is drawn, honour links like publications.html#y2015 or #mori2021chiroptical
function jumpToHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView();
  if (el.classList.contains("pub")) el.classList.add("pub--target");
  // Graphics above the target load lazily and push it down; keep it in place
  // for a moment unless the visitor starts scrolling on their own.
  let userMoved = false;
  const stop = () => { userMoved = true; };
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(ev => addEventListener(ev, stop, { once: true, passive: true }));
  const list = document.getElementById("pub-list");
  const onLoad = () => { if (!userMoved) el.scrollIntoView(); };
  list.addEventListener("load", onLoad, true);
  setTimeout(() => list.removeEventListener("load", onLoad, true), 4000);
}

// Fill any element with data-count="all|paper|review|years|first-year|covers"
function fillCounts(all) {
  const years = all.map(p => p.year).filter(Boolean);
  const map = {
    all: all.length,
    paper: all.filter(p => p.kind === "paper").length,
    review: all.filter(p => p.kind === "review").length,
    covers: all.filter(p => p.cover).length,
    "first-year": Math.min(...years),
  };
  document.querySelectorAll("[data-count]").forEach(el => {
    if (map[el.dataset.count] !== undefined) el.textContent = map[el.dataset.count];
  });
}

/* ---- A short list of chosen keys (e.g. on mori.html) ---------------------- */
function renderSelected(keys, elId = "pub-selected") {
  const el = document.getElementById(elId);
  if (!el) return;                        // the page has no list for it
  wireList(el);
  loadBib().then(all => {
    const byKey = Object.fromEntries(all.map(p => [p.key, p]));
    const missing = keys.filter(k => !byKey[k]);
    if (missing.length) console.warn("renderSelected: not found in papers.bib:", missing);
    el.innerHTML = keys.filter(k => byKey[k]).map(k => pubHTML(byKey[k])).join("");
    observeBadges(el);
  }).catch(err => { el.innerHTML = `<p class="error">${escapeHTML(err.message)}</p>`; });
}

/* ---- Cover pictures -------------------------------------------------------
   Every bib entry with a  cover={file.jpg}  field appears here, newest first. */
function renderCovers() {
  const el = document.getElementById("cover-grid");
  loadBib().then(all => {
    fillCounts(all);
    const items = all.filter(p => p.cover);
    if (!items.length) { el.innerHTML = `<p class="muted">No cover pictures yet. Add cover={file.jpg} to an entry in data/papers.bib.</p>`; return; }
    el.innerHTML = items.map(p => `
      <figure class="cover">
        <button class="cover__img" type="button" data-zoom="${p.cover}" aria-label="Enlarge cover">
          <img src="${p.cover}" alt="Cover picture for ${escapeHTML(p.title.replace(/<[^>]+>/g, ""))}" loading="lazy" decoding="async">
        </button>
        <figcaption>
          <span class="cover__venue"><i>${p.journal}</i> ${p.year}</span>
          <a class="cover__title" href="${p.url || "#"}" target="_blank" rel="noopener">${p.title}</a>
        </figcaption>
      </figure>`).join("");
    el.addEventListener("click", e => { const z = e.target.closest("[data-zoom]"); if (z) openLightbox(z.dataset.zoom); });
  }).catch(err => { el.innerHTML = `<p class="error">${escapeHTML(err.message)}</p>`; });
}
