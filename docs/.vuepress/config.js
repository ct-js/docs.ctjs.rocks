module.exports = {
    title: 'ct.js Documentation',
    description: 'Docs, tutorials, guides',

    plugins: ['@vuepress/medium-zoom'],

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
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',

        nav: [{
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
            link: 'https://comigo.itch.io/ct/community'
        }],

        sidebar: [
            [
                '/', 'Home'
            ], {
                title: 'Introduction to JS',
                collapsable: false,
                children: [
                    'jsintro_pt1',
                    'jsintro_pt2'
                ],
            }, {
                collapsable: false,
                title: 'Tutorials',
                children: [
                    'tut-making-shooter',
                    'tut-making-platformer',
                    'tut-making-jettycat',
                    'tut-polishing-jettycat'
                ],
            }, {
                title: 'The `core` library',
                collapsable: false,
                children: [
                    'ct',
                    'ct.camera',
                    'ct.emitters',
                    ['ct.inputs', 'ct.inputs and ct.actions'],
                    'ct.res',
                    'ct.rooms',
                    'ct.sound',
                    'ct.styles',
                    'ct.types',
                    ['ct.u', 'ct.u (utilities)'],
                    ['catmoddocs.md', 'Where are the other ct.* docs?']
                ]
            }, {
                title: 'Tips & tricks',
                collapsable: false,
                children: [
                    'actions',
                    'game-and-ui-coordinates',
                    'game-pause',
                    'localstorage',
                    'viewport-management',
                    'textures-magic-properties'
                ]
            }, {
                title: 'Working with assets',
                collapsable: false,
                children: [
                    ['skeletal-animation.md', 'Using skeletal animation']
                ]
            }, {
                title: 'Extending ct.js',
                collapsable: false,
                children: [
                    ['making-mods', 'Making your own mods']
                ]
            }, {
                title: 'Troubleshooting',
                collapsable: false,
                children: [
                    ['migration-0to1', 'Migration from 0.x to 1.x'],
                    ['migration-1-2to1-3', 'Migration from 1.2 to 1.3'],
                    ['troubleshooting-teared-background', 'Background splits into squares!'],
                    ['troubleshooting-leaking-pixels', 'Textures have leaked pixels!'],
                    ['troubleshooting-sounds-not-playing', 'Sounds don\'t play at game start!']
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
                    ['/', 'Русская документация пока что неполная и может расходиться с английской!'],
                    ['ru/', 'Главная'], {
                        collapsable: false,
                        title: 'Уроки',
                        children: [
                            'ru/tut-making-platformer',
                            'ru/tut-making-shooter'
                        ],
                    }, {
                        title: 'Ядро',
                        collapsable: false,
                        children: [
                            'ru/ct',
                            ['ru/ct.inputs', 'ct.inputs и ct.actions'],
                            'ru/ct.res',
                            'ru/ct.rooms',
                            'ru/ct.sound',
                            'ru/ct.styles',
                            'ru/ct.types',
                            ['ru/ct.u', 'ct.u (утилиты)'],
                            ['ru/catmoddocs', 'Где документация к модулям?']
                        ]
                    },
                    {
                        title: 'Подсказки и советы',
                        collapsable: false,
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
                    ['/', 'A documentação em português ainda está incompleta e pode divergir do inglês!'],
                    ['pt_BR/', 'Página Inicial'], {
                        title: 'Introdução ao JS',
                        collapsable: false,
                        children: [
                            'pt_BR/jsintro_pt1',
                            'pt_BR/jsintro_pt2'
                        ],
                    }, {
                        collapsable: false,
                        title: 'Tutoriais',
                        children: [
                            'pt_BR/tut-making-shooter',
                            'pt_BR/tut-making-platformer'
                        ],
                    }, {
                        title: 'Biblioteca Principal',
                        collapsable: false,
                        children: [
                            'pt_BR/ct',
                            ['pt_BR/ct.inputs', 'ct.inputs e ct.actions'],
                            'pt_BR/ct.res',
                            'pt_BR/ct.rooms',
                            'pt_BR/ct.sound',
                            'pt_BR/ct.styles',
                            'pt_BR/ct.types',
                            ['pt_BR/ct.u', 'ct.u (Utilitários)'],
                            ['pt_BR/catmoddocs', 'Onde está a documentação para os outros módulos ct.*?']
                        ]
                    }, {
                        title: 'Dicas & truques',
                        collapsable: false,
                        children: [
                            'pt_BR/actions',
                            'pt_BR/localstorage',
                            'pt_BR/game-pause'
                        ]
                    }, {
                        title: 'Trabalhando com assets',
                        collapsable: false,
                        children: [
                            ['pt_BR/skeletal-animation.md', 'Usando animação skeletal']
                        ]
                    }, {
                        title: 'Estendendo ct.js',
                        collapsable: false,
                        children: [
                            ['pt_BR/making-mods', 'Criando os seus próprios mods']
                        ]
                    }, {
                        title: 'Solução de problemas',
                        collapsable: false,
                        children: [
                            ['pt_BR/migration-0to1', 'Migrando de 0.x para 1.x'],
                            ['pt_BR/troubleshooting-teared-background', 'Minha imagem de fundo dividida em quadrados!'],
                            ['pt_BR/troubleshooting-sounds-not-playing', 'Som não toca no início do jogo!']
                        ]
                    }
                ]
            }
        },

        lastUpdated: 'Last Updated'
    }
};
