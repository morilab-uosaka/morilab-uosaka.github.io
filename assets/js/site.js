/* ==========================================================================
   site.js — shared header, footer, menu and light/dark theme.
   --------------------------------------------------------------------------
   This is the ONE place to edit the lab name, the menu and the footer.
   Whatever you change here updates EVERY page at once.
   After editing, bump ?v= on every page (see GUIDE.md §5).
   ========================================================================== */

const SITE = {
  // Logo at the top-left of every page. Use a SQUARE image (it is shown 36 × 36).
  logo: "/assets/img/lab_logo.png?v=20",

  // Text next to the logo.
  brandText: '<strong>Mori Lab</strong><span class="brand-sub">UOsaka</span>',

  // ---- Menu ---------------------------------------------------------------
  // Add a page: { label, href }. "children" turns an item into a dropdown.
  // Paths start with "/" — site.js converts them so they also work when the
  // site lives in a sub-folder (the test repo) or on your own computer.
  nav: [
    { label: "home",     href: "/" },
    { label: "news",     href: "/news.html" },
    { label: "research", href: "/research.html" },
    { label: "members",  href: "/members.html" },
    {
      label: "publications", href: "/publications.html",
      children: [
        { label: "all articles",        href: "/publications.html" },
        { label: "original papers",     href: "/papers.html" },
        { label: "accounts & reviews",  href: "/reviews.html" },
        { label: "cover pictures",      href: "/covers.html" },
        { divider: true },
        { label: "books & chapters",    href: "/books.html" },
        { label: "presentations",       href: "/presentations.html" },
        { label: "patents",             href: "/patents.html" },
      ],
    },
    { label: "links",    href: "/links.html" },
    { label: "join us",  href: "/join.html" },
  ],

  // Pages that are not in the menu but belong under a menu item
  // (that item is highlighted while you are on them).
  activeAlias: {
    "student.html": "/members.html",
    "mori.html":    "/members.html",
  },

  // ---- Footer -------------------------------------------------------------
  footerName: "森研究室 Mori Lab",
  footerLines: [
    "大阪大学 環境安全研究管理センター",
    "Research Center for Environmental Preservation, The University of Osaka",
  ],
  footerAddress: [
    "〒565-0871 大阪府吹田市山田丘2-4",
    "2-4 Yamadaoka, Suita, Osaka, Japan 565-0871",
  ],
};

/* ---- Site base URL -------------------------------------------------------
   Worked out from where this very script lives, so links resolve correctly
   whether the site is at a domain root (https://morilab-uosaka.github.io/),
   in a sub-folder (https://wongzit.github.io/lab.github.io/) or on
   http://localhost:8000/. Nothing to configure. */
