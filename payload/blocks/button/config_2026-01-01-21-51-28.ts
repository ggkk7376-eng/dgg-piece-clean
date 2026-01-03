import type { Block } from "payload";

export const button: Block = {
  slug: "button",
  labels: {
    singular: {
      en: "Button",
      pl: "Przycisk",
    },
    plural: {
      en: "Buttons",
      pl: "Przyciski",
    },
  },
  fields: [
    {
      type: "text",
      name: "label",
      label: {
        en: "Label",
        pl: "Etykieta",
      },
      required: true,
    },
    {
      type: "select",
      name: "type",
      label: {
        en: "Type",
        pl: "Typ",
      },
      defaultValue: "dialog",
      options: [
        {
          label: {
            en: "Page",
            pl: "Strona",
          },
          value: "page",
        },
        {
          label: {
            en: "Custom URL",
            pl: "Link zewnętrzny",
          },
          value: "custom",
        },
        {
          label: {
            en: "Dialog",
            pl: "Dialog",
          },
          value: "dialog",
        },
        {
          label: {
            en: "File",
            pl: "Plik",
          },
          value: "file",
        },
      ],
      required: true,
    },
    {
      type: "relationship",
      name: "page",
      label: {
        en: "Page",
        pl: "Strona",
      },
      relationTo: "pages",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "page",
      },
    },
    {
      type: "upload",
      name: "file",
      label: {
        en: "File",
        pl: "Plik",
      },
      relationTo: "media",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "file",
      },
    },
    {
      type: "text",
      name: "url",
      label: {
        en: "URL",
        pl: "Link",
      },
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
    },
    {
      type: "relationship",
      name: "dialog",
      label: {
        en: "Dialog",
        pl: "Dialog",
      },
      relationTo: "dialogs",
      hasMany: false,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "dialog",
        description: {
          en: "If set, pressing the button will open the selected dialog.",
          pl: "Jeśli ustawione, kliknięcie przycisku otworzy wybrany dialog.",
        },
      },
    },
  ],
};
