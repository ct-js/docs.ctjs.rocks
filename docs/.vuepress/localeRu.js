export default {
    /*// text for the language dropdown
    selectLanguageText: "Язык",
    // label for this locale in the language dropdown
    selectLanguageName: "Русский",
    // text for the edit-on-github link
    editLinkText: "Помогите сделать эту страницу лучше!",*/
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
            children: [
                "/ru/tut-making-shooter",
                "/ru/tut-making-platformer"
            ],
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
};
