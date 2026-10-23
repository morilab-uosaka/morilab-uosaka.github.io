/* ==========================================================================
   news.js — THE NEWS LIST. Newest item at the TOP.
   --------------------------------------------------------------------------
   The home page shows the newest 5; news.html shows everything.

   Two kinds of item:
     short:  { id, date, text }                 one line, no separate story
     story:  { id, date, title, body }          title + full text (HTML)

   • id    — any unique word, used for links like news.html#announcement_12
   • date  — "YYYY-MM-DD"
   • text / title / body may contain HTML: <i>, <b>, <a href="…">, <ul><li>, <img>.
     Inside `backticks` you can write over several lines freely.
   Keep the  window.NEWS = [  line at the top and  ];  at the bottom.
   ========================================================================== */

window.NEWS = [
  {
    id: "announcement_11",
    date: "2026-09-30",
    text: `岸本くん (B4) の論文が <a href="publications.html#wang2026controlling"><i>Chem. Commun.</i></a> に掲載されました！`,
  },
  {
    id: "announcement_10",
    date: "2026-08-04",
    title: "台湾からの沈さんが森研に加わりました",
    body: `
      <p>国立成功大学（台湾）Prof. Wen-Hui Cheng 研究室から短期留学生・沈梓榕さんが新たにメンバーに加わりました！当研究室に約2ヶ月滞在し，光化学の研究を行います．</p>`,
  },
  {
    id: "announcement_9",
    date: "2026-04-17",
    text: `久次米くん (卒業生) の論文が <a href="publications.html#kujime2026conformational"><i>Angew. Chem. Int. Ed.</i></a> にアクセプトされました！`,
  },
  {
    id: "announcement_8",
    date: "2026-03-31",
    text: `秦くん (D1) の論文が <a href="publications.html#qin2026vinyltrimethylsilane"><i>Anal. Chem.</i></a> に掲載されました！`,
  },
  {
    id: "announcement_7",
    date: "2026-03-12",
    title: "日本化学会 第106春季年会に参加します",
    body: `
      <p>2026年3月17日（火）〜20日（金）に，日本大学理工学部船橋キャンパスで開催される<a href="https://pub.confit.atlas.jp/ja/event/csj106th">日本化学会 第106春季年会</a>に参加し，研究発表を行います．ぜひ会場にお立ち寄りのうえ，ご議論いただけますと幸いです．</p>
      <ul>
        <li><a href="https://pub.confit.atlas.jp/ja/event/csj106th/presentation/E1133-1am-02">ラダー型ピレン誘導体エキシマーの円偏光発光特性に及ぼす置換パターンの効果</a>，○茨木 諒介，王 哲，森 直，E1133-1am-02 (口頭Ａ講演)，2026年3月17日，9:30~9:40</li>
        <li><a href="https://pub.confit.atlas.jp/ja/event/csj106th/presentation/E1133-1am-05">ラダー型ピレンのエキシプレックス形成とその円偏光発光</a>，○小阪 龍世，王 哲，森 直，E1133-1am-05 (口頭Ａ講演)，2026年3月17日，10:00~10:10</li>
        <li><a href="https://pub.confit.atlas.jp/ja/event/csj106th/presentation/E1133-2pm-01">水素結合性ヘキサアリールベンゼン誘導体を用いた円二色性センシング</a>，○北浦 太一，王 哲，森 直，E1133-2pm-01 (口頭Ａ講演)，2026年3月18日，13:20~13:30</li>
        <li><a href="https://pub.confit.atlas.jp/ja/event/csj106th/presentation/E1133-2pm-02">架橋したカルバゾールダイマーにおけるエキシマーの円偏光発光に及ぼす分子内重なり効果</a>，○久次米 智裕，王 哲，森 直，E1133-2pm-02 (口頭Ａ講演)，2026年3月18日，13:30~13:40</li>
        <li><a href="https://pub.confit.atlas.jp/ja/event/csj106th/presentation/E1133-2pm-04">ラダー型ピレン誘導体エキシマーの円偏光発光と温度効果</a>，○中根 晴太，王 哲，森 直，E1133-2pm-04 (口頭Ａ講演)，2026年3月18日，13:50~14:00</li>
        <li><a href="https://pub.confit.atlas.jp/ja/event/csj106th/presentation/E1121-3pm-01">カルバゾール含有[5]ヘリセンの光学およびキロプティカル特性に及ぼすアリール置換基効果</a>，○松本 紗耶未，王 哲，森 直，E1121-3pm-01 (口頭Ａ講演)，2026年3月19日，13:00~13:10</li>
      </ul>`,
  },
  {
    id: "announcement_6",
    date: "2025-11-11",
    title: "日本試薬協会 危険物に関する啓発動画を公開",
    body: `
      <p>一般社団法人日本試薬協会より，危険物の取り扱いに関する啓発動画が公開されました．本動画には，当研究室の森直教授と学生が出演しています．ぜひご覧ください．</p>
      <ul>
        <li>一般社団法人日本試薬協会：<a href="https://www.j-shiyaku.or.jp/">https://www.j-shiyaku.or.jp/</a></li>
        <li>「学ぼう！試薬」動画：<a href="https://www.j-shiyaku.or.jp/Movie/Manabou">https://www.j-shiyaku.or.jp/Movie/Manabou</a></li>
        <li>vol. 6 消防法：<a href="https://www.j-shiyaku.or.jp/movie/movie_06.mp4">https://www.j-shiyaku.or.jp/movie/movie_06.mp4</a></li>
      </ul>`,
  },
  {
    id: "announcement_5",
    date: "2025-09-19",
    title: "中根（M1）がポスター発表賞を受賞しました！",
    body: `
      <p>中根くん (M1) が国際学会 <a href="https://www.kitasato-u.ac.jp/iccs2025/">International Conference on Chiroptical Science (ICCS-2025)</a> でポスター発表賞を受賞しました！おめでとうございます！</p>
      <p>Mr. Nakane (M1) received the Poster Presentation Award at the <a href="https://www.kitasato-u.ac.jp/iccs2025/">International Conference on Chiroptical Science (ICCS-2025)</a>! Congratulations!</p>
      <img src="assets/img/news/iccs2025-award.jpg" alt="ICCS-2025 poster award" loading="lazy" width="900" height="1600">`,
  },
  {
    id: "announcement_4",
    date: "2025-08-30",
    title: "ICCS-2025に3名の学生が参加します",
    body: `
      <p>学生3名が，9月17日（水）〜19日（金）の3日間，京都市歴彩館で開催される<a href="https://www.kitasato-u.ac.jp/iccs2025/">International Conference on Chiroptical Science (ICCS-2025)</a>に参加します．ぜひ会場にお立ち寄りのうえ，ご議論いただけますと幸いです．</p>
      <ul>
        <li>Chiroptical Properties of Carbazole-containing Bisaryl Helicenes</li>
        <li>Excimer Formation and Chiroptical Properties of Di-(N-carbazolyl)alkanes</li>
        <li>Excimer formation of fused chiral pyrene derivatives and their optical and chiroptical properties</li>
      </ul>`,
  },
  {
    id: "announcement_3",
    date: "2025-08-30",
    title: "2025年光化学討論会に6名の学生が参加します",
    body: `
      <p>学生6名が，9月4日（木）〜6日（土）の3日間，立教大学池袋キャンパスで開催される<a href="https://photochemistry.jp/2025/index.html">2025年光化学討論会</a>に参加します．ぜひ会場にお立ち寄りのうえ，ご議論いただけますと幸いです．</p>
      <ul>
        <li>[1P67] ジ-N-カルバゾイルアルカンのエキシマー形成とキロプティカル特性</li>
        <li>[1P70] ビスアリール置換した[5]及び[6]ヘリセンの光学及びキロプティカル特性</li>
        <li>[1P72] ヘキサアリールベンゼン誘導体の動的挙動とキラルセンシングへの応用</li>
        <li>[2P62] 縮環キラルピレン誘導体のエキシマー形成とその光学およびキロプティカル特性</li>
        <li>[3P58] ノルボルネン縮合ピレンのエキシプレックス形成とそのキラル発光特性</li>
        <li>[3P66] ビスアリールカルバゾール含有ヘリセンのキロプティカル特性</li>
      </ul>`,
  },
  {
    id: "announcement_2",
    date: "2025-08-07",
    text: `HPを開設しました！`,
  },
  {
    id: "announcement_1",
    date: "2025-04-01",
    title: "森研究室が発足しました！",
    body: `<p>本学環境安全研究管理センターにて新たに森研究室が発足しました！</p>`,
  },
];
