import localeRu from './localeRu';
import localePtBR from './localePtBR';
import localeIt from './localeIt';

export default {
    hostname: 'https://docs.ctjs.rocks',
    logo: '/assets/img/logo.png',
    repo: 'https://github.com/ct-js/docs.ctjs.rocks',
    docsRepo: 'https://github.com/ct-js/docs.ctjs.rocks',
    docsBranch: 'master',
    docsDir: '/docs',
    titleIcon: false,
    darkmode: 'switch',
    iconAssets: 'fontawesome',
    plugins: {
        mdEnhance: {
            // Markdown options
            gfm: true,
            container: true,
            tabs: true,
            codetabs: true,
            sup: true,
            sub: true,
            tasklist: true,

            imageLazyload: true,
            linkCheck: true
        },
        comment: {
            provider: 'Giscus',
            repo: 'ct-js/docs.ctjs.rocks',
            repoId: 'MDEwOlJlcG9zaXRvcnkxNzE2MDQ5MDE=',
            category: 'Pages\' discussions',
            categoryId: 'DIC_kwDOCjp7pc4CTa2u',
            reactionsEnabled: false
        }
    },

    locales: {
        "/": {
            // text for the language dropdown
            selectLanguageText: "Languages",
            // label for this locale in the language dropdown
            selectLanguageName: "English",
        },
        "/ru/": localeRu,
        "/pt_BR/": localePtBR,
        "/it/": localeIt
    },

    navbarIcon: true,
    navbar: [
        {
            text: "Home",
            link: "/",
            icon: 'home'
        },
        {
            text: "Get ct.js",
            link: "https://ctjs.rocks",
            icon: 'download'
        },
        {
            text: "Discord",
            link: "https://discord.gg/CggbPkb",
            icon: 'user-group'
        },
        {
            text: "Forum",
            link: "https://forum.ctjs.rocks/",
            icon: 'comments'
        },
    ],

    headerDepth: 2,
    sidebarIcon: true,
    sidebar: [
        {
            link: '/',
            text: 'Home',
            icon: 'home'
        }, {
            text: 'Introduction to JS',
            collapsible: false,
            icon: 'book',
            prefix: '/learn-js/',
            children: [
                'jsintro_pt1',
                'jsintro_pt2',
                'jsintro_pt3'
            ],
        }, {
            collapsible: false,
            text: 'Tutorials',
            icon: 'arrows-turn-to-dots',
            prefix: '/tutorials/',
            children: [
                'making-games-shooter',
                'making-games-platformer',
                'making-games-jettycat',
                'making-games-polishing-jettycat'
            ],
        }, {
            text: 'The `core` library',
            collapsible: false,
            icon: 'certificate',
            children: [
                'ct-concepts',
                'backgrounds',
                'behaviors',
                'camera',
                'emitters',
                {
                    link: '/inputs',
                    text: 'inputs and actions'
                },
                'res',
                'rooms',
                'settings',
                'sounds',
                'styles',
                'tilemaps',
                'timer',
                'templates',
                {
                    link: '/u',
                    text: 'u (utilities)'
                },
                {
                    link: '/catmoddocs.md',
                    text: 'Where are the other ct.* docs?'
                }
            ]
        }, {
            text: 'Built-in ct.js classes',
            collapsible: false,
            icon: 'icons',
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
            icon: 'laptop-code',
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
                    link: '/content-subsystem',
                    text: 'Content editor'
                },
                "building-your-game",
                "deployment-itch-io"
            ]
        }, {
            text: 'Tips & tricks',
            collapsible: false,
            icon: 'lightbulb',
            prefix: "/tips-n-tricks/",
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
            icon: 'gears',
            children: [
                '/event-order'
            ]
        }, {
            text: 'Modding ct.js',
            collapsible: true,
            icon: 'plug',
            prefix: "/modding-ctjs/",
            children: [
                {
                    link: 'mod-structure',
                    text: 'Directory structure and module\'s manifest'
                }, {
                    link: 'events-and-injections',
                    text: 'Extending ct.js code with injections'
                }, {
                    link: 'settings-and-extensions',
                    text: 'Settings and additional fields'
                }, {
                    link: 'input-methods',
                    text: 'Adding new input methods'
                }, {
                    link: 'modded-events',
                    text: 'Adding new events'
                }, {
                    link: 'typings-and-intellisense',
                    text: 'Autocompletion and IntelliSense'
                }, {
                    link: 'fields-declaration',
                    text: 'Fields reference'
                }
            ]
        }, {
            text: 'Troubleshooting',
            collapsible: false,
            icon: 'hand',
            prefix: "/troubleshooting/",
            children: [
                {
                    link: 'migration-0to1',
                    text: 'Migration from 0.x to 1.x'
                }, {
                    link: 'migration-1-2to1-3',
                    text: 'Migration from 1.2 to 1.3'
                }, {
                    link: 'migration-1to2',
                    text: 'Migration from 1.x to 2.0'
                }, {
                    link: 'migration-2to3',
                    text: 'Migration from 2.x to 3.0'
                }, {
                    link: 'migration-3to4',
                    text: 'Migration from 3.x to 4.0'
                }, {
                    link: 'teared-background',
                    text: 'Background splits into squares!'
                }, {
                    link: 'leaking-pixels',
                    text: 'Textures have leaked pixels!'
                }, {
                    link: 'sounds-not-playing',
                    text: 'Sounds don\'t play at game start!'
                }
            ]
        }
    ]
};