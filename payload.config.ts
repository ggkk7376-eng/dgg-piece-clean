import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { en } from "@payloadcms/translations/languages/en";
import { pl } from "@payloadcms/translations/languages/pl";
import { buildConfig } from "payload";
import sharp from "sharp";

import { env } from "./lib/env";
import { button } from "./payload/blocks/button/config";
import { carousel } from "./payload/blocks/carousel/config";
import { contactForm } from "./payload/blocks/contact-form/config";
import { headline } from "./payload/blocks/headline/config";
import { section } from "./payload/blocks/section/config";
import { statusAlert } from "./payload/blocks/status-alert/config";
import { text } from "./payload/blocks/text/config";
import { gallery } from "./payload/blocks/gallery/config";
import { realizations } from "./payload/blocks/realizations/config";
import { twoColumns } from "./payload/blocks/two-columns/config";
import { dialogs } from "./payload/collections/dialogs";
import { media } from "./payload/collections/media";
import { pages } from "./payload/collections/pages";
import { users } from "./payload/collections/users";
import { downloads } from "./payload/globals/downloads";
import { navigation } from "./payload/globals/navigation";
import { settings } from "./payload/globals/settings";

const config = buildConfig({
  sharp,
  editor: lexicalEditor(),
  admin: {
    user: users.slug,
  },
  globals: [settings, downloads, navigation],
  collections: [pages, media, users, dialogs],
  blocks: [button, carousel, contactForm, gallery, headline, statusAlert, text, section, realizations, twoColumns],
  secret: env.PAYLOAD_SECRET,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./dgg-piece.db",
    },
    // Enable schema push to create tables on empty DB (since we have no migrations)
    push: true,
  }),
  i18n: {
    fallbackLanguage: "pl",
    supportedLanguages: {
      en,
      pl,
    },
  },
  email: env.SMTP_HOST
    ? nodemailerAdapter({
      defaultFromAddress: "info@dgg-piece.pl",
      defaultFromName: "DGG Piece",
      transportOptions: {
        host: env.SMTP_HOST,
        port: 587,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      },
    })
    : undefined,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(env.VERCEL_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: env.VERCEL_READ_WRITE_TOKEN,
    }),
  ],
});

export default config;
