const path = require('path');
const fs = require('fs');

// Try to resolve better-sqlite3 from typical locations
let Database;
try {
    Database = require('better-sqlite3');
} catch (e) {
    try {
        Database = require('/app/node_modules/better-sqlite3');
    } catch (e2) {
        console.error('Could not load better-sqlite3 driver.');
        process.exit(0); // Fail safe, let app try to start
    }
}

const dbPath = path.resolve('/app/sqlite_data/dgg-piece.db');

if (!fs.existsSync(dbPath)) {
    console.log('DB not found, skipping force fix.');
    process.exit(0);
}

try {
    console.log('Force-creating TwoColumns table via direct SQL...');
    const db = new Database(dbPath);

    db.exec(`
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

    db.exec(`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_order_idx" ON "pages_blocks_two_columns" ("_order");`);
    db.exec(`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_parent_id_idx" ON "pages_blocks_two_columns" ("_parent_id");`);

    console.log('Table fixed.');
    db.close();
} catch (err) {
    console.error('Simple force fix failed:', err);
}
