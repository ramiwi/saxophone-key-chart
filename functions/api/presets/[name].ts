import { type Env, errorResponse, getOwnerId, jsonResponse, optionsResponse } from "./_shared";

type PutBody = {
  notesText?: unknown;
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const ownerId = getOwnerId(request);
  if (!ownerId) return errorResponse("Missing X-Device-Id header (or deviceId query param).", 401);

  const rawName = String(params.name || "").trim();
  if (!rawName) return errorResponse("Preset name is required.", 400);
  if (rawName.length > 120) return errorResponse("Preset name is too long (max 120 chars).", 400);

  let body: PutBody;
  try {
    body = await request.json<PutBody>();
  } catch {
    return errorResponse("Request body must be JSON.", 400);
  }

  const notesText = typeof body.notesText === "string" ? body.notesText : "";
  if (!notesText.trim()) return errorResponse("notesText must be a non-empty string.", 400);
  if (notesText.length > 100000) return errorResponse("Preset content too large (max 100000 chars).", 413);

  await env.PRESETS_DB
    .prepare(
      `INSERT INTO presets (owner_id, name, notes_text, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(owner_id, name)
       DO UPDATE SET
         notes_text = excluded.notes_text,
         updated_at = datetime('now')`
    )
    .bind(ownerId, rawName, notesText)
    .run();

  return jsonResponse({ ok: true, name: rawName });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const ownerId = getOwnerId(request);
  if (!ownerId) return errorResponse("Missing X-Device-Id header (or deviceId query param).", 401);

  const rawName = String(params.name || "").trim();
  if (!rawName) return errorResponse("Preset name is required.", 400);

  await env.PRESETS_DB
    .prepare("DELETE FROM presets WHERE owner_id = ? AND name = ?")
    .bind(ownerId, rawName)
    .run();

  return jsonResponse({ ok: true, name: rawName });
};

export const onRequestOptions: PagesFunction = async () => {
  return optionsResponse();
};
