export interface Env {
  PRESETS_DB: D1Database;
}

export interface PresetRow {
  name: string;
  notes_text: string;
  updated_at: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Device-Id"
};

export function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS_HEADERS
    }
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

export function getOwnerId(request: Request): string | null {
  const fromHeader = request.headers.get("x-device-id");
  const fromQuery = new URL(request.url).searchParams.get("deviceId");
  const value = (fromHeader || fromQuery || "").trim();
  if (!value) return null;
  if (value.length > 128) return null;
  return value;
}

export function getPresetsDb(env: Partial<Env>): D1Database | null {
  const db = (env as { PRESETS_DB?: D1Database }).PRESETS_DB;
  if (!db || typeof db.prepare !== "function") return null;
  return db;
}

export function optionsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}
