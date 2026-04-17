// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "news",
          description: "ニュース",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-research",
          title: "research",
          description: "研究内容",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-member",
          title: "member",
          description: "研究室構成員",
          section: "Navigation",
          handler: () => {
            window.location.href = "/member/";
          },
        },{id: "dropdown-articles",
              title: "articles",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/articles/";
              },
            },{id: "dropdown-books-amp-chapters",
              title: "books &amp; chapters",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-presentations",
              title: "presentations",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/presentations/";
              },
            },{id: "dropdown-patents",
              title: "patents",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/patents/";
              },
            },{id: "nav-links",
          title: "links",
          description: "リンク",
          section: "Navigation",
          handler: () => {
            window.location.href = "/links/";
          },
        },{id: "nav-join-us",
          title: "join us",
          description: "メンバー募集",
          section: "Navigation",
          handler: () => {
            window.location.href = "/join/";
          },
        },{id: "news-森研究室が発足しました",
          title: '森研究室が発足しました！',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_1/";
            },},{id: "news-hpを開設しました",
          title: 'HPを開設しました！',
          description: "",
          section: "News",},{id: "news-2025年光化学討論会に6名の学生が参加します",
          title: '2025年光化学討論会に6名の学生が参加します',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "news-iccs-2025に3名の学生が参加します",
          title: 'ICCS-2025に3名の学生が参加します',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_4/";
            },},{id: "news-中根-m1-がポスター発表賞を受賞しました",
          title: '中根（M1）がポスター発表賞を受賞しました！',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_5/";
            },},{id: "news-日本試薬協会危険物に関する啓発動画を公開",
          title: '日本試薬協会危険物に関する啓発動画を公開',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_6/";
            },},{id: "news-日本化学会-第106春季年会に参加します",
          title: '日本化学会 第106春季年会に参加します',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_7/";
            },},{id: "news-秦くん-d1-の論文が-anal-chem-に掲載されました",
          title: '秦くん (D1) の論文が Anal. Chem. に掲載されました！',
          description: "",
          section: "News",},{id: "news-久次米くん-卒業生-の論文が-angew-chem-int-ed-にアクセプトされました",
          title: '久次米くん (卒業生) の論文が Angew. Chem. Int. Ed. にアクセプトされました！',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
