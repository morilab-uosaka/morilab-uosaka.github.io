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
        },{id: "nav-publications",
          title: "publications",
          description: "公表論文",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-gallery",
          title: "gallery",
          description: "ギャラリー",
          section: "Navigation",
          handler: () => {
            window.location.href = "/gallery/";
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
