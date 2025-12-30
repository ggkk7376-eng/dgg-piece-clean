import type { Block } from "payload";

export const twoColumns: Block = {
    slug: "two-columns",
    labels: {
        singular: {
            en: "Two Columns",
            pl: "Dwie Kolumny",
        },
        plural: {
            en: "Two Columns Blocks",
            pl: "Bloki Dwukolumnowe",
        },
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "leftColumn",
                    type: "textarea",
                    label: {
                        en: "Left Column Text",
                        pl: "Tekst Lewej Kolumny",
                    },
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
                {
                    name: "rightColumn",
                    type: "textarea",
                    label: {
                        en: "Right Column Text",
                        pl: "Tekst Prawej Kolumny",
                    },
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
            ],
        },
    ],
};
