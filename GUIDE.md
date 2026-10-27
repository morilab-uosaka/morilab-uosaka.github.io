# Mori Lab website — Maintenance Guide

**Everything you need to edit, preview and publish the lab website.**
Read this once and you can maintain the whole site yourself.

---

## Table of contents

1. [How the site works](#1-how-the-site-works)
2. [Test site vs. live site](#2-test-site-vs-live-site)
3. [Repository map](#3-repository-map)
4. [Anatomy of a page](#4-anatomy-of-a-page)
5. [The `?v=` cache rule](#5-the-v-cache-rule)
6. [Editing recipes](#6-editing-recipes)
   - [6.1 News](#61-news)
   - [6.2 Menu and footer](#62-menu-and-footer)
   - [6.3 Colors and fonts](#63-colors-and-fonts)
   - [6.4 Publications (papers.bib)](#64-publications-papersbib)
   - [6.5 Cover pictures](#65-cover-pictures)
   - [6.6 Members and Prof. Mori's page](#66-members-and-prof-moris-page)
   - [6.7 Research, books, presentations, patents, links, join](#67-research-books-presentations-patents-links-join)
   - [6.8 Images](#68-images)
7. [Previewing on your computer](#7-previewing-on-your-computer)
8. [Publishing: test → live (and the one-time switch from Jekyll)](#8-publishing)
9. [Old addresses still work](#9-old-addresses-still-work)
10. [Troubleshooting](#10-troubleshooting)
11. [Quick reference card](#11-quick-reference-card)

---

## 1. How the site works

This is a **static website**: plain HTML, one CSS file and a few small
JavaScript files. There is no Jekyll, no build step, no plugins and no Ruby.
Every file in the repository is served to visitors exactly as it is.

```
you edit a file  →  git commit  →  git push  →  GitHub Pages serves it (≈1 min)
```

- **What you see locally is what visitors see.**
- **The empty file `.nojekyll` must stay.** It tells GitHub Pages *not* to run
  Jekyll. It is a hidden dotfile; if you copy the folder in Finder, check it
  came along.
- **A typo can break a page.** A missing `}` in `data/papers.bib` or a missing
  comma in `data/news.js` can blank a list. Always preview before pushing (§7).

### Where the "logic" lives

Only these files contain machinery. Everything else is content.

| File | Responsibility |
| --- | --- |
| `assets/js/site.js` | Menu, footer, light/dark theme, e-mail links, base-path detection |
| `assets/js/pubs.js` | Reads `data/papers.bib` and draws publications, covers and selected lists |
| `assets/js/news.js` | Draws the news list from `data/news.js` |
| `assets/js/people.js` | Student/alumni tables, each student's page, the presentations page |
| `assets/css/style.css` | All styling for the whole site |
| `404.html` | "Page not found" + redirects from the old Jekyll addresses |

Content lives in:

- `*.html` — one file per page
- `data/papers.bib` — **the publication list** (same BibTeX you used with Jekyll)
- `data/news.js` — the news list
- `assets/img/…` — images

### Why it is faster than the Jekyll version

- No Bootstrap, jQuery, MathJax, Font Awesome or web fonts: one 30 KB stylesheet
  and ~30 KB of JavaScript in total.
- Images were resized and compressed: the home page photo went from 24.5 MB to
  0.4 MB (0.14 MB on phones); cover PDFs became JPEGs; the 41 MB of TOC graphics
  became ~15 MB **and** they only load when you scroll to them.
- Citation badges (Dimensions, Altmetric) load only for papers on screen.

### Base-path detection (why links always work)

`site.js` works out the site's root from its own `<script src>`. The same files
therefore work unchanged at:

- `https://morilab-uosaka.github.io/` (live),
- `https://wongzit.github.io/lab.github.io/` (test),
- `http://localhost:8000/` (preview).

Convention: inside `.html` pages write internal paths **relative, without a
leading slash** (`assets/img/x.png`, `members.html`). Only the menu in
`site.js` uses leading slashes (§6.2).

---

## 2. Test site vs. live site

| | Live site | Test site |
| --- | --- | --- |
| Repo | `github.com/morilab-uosaka/morilab-uosaka.github.io` | `github.com/wongzit/lab.github.io` |
| URL | `https://morilab-uosaka.github.io/` | `https://wongzit.github.io/lab.github.io/` |
| Purpose | What everyone sees | Sandbox: try changes here first |

**Working rule:** build and check new things in the test repo, then copy the
finished files to the live repo (§8). The two repos are not synchronised
automatically.

---

## 3. Repository map

```
lab.github.io/
├── .nojekyll              ← MUST EXIST. Turns Jekyll off on GitHub Pages.
├── GUIDE.md               ← this file
├── preview.command        ← double-click: preview on your Mac (§7)
├── bump-version.command   ← double-click: raise ?v= everywhere (§5)
├── 404.html               ← not-found page + old-address redirects (§9)
├── robots.txt, sitemap.xml, google*.html (Search Console verification)
│
├── index.html             ← home: hero, group photo, latest news, research list, access
├── news.html              ← all news (drawn from data/news.js)
├── research.html          ← research themes
├── members.html           ← staff
├── mori.html              ← Prof. Mori's profile + recent papers
├── student.html           ← one page per student (student.html?id=…), all automatic
├── publications.html      ← all articles     ┐
├── papers.html            ← original papers  ├ all drawn from data/papers.bib
├── reviews.html           ← accounts/reviews │
├── covers.html            ← cover pictures   ┘
├── books.html             ← books & chapters
├── presentations.html     ← conference talks
├── patents.html
├── links.html
├── join.html              ← recruiting
│
├── data/
│   ├── papers.bib         ← THE publication list
│   ├── news.js            ← THE news list
│   ├── students.js        ← THE student / alumni list (+ awards)
│   └── presentations.js   ← THE conference-talk list
│
└── assets/
    ├── css/style.css
    ├── js/site.js, pubs.js, news.js, people.js
    └── img/
        ├── lab_logo.png, favicon/
        ├── home/          ← group.jpg (+ group-1000.jpg), building.jpg
        ├── affil/         ← university logos on the home page
        ├── members/       ← staff photos
        ├── research/      ← figures on research.html
        ├── publication_preview/  ← TOC graphics (file names used in papers.bib)
        ├── covers/        ← journal covers (file names used in papers.bib)
        ├── books/         ← book covers
        ├── links/         ← logo tiles on links.html
        └── news/          ← pictures used in news stories
```

---

## 4. Anatomy of a page

Every page has the same skeleton:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page name | Mori Lab @UOsaka</title>
  <meta name="description" content="One sentence for Google.">
  <link rel="icon" type="image/png" href="assets/img/favicon/favicon-32.png">
  <link rel="apple-touch-icon" href="assets/img/favicon/apple-touch-icon.png">
  <script>try{var t=localStorage.getItem("theme");…}catch(e){}</script>  <!-- remembers dark/light -->
  <link rel="stylesheet" href="assets/css/style.css?v=1">                 <!-- ← version! -->
</head>
<body>
  <div id="site-header"></div>        <!-- menu is inserted here by site.js -->

  <main class="container reading">    <!-- "reading" = narrower text column -->
    <header class="page-head">
      <h1>Page name</h1>
      <p class="lead">日本語タイトル</p>
    </header>

    <!-- YOUR CONTENT -->

  </main>

  <div id="site-footer"></div>        <!-- footer is inserted here by site.js -->
  <script src="assets/js/site.js?v=1"></script>
</body>
</html>
```

- Leave `<div id="site-header">` and `<div id="site-footer">` empty — `site.js`
  fills them, so the menu is edited in one place only.
- `class="container"` = full width; `class="container reading"` = text column.
- Bilingual text: Japanese paragraph first, then the English one with
  `<p class="en" lang="en">…</p>` (shown in a softer color).

**New page:** copy the simplest similar page (`patents.html`), rename it,
change `<title>`, the description and the `page-head`, write the content, and
add it to the menu (§6.2).

---

## 5. The `?v=` cache rule

Files in `assets/` and `data/` are referenced with a number, e.g.
`style.css?v=1`. Browsers cache these files; changing the number forces every
visitor to download the new version.

> **Rule:** after editing anything in `assets/` or `data/`
> (`style.css`, any `.js`, `news.js`, `papers.bib`),
> **double-click `bump-version.command`** before you commit.

It raises the number in every `.html` and `.js` file and prints a check —
all lines must show the **same** number. (HTML-only edits and new images need
no bump.)

Without a bump the change still appears, but some visitors may see the old
version for a while (GitHub Pages lets browsers cache files for 10 minutes;
some browsers keep them longer).

---

## 6. Editing recipes

### 6.1 News

Open **`data/news.js`**. Add the new item at the **top** of the list.

A one-line item:

```js
  {
    id: "announcement_12",                 // unique; used in links news.html#announcement_12
    date: "2026-10-22",
    text: `中根くん (M2) が○○賞を受賞しました！`,
  },
```

A story with a title and full text (title links from the home page to it):

```js
  {
    id: "announcement_13",
    date: "2026-11-05",
    title: "第○回○○討論会に参加します",
    body: `
      <p>本文．リンクは <a href="https://…">このように</a>．</p>
      <ul><li>発表1</li><li>発表2</li></ul>
      <img src="assets/img/news/photo.jpg" alt="説明" loading="lazy">`,
  },
```

- Text goes between backticks `` ` `` and may contain HTML.
- Link to a paper on the site: `<a href="publications.html#bibkey">…</a>`.
- The home page shows the 5 newest automatically; `news.html` shows all.
- Then bump `?v=` (§5).

### 6.2 Menu and footer

Both are in the `SITE` object at the top of **`assets/js/site.js`**:

```js
nav: [
  { label: "home",     href: "/" },
  { label: "news",     href: "/news.html" },
  …
  { label: "publications", href: "/publications.html",
    children: [                                  // ← makes a dropdown
      { label: "all articles", href: "/publications.html" },
      { divider: true },                         // ← thin line in the dropdown
      …
    ] },
],
```

- Menu order = list order. Paths here **start with `/`**.
- The current page is highlighted automatically.
- Footer text: `footerName`, `footerLines`, `footerAddress`.
- Then bump `?v=`.

### 6.3 Colors and fonts

Top of **`assets/css/style.css`**. The palette comes from the lab logo:

| Variable | Light | Used for |
| --- | --- | --- |
| `--ink` | `#1c1f57` | headings, brand (logo lettering) |
| `--spiral` | `#0695e6` | logo blue: highlights, focus rings, underlines |
| `--accent` | `#1d6cbb` | links |
| `--bg` / `--surface` | `#f5f8fc` / `#fff` | page / panels |

The dark theme has its own values in two blocks just below (`[data-theme="dark"]`
and the `prefers-color-scheme` block — keep them identical). The site follows
the visitor's system setting until they press the 🌙/☀️ button.

Fonts are the system's own (Hiragino on Mac/iPhone, Yu Gothic/Segoe on
Windows, Noto on Android) — no downloads, which keeps pages fast.

**Mouse cursor.** The spring cursor is **red in light mode and blue in dark
mode**. It is set in three `cursor:` blocks near the top of `style.css` (light,
dark via the 🌙 button, dark via the computer's setting).

| Mode | Small files used by the site | Click point | Source picture (not loaded) |
| --- | --- | --- | --- |
| Light | `assets/img/cursor-light-1x.png` (34 × 27) + `cursor-light-2x.png` | `33 10` | `assets/img/cursor-red.png` |
| Dark | `assets/img/cursor-dark-1x.png` (34 × 26) + `cursor-dark-2x.png` | `33 17` | `assets/img/cursor.png` |

The `-2x` file is the same picture at double size for Retina screens. To change
a cursor, make new small copies under the same names (a cursor image must be
128 px or smaller; 30–50 px wide works well) and, if the arrow tip moves, change
its click point (x y in pixels from the top-left of the 1x image) in every
`cursor:` line of that mode. Links keep the hand cursor. Phones and tablets
have no cursor, so nothing changes there.

### 6.4 Publications (papers.bib)

**All four publication pages and the counts are generated from
`data/papers.bib`.** Add a paper by adding a BibTeX entry — the same format as
the old Jekyll site:

```bibtex
@article{wang2026controlling,
  title={Controlling through-space spin coupling via spin-density contact in helical diradicaloids},
  author={Wang*, Zhe and Kishimoto, Nobuhito and Nakatsu, Koki and Mori*, Tadashi},
  journal={Chem. Commun.},
  volume={62},
  pages={1234--1237},
  year={2026},
  month={September},
  doi={10.1039/d6cc05316e},
  url={https://doi.org/10.1039/d6cc05316e},
  abstract={…},
  preview={wang2026controlling.png},
  tab={paper},
  dimensions={true}
}
```

| Field | Effect on the website |
| --- | --- |
| `tab` | `paper` → original papers, `review` → accounts & reviews (with a "Review" tag). No `tab` → shown only under "all articles". |
| `author` | `Last, First and Last, First …`. A `*` after the family name (`Mori*, Tadashi`) marks the corresponding author. Lab staff are underlined automatically. `and others` → "et al." |
| `preview` | TOC graphic file in `assets/img/publication_preview/`. Click to enlarge. |
| `cover` | Journal cover file in `assets/img/covers/` → appears on covers.html and adds a COVER button (§6.5). |
| `abstract` | Adds the ABS button. |
| `doi` / `url` | The DOI button opens `url` (or `https://doi.org/` + doi). |
| `dimensions` | `true` → citation badges (Dimensions + Altmetric) under the entry. |
| `month` | Orders papers within a year (otherwise: file order). |
| `pdf`, `supp`, `html`, `code` | Optional extra buttons: a full URL, or a file name in `assets/pdf/`. |

- Titles may contain `--` (→ –), `$\gamma$` (→ γ), `\textsuperscript{…}`, `_{…}`.
- Entry order in the file doesn't matter; the site sorts by year (newest first).
- The BIB button shows a clean copy of the entry (website-only fields and `*`
  removed) with a Copy button.
- Link straight to a paper: `publications.html#bibkey`; to a year:
  `publications.html?year=2015`.
- **Who is highlighted:** edit `LAB_MEMBERS` at the top of `assets/js/pubs.js`.
- **Year menu (全年 All years ▾):** shows one year at a time; works together with the
  search box and the sort menu. Link to a year with `publications.html?year=2015`.
- **Sort menu (新しい順 / 被引用数順):** "Most cited" fetches each paper's citation
  count from the Dimensions Metrics API (the same numbers as the badges) when a
  visitor selects it, then keeps them in that browser for 7 days. Nothing to
  maintain. Link straight to it with `publications.html?sort=cited`. Papers without
  a DOI, or unknown to Dimensions, appear at the end with "—". Dimensions' terms
  require organisations to be registered to use this data
  (https://dimensions.ai/policies/terms/metrics/).
- Then bump `?v=` (§5) and preview: if the count on `publications.html` drops
  unexpectedly, a brace is probably missing in the entry you just added.

### 6.5 Cover pictures

1. Save the cover as a JPEG in `assets/img/covers/` (about 1000–1400 px tall).
   From a PDF: open in Preview → File → Export → JPEG.
2. Add `cover={file.jpg}` to that paper's entry in `data/papers.bib`.

The cover then appears on `covers.html` (newest first, with the paper's title
and a link) and as a COVER button on the paper itself.

### 6.6 Members and Prof. Mori's page

**`members.html`** — one `<article class="member">` block per person; copy one
to add someone. Photo: `assets/img/members/name.jpg`, portrait ≈ 3:4. The
person's **name links to their 研究者総覧 page** (put the address in the
`<a href="…">` inside `<h2>`); the buttons below it are for Profile, E-mail,
ORCID, Website. E-mail is written as two halves so spam bots can't read it:

```html
<a class="email" data-u="wangzhe" data-d="epc.osaka-u.ac.jp">E-mail</a>
```

Staff **without a photo or links** (the administrative assistants) use
`class="member member--text"` and contain only the name and role:

```html
<article class="member member--text">
  <div>
    <h2>姓 名<span class="romaji" lang="en">Given FAMILY</span></h2>
    <p class="member__role">事務補佐員<span lang="en">Administrative Assistant</span></p>
  </div>
</article>
```

An extra line under a role (like Prof. Mori's "Principal Investigator") is
`<span class="member__pi" lang="en">…</span>` inside `member__role`.

**Students and alumni** live in **`data/students.js`** — one line per person.
They appear at the bottom of `members.html` (students in three columns — doctoral, master's, undergraduate — grouped by the first letter of `grade`; alumni grouped by the year they left, several names per row), and **each person
gets their own page** (`student.html?id=nakane`) that is filled automatically:

| On the student's page | Comes from |
| --- | --- |
| Publications | `data/papers.bib` — every paper with them as an author (matched by the English name) |
| Presentations | `data/presentations.js` — every talk with their name in `authors` (Japanese or English) |
| Awards | the `awards` list in their entry in `data/students.js` |

```js
{ id: "nakane", ja: "中根 晴太", en: "Hareta NAKANE", grade: "M2",
  awards: [
    { date: "2025-09-19", title: "Poster Presentation Award（ポスター発表賞）",
      event: "International Conference on Chiroptical Science (ICCS-2025)" },
  ] },
```

- `id` — short lowercase word; it is the page address. Never change it after publishing.
- On `members.html` a name becomes a link **only when that person's page has
  something to show** (a paper, a talk or an award). Until then it is plain text.
  This updates by itself as soon as you add their first paper, talk or award.
- `en` — written **Given FAMILY** exactly as in papers (`Hareta NAKANE`), so the
  papers are found. If a paper spells the name differently, add
  `paperNames: ["Other SPELLING"]` (useful when an old paper used a different romanization).
- Students in order D → M → B; alumni at the bottom, newest first.
- **Every April:** raise the grades. For graduates, replace `grade: "M2"` with
  `alumni: "2025年度", period: "2024年4月〜2026年3月", degree: "修士（工学）",`
  — they move to the Alumni list (under their year, with 学位 and 在学期間) and their page keeps working.
- `ja` may be left empty (`ja: ""`) for someone without a Japanese name; the English name is then shown alone.
- Optional: `theme: "研究テーマ…"` adds a one-line research topic to their page.
- Then bump `?v=` (§5).

**`mori.html`** — the "Recent Publications" list is drawn from `papers.bib`.
Change it by editing the list of keys at the bottom of the file:

```js
renderSelected(["mori2024significance", "olivier2023pi", …]);
```

### 6.7 Research, books, presentations, patents, links, join

These are plain HTML with comments showing the block to copy:

- `research.html` — one `<section class="theme" id="…">` per theme. The `id`
  is used by the research list on the home page (`research.html#esc`).
- `books.html` — one `<li class="book">` per book; covers in `assets/img/books/`.
- `presentations.html` — drawn from **`data/presentations.js`** (one `{ … }` per talk,
  instructions at the top of the file). Put `○` in front of the presenter. The
  page groups talks by **academic year** (April – March) from each talk's `date`
  — a talk on 2026-03-18 appears under **AY2025** — so no year headings need
  to be written by hand. Talks show up on each student's page automatically,
  and student names on the presentations page link to their pages (a name
  matches in either word order, e.g. "Nyamdash Bolortuya" = "Bolortuya
  NYAMDASH"). Bump `?v=` afterwards.
- `links.html` — one `<a><img></a>` tile per link; logos in `assets/img/links/`
  (1000×402 shape, logo on white).
- The home page research list (`index.html`) is separate — update it too if
  you add or rename a theme.

### 6.8 Images

Keep images small — it is the single biggest factor in speed.

| Kind | Size | Format |
| --- | --- | --- |
| Photos (home, news) | ≤ 2000 px wide | JPEG, quality ~80 |
| TOC graphics | ≤ 1000 px on the long side | PNG |
| Covers | ≈ 1000–1400 px tall | JPEG |
| Staff photos | ≈ 500 px wide | JPEG |

On a Mac: open in Preview → Tools → Adjust Size, then File → Export.
Always give `<img>` an `alt` text and, below the first screen, `loading="lazy"`.

---

## 7. Previewing on your computer

Double-click **`preview.command`**. It starts a small local server and opens
`http://localhost:8000`. Close the Terminal window to stop.

> Opening `index.html` directly from Finder mostly works, but the publication
> pages **need** the preview server (browsers don't let a page read
> `papers.bib` from disk).

The first time, macOS may refuse to open a downloaded `.command` file:
right-click → Open → Open. If it says it is not executable, run once in
Terminal: `chmod +x preview.command bump-version.command`.

---

## 8. Publishing

### Everyday: test → live

1. Make and check the change in the test repo (`lab.github.io`), push, look at
   `https://wongzit.github.io/lab.github.io/`.
2. Copy the changed files into the live repo (`morilab-uosaka.github.io`),
   bump `?v=` there too, commit, push.

### One-time: switching the live repo from Jekyll (al-folio) to this site

The live repo is currently built by a **GitHub Action** (`.github/workflows/deploy.yml`)
that runs Jekyll and publishes the result to the `gh-pages` branch. To switch:

1. In a local clone of `morilab-uosaka.github.io` (branch `main`), delete
   **everything except `.git`** — including the hidden `.github/` folder. If the
   workflows stay, the Action will keep building Jekyll and overwrite the site.
2. Copy in all files from this repo, **including the hidden `.nojekyll`**
   (in Finder: ⌘⇧. shows hidden files).
3. Commit and push to `main`.
4. On GitHub: repo **Settings → Pages → Build and deployment** →
   Source **"Deploy from a branch"** → Branch **`main`**, folder **`/ (root)`** → Save.
5. Wait about a minute, then open `https://morilab-uosaka.github.io/`.
   The `gh-pages` branch is no longer used; delete it once you are happy.

To undo: set the Pages source back to `gh-pages` (the old build is still there).

---

## 9. Old addresses still work

GitHub Pages shows `404.html` for any unknown address, and that page forwards
the old Jekyll addresses to the new pages:

| Old | New |
| --- | --- |
| `/articles/` | `publications.html` |
| `/articles/2015/` | `publications.html?year=2015` |
| `/articles/oripap/`, `/articles/reviews/`, `/articles/cover/` | `papers.html`, `reviews.html`, `covers.html` |
| `/member/`, `/mori/`, `/research/`, `/news/`, `/join/`, `/links/`, `/books/`, `/presentations/`, `/patents/` | the matching `.html` page |
| `/news/announcement_5/` | `news.html#announcement_5` |

So links on university pages, in e-mails and in Google keep working. To add a
redirect, add a line to `ROUTES` in `404.html`.

---

## 10. Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Publications page says "Could not load data/papers.bib" | You opened the file from disk — use `preview.command`. Online: check the file name/path. |
| Publication count dropped after adding an entry | Unbalanced `{ }` in the new entry. Open the browser console (⌥⌘I → Console): pubs.js names the entry it could not read. |
| A paper shows no graphic | The `preview={…}` file name doesn't match a file in `assets/img/publication_preview/` (names are case-sensitive online). |
| News list is empty | Syntax error in `data/news.js` (missing comma, backtick or `}`). Console shows the line. |
| Change not visible online | Wait 1–2 min for GitHub Pages; check the Actions tab; did you bump `?v=`? Hard-reload with ⇧⌘R. |
| Site shows a Jekyll build error | `.nojekyll` is missing — restore it (an empty file named `.nojekyll`). |
| Live site still shows the old design | Pages source is still `gh-pages`, or the old deploy workflow is still in `.github/workflows/` (§8). |

---

## 11. Quick reference card

| I want to… | Edit |
| --- | --- |
| add news | `data/news.js` (top of list) → bump |
| add a paper | `data/papers.bib` (+ TOC image in `assets/img/publication_preview/`) → bump |
| add a cover | image in `assets/img/covers/` + `cover={…}` in the bib entry → bump |
| change the menu/footer | `SITE` in `assets/js/site.js` → bump |
| change colors | top of `assets/css/style.css` → bump |
| add a staff member | copy a block in `members.html` |
| add a student / alumnus, or an award | `data/students.js` → bump |
| add a conference talk | `data/presentations.js` → bump |
| change Prof. Mori's recent papers | keys at the bottom of `mori.html` |
| add a book / link | `books.html` / `links.html` |
| preview | double-click `preview.command` |
| bump `?v=` | double-click `bump-version.command` |
