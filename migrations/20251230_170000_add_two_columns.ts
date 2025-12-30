import { sql } from '@payloadcms/db-sqlite'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {

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
  `);

  // We also need to add the INDEX for ordering if Payload expects it, but usually standard CREATE TABLE is enough for minimal function.
  // Standard Payload SQLite indices:
  await payload.db.drizzle.run(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_order_idx" ON "pages_blocks_two_columns" ("_order");`);
  await payload.db.drizzle.run(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_parent_id_idx" ON "pages_blocks_two_columns" ("_parent_id");`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE "pages_blocks_two_columns";`)
}

export const m20251230_170000_add_two_columns = {
  up,
  down,
  name: '20251230_170000_add_two_columns',
}
