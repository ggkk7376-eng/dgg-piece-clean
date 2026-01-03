import type { Block } from "payload";

export const realizations: Block = {
    slug: "realizations",
    labels: {
        singular: {
            en: "Realizations Gallery",
            pl: "Galeria Realizacji",
        },
        plural: {
            en: "Realizations Galleries",
            pl: "Galerie Realizacji",
        },
    },
    fields: [
        {
            name: "triggerLabel",
            type: "text",
            label: {
                en: "Button Label",
                pl: "Tekst przycisku",
            },
            defaultValue: "Zobacz Realizacje",
            required: true,
        },
        {
            name: "slides",
            type: "array",
            label: {
                en: "Slides",
                pl: "Slajdy",
            },
            minRows: 1,
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                    label: {
                        en: "Image",
                        pl: "Zdjęcie",
                    },
                },
                {
                    name: "description",
                    type: "text",
                    label: {
                        en: "Description",
                        pl: "Podpis",
                    },
                },
            ],
        },
    ],
};
