# Tune lookup (Notes → key charts)

## Summary

`notes-to-chart.html` includes an **online tune lookup** panel above the note textarea (`#input`). It searches [The Session](https://thesession.org/tunes) for Irish traditional tunes, downloads ABC transcriptions, converts the melody to scientific pitch names (e.g. `B4`, `C#5`), and inserts them into the input on demand.

This is **not** a general web search for arbitrary songs. It works because The Session exposes a read-only JSON API with CORS enabled (`Access-Control-Allow-Origin: *`), and the page can parse ABC in the browser.

## User workflow

1. Enter a tune name in **Look up tune online** and click **Search** (or press Enter).
2. Pick a tune from the results dropdown.
3. Pick a **transcription setting** (key and contributor vary per setting).
4. Click **Replace input** to overwrite the textarea, or **Append** to add after existing rows.

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
| [abcjs](https://github.com/paulrosen/abcjs) (CDN 6.4.4) | `ABCJS.parseOnly()` to read note elements from ABC |
| In-page conversion | `verticalPos` → octave; accidentals → `#` / `b`; respects **Prefer flats** |

Conversion rules:

- Uses the **first voice** only (melody line).
- For chords, uses the **first pitch** in each note element.
- Output is a single space-separated row; column alignment via leading spaces is still manual, same as pasted notes.

## Files touched

- `notes-to-chart.html` — UI (`.tune-lookup`), styles, and lookup script
- `notes-to-chart.html` — script tag for `abcjs-basic-min.js` (deferred, alongside existing VexFlow)

Print layout hides the lookup panel (same as other `.no-print` controls).

## Limitations

- **Source:** Irish trad / session repertoire on thesession.org, not pop, jazz charts, or MuseScore links.
- **Format:** Monophonic melody from ABC; no chords, lyrics, or rhythm spacing in the textarea.
- **Browser-only:** No backend proxy; sites without CORS or ABC cannot be integrated this way.
- **Range / fingering:** Notes outside the sax schema still render as missing cards, same as manual input.

## Possible extensions (not implemented)

- Serverless proxy for other ABC archives
- MusicXML import
- Link-out to external search with manual paste
- Multi-row import (e.g. one ABC part per textarea line)

## Related

- Shareable links and presets still use `#input` and URL hash as before; imported tunes participate in live update, draft save, and **Copy shareable link** like any other text.
