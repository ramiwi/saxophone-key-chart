CREATE TABLE IF NOT EXISTS presets (
  owner_id TEXT NOT NULL,
  name TEXT NOT NULL,
  notes_text TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (owner_id, name)
);

CREATE INDEX IF NOT EXISTS idx_presets_owner_updated_at
  ON presets (owner_id, updated_at DESC);
