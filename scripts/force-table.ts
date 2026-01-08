import { sql } from '@payloadcms/db-sqlite'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const forceTable = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Force-creating pages_blocks_two_columns table...')

  try {
    await payload.db.drizzle.run(sql`
      CREATE TABLE IF NOT EXISTS "pages_blocks_two_columns" (
        "_order" integer,
        "_parent_id" integer,
        "id" text PRIMARY KEY NOT NULL,
        "left_column" text,
        "right_column" text,
        "block_name" text,
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action
      );
    `)

    await payload.db.drizzle.run(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_order_idx" ON "pages_blocks_two_columns" ("_order");`)
    await payload.db.drizzle.run(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_parent_id_idx" ON "pages_blocks_two_columns" ("_parent_id");`)

    console.log('Force-creating pages_blocks_rich_text table...')
    await payload.db.drizzle.run(sql`
          CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text" (
            "_order" integer,
            "_parent_id" integer,
            "id" text PRIMARY KEY NOT NULL,
            "content" text,
            "block_name" text,
            FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action
          );
        `)
    await payload.db.drizzle.run(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" ("_order");`)
    await payload.db.drizzle.run(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" ("_parent_id");`)

    console.log('Table created successfully.')
  } catch (err) {
    console.error('Error forcing table creation:', err)
    process.exit(1)
  }

  process.exit(0)
}

forceTable()
