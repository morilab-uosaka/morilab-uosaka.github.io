/* ==========================================================================
   news.js — draws the news list from data/news.js.
   You never edit this file; add news in data/news.js (GUIDE.md §6.1).
     renderNews("id-of-element", { limit: 5 })   short list (home page)
     renderNews("id-of-element")                 everything, full text (news.html)
   ========================================================================== */

function formatNewsDate(iso) {
  const [y, m, d] = String(iso).split("-");
  return `${y}.${(m || "").padStart(2, "0")}.${(d || "").padStart(2, "0")}`;
}

function renderNews(elId, opts = {}) {
  const el = document.getElementById(elId);
  if (!el) return;
  const all = Array.isArray(window.NEWS) ? window.NEWS.slice() : [];
  if (!all.length) { el.innerHTML = `<p class="muted">No news yet.</p>`; return; }
  all.sort((a, b) => String(b.date).localeCompare(String(a.date)));   // newest first, whatever the file order
  const items = opts.limit ? all.slice(0, opts.limit) : all;

  if (opts.limit) {
    // compact list: date + one line; stories link to their full text
    el.innerHTML = `<ol class="news-list">${items.map(n => `
      <li>
        <time datetime="${n.date}">${formatNewsDate(n.date)}</time>
        <span>${n.title ? `<a href="news.html#${n.id}">${n.title}</a>` : n.text}</span>
      </li>`).join("")}</ol>`;
    return;
  }

  el.innerHTML = items.map(n => `
    <article class="news-item" id="${n.id}">
      <time datetime="${n.date}">${formatNewsDate(n.date)}</time>
      <div class="news-item__body">
        ${n.title ? `<h2>${n.title}</h2>${n.body || ""}` : `<p class="news-item__line">${n.text}</p>`}
      </div>
    </article>`).join("");

  // honour links like news.html#announcement_5 (the list is drawn after load)
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (target) { target.scrollIntoView(); target.classList.add("news-item--target"); }
}
