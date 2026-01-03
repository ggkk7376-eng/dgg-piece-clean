#!/bin/sh
echo "🛑 Stopping containers..."
docker-compose down
echo "⏳ Waiting for containers to clear..."
sleep 5

echo "🗑️ Removing old volumes (Nuclear Reset)..."
docker-compose down -v
# Explicitly remove the named volume if down -v missed it (safety)
docker volume rm dgg-piece_sqlite_data || true
rm -rf db_data
rm -rf media/*

echo "🚀 Starting fresh..."
docker-compose up -d --build

echo "🔧 Fixing permissions..."
chmod -R 777 media
# db_data is now a named volume, permissions are managed by Docker, but we leave this just in case
mkdir -p db_data
chmod -R 777 db_data

echo "✅ Done! V46 is live (Full Versions Table Schema)."
