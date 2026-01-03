import type { CollectionConfig } from "payload";

export const users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      en: "User",
      pl: "Użytkownik",
    },
    plural: {
      en: "Users",
      pl: "Użytkownicy",
    },
  },
  auth: true,
  fields: [],
};
