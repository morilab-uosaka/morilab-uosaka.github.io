/* ==========================================================================
   presentations.js — THE LIST OF CONFERENCE PRESENTATIONS.
   --------------------------------------------------------------------------
   Feeds presentations.html AND each student's page (student.html): a talk
   appears on a student's page automatically when their name (Japanese or
   English, as written in data/students.js) is in "authors".

   One { … } per talk. Order doesn't matter much — the page groups talks by
   ACADEMIC YEAR (April – March, newest first; a talk on 2026-03-18 goes under
   AY2025) and by domestic / international, using "date".

     date    "YYYY-MM-DD"  (day of the talk)
     scope   "domestic"  → 国内学会   |  "international" → 国際学会
     title   title of the talk
     authors all authors; put ○ in front of the PRESENTER:
               "○中根 晴太，王 哲，森 直"   or   "○Hareta NAKANE, Zhe WANG, Tadashi MORI"
             (on international talks the presenter is shown underlined)
     event   conference name
     code    presentation number, e.g. "2P62" or "E1133-2pm-04 (口頭A講演)"   (optional)
     place   venue                                                         (optional)
     url     link to the abstract page                                     (optional)

   Keep the  window.PRESENTATIONS = [  line at the top and  ];  at the bottom.
   After editing, double-click bump-version.command.
   ========================================================================== */

