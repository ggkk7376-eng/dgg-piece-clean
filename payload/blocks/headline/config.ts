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
    {
      type: "select",
      name: "color",
      label: {
        en: "Color Scheme",
        pl: "Kolorystyka",
      },
      defaultValue: "default",
      options: [
        {
          label: {
            en: "Default (Alternating)",
            pl: "Domyślna (Naprzemienna)",
          },
          value: "default",
        },
        {
          label: {
            en: "White",
            pl: "Biały",
          },
          value: "white",
        },
        {
          label: {
            en: "Accent (Orange)",
            pl: "Akcent (Pomarańczowy)",
          },
          value: "accent",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
