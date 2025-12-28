import type { CollectionConfig } from "payload";

import { unrestricted } from "@/payload/access/unrestricted";
import { section } from "@/payload/blocks/section/config";

export const pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: {
      en: "Page",
      pl: "Strona",
    },
    plural: {
      en: "Pages",
      pl: "Strony",
    },
  },
  admin: {
    useAsTitle: "title",
    livePreview: {
      url: ({ data }) =>
        data.slug === "home"
          ? "http://localhost:3000"
          : `http://localhost:3000/${data.slug}`,
    },
  },
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
      label: {
        en: "Title",
        pl: "Tytuł",
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "text",
      name: "slug",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "text",
      name: "keywords",
      label: {
        en: "Keywords",
        pl: "Słowa kluczowe",
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
        pl: "Treść",
      },
      blocks: [section],
    },
  ],
};
