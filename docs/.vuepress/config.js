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
    },
     '/it/': {
       lang: 'it',
       title: 'Documentazione ct.js',
       description: 'Docs, tutorial, guide',
    },
  },

  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: 'Last Updated',

    repo: "ct-js/docs.ctjs.rocks",
    repoLabel: "Contribute!",
    docsDir: "docs",
    docsBranch: 'master',
    editLinks: true,
    editLinkText: "Propose edits",

    navbar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Get ct.js",
        link: "https://ctjs.rocks",
      },
      {
        text: "Discord",
        link: "https://discord.gg/CggbPkb",
      },
      {
        text: "Forum",
        link: "https://forum.ctjs.rocks/",
      },
    ],

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
          },
          "building-your-game",
          "deployment-itch-io"
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
          }, {
            link: '/modding-events-and-injections',
            text: 'Extending ct.js code with injections'
          }, {
            link: '/modding-settings-and-extensions',
            text: 'Settings and additional fields'
          }, {
            link: '/modding-input-methods',
            text: 'Adding new input methods'
          }, {
            link: '/modding-modded-events',
            text: 'Adding new events'
          }, {
            link: '/modding-typings-and-intellisense',
            text: 'Autocompletion and IntelliSense'
          }, {
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
      "/": {
        // text for the language dropdown
        selectLanguageText: "Languages",
        // label for this locale in the language dropdown
        selectLanguageName: "English",
      },
      "/ru/": {
        // text for the language dropdown
        selectLanguageText: "Язык",
        // label for this locale in the language dropdown
        selectLanguageName: "Русский",
        // text for the edit-on-github link
        editLinkText: "Помогите сделать эту страницу лучше!",
        sidebar: [
          {
            link: "/",
            text: "Русская документация пока что неполная и может расходиться с английской!",
          },
          {
            link: "/ru/",
            text: "Главная",
          },
          {
            collapsible: false,
            text: "Уроки",
            children: ["/ru/tut-making-platformer", "/ru/tut-making-shooter"],
          },
          {
            text: "Ядро",
            collapsible: false,
            children: [
              "/ru/ct",
              {
                link: "/ru/ct.inputs",
                text: "ct.inputs и ct.actions",
              },
              "/ru/ct.res",
              "/ru/ct.rooms",
              "/ru/ct.styles",
              "/ru/ct.types",
              {
                link: "/ru/ct.u",
                text: "ct.u (утилиты)",
              },
              {
                link: "/ru/catmoddocs",
                text: "Где документация к модулям?",
              },
            ],
          },
          {
            text: "Подсказки и советы",
            collapsible: false,
            children: ["ru/actions"],
          },
        ],
        serviceWorker: {
          updatePopup: {
            message: "Доступно новое содержимое.",
            buttonText: "Обновить страницу",
          },
        },
      },
      "/pt_BR/": {
        // text for the language dropdown
        selectLanguageText: "Idioma",
        // label for this locale in the language dropdown
        selectLanguageName: "Português - Brasil",
        // text for the edit-on-github link
        editLinkText: "Ajude a melhorar esta página!",
        repoLabel: "Contribua!",
        navbar: [
          {
            text: "Início",
            link: "/",
          },
          {
            text: "Baixe o ct.js",
            link: "https://ctjs.rocks",
          },
          {
            text: "Discord",
            link: "https://discord.gg/CggbPkb",
          },
          {
            text: "Fórum",
            link: "https://forum.ctjs.rocks/",
          },
        ],
        serviceWorker: {
          updatePopup: {
            message: "Novo conteúdo está disponível.",
            buttonText: "Atualize a página",
          },
        },
        sidebar: [
          {
            link: "/",
            // text: "A documentação em português ainda está incompleta e pode divergir do inglês!",
          },
          {
            link: "/pt_BR/",
            text: "Página Inicial",
          },
          {
            text: "Introdução ao JS",
            collapsible: false,
            children: [
              "/pt_BR/jsintro_pt1",
              "/pt_BR/jsintro_pt2",
              "/pt_BR/jsintro_pt3",
            ],
          },
          {
            collapsible: false,
            text: "Tutoriais",
            children: [
              "/pt_BR/tut-making-shooter",
              "/pt_BR/tut-making-platformer",
              "/pt_BR/tut-making-jettycat",
              "/pt_BR/tut-polishing-jettycat",
              "/pt_BR/deployment-itch-io",
            ],
          },
          {
            text: "Biblioteca Principal",
            collapsible: false,
            children: [
              "/pt_BR/ct-concepts",
              "/pt_BR/ct",
              "/pt_BR/ct.backgrounds",
              "/pt_BR/ct.camera",
              "/pt_BR/ct.emitters",
              {
                link: "/pt_BR/ct.inputs",
                text: "ct.inputs e ct.actions",
              },
              "/pt_BR/ct.res",
              "/pt_BR/ct.rooms",
              "/pt_BR/ct.styles",
              "/pt_BR/ct.tilemaps",
              "/pt_BR/ct.timer",
              "/pt_BR/ct.templates",
              {
                link: "/pt_BR/ct.u",
                text: "ct.u (Utilitários)",
              },
              {
                link: "/pt_BR/catmoddocs",
                text: "Onde está a documentação para os outros módulos ct.*?",
              },
            ],
          },
          {
            text: "Classes incorporadas no ct.js",
            collapsible: false,
            children: [
              {
                link: "/pt_BR/Background",
                text: "Background",
              },
              {
                link: "/pt_BR/Copy",
                text: "Copy",
              },
              {
                link: "/pt_BR/Room",
                text: "Room",
              },
            ],
          },
          {
            text: "Trabalhando com o editor",
            collapsible: false,
            children: [
              "/pt_BR/actions",
              {
                link: "/pt_BR/room-editor",
                text: "Usando o editor de salas",
              },
              {
                link: "/pt_BR/bitmap-fonts",
                text: "Usando fontes bitmap",
              },
              {
                link: "/pt_BR/skeletal-animation",
                text: "Usando animações por ossos",
              },
              {
                link: "/pt_BR/content-subsystem",
                text: "Editor de conteúdo",
              },
              {
                link: "/pt_BR/building-your-game",
                text: "Exportando o seu jogo",
              },
            ],
          },
          {
            text: "Dicas & truques",
            collapsible: false,
            children: [
              "/pt_BR/game-and-ui-coordinates",
              "/pt_BR/movement",
              "/pt_BR/game-pause",
              "/pt_BR/localstorage",
              "/pt_BR/viewport-management",
              "/pt_BR/textures-magic-properties",
              "/pt_BR/dragging-copies",
              "/pt_BR/gamedev-resources",
            ],
          },
          {
            text: "Material técnico",
            collapsible: true,
            children: ["/pt_BR/event-order"],
          },
          {
            text: "Estendendo ct.js",
            collapsible: false,
            children: [
              {
                link: "/pt_BR/modding-structure",
                text: "Estrutura de diretórios e manifesto de módulos",
              },
              {
                link: "/pt_BR/modding-events-and-injections",
                text: "Estendendo eventos com injeções",
              },
              {
                link: "/pt_BR/modding-settings-and-extensions",
                text: "Adicionando e definindo campos",
              },
              {
                link: "/pt_BR/modding-input-methods",
                text: "Adicionando novos métodos de entrada",
              },
              {
                link: "/pt_BR/modding-adding-sound-module",
                text: "Adicionando um novo pacote de som",
              },
              {
                link: "/pt_BR/modding-typings-and-intellisense",
                text: "Autocompletação e sugestão de código",
              },
              {
                link: "/pt_BR/modding-fields-declaration",
                text: "Referência de campos",
              },
            ],
          },
          {
            text: "Solução de problemas",
            collapsible: false,
            children: [
              {
                link: "/pt_BR/migration-0to1",
                text: "Migrando da 0.x para 1.x",
              },
              {
                link: "/pt_BR/migration-1-2to1-3",
                text: "Migrando da 1.2 para 1.3",
              },
              {
                link: "/pt_BR/migration-1to2",
                text: "Migrando dat 1.x para 2.0",
              },
              {
                link: "/pt_BR/troubleshooting-teared-background",
                text: "Minha imagem de fundo dividida em quadrados!",
              },
              {
                link: "/pt_BR/troubleshooting-leaking-pixels",
                text: "Texturas têm pixels extras!",
              },
              {
                link: "/pt_BR/troubleshooting-sounds-not-playing",
                text: "Som não toca no início do jogo!",
              },
            ],
          },
        ],
      },
      "/it/": {
        // text for the language dropdown
        selectLanguageText: "Lingua",
        // label for this locale in the language dropdown
        selectLanguageName: "Italiano",
        // text for the edit-on-github link
        editLinkText: "Aiutare a migliorare questa pagina!",
        repoLabel: "Contribuisci!",
        navbar: [
          {
            text: "Home",
            link: "/",
          },
          {
            text: "Scarica ct.js",
            link: "https://ctjs.rocks",
          },
          {
            text: "Discord",
            link: "https://discord.gg/CggbPkb",
          },
          {
            text: "Forum",
            link: "https://forum.ctjs.rocks/",
          },
        ],
        sidebar: [
          {
            link: "/",
            // text: "La documentazione italiana è ancora incompleta e può differire da quella originale!",
          },
          {
            link: "/it/",
            text: "Home",
          },
          {
            text: "Introduzione a JS",
            collapsible: false,
            children: [
              "/it/jsintro_pt1",
              "/it/jsintro_pt2",
              "/it/jsintro_pt3",
            ],
          },
          {
            collapsible: false,
            text: "Tutorial",
            children: [
              "/it/tut-making-shooter",
              "/it/tut-making-platformer",
              "/it/tut-making-jettycat",
              "/it/tut-polishing-jettycat",
            ],
          }, {
            text: "Utilizzare l\'editor",
            collapsible: false,
            children: [
              "/it/actions",
              "/it/room-editor",
              "/it/building-your-game",
              "/it/deployment-itch-io",
            ],
          },
        ],
        serviceWorker: {
          updatePopup: {
            message: "Sono disponibili nuovi contenuti.",
            buttonText: "Ricarica la pagina",
          },
        },
      },
    },

    lastUpdated: "Last Updated",
  },
  markdown: {
    toc: {
      level: [2, 3, 4],
    },
  },
};
