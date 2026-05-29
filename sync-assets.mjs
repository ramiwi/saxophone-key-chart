#!/usr/bin/env node
/** Regenerate schema.js and diagram.js from source JSON/SVG (for offline file:// use). */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(readFileSync(join(root, "saxophone key-schema-v3.json"), "utf8"));
const svg = readFileSync(join(root, "sax-key-diagram-v2os.svg"), "utf8");

writeFileSync(join(root, "schema.js"), `window.SAX_SCHEMA = ${JSON.stringify(schema, null, 2)};\n`);
writeFileSync(join(root, "diagram.js"), `window.SAX_DIAGRAM_SVG = ${JSON.stringify(svg)};\n`);

console.log("Updated schema.js and diagram.js");
