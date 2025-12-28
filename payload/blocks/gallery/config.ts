import type { Block } from "payload";

export const gallery: Block = {
  slug: "gallery",
  labels: {
    singular: {
      en: "Gallery",
      pl: "Galeria",
    },
    plural: {
      en: "Galleries",
      pl: "Galerie",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        pl: "Tytuł",
      },
    },
    {
      name: "items",
      type: "array",
      label: {
        en: "Items",
        pl: "Elementy",
      },
      fields: [
        {
          name: "images",
          type: "upload",
          relationTo: "media",
          required: true,
          hasMany: true,
          label: {
            en: "Images",
            pl: "Zdjęcia",
          },
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: {
            en: "Title",
            pl: "Nazwa",
          },
        },
        {
          name: "category",
          type: "select",
          options: [
            { label: { en: "Kilns", pl: "Piece" }, value: "kilns" },
            { label: { en: "Controllers", pl: "Sterowniki" }, value: "controllers" },
            { label: { en: "Accessories", pl: "Akcesoria/Spirale" }, value: "accessories" },
            { label: { en: "Other", pl: "Inne" }, value: "other" },
          ],
          defaultValue: "kilns",
          required: true,
          label: {
            en: "Category",
            pl: "Kategoria",
          },
        },
        {
          name: "price",
          type: "text",
          required: false,
          label: {
            en: "Price",
            pl: "Cena",
          },
          admin: {
            description: {
              en: "e.g. '$100', 'from $50'",
              pl: "np. '100 zł', 'od 50 zł'",
            },
          },
        },
        {
          name: "description",
          type: "textarea",
          label: {
            en: "Description",
            pl: "Opis",
          },
        },
      ],
    },
  ],
};
