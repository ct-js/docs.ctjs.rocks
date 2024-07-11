export default {
    /*// text for the language dropdown
    selectLanguageText: "Язык",
    // label for this locale in the language dropdown
    selectLanguageName: "Русский",
    // text for the edit-on-github link
    editLinkText: "Помогите сделать эту страницу лучше!",*/
    navbar: [
        {
            text: "Главная",
            link: "/ru/",
            icon: 'home'
        },
        {
            text: "Скачать ct.js",
            link: "https://ctjs.rocks/ru/download/",
            icon: 'download'
        },
        {
            text: "Discord",
            link: "https://comigo.games/rudiscord",
            icon: 'user-group'
        },
        {
            text: "Форум",
            link: "https://forum.ctjs.rocks/",
            icon: 'comments'
        },
    ],
    sidebar: [
        {
            link: '/',
            text: 'Главная',
            icon: 'home'
        }, {
            text: 'Учим Котомяту (Catnip)',
            collapsible: true,
            icon: 'book',
            prefix: '/ru/learn-catnip/',
            children: [
                'introduction',
                'conditions-and-loops',
                'working-with-copies'
            ]
        }, {
            text: 'Учим JavaScript',
            collapsible: true,
            icon: 'book',
            prefix: '/ru/learn-js/',
            children: [
                'jsintro_pt1',
                'jsintro_pt2',
                'jsintro_pt3'
            ],
        }, {
            collapsible: false,
            text: 'Туториалы',
            icon: 'arrows-turn-to-dots',
            prefix: '/ru/tutorials/',
            children: [
                'making-games-shooter',
                'making-games-platformer',
                'making-games-jettycat',
                'making-games-polishing-jettycat'
            ],
        }, {
            text: 'Основная библиотека',
            collapsible: false,
            icon: 'certificate',
            prefix: '/ru/',
            children: [
                'ct-concepts',
                'backgrounds',
                'behaviors',
                'camera',
                'emitters',
                {
                    link: '/ru/inputs',
                    text: 'inputs и actions'
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
                    link: 'u',
                    text: 'u (утилиты)'
                },
                {
                    link: 'catmoddocs',
                    text: 'Где документация к котомодам?'
                }
            ]
        }, {
            text: 'Встроенные классы',
            collapsible: false,
            icon: 'icons',
            prefix: '/ru/',
            children: [
                {
                    link: 'background',
                    text: 'Background (фон)'
                }, {
                    link: 'copy',
                    text: 'Copy (копия)'
                }, {
                    link: 'room',
                    text: 'Room (комната)'
                }
            ]
        }, {
            text: 'Работа с редактором',
            collapsible: false,
            icon: 'laptop-code',
            prefix: '/ru/',
            children: [
                'actions',
                {
                    link: 'room-editor',
                    text: 'Работа с редактором комнат'
                },
                {
                    link: 'bitmap-fonts',
                    text: 'Использование битмап-шрифтов'
                },
                {
                    link: 'content-subsystem',
                    text: 'Подсистема контента'
                },
                "enumerations",
                "building-your-game",
                "deployment-itch-io"
            ]
        }, {
            text: 'Подсказки и приёмы',
            collapsible: false,
            icon: 'lightbulb',
            prefix: '/ru/tips-n-tricks/',
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
            prefix: '/ru/',
            text: 'Техническая информация',
            collapsible: true,
            icon: 'gears',
            children: [
                'event-order'
            ]
        }, {
            text: 'Моддинг ct.js',
            collapsible: true,
            icon: 'plug',
            prefix: "/ru/modding-ctjs/",
            children: [
                {
                    link: 'mod-structure',
                    text: 'Структура модуля и его манифест'
                }, {
                    link: 'events-and-injections',
                    text: 'Расширение кода ct.js инъекциями'
                }, {
                    link: 'settings-and-extensions',
                    text: 'Добавление настроек и дополнительных полей'
                }, {
                    link: 'input-methods',
                    text: 'Добавление новых методов ввода'
                }, {
                    link: 'modded-events',
                    text: 'Добавление новых событий'
                }, {
                    link: 'typings-and-intellisense',
                    text: 'Автозаполнение и IntelliSense'
                }, {
                    link: 'fields-declaration',
                    text: 'Справка по полям ввода'
                }
            ]
        }, {
            text: 'В случае неполадок',
            collapsible: false,
            icon: 'hand',
            prefix: "/ru/troubleshooting/",
            children: [
                {
                    link: 'migration-0to1',
                    text: 'Миграция с 0.x на 1.x'
                }, {
                    link: 'migration-1-2to1-3',
                    text: 'Миграция с 1.2 на 1.3'
                }, {
                    link: 'migration-1to2',
                    text: 'Миграция с 1.x на 2.0'
                }, {
                    link: 'migration-2to3',
                    text: 'Миграция с 2.x на 3.0'
                }, {
                    link: 'migration-3to4',
                    text: 'Миграция с 3.x на 4.0'
                }, {
                    link: 'migration-4to5',
                    text: 'Миграция с 4.0 на 5.0'
                }, {
                    link: 'teared-background',
                    text: 'Фоны разваливаются на квадраты!'
                }, {
                    link: 'leaking-pixels',
                    text: 'У текстур видны странные края!'
                }, {
                    link: 'sounds-not-playing',
                    text: 'Звуки не проигрываются на старте!'
                }
            ]
        }
    ],
    serviceWorker: {
        updatePopup: {
            message: "Доступно новое содержимое.",
            buttonText: "Обновить страницу",
        },
    },
};
