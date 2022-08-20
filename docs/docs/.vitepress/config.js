const slideBarJson = require('./../slidebar.json')

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: "3维学习文档", // 顶部左侧标题
  head: [
    // 设置 描述 和 关键词
    [
      "meta",
      { name: "keywords", content: "3维学习" },
    ],
    [
      "meta",
      {
        name: "description",
        content:
          "此文档主要用于3维学习",
      },
    ],
  ],
  lastUpdated: true,
  lastUpdatedText: "Last Updated",
  // 项目的根路径
  base: "/study-three-dimension/",
  // 语言
  lang: 'zh-CN',

  markdown: {
    theme: 'vitesse-light',
    lineNumbers: true
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cll123456/study-three-dimension' },
    ],
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/cll123456/common-study/edit/master/docs/docs/:path',
      text: '前往GitHub编辑此页',
    },
    // 顶部导航
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Twinkle & study-three-dimension Contributors'
    },
    // 上次编辑的日期
    lastUpdatedText: '上次更新',
    // 侧边栏
    sidebar: slideBarJson,
  }

};
