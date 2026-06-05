# Saxophone Key Chart

Static web app for sax fingering charts and note-sequence chart rendering.

Main pages:
- `index.html` - key chart explorer
- `notes-to-chart.html` - notes -> aligned key charts, tune lookup/import, preset storage

## Repository layout

- `notes-to-chart.html` - main "Notes -> key charts" app
- `index.html` - base key chart page
- `schema.js`, `diagram.js` - embedded schema/SVG assets used by pages
- `functions/` - Cloudflare Pages Functions (preset API)
- `migrations/0001_presets.sql` - D1 schema for cloud presets
- `scripts/migrate-d1.sh` - helper to run D1 migration
- `cloudflare-presets-api.md` - API contract + setup details
- `tune-lookup.md` - tune lookup/import behavior and sources

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

### Required Cloudflare config

`wrangler.toml` must include:

- `pages_build_output_dir = "."`
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

Cloudflare Pages auto-detects static assets and uploads `functions/`.

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
  - ensure `wrangler.toml` contains `pages_build_output_dir = "."`.
- `PRESETS_DB binding is missing on this deployment`
  - D1 binding name in Pages project does not match `PRESETS_DB`.

## Versioning

`version.js` controls displayed app version string.
