import type { Block } from "payload";

export const statusAlert: Block = {
  slug: "status-alert",
  labels: {
    singular: {
      en: "Status Alert",
      pl: "Powiadomienie o statusie",
    },
    plural: {
      en: "Status Alerts",
      pl: "Powiadomienia o statusie",
    },
  },
  fields: [
    {
      type: "text",
      name: "color",
      required: true,
      defaultValue: "#13c71a",
      label: {
        en: "Color",
        pl: "Kolor",
      },
      admin: {
        components: {
          Field: "/payload/fields/color-field",
        },
      },
    },
    {
      type: "text",
      name: "content",
      required: true,
      label: {
        en: "Content",
        pl: "Treść",
      },
    },
  ],
};