window.SITE_BASE = (function () {
  const re = /assets\/js\/site\.js(?:\?.*)?$/;
  const s = Array.from(document.getElementsByTagName("script")).find(x => re.test(x.src));
  return s ? s.src.replace(re, "") : (location.origin + "/");
})();
function siteUrl(p) { return window.SITE_BASE + String(p).replace(/^\//, ""); }

/* ---- Theme ---------------------------------------------------------------
   Follows the visitor's system setting until they press the toggle; after
   that their choice is remembered. */
function savedTheme() { try { return localStorage.getItem("theme"); } catch (e) { return null; } }
function currentTheme() {
  const t = document.documentElement.getAttribute("data-theme");
  if (t) return t;
  return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
(function applyThemeEarly() {
  const t = savedTheme();
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
})();
function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeButton();
}
function updateThemeButton() {
  const dark = currentTheme() === "dark";
  document.querySelectorAll(".theme-toggle").forEach(b => {
    b.innerHTML = dark ? ICON_SUN : ICON_MOON;
    b.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    b.title = b.getAttribute("aria-label");
  });
}
const ICON_SUN = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></g></svg>';
const ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

/* ---- Navbar --------------------------------------------------------------- */
function currentRel() {
  const basePath = new URL(window.SITE_BASE).pathname;           // "/" or "/repo/"
  let rel = location.pathname;
  if (rel.startsWith(basePath)) rel = rel.slice(basePath.length);
  return rel.replace(/index\.html$/, "");                        // "" = home
}

function buildNav() {
  const rel = currentRel();
  const alias = (SITE.activeAlias || {})[rel];
  const isActive = href => {
    const h = href.split("#")[0].replace(/^\//, "");
    return h === rel || (alias && h === alias.replace(/^\//, ""));
  };

  const linkHTML = SITE.nav.map((item, i) => {
    if (item.children) {
      const childActive = item.children.some(c => c.href && isActive(c.href));
      const sub = item.children.map(c => c.divider
        ? `<span class="nav-drop__divider" role="separator"></span>`
        : `<a href="${siteUrl(c.href)}"${isActive(c.href) ? ' aria-current="page"' : ""}>${c.label}</a>`).join("");
      return `<div class="nav-drop">
                <button class="nav-drop__toggle${childActive ? " active" : ""}" aria-expanded="false" aria-controls="drop-${i}">${item.label}<svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
                <div class="nav-drop__menu" id="drop-${i}">${sub}</div>
              </div>`;
    }
    return `<a href="${siteUrl(item.href)}"${isActive(item.href) ? ' class="active" aria-current="page"' : ""}>${item.label}</a>`;
  }).join("");

  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Main");
  nav.innerHTML = `
    <div class="site-nav__inner">
      <a class="site-nav__brand" href="${window.SITE_BASE}">
        <img class="site-nav__logo" src="${siteUrl(SITE.logo)}" alt="" width="36" height="36">
        <span class="site-nav__brandtext">${SITE.brandText}</span>
      </a>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <div class="site-nav__links" id="navLinks">
        ${linkHTML}
        <button class="theme-toggle" type="button" onclick="toggleTheme()"></button>
      </div>
    </div>`;
  const slot = document.getElementById("site-header");
  (slot || document.body).prepend(nav);

  // burger (mobile)
  const burger = nav.querySelector(".nav-burger");
  const links = nav.querySelector("#navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  // dropdowns: hover on desktop (CSS), click/tap + keyboard everywhere
  nav.querySelectorAll(".nav-drop").forEach(drop => {
    const btn = drop.querySelector(".nav-drop__toggle");
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const open = !drop.classList.contains("open");
      nav.querySelectorAll(".nav-drop.open").forEach(d => { d.classList.remove("open"); d.querySelector("button").setAttribute("aria-expanded", "false"); });
      drop.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("click", () => nav.querySelectorAll(".nav-drop.open").forEach(d => {
    d.classList.remove("open"); d.querySelector("button").setAttribute("aria-expanded", "false");
  }));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") nav.querySelectorAll(".nav-drop.open").forEach(d => d.classList.remove("open"));
  });
  updateThemeButton();
}

/* ---- Footer --------------------------------------------------------------- */
function buildFooter() {
  const year = new Date().getFullYear();
  const updated = new Date(document.lastModified);
  const upd = isNaN(updated) ? "" :
    `${updated.getFullYear()}-${String(updated.getMonth() + 1).padStart(2, "0")}-${String(updated.getDate()).padStart(2, "0")}`;
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container site-footer__inner">
      <div>
        <p class="site-footer__name">${SITE.footerName}</p>
        ${SITE.footerLines.map(l => `<p>${l}</p>`).join("")}
        <p>${SITE.footerAddress}</p>
      </div>
      <div class="site-footer__meta">
        <p>© ${year} Mori Lab @UOsaka</p>
        ${upd ? `<p>Last updated ${upd}</p>` : ""}
      </div>
    </div>`;
  const slot = document.getElementById("site-footer");
  (slot || document.body).append(footer);
}

/* ---- E-mail addresses ------------------------------------------------------
   Write   <a class="email" data-u="tmori" data-d="epc.osaka-u.ac.jp"></a>
   and the address is assembled here, so spam bots reading the HTML never see
   it in plain text. */
function buildEmails() {
  document.querySelectorAll("a.email[data-u][data-d]").forEach(a => {
    const addr = `${a.dataset.u}@${a.dataset.d}`;
    a.href = "mailto:" + addr;
    if (!a.textContent.trim()) a.textContent = addr;
  });
}

function siteInit() { buildNav(); buildFooter(); buildEmails(); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", siteInit);
else siteInit();   // script was added late (e.g. by 404.html)
