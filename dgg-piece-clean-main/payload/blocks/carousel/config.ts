import type { Block } from "payload";

export const carousel: Block = {
  slug: "carousel",
  labels: {
    singular: {
      en: "Carousel",
      pl: "Karuzela",
    },
    plural: {
      en: "Carousels",
      pl: "Karuzele",
    },
  },
  fields: [
    {
      type: "text",
      name: "text",
      label: {
        en: "Text",
        pl: "Tekst",
      },
    },
    {
      type: "upload",
      name: "images",
      relationTo: "media",
      hasMany: true,
      label: {
        en: "Images",
        pl: "Zdjęcia",
      },
    },
  ],
};
