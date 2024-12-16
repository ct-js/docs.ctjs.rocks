import {
  enNavbar,
  enSidebar,
  ptBRNavbar,
  ptBRSidebar,
  ruNavbar,
  ruSidebar,
} from './configs/index.js';
import localeIt, { itNavbar, itSidebar } from './configs/it.js';
import { hopeTheme } from 'vuepress-theme-hope';

export default hopeTheme({
  hostname: 'https://docs.ctjs.rocks',
  logo: '/assets/img/logo.png',
  repo: 'https://github.com/ct-js/docs.ctjs.rocks',
  docsRepo: 'https://github.com/ct-js/docs.ctjs.rocks',
  docsBranch: 'master',
  docsDir: '/docs',
  titleIcon: false,
  darkmode: 'switch',
  iconAssets: 'fontawesome',

  locales: {
    '/': {
      navbar: enNavbar,
      sidebar: enSidebar,
    },

    '/pt_BR/': {
      navbar: ptBRNavbar,

      sidebar: ptBRSidebar,

      repoLabel: 'Contribua!',

      navbarLocales: {
        langName: 'Idioma',
        selectLangAriaLabel: 'Português - Brasil',
      },

      metaLocales: {
        editLink: 'Ajude a melhorar esta página!',
      },
    },

    '/ru/': {
      navbar: ruNavbar,
      sidebar: ruSidebar,
    },

    '/it/': {
      navbar: itNavbar,

      sidebar: itSidebar,

      repoLabel: 'Contribuisci!',

      navbarLocales: {
        langName: 'Italiano',
      },

      metaLocales: {
        // text for the edit-on-github link
        editLink: 'Aiutare a migliorare questa pagina!',
      },
    },
  },

  headerDepth: 2,

  markdown: {
    gfm: true,
    codeTabs: true,
    tabs: true,
    imgLazyload: true,
    sup: true,
    sub: true,
    tasklist: true,
    align: true,
  },

  plugins: {
    comment: {
      provider: 'Giscus',
      repo: 'ct-js/docs.ctjs.rocks',
      repoId: 'MDEwOlJlcG9zaXRvcnkxNzE2MDQ5MDE=',
      category: "Pages' discussions",
      categoryId: 'DIC_kwDOCjp7pc4CTa2u',
      reactionsEnabled: false,
    },

    search: {
      maxSuggestions: 10,
    },

    readingTime: false,
  },
});
