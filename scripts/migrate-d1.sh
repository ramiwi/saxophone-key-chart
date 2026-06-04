#!/usr/bin/env bash
set -euo pipefail

DB_NAME="${1:-sax-chart-presets}"
MIGRATION_FILE="./migrations/0001_presets.sql"

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required (Node.js not found)." >&2
  exit 1
fi

if [[ ! -f "$MIGRATION_FILE" ]]; then
  echo "Migration file not found: $MIGRATION_FILE" >&2
  exit 1
fi

echo "Applying $MIGRATION_FILE to D1 database: $DB_NAME"
npx wrangler d1 execute "$DB_NAME" --file="$MIGRATION_FILE"
echo "Done."