window.PRESENTATIONS = [

  /* ======== AY2026  (April 2026 – March 2027) ======== */

  /* 2026年光化学討論会 (September 2026) */
  { date: "2026-09-08", scope: "domestic",
    title: "ラダー型ピレン誘導体のエキシマー形成における配向と円偏光発光制御",
    authors: "○中根 晴太，王 哲，森 直", event: "2026年光化学討論会", code: "1C14",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-08", scope: "domestic",
    title: "ジナフチルカルバゾール誘導体の発光過程に及ぼす置換基と位置の効果",
    authors: "○山路 稔，森 直，岡本 秀毅", event: "2026年光化学討論会", code: "1P017",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-09", scope: "domestic",
    title: "アリール置換[5]ヘリセンを基盤とするキラル発光材料の設計",
    authors: "○林 慶次郎，松本 紗耶未，王 哲，森 直", event: "2026年光化学討論会", code: "2P024",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-10", scope: "domestic",
    title: "アリール置換によるカルバゾール含有[5]ヘリセンの光学及びキロプティカル特性",
    authors: "○松本 紗耶未，王 哲，森 直", event: "2026年光化学討論会", code: "3P026",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-10", scope: "domestic",
    title: "ラダー型ピレンとπ系ドナー及びアクセプターによるエキシプレックス形成とその円偏光発光",
    authors: "○小阪 龍世，王 哲，森 直", event: "2026年光化学討論会", code: "3P027",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-10", scope: "domestic",
    title: "蛍光性クマリン骨格を有するヘキサアリールベンゼンの合成とキラルセンシングへの応用",
    authors: "○北浦 太一，王 哲，森 直", event: "2026年光化学討論会", code: "3P029",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-10", scope: "domestic",
    title: "フルオレン二量体の光物性と脱水素によるジラジカル生成",
    authors: "○中津 皐稀，岸本 信人，王 哲，森 直", event: "2026年光化学討論会", code: "3P031",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-10", scope: "domestic",
    title: "キラル置換基を導入したピレン誘導体の合成およびそのエキシマー発光特性",
    authors: "○茨木 諒介，王 哲，森 直", event: "2026年光化学討論会", code: "3P032",
    place: "神戸大学鶴甲第1キャンパス"},
  { date: "2026-09-10", scope: "domestic",
    title: "イミド化[7]ヘリセンの蛍光ソルバトクロミズムおよびCPL特性におよぼすイミド縮環位置の影響",
    authors: "○岡本 秀毅，野勢 勁斗，森 直，山路 稔，谷 文都", event: "2026年光化学討論会", code: "3C04",
    place: "神戸大学鶴甲第1キャンパス"},

  /* 第55回複素環化学討論会 (October 2026) */
  { date: "2026-10-08", scope: "domestic",
    title: "ビスアリールカルバゾール含有ヘリセンの光学及びキロプティカル特性",
    authors: "○松本 紗耶未，王 哲，森 直", event: "第55回複素環化学討論会", code: "O3-09",
    place: "岡山コンベンションセンター"},

  /* ======== AY2025  (April 2025 – March 2026) ======== */

  /* 日本化学会 第106春季年会 (March 2026) */
  { date: "2026-03-17", scope: "domestic",
    title: "ラダー型ピレン誘導体エキシマーの円偏光発光特性に及ぼす置換パターンの効果",
    authors: "○茨木 諒介，王 哲，森 直", event: "日本化学会 第106春季年会", code: "E1133-1am-02 (口頭A講演)",
    place: "日本大学理工学部船橋キャンパス"},
  { date: "2026-03-17", scope: "domestic",
    title: "ラダー型ピレンのエキシプレックス形成とその円偏光発光",
    authors: "○小阪 龍世，王 哲，森 直", event: "日本化学会 第106春季年会", code: "E1133-1am-05 (口頭A講演)",
    place: "日本大学理工学部船橋キャンパス"},
  { date: "2026-03-18", scope: "domestic",
    title: "水素結合性ヘキサアリールベンゼン誘導体を用いた円二色性センシング",
    authors: "○北浦 太一，王 哲，森 直", event: "日本化学会 第106春季年会", code: "E1133-2pm-01 (口頭A講演)",
    place: "日本大学理工学部船橋キャンパス"},
  { date: "2026-03-18", scope: "domestic",
    title: "架橋したカルバゾールダイマーにおけるエキシマーの円偏光発光に及ぼす分子内重なり効果",
    authors: "○久次米 智裕，王 哲，森 直", event: "日本化学会 第106春季年会", code: "E1133-2pm-02 (口頭A講演)",
    place: "日本大学理工学部船橋キャンパス"},
  { date: "2026-03-18", scope: "domestic",
    title: "ラダー型ピレン誘導体エキシマーの円偏光発光と温度効果",
    authors: "○中根 晴太，王 哲，森 直", event: "日本化学会 第106春季年会", code: "E1133-2pm-04 (口頭A講演)",
    place: "日本大学理工学部船橋キャンパス"},
  { date: "2026-03-19", scope: "domestic",
    title: "カルバゾール含有[5]ヘリセンの光学およびキロプティカル特性に及ぼすアリール置換基効果",
    authors: "○松本 紗耶未，王 哲，森 直", event: "日本化学会 第106春季年会", code: "E1121-3pm-01 (口頭A講演)",
    place: "日本大学理工学部船橋キャンパス"},

  /* 2025年光化学討論会 / 第35回基礎有機化学討論会 (September 2025) */
  { date: "2025-09-04", scope: "domestic",
    title: "ジ-N-カルバゾイルアルカンのエキシマー形成とキロプティカル特性",
    authors: "○久次米 智裕，森 直", event: "2025年光化学討論会", code: "1P67", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-04", scope: "domestic",
    title: "ビスアリール置換した[5]及び[6]ヘリセンの光学及びキロプティカル特性",
    authors: "○渡部 壮一朗，森 直", event: "2025年光化学討論会", code: "1P70", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-04", scope: "domestic",
    title: "ヘキサアリールベンゼン誘導体の動的挙動とキラルセンシングへの応用",
    authors: "○北浦 太一，森 直", event: "2025年光化学討論会", code: "1P72", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-05", scope: "domestic",
    title: "トリフェニルカルバゾールの固体発光に及ぼす置換基効果",
    authors: "○山路 稔，森 直，岡本 秀毅", event: "2025年光化学討論会", code: "2P60", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-05", scope: "domestic",
    title: "縮環キラルピレン誘導体のエキシマー形成とその光学およびキロプティカル特性",
    authors: "○中根 晴太，森 直", event: "2025年光化学討論会", code: "2P62", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-06", scope: "domestic",
    title: "TICT状態からのCPL発光の溶媒依存性",
    authors: "○荒木 保幸，Yospanya Wijak，森 直，小田 玲子", event: "2025年光化学討論会", code: "3D04", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-06", scope: "domestic",
    title: "ノルボルネン縮合ピレンのエキシプレックス形成とそのキラル発光特性",
    authors: "○小阪 龍世，森 直", event: "2025年光化学討論会", code: "3P58", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-06", scope: "domestic",
    title: "ビスアリールカルバゾール含有ヘリセンのキロプティカル特性",
    authors: "○松本 紗耶未，森 直", event: "2025年光化学討論会", code: "3P66", place: "立教大学池袋キャンパス，東京" },
  { date: "2025-09-09", scope: "domestic",
    title: "完全重なり型カルバゾルファン誘導体の合成とそれらの光物理的性質",
    authors: "○宮本 歩乃誇，正木 深雪，堀 一繁，種田 将嗣，久保埜 公二，五島 健太，谷 文都，今井 喜胤，森 直，谷 敬太",
    event: "第35回基礎有機化学討論会", code: "1P086", place: "名古屋大学東山キャンパス，名古屋" },
  { date: "2025-09-09", scope: "domestic",
    title: "動的キラル集積による円偏光発光誘導：トリフェニレン多価修飾シクロデキストリンの設計と解析",
    authors: "○髙司 健太郎，重光 孟，山田 慎太郎，酒谷 朋宏，長田 裕也，森 直，木田 敏之",
    event: "第35回基礎有機化学討論会", code: "1P129", place: "名古屋大学東山キャンパス，名古屋" },
  { date: "2025-09-10", scope: "domestic",
    title: "カルバゾロファンポリマーの合成とそれらの光物理的性質およびキロプティカル特性",
    authors: "○谷 敬太，正木 深雪，堀 一繁，久保埜 公二，辻井 敬亘，前野 綾香，保田 悠花，梶 弘典，中野 環，森 直，今井 喜胤",
    event: "第35回基礎有機化学討論会", code: "2P090", place: "名古屋大学東山キャンパス，名古屋" },

  /* 日本分析化学会 第74年会 (September 2025) */
  { date: "2025-09-24", scope: "domestic",
    title: "化学イオン化質量分析法によるキラル化合物の分析",
    authors: "○秦 子皓，角井 伸次，芝田 育也，森 直", event: "日本分析化学会 第74年会", code: "J1003", place: "北海道大学工学部" },
  { date: "2025-09-25", scope: "domestic",
    title: "芳香族フッ素化合物から CI-MSにおいて生成するアリールカチオンのメタ特異的なイオン－分子反応および DFT計算",
    authors: "○Nyamdash Bolortuya，秦 子皓，角井 伸次，芝田 育也，森 直", event: "日本分析化学会 第74年会", code: "Y2032", place: "北海道大学工学部" },


  /* International (AY2025) */
  { date: "2025-07-30", scope: "international",
    title: "Fluorescence Properties and Photostability of Imide-Fused Phenanthrylethene Derivatives: Highly-Efficient and Durable Diarylethene Fluorophore",
    authors: "○Keito NOSE, Minoru YAMAJI, Tadashi MORI, Fumito TANI, Kenta GOTO, Hideki OKAMOTO",
    event: "2nd Asian Conference for “MONODUKURI” Strategy by Synthetic Organic Chemistry (ACMS2025)", place: "Okinawa Convention Center, Okinawa, Japan" },
  { date: "2025-09-19", scope: "international",
    title: "The Role of Symmetry in the Chiroptical Properties of Double Helicenes",
    authors: "○Tadashi MORI",
    event: "International Conference on Chiroptical Science (ICCS-2025)", place: "Kyoto, Japan" },
  { date: "2025-09-19", scope: "international",
    title: "Chiroptical Properties of Carbazole-containing Bisaryl Helicenes",
    authors: "○Sayami MATSUMOTO, Zhe WANG, Tadashi MORI",
    event: "International Conference on Chiroptical Science (ICCS-2025)", place: "Kyoto, Japan" },
  { date: "2025-09-19", scope: "international",
    title: "Excimer Formation and Chiroptical Properties of Di-(N-carbazolyl)alkanes",
    authors: "○Tomohiro KUJIME, Zhe WANG, Tadashi MORI",
    event: "International Conference on Chiroptical Science (ICCS-2025)", place: "Kyoto, Japan" },
  { date: "2025-09-19", scope: "international",
    title: "Excimer formation of fused chiral pyrene derivatives and their optical and chiroptical properties",
    authors: "○Hareta NAKANE, Zhe WANG, Tadashi MORI",
    event: "International Conference on Chiroptical Science (ICCS-2025)", place: "Kyoto, Japan" },
  { date: "2025-09-19", scope: "international",
    title: "Induction of Circularly Polarized Luminescence by Multivalently Grafting of Triphenylenes onto Cyclodextrin",
    authors: "○Kentaro TAKAJI, Hajime SHIGEMITSU, Tadashi MORI, Toshiyuki KIDA",
    event: "International Conference on Chiroptical Science (ICCS-2025)", place: "Kyoto, Japan" },
  { date: "2025-11-17", scope: "international",
    title: "Small Molecule Helical Emitters",
    authors: "○Tadashi MORI",
    event: "Kickoff Core-to-Core ChiFxM, Kickoff IRP ChiFiMi, Annual KiNOA Day Joint Meeting",
    place: "University of Bordeaux, European Institute of Chemistry and Biology, Bordeaux, France" },
];
