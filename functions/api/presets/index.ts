import { type Env, type PresetRow, errorResponse, getOwnerId, jsonResponse, optionsResponse } from "./_shared";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const ownerId = getOwnerId(request);
  if (!ownerId) return errorResponse("Missing X-Device-Id header (or deviceId query param).", 401);

  const rows = await env.PRESETS_DB
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
