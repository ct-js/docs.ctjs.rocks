export default {
    navbarLocales: {
      langName: 'Italiano'
    },
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
                "/it/bitmap-fonts",
                "/it/skeletal-animation",
                "/it/content-subsystem",
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
};
