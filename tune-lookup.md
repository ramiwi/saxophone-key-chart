# Tune lookup (Notes → key charts)

## Summary

`notes-to-chart.html` includes an **online tune lookup** panel above the note textarea (`#input`) with two source modes:

- **The Session (built-in):** searches [The Session](https://thesession.org/tunes), loads ABC settings, and converts melody notes to scientific pitch names.
- **Tunepal (built-in):** searches [Tunepal](https://tunepal.org/) and loads ABC notation for matched traditional tunes.
- **Catalog adapter (backend):** calls your own backend API so you can bridge larger tune collections and normalize them into this app's expected shape.

It also supports **local file import**: `.abc`, `.musicxml`/`.xml`, and `.mid`/`.midi`.

## User workflow

1. Choose a source:
   - **The Session** for built-in Irish trad lookup, or
   - **Tunepal** for a larger built-in traditional tune corpus, or
   - **Catalog adapter** and enter your backend base URL.
2. Enter a tune name and click **Search** (or press Enter).
3. Pick a tune from results, then pick a **transcription setting**.
4. Click **Replace input** or **Append**.
5. For manual import, choose a local file and click **Import file (replace)** or **Import file (append)**.

Imported text looks like:

```text
; Morning Dew · Dmajor
D4 F#4 A4 ...
```

The `;` line is a row title (existing Notes → key charts behavior). The next line is space-separated notes for one diagram row.

## Technical details

| Piece | Role |
| --- | --- |
| [The Session search API](https://thesession.org/api) | `GET /tunes/search?q=…&format=json&perpage=20` |
| [The Session tune API](https://thesession.org/api) | `GET /tunes/{id}?format=json` — returns `settings[]` with `key` and `abc` |
| Tunepal API | `GET /tunepal2/api/keywordSearch?...` and `GET /tunepal2/api/Tunes/{id}` |
| Catalog adapter (custom backend) | `GET /search?q=…` and `GET /tunes/{id}` returning `tunes[]` / `settings[]` JSON |
| [abcjs](https://github.com/paulrosen/abcjs) (CDN 6.4.4) | `ABCJS.parseOnly()` for ABC lookup and `.abc` file import |
| [@tonejs/midi](https://github.com/Tonejs/Midi) (CDN 2.0.28) | Parses `.mid`/`.midi` files in-browser |
| In-page conversion | `verticalPos` (middle C = `C4`) → octave; accidentals → `#` / `b`; respects **Prefer flats** |

Conversion rules:

- ABC uses the **first voice** only (melody line).
- ABC chords use the **first pitch** in each note element.
- MusicXML import skips `<rest>` and `<chord/>` notes to keep a melody-like sequence.
- MIDI import picks the non-percussion track with the most notes and orders notes by time.
- Output is a single space-separated row; column alignment via leading spaces is still manual, same as pasted notes.

## Files touched

- `notes-to-chart.html` — UI (`.tune-lookup`), styles, source selector, adapter URL, and file import controls
- `notes-to-chart.html` — script tags for `abcjs-basic-min.js` and `@tonejs/midi` (deferred)

Print layout hides the lookup panel (same as other `.no-print` controls).

## Limitations

- **Source quality:** Adapter search breadth depends on your backend integrations and licensing/terms.
- **Tunepal search semantics:** Tunepal ranking and metadata differ from The Session (source collections, tune types, key labels).
- **Format:** Import is melody-oriented; no chord charts, lyrics, or rhythm spacing in the textarea.
- **Adapter contract:** The backend must return normalized tune/settings JSON expected by the UI.
- **Range / fingering:** Notes outside the sax schema still render as missing cards, same as manual input.

## Possible extensions

- Rich adapter metadata (composer, style, source URL)
- Multi-track MIDI picker in UI
- Link-out to source pages with one-click open
- Multi-row import (e.g. one ABC part per textarea line)

## Related

- Shareable links and presets still use `#input` and URL hash as before; imported tunes participate in live update, draft save, and **Copy shareable link** like any other text.
