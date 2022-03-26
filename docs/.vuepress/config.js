module.exports = {
  title: 'ct.js Documentation',
  description: 'Docs, tutorials, guides',

  plugins: [
      '@vuepress/plugin-medium-zoom',
      ['@vuepress/plugin-search', {
          maxSuggestions: 15
      }]
  ],

  head: [
      ['script', {
          src: '/themeSwitcher.js'
      }]
  ],

  locales: {
      '/': {
          lang: 'en-US', // this will be set as the lang attribute on <html>
          title: 'ct.js Documentation',
          description: 'Docs, tutorials, guides',
      },
      '/ru/': {
          lang: 'ru',
          title: 'Документация к игровому движку ct.js',
          description: 'Референсы, туториалы, гайды'
      },
      '/pt_BR/': {
          lang: 'pt-BR',
          title: 'Documentação ct.js',
          description: 'Docs, tutoriais, guias'
      }
  },

  themeConfig: {
      logo: '/assets/img/logo.png',
      lastUpdated: 'Last Updated',

      repo: 'https://github.com/CosmoMyzrailGorynych/docs.ctjs.rocks',
      repoLabel: 'Contribute!',
      docsDir: 'docs',
      editLinks: true,
      editLinkText: 'Propose edits',

      navbar: [{
          text: 'Home',
          link: '/'
      }, {
          text: 'Get ct.js',
          link: 'https://ctjs.rocks'
      }, {
          text: 'Discord',
          link: 'https://discord.gg/CggbPkb'
      }, {
          text: 'Forum',
          link: 'https://forum.ctjs.rocks/'
      }],

      sidebarDepth: 1,
      sidebar: [
          [
              '/', 'Home'
          ], {
              text: 'Introduction to JS',
              collapsible: false,
              children: [
                  'jsintro_pt1',
                  'jsintro_pt2',
                  'jsintro_pt3'
              ],
          }, {
              collapsible: false,
              text: 'Tutorials',
              children: [
                  'tut-making-shooter',
                  'tut-making-platformer',
                  'tut-making-jettycat',
                  'tut-polishing-jettycat'
              ],
          }, {
              text: 'The `core` library',
              collapsible: false,
              children: [
                  'ct-concepts',
                  'ct',
                  'ct.backgrounds',
                  'ct.camera',
                  'ct.emitters',
                  {
                      link: '/ct.inputs',
                      text: 'ct.inputs and ct.actions'
                  },
                  'ct.res',
                  'ct.rooms',
                  'ct.styles',
                  'ct.tilemaps',
                  'ct.timer',
                  'ct.templates',
                  {
                      link: '/ct.u',
                      text: 'ct.u (utilities)'
                  },
                  {
                      link: '/catmoddocs.md',
                      text: 'Where are the other ct.* docs?'
                  }
              ]
          }, {
              text: 'Built-in ct.js classes',
              collapsible: false,
              children: [
                  {
                      link: '/Background',
                      text: 'Background'
                  }, {
                      link: '/Copy',
                      text: 'Copy'
                  }, {
                      link: '/Room',
                      text: 'Room'
                  }
              ]
          }, {
              text: 'Working with the editor',
              collapsible: false,
              children: [
                  'actions',
                  {
                      link: '/room-editor',
                      text: 'Using the room editor'
                  },
                  {
                      link: '/bitmap-fonts',
                      text: 'Using bitmap fonts'
                  },
                  {
                      link: '/skeletal-animation',
                      text: 'Using skeletal animation'
                  },
                  {
                      link: '/content-subsystem',
                      text: 'Content editor'
                  }
              ]
          }, {
              text: 'Tips & tricks',
              collapsible: false,
              children: [
                  'game-and-ui-coordinates',
                  'movement',
                  'game-pause',
                  'localstorage',
                  'viewport-management',
                  'textures-magic-properties',
                  'dragging-copies',
                  'gamedev-resources'
              ]
          }, {
              text: 'Technical stuff',
              collapsible: true,
              children: [
                  '/event-order'
              ]
          }, {
              text: 'Modding ct.js',
              collapsible: true,
              children: [
                  {
                      link: '/modding-structure',
                      text: 'Directory structure and module\'s manifest'
                  },  {
                      link: '/modding-events-and-injections',
                      text: 'Extending events with injections'
                  },  {
                      link: '/modding-settings-and-extensions',
                      text: 'Settings and additional fields'
                  },  {
                      link: '/modding-input-methods',
                      text: 'Adding new input methods'
                  },  {
                      link: '/modding-adding-sound-module',
                      text: 'Adding a new sound package'
                  },  {
                      link: '/modding-typings-and-intellisense',
                      text: 'Autocompletion and IntelliSense'
                  },  {
                      link: '/modding-fields-declaration',
                      text: 'Fields reference'
                  }
              ]
          }, {
              text: 'Troubleshooting',
              collapsible: false,
              children: [
                  {
                      link: '/migration-0to1',
                      text: 'Migration from 0.x to 1.x'
                  }, {
                      link: '/migration-1-2to1-3',
                      text: 'Migration from 1.2 to 1.3'
                  }, {
                      link: '/migration-1to2',
                      text: 'Migration from 1.x to 2.0'
                  }, {
                      link: '/troubleshooting-teared-background',
                      text: 'Background splits into squares!'
                  }, {
                      link: '/troubleshooting-leaking-pixels',
                      text: 'Textures have leaked pixels!'
                  }, {
                      link: '/troubleshooting-sounds-not-playing',
                      text: 'Sounds don\'t play at game start!'
                  }
              ]
          }
      ],

      locales: {
          '/': {
              // text for the language dropdown
              selectText: 'Languages',
              // label for this locale in the language dropdown
              label: 'English',
          },
          '/ru/': {
              // text for the language dropdown
              selectText: 'Язык',
              // label for this locale in the language dropdown
              label: 'Русский',
              // text for the edit-on-github link
              editLinkText: 'Помогите сделать эту страницу лучше!',
              sidebar: [
                  {
                      link: '/',
                      text: 'Русская документация пока что неполная и может расходиться с английской!'
                  }, {
                      link: '/ru/',
                      text: 'Главная'
                  }, {
                      collapsible: false,
                      text: 'Уроки',
                      children: [
                          '/ru/tut-making-platformer',
                          '/ru/tut-making-shooter'
                      ],
                  }, {
                      text: 'Ядро',
                      collapsible: false,
                      children: [
                          '/ru/ct',
                          {
                              link: '/ru/ct.inputs',
                              text: 'ct.inputs и ct.actions'
                          },
                          '/ru/ct.res',
                          '/ru/ct.rooms',
                          '/ru/ct.styles',
                          '/ru/ct.types',
                          {
                              link: '/ru/ct.u',
                              text: 'ct.u (утилиты)'
                          }, {
                              link: '/ru/catmoddocs',
                              text: 'Где документация к модулям?'
                          }
                      ]
                  },
                  {
                      text: 'Подсказки и советы',
                      collapsible: false,
                      children: [
                          'ru/actions'
                      ]
                  }
              ],
              serviceWorker: {
                  updatePopup: {
                      message: "Доступно новое содержимое.",
                      buttonText: "Обновить страницу"
                  }
              }
          },
          '/pt_BR/': {
              // text for the language dropdown
              selectText: 'Linguagens',
              // label for this locale in the language dropdown
              label: 'Português - Brasil',
              // text for the edit-on-github link
              editLinkText: 'Ajude a melhorar esta página!',
              sidebar: [
                  {
                      link: '/',
                      text: 'A documentação em português ainda está incompleta e pode divergir do inglês!'
                  }, {
                      link: '/pt_BR/',
                      text: 'Página Inicial'
                  }, {
                      text: 'Introdução ao JS',
                      collapsible: false,
                      children: [
                          '/pt_BR/jsintro_pt1',
                          '/pt_BR/jsintro_pt2'
                      ],
                  }, {
                      collapsible: false,
                      text: 'Tutoriais',
                      children: [
                          '/pt_BR/tut-making-shooter',
                          '/pt_BR/tut-making-platformer'
                      ],
                  }, {
                      text: 'Biblioteca Principal',
                      collapsible: false,
                      children: [
                          '/pt_BR/ct',
                          {
                              link: '/pt_BR/ct.inputs',
                              text: 'ct.inputs e ct.actions'
                          },
                          '/pt_BR/ct.res',
                          '/pt_BR/ct.rooms',
                          '/pt_BR/ct.styles',
                          '/pt_BR/ct.types',
                          {
                              link: '/pt_BR/ct.u',
                              text: 'ct.u (Utilitários)'
                          },  {
                              link: '/pt_BR/catmoddocs',
                              text: 'Onde está a documentação para os outros módulos ct.*?'
                          }
                      ]
                  }, {
                      text: 'Dicas & truques',
                      collapsible: false,
                      children: [
                          '/pt_BR/actions',
                          '/pt_BR/localstorage',
                          '/pt_BR/game-pause'
                      ]
                  }, {
                      text: 'Trabalhando com assets',
                      collapsible: false,
                      children: [
                          {
                              link: '/pt_BR/skeletal-animation.md',
                              text: 'Usando animação skeletal'
                          }
                      ]
                  }, {
                      text: 'Estendendo ct.js',
                      collapsible: false,
                      children: [
                          {
                              link: '/pt_BR/making-mods',
                              text: 'Criando os seus próprios mods'
                          }
                      ]
                  }, {
                      text: 'Solução de problemas',
                      collapsible: false,
                      children: [
                          {
                              link: '/pt_BR/migration-0to1',
                              text: 'Migrando de 0.x para 1.x'
                          }, {
                              link: '/pt_BR/troubleshooting-teared-background',
                              text: 'Minha imagem de fundo dividida em quadrados!'
                          }, {
                              link: '/pt_BR/troubleshooting-sounds-not-playing',
                              text: 'Som não toca no início do jogo!'
                          }
                      ]
                  }
              ]
          }
      },

      lastUpdated: 'Last Updated'
  }
};
