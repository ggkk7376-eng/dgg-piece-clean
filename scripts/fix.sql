CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text" (
  "_order" integer,
  "_parent_id" integer,
  "id" text PRIMARY KEY NOT NULL,
  "content" text,
  "block_name" text,
  FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action
);

CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" ("_parent_id");
