import type { CollectionConfig } from "payload";

import { unrestricted } from "@/payload/access/unrestricted";

export const media: CollectionConfig = {
  slug: "media",
  access: {
    read: unrestricted,
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "large",
        width: 1600,
        // Zachowaj proporcje (brak height)
        position: "centre",
      },
    ],
  },
  fields: [
    {
      type: "text",
      name: "alt",
      label: {
        en: "Alt text",
        pl: "Tekst alternatywny",
      },
    },
  ],
};
