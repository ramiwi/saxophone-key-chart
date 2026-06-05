# Cloud Preset API Contract

This document defines the exact API contract used by `notes-to-chart.html` when **Preset storage** is set to `Cloud sync` or `Local + cloud backup`.

## Auth model (phase 1)

- Client identifies itself with `X-Device-Id` header.
- Server treats this as an owner key (device-scoped presets).
- Query fallback is also accepted for debugging: `?deviceId=...`.

> Phase 1 does not include account login; this is a lightweight device-based identity.

All endpoints return permissive CORS headers for browser clients:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,PUT,DELETE,OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, X-Device-Id`

---

## `GET /api/presets`

List all presets for current device.

### Request

- Headers:
  - `X-Device-Id: <string>` (required in normal use)

### Success response (`200`)

```json
{
  "presets": [
    {
      "name": "Practice set A",
      "notesText": "; tune name\nB4 C5 D5",
      "updatedAt": "2026-06-04 13:26:41"
    }
  ]
}
```

### Error responses

- `401` when device id is missing
```json
{ "error": "Missing X-Device-Id header (or deviceId query param)." }
```

---

## `PUT /api/presets/:name`

Create or update one preset.

### Request

- Path params:
  - `name` (string, max 120 chars)
- Headers:
  - `Content-Type: application/json`
  - `X-Device-Id: <string>` (required)
- Body:

```json
{
  "notesText": "; my preset\nA4 B4 C5"
}
```

### Success response (`200`)

```json
{
  "ok": true,
  "name": "Practice set A"
}
```

### Error responses

- `400` invalid JSON / missing fields
- `401` missing device id
- `413` oversized content (`notesText` > 100000 chars)

---

## `DELETE /api/presets/:name`

Delete one preset for current device.

### Request

- Path params:
  - `name` (string)
- Headers:
  - `X-Device-Id: <string>` (required)

### Success response (`200`)

```json
{
  "ok": true,
  "name": "Practice set A"
}
```

### Error responses

- `400` missing name
- `401` missing device id

---

## Cloudflare Setup

1. Create D1 DB:
   - `npx wrangler d1 create sax-chart-presets`
2. Bind it to Pages/Functions as `PRESETS_DB`.
   - If your dashboard generated `sax_chart_presets`, rename that binding to `PRESETS_DB` in config so it matches the functions code.
   - Ensure `wrangler.toml` includes `pages_build_output_dir = "."` so Pages accepts the file and does not skip bindings.
3. Apply migration:
   - `npx wrangler d1 execute sax-chart-presets --file=./migrations/0001_presets.sql`
   - or use helper: `./scripts/migrate-d1.sh`
4. Deploy with Pages Functions in `functions/`.

## Frontend behavior

- `Local only`: reads/writes only `localStorage`.
- `Cloud sync`: reads/writes only API.
- `Local + cloud backup`: local is immediate source; cloud mirrors on save/delete and contributes entries on load.

## Troubleshooting (production)

- `Error 1101 Worker threw exception`
  - Check Cloudflare Workers logs for the exact exception.
  - Current handlers should return JSON errors instead of crashing for most D1 failures.

- `{"error":"Preset query failed: D1_ERROR: no such table: presets: SQLITE_ERROR"}`
  - Migration was run only on local D1.
  - Run again on remote:
    - `npx wrangler d1 execute sax-chart-presets --remote --file=./migrations/0001_presets.sql`

- `{"error":"PRESETS_DB binding is missing on this deployment."}`
  - Pages project binding name does not match code.
  - Ensure D1 binding name is exactly `PRESETS_DB`.

- Cloudflare build warning says wrangler config is invalid/skipped
  - Ensure `wrangler.toml` has:
    - `pages_build_output_dir = "."`
  - If this is missing, Pages may skip binding config and runtime can fail.
