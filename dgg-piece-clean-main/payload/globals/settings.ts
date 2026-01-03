import type { GlobalConfig } from "payload";

export const settings: GlobalConfig = {
  slug: "settings",
  access: {
    read: () => true,
  },
  label: {
    en: "Settings",
    pl: "Ustawienia",
  },
  fields: [
    {
      type: "group",
      name: "email",
      label: {
        en: "Email",
        pl: "Email",
      },
      admin: {
        description: {
          en: "Email settings",
          pl: "Ustawienia funkcji wysyłania emaili",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "host",
              label: {
                en: "Address",
                pl: "Adres",
              },
              required: true,
              admin: {
                description: {
                  en: "SMTP server address",
                  pl: "Adres serwera SMTP",
                },
              },
            },
            {
              type: "number",
              name: "port",
              defaultValue: 587,
              label: {
                en: "Port",
                pl: "Port",
              },
              required: true,
              admin: {
                description: {
                  en: "SMTP server port",
                  pl: "Port serwera SMTP",
                },
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "username",
              label: {
                en: "Username",
                pl: "Nazwa użytkownika",
              },
              required: true,
              admin: {
                description: {
                  en: "SMTP server username",
                  pl: "Nazwa użytkownika serwera SMTP",
                },
              },
            },
            {
              type: "text",
              name: "password",
              label: {
                en: "Password",
                pl: "Hasło",
              },
              required: true,
              admin: {
                description: {
                  en: "SMTP server password",
                  pl: "Hasło serwera SMTP",
                },
              },
            },
          ],
        },
        {
          type: "text",
          name: "sender",
          label: {
            en: "Sender",
            pl: "Wysyłający",
          },
          required: true,
          admin: {
            description: {
              en: "Sender email address",
              pl: "Adres email wysyłającego",
            },
          },
        },
      ],
    },
    {
      type: "group",
      name: "companyDetails",
      label: {
        en: "Company Details",
        pl: "Dane Firmy",
      },
      fields: [
        {
          type: "textarea",
          name: "details",
          label: {
            en: "Details",
            pl: "Szczegóły",
          },
          admin: {
            description: {
              en: "Company name, NIP, REGON, KRS, Bank Account",
              pl: "Nazwa firmy, NIP, REGON, KRS, Numer konta bankowego",
            },
          },
        },
        {
          type: "textarea",
          name: "address",
          label: {
            en: "Address",
            pl: "Adres",
          },
          admin: {
            description: {
              en: "Full address (Street, City, Country)",
              pl: "Pełny adres (Ulica, Miasto, Kraj)",
            },
          },
        },
        {
          type: "text",
          name: "phone",
          label: {
            en: "Phone",
            pl: "Telefon",
          },
        },
        {
          type: "email",
          name: "contactEmail",
          label: {
            en: "Contact Email",
            pl: "Email Kontaktowy",
          },
        },
      ]
    },
  ],
};
