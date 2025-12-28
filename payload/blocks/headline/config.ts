import type { Block } from "payload";

export const headline: Block = {
  slug: "headline",
  labels: {
    singular: {
      en: "Headline",
      pl: "Nagłówek",
    },
    plural: {
      en: "Headlines",
      pl: "Nagłówki",
    },
  },
  fields: [
    {
      type: "array",
      name: "lines",
      required: true,
      label: {
        en: "Lines",
        pl: "Linie",
      },
      labels: {
        singular: {
          en: "Line",
          pl: "Linia",
        },
        plural: {
          en: "Lines",
          pl: "Linie",
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
          required: true,
        },
      ],
    },
  ],
};
