CREATE TABLE IF NOT EXISTS "pages_blocks_formatted_text" (
  "_order" integer,
  "_parent_id" integer,
  "_path" text,
  "id" text PRIMARY KEY NOT NULL,
  "content" text,
  "block_name" text,
  FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action
);

CREATE INDEX IF NOT EXISTS "pages_blocks_formatted_text_order_idx" ON "pages_blocks_formatted_text" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_formatted_text_parent_id_idx" ON "pages_blocks_formatted_text" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_formatted_text_path_idx" ON "pages_blocks_formatted_text" ("_path");
