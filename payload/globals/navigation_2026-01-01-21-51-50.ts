import type { GlobalConfig } from "payload";

export const navigation: GlobalConfig = {
    slug: "navigation",
    access: {
        read: () => true,
        update: () => true,
    },
    label: {
        en: "Navigation",
        pl: "Nawigacja",
    },
    fields: [
        {
            name: "whyUsLabel",
            label: {
                en: "Label for 'Why Us'",
                pl: "Etykieta przycisku 'Why Us' (/main#why-us)",
            },
            type: "text",
            defaultValue: "Why Us",
        },
        {
            name: "missionLabel",
            label: {
                en: "Label for 'Mission'",
                pl: "Etykieta przycisku 'Mission' (/main#mission)",
            },
            type: "text",
            defaultValue: "Mission",
        },
        {
            name: "worksLabel",
            label: {
                en: "Label for 'Works'",
                pl: "Etykieta przycisku 'Works' (/main#works)",
            },
            type: "text",
            defaultValue: "Works",
        },
        {
            name: "servicesLabel",
            label: {
                en: "Label for 'Services'",
                pl: "Etykieta przycisku 'Services' (/main#services)",
            },
            type: "text",
            defaultValue: "Services",
        },
        {
            name: "contactLabel",
            label: {
                en: "Label for 'Contact'",
                pl: "Etykieta przycisku 'Contact' (/main#contact)",
            },
            type: "text",
            defaultValue: "Contact",
        },
    ],
};
