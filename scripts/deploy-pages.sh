#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"
PREPARE_ONLY="${1:-}"
PROJECT_NAME="saxophone-key-chart"

FILES=(
  "index.html"
  "notes-to-chart.html"
  "app-footer.css"
  "app-footer.js"
  "chart-transfer.js"
  "diagram.js"
  "nav.js"
  "schema.js"
  "ui-icons.css"
  "ui-icons.js"
  "version.js"
)

rm -rf "$PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"

for file in "${FILES[@]}"; do
  if [[ ! -f "$ROOT_DIR/$file" ]]; then
    echo "Missing required file: $file" >&2
    exit 1
  fi
  cp "$ROOT_DIR/$file" "$PUBLIC_DIR/$file"
done

echo "Prepared $PUBLIC_DIR with ${#FILES[@]} files."

if [[ "$PREPARE_ONLY" == "--prepare-only" ]]; then
  echo "Skipping deploy (prepare-only mode)."
  exit 0
fi

npx wrangler pages deploy public --project-name "$PROJECT_NAME"
