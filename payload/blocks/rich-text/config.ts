import type { Block } from "payload";

export const richText: Block = {
    slug: "formattedText",
    labels: {
        singular: {
            en: "Rich Text",
            pl: "Tekst Formatowany",
        },
        plural: {
            en: "Rich Texts",
            pl: "Teksty Formatowane",
        },
    },
    fields: [
        {
            name: "content",
            type: "textarea",
            label: {
                en: "Content (Supports **bold**)",
                pl: "Treść (Użyj **tekst** aby pogrubić)",
            },
            admin: {
                description: "Wpisz podwójne gwiazdki ** przed i po tekście, aby go pogrubić. Np: To jest **ważne** słowo.",
            },
        },
    ],
};
