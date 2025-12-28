import type { CollectionConfig } from "payload";

import { unrestricted } from "@/payload/access/unrestricted";
import { contactForm } from "@/payload/blocks/contact-form/config";

export const dialogs: CollectionConfig = {
  slug: "dialogs",
  access: {
    read: unrestricted,
  },
  labels: {
    singular: {
      en: "Dialog",
      pl: "Dialog",
    },
    plural: {
      en: "Dialogs",
      pl: "Dialogi",
    },
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      type: "text",
      name: "title",
      label: {
        en: "Title",
        pl: "Tytuł",
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "textarea",
      name: "description",
      label: {
        en: "Description",
        pl: "Opis",
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "blocks",
      name: "content",
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
      blocks: [contactForm],
    },
  ],
};
