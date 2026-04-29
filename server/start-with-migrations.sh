#!/usr/bin/env bash
set -e

# Run from repository root
cd "$(dirname "$0")/.."

echo "Generating Prisma client..."
npx prisma generate --schema=../packages/db/prisma/schema.prisma

echo "Applying migrations (if any)..."
# Try to deploy migrations; if there are none this may print a message but continue
npx prisma migrate deploy --schema=../packages/db/prisma/schema.prisma || echo "No migrations applied or migrate deploy failed"

echo "Starting server"
node dist/index.js
