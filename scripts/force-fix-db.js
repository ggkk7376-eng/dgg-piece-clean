const fs = require('fs');
const path = require('path');
const dbPath = path.resolve('/app/sqlite_data/dgg-piece.db');

try {
    // We will use the 'better-sqlite3' which Payload uses, or we can try to use standard node fs if we just want to check existence.
    // But to run SQL we need a driver. Since Payload is installed, let's try to use the one it uses or a simple one.
    // Actually, keeping it simple: we can shell out to sqlite3 if it is in the Alpine image? Usually not by default.
    // Let's us the node script with the driver we know is there.

    // Wait, let's look at package.json again. We have "@payloadcms/db-sqlite".
    // This uses "better-sqlite3" or "libsql" under the hood.
    // Let's write a script that imports 'better-sqlite3' (common dependency)

    const Database = require('better-sqlite3');

    if (!fs.existsSync(dbPath)) {
        console.log('Database file not found at:', dbPath);
        process.exit(0);
    }

    const db = new Database(dbPath);

    console.log('Opening database to force-fix schema...');

    // Create table
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

    // Create indices
    db.exec(`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_order_idx" ON "pages_blocks_two_columns" ("_order");`);
    db.exec(`CREATE INDEX IF NOT EXISTS "pages_blocks_two_columns_parent_id_idx" ON "pages_blocks_two_columns" ("_parent_id");`);

    console.log('Force-fix applied: pages_blocks_two_columns table created (if missing).');
    db.close();

} catch (err) {
    // If better-sqlite3 is not direct dep, this might fail, but let's try.
    // We can also try 'libsql' if that is what is used.
    console.error('Force-fix failed:', err);
    // Do not exit with error to avoid crash loop, just log it.
}
