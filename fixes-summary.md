# Fixes Summary

## 2026-06-04

- Fixed flat-root scale generation in `index.html`.
  - The previous `pcIndex()` helper rewrote flat notes incorrectly, so roots like `Db`, `Eb`, `Gb`, `Ab`, and `Bb` produced `undefined`.
  - That caused `buildScaleMidis()` to loop forever while looking for a matching root pitch class.
  - The helper now uses the existing `PC_INDEX` lookup directly.

- Centralized the app version.
  - Added `version.js` with `window.APP_VERSION = "1.0.2"`.
  - Loaded `version.js` from both `index.html` and `notes-to-chart.html`.
  - Updated `notes-to-chart.html` to display the global `window.APP_VERSION` instead of a page-local constant.

## Notes

- `notes_chart_test1.pdf` and `notest.png` are currently untracked files and are not part of the code fixes unless intentionally added.
