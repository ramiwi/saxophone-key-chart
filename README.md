# Saxophone Key Chart

Static web app for sax fingering charts and note-sequence chart rendering.

Main pages:
- `index.html` - key chart explorer
- `notes-to-chart.html` - notes -> aligned key charts, tune lookup/import, preset storage

## Repository layout

Pages:
- `notes-to-chart.html` - main "Notes -> key charts" app
- `index.html` - base key chart page

Shared front-end assets:
- `nav.js` - shared top navigation injected into each page
- `chart-transfer.js` - one-shot handoff from `index.html` to `notes-to-chart.html`
- `app-footer.js`, `app-footer.css` - footer + version label
- `ui-icons.js`, `ui-icons.css` - shared inline icon helpers
- `version.js` - displayed app version string

Schema/diagram assets:
- `saxophone key-schema-v3.json`, `sax-key-diagram-v2os.svg` - source schema + SVG
- `schema.js`, `diagram.js` - **generated** from the source files above (do not edit by hand)
- `sync-assets.mjs` - regenerates `schema.js`/`diagram.js` from the source JSON/SVG (run `node sync-assets.mjs`)

Backend (Cloudflare):
- `functions/` - Cloudflare Pages Functions (preset API)
- `migrations/0001_presets.sql` - D1 schema for cloud presets
- `scripts/migrate-d1.sh` - helper to run D1 migration
- `scripts/deploy-pages.sh` - builds `public/` and deploys to Cloudflare Pages
- `wrangler.toml` - Cloudflare config (Pages output dir + D1 binding)
- `wrangler.toml.example` - template for `wrangler.toml`

Docs:
- `cloudflare-presets-api.md` - API contract + setup details
- `tune-lookup.md` - tune lookup/import behavior and sources
- `docs/` - reference material

## Local development

This project is static-first: open `index.html` or `notes-to-chart.html` directly, or serve via any static server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/notes-to-chart.html`.

## Cloud presets (Cloudflare Pages + D1)

`notes-to-chart.html` supports three preset modes:
- `Local only`
- `Local + cloud backup`
- `Cloud sync`

Cloud modes call:
- `GET /api/presets`
- `PUT /api/presets/:name`
- `DELETE /api/presets/:name`

See `cloudflare-presets-api.md` for exact request/response contract.

### Identity / trust model

Cloud presets are **not authenticated**. Each browser generates an anonymous
device id (stored locally) and sends it as the `X-Device-Id` header; presets are
scoped only by that id. There is no account or login, and the API allows any
origin (CORS `*`). Anyone who knows or guesses a device id can read, overwrite,
or delete that device's presets. Treat cloud sync as a convenience/backup for
low-sensitivity data only — do not store anything private.

### Required Cloudflare config

If you don't already have a `wrangler.toml`, copy the template:

```bash
cp wrangler.toml.example wrangler.toml
```

`wrangler.toml` must include:

- `pages_build_output_dir = "public"`
- D1 binding named **exactly** `PRESETS_DB`

Current D1 id used in this project:
- `42448e3a-60cf-45e6-9b56-0138cae902a7`

### Create/apply schema

Local D1:

```bash
npx wrangler d1 execute sax-chart-presets --file=./migrations/0001_presets.sql
```

Remote D1 (used by deployed Pages site):

```bash
npx wrangler d1 execute sax-chart-presets --remote --file=./migrations/0001_presets.sql
```

Helper script:

```bash
./scripts/migrate-d1.sh
```

Note: helper runs local migration by default. Use explicit `--remote` command for production DB.

## Deployment notes

Build a dedicated frontend folder and deploy it:

```bash
./scripts/deploy-pages.sh
```

This script copies the required static files into `public/` and runs:

```bash
npx wrangler pages deploy public
```

`functions/` stays at repository root for Cloudflare Pages Functions.

Useful verification URL after deploy:

```text
https://<your-pages-domain>/api/presets?deviceId=test
```

Expected success payload:

```json
{"presets":[]}
```

## Common issues

- `Cloud sync unavailable — using local presets`
  - API endpoint unreachable or returned non-OK status.
- `Error 1101 Worker threw exception`
  - usually unhandled backend error (fixed in current API handlers to return JSON errors).
- `{"error":"... no such table: presets ..."}`
  - remote D1 migration not applied; run migration with `--remote`.
- Cloudflare log says wrangler config was skipped/invalid
- ensure `wrangler.toml` contains `pages_build_output_dir = "public"`.
- `PRESETS_DB binding is missing on this deployment`
  - D1 binding name in Pages project does not match `PRESETS_DB`.

## Versioning

`version.js` controls displayed app version string.
