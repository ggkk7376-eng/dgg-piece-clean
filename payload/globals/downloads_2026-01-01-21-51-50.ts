import type { GlobalConfig } from "payload";

import type { Field } from "payload";

const fileFields: Field[] = [
    {
        name: "name",
        label: {
            en: "File Name",
            pl: "Nazwa Pliku",
        },
        type: "text",
        required: true,
    },
    {
        name: "file",
        label: {
            en: "File",
            pl: "Plik"
        },
        type: "upload",
        relationTo: "media",
        required: true,
    }
];

export const downloads: GlobalConfig = {
    slug: "downloads",
    access: {
        read: () => true,
        update: () => true,
    },
    label: {
        en: "Downloads",
        pl: "Do pobrania",
    },
    fields: [
        {
            name: "categories",
            label: {
                en: "Categories",
                pl: "Kategorie",
            },
            type: "array",
            fields: [
                {
                    name: "title",
                    label: {
                        en: "Category Name",
                        pl: "Nazwa Kategorii",
                    },
                    type: "text",
                    required: true,
                },
                {
                    name: "files",
                    label: {
                        en: "Files",
                        pl: "Pliki",
                    },
                    type: "array",
                    fields: fileFields,
                },
            ],
        },
    ],
};
