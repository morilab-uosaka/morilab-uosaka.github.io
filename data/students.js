/* ==========================================================================
   students.js — THE STUDENT AND ALUMNI LIST.
   --------------------------------------------------------------------------
   Feeds the Students / Alumni tables on members.html AND one page per person
   (student.html?id=…). Each person's page shows automatically:
     • publications — papers in data/papers.bib with this person as an author
     • presentations — talks in data/presentations.js with their name in "authors"
     • awards       — the "awards" list written below

   One { … } per person. Students in order D → M → B; alumni newest first.

     id        short unique word, lowercase; the page address becomes
               student.html?id=nakane      (never change it once published)
     ja        Japanese name, family and given name separated by a space
     en        English name, written "Given FAMILY" — e.g. "Hareta NAKANE"
     grade     students only: "D3" "D2" "D1" "M2" "M1" "B4" "研究生" …
     alumni    alumni only: the academic year they left, e.g. "2025年度"
     period    alumni only: 在学期間, e.g. "2022年4月〜2026年3月"
     degree    alumni only: 学位, e.g. "修士（工学）"
     theme     (optional) research topic, one line
     paperNames (optional) other spellings used in papers.bib, e.g. ["Ziaho QIN"]
     awards    (optional) list of { date: "YYYY-MM-DD", title: "…", event: "…" }

   EVERY APRIL: raise the grades (M1 → M2, B4 → M1 …). For graduates, delete
   their "grade" line and add  alumni: "2025年度", period: "…", degree: "…",
   — they move to the Alumni table and their page keeps working.

   Keep the  window.STUDENTS = [  line at the top and  ];  at the bottom.
   After editing, double-click bump-version.command.
   ========================================================================== */

window.STUDENTS = [

  /* ===================== Students ===================== */
  { id: "matsumoto", ja: "松本 紗耶未", en: "Sayami MATSUMOTO", grade: "D2" },
  { id: "qin",       ja: "秦 子皓",    en: "Zihao QIN",        grade: "D2" },
  { id: "nakane",    ja: "中根 晴太",   en: "Hareta NAKANE",    grade: "M2",
    awards: [
      { date: "2025-09-19", title: "Poster Presentation Award（ポスター発表賞）",
        event: "International Conference on Chiroptical Science (ICCS-2025)" },
    ] },
  { id: "kitaura",   ja: "北浦 太一",   en: "Taichi KITAURA",   grade: "M2" },
  { id: "kosaka",    ja: "小阪 龍世",   en: "Ryusei KOSAKA",    grade: "M2" },
  { id: "ibaragi",   ja: "茨木 諒介",   en: "Ryosuke IBARAGI",  grade: "M1" },
  { id: "nakatsu",   ja: "中津 皐稀",   en: "Koki NAKATSU",     grade: "M1" },
  { id: "hayashi",   ja: "林 慶次郎",   en: "Keijiro HAYASHI",  grade: "M1" },
  { id: "uno",       ja: "宇野 芽依",   en: "Mei UNO",          grade: "B4" },
  { id: "kunitate",  ja: "國立 昂希",   en: "Koki KUNITATE",    grade: "B4" },
  { id: "kishimoto", ja: "岸本 信人",   en: "Nobuhito KISHIMOTO", grade: "B4" },

  /* ===================== Alumni ===================== */
  { id: "shen",    ja: "沈 梓榕", en: "Tzu-Jung SHEN",  alumni: "2026",
    period: "August 2026 ~ September 2026",    degree: "Exchange Student" },
  { id: "kujime",    ja: "久次米 智裕", en: "Tomohiro KUJIME",  alumni: "2025",
    period: "April 2023 ~ March 2026",    degree: "Bachelor-Master Student" },
  { id: "watanabe",    ja: "渡部 壮一朗", en: "Soichiro WATANABE",  alumni: "2025",
    period: "April 2024 ~ March 2026",    degree: "Master Student" },
  { id: "nyamdash",    ja: "", en: "Bolortuya NYAMDASH",  alumni: "2025",
    period: "April 2023 ~ March 2026",    degree: "Bachelor-Master Student" },
  { id: "matsuura",    ja: "松浦 実乃里", en: "Minori MATSUURA",  alumni: "2025",
    period: "April 2024 ~ March 2026",    degree: "Master Student" },
  { id: "ninomiya",    ja: "二宮 幸大", en: "Kota NINOMIYA",  alumni: "2025",
    period: "April 2025 ~ March 2026",    degree: "Bachelor Student" },
];
