export default {
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
            link: "https://discord.gg/yuvuDW5",
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
};
