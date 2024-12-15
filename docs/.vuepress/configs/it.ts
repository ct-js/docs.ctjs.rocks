import { navbar, sidebar } from 'vuepress-theme-hope';

export const itNavbar = navbar([
  {
    text: 'Home',
    link: '/it/',
  },
  {
    text: 'Scarica ct.js',
    link: 'https://ctjs.rocks',
  },
  {
    text: 'Discord',
    link: 'https://discord.gg/yuvuDW5',
  },
  {
    text: 'Forum',
    link: 'https://forum.ctjs.rocks/',
  },
]);

export const itSidebar = sidebar([
  {
    text: 'Home',
    link: '/it/',
  },
  {
    text: 'Introduzione a JS',
    collapsible: false,
    children: ['/it/jsintro_pt1', '/it/jsintro_pt2', '/it/jsintro_pt3'],
  },
  {
    collapsible: false,
    text: 'Tutorial',
    children: [
      '/it/tut-making-shooter',
      '/it/tut-making-platformer',
      '/it/tut-making-jettycat',
      '/it/tut-polishing-jettycat',
    ],
  },
  {
    text: "Utilizzare l'editor",
    collapsible: false,
    children: [
      '/it/actions',
      '/it/room-editor',
      '/it/bitmap-fonts',
      '/it/skeletal-animation',
      '/it/content-subsystem',
      '/it/building-your-game',
      '/it/deployment-itch-io',
    ],
  },
]);
