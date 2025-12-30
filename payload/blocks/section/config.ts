import type { Block } from "payload";

import { button } from "../button/config";
import { carousel } from "../carousel/config";
import { contactForm } from "../contact-form/config";
import { gallery } from "../gallery/config";
import { headline } from "../headline/config";
import { statusAlert } from "../status-alert/config";
import { text } from "../text/config";
import { realizations } from "../realizations/config";
import { twoColumns } from "../two-columns/config";

export const section: Block = {
  slug: "section",
  labels: {
    singular: {
      en: "Section",
      pl: "Sekcja",
    },
    plural: {
      en: "Sections",
      pl: "Sekcje",
    },
  },
  fields: [
    {
      type: "text",
      name: "slug",
      label: {
        en: "Slug",
        pl: "Slug",
      },
      admin: {
        description: {
          en: "Allows to create a links to the section",
          pl: "Pozwala na stworzenie odnośników do sekcji",
        },
      },
    },
    {
      type: "select",
      name: "spacing",
      label: {
        en: "Block Spacing",
        pl: "Odstępy między blokami",
      },
      defaultValue: "default",
      options: [
        {
          label: {
            en: "Default",
            pl: "Standardowe",
          },
          value: "default",
        },
        {
          label: {
            en: "None (Compact)",
            pl: "Brak (Kompaktowe)",
          },
          value: "none",
        },
      ],
    },
    {
      type: "blocks",
      name: "children",
      label: {
        en: "Content",
        pl: "Zawartość",
      },
      labels: {
        singular: {
          en: "Content",
          pl: "Zawartość",
        },
        plural: {
          en: "Content",
          pl: "Zawartość",
        },
      },
      blocks: [button, carousel, headline, statusAlert, text, contactForm, gallery, realizations],
    },
  ],
};
