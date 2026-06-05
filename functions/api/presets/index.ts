import { type Env, type PresetRow, errorResponse, getOwnerId, getPresetsDb, jsonResponse, optionsResponse } from "./_shared";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const db = getPresetsDb(env);
  if (!db) return errorResponse("PRESETS_DB binding is missing on this deployment.", 503);

  const ownerId = getOwnerId(request);
  if (!ownerId) return errorResponse("Missing X-Device-Id header (or deviceId query param).", 401);

  const rows = await db
    .prepare(
      `SELECT name, notes_text, updated_at
       FROM presets
       WHERE owner_id = ?
       ORDER BY LOWER(name) ASC`
    )
    .bind(ownerId)
    .all<PresetRow>();

  const presets = (rows.results || []).map((row) => ({
    name: row.name,
    notesText: row.notes_text,
    updatedAt: row.updated_at
  }));

  return jsonResponse({ presets });
};

export const onRequestOptions: PagesFunction = async () => {
  return optionsResponse();
};
