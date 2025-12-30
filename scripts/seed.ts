import path from "node:path";
import fs from "node:fs/promises";
import config from "../payload.config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

try {
  const users = await payload.find({ collection: 'users' });
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@dgg.pl',
        password: 'password123',
      },
    });
    console.log('--- Admin user created: admin@dgg.pl / password123 ---');
  }
} catch (e) {
  console.error('Failed to create admin user:', e);
}


const media = await (async () => {
  const mediaDir = path.resolve(
    import.meta.dirname,
    "../assets/seed-data/media"
  );

  const files = await fs.readdir(mediaDir);

  return Object.fromEntries(
    await Promise.all(
      files.map(async (file) => {
        const media = await payload.create({
          collection: "media",
          data: {},
          filePath: path.join(mediaDir, file),
        });

        return [file, media] as const;
      })
    )
  );
})();

const contactDialog = await payload.create({
  collection: "dialogs",
  data: {
    title: "Kontakt",
    content: [{ blockType: "contact-form" }],
  },
});

await payload.create({
  collection: "pages",
  data: {
    title: "DGG Piece",
    slug: "home",
    content: [
      {
        blockType: "section",
        children: [
          {
            blockType: "status-alert",
            color: "rgb(84, 207, 59)",
            content: "Warsztat otwarty",
          },
          {
            blockType: "headline",
            lines: [
              { text: "Piece do ceramiki" },
              { text: "Tworzone z pasją" },
              { text: "Naprawiane z precyzją" },
            ],
          },
          {
            blockType: "text",
            variant: "p2",
            text: "Rzemiosło i technologia. Dla artystów, profesjonalistów i pasjonatów.",
          },
          {
            blockType: "button",
            label: "Dowiedz się więcej",
            type: "dialog",
            dialog: contactDialog,
          },
          {
            blockType: "carousel",
            images: [
              media["amstal.png"],
              media["bentrup.png"],
              media["krysmet.png"],
              media["notec.jpg"],
              media["rath-long.png"],
            ],
          },
        ],
      },
    ],
  },
});
