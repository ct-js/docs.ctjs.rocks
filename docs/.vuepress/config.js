module.exports = {
    title: 'ct.js Documentation',
    description: 'Docs, tutorials, guides',

    plugins: ['@vuepress/pwa'],

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
                    'tut-making-platformer'
                ],
            }, {
                title: 'The `core` library',
                collapsable: false,
                children: [
                    'ct',
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
                    'localstorage',
                    'viewport-management'
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
                    ['troubleshooting-teared-background', 'Background splits into squares!']
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
            }
        },

        lastUpdated: 'Last Updated'
    }
};