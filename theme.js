/* Shared UI themes for the sax chart pages.
   Single source of truth — include with <script src="theme.js" defer></script>
   after nav.js. Adds a swatch-chip theme picker under the site nav and
   persists the choice.

   The palettes are lifted verbatim from
   docs/reference/sax-fingering-chart-colors.html (Color Hunt inspired):
   each theme sets the reference variable set (--bg/--bg2/--card/--card2,
   --accent/--accent-hi/--accent-dk/--accent2, --ink/--muted/--muted2,
   --line/--line2, --on-accent, --glow1/--glow2) and a single generic rule
   maps the app-specific key-diagram variables onto it.

   "Classic" is the original white look (no data-theme attribute), and print
   always resets to it so paper output is identical for every theme. */
(function () {
  const STORAGE_KEY = "sax_chart.theme.v1";

  /* Mirrors the :root defaults in index.html / notes-to-chart.html; used as
     the print reset so paper output stays clean white. */
  const CLASSIC_VARS = `
    color-scheme: light;
    --bg:#ffffff; --bg2:#fafafa; --card:#ffffff; --card2:#ffffff;
    --ink:#000000; --muted:#444444; --muted2:#777777;
    --line:#bbbbbb; --line2:#e5e5e5;
    --accent:#a87a16; --accent-hi:#a87a16; --on-accent:#ffffff;
    --glow1:transparent; --glow2:transparent;
    --key-fill:#ffffff; --key-stroke:#000000; --key-label:#000000;
    --key-hover:#eeeeee;
    --key-pressed:#cccccc; --key-pressed-stroke:#000000; --key-pressed-label:#000000;
  `;

  /* group: picker section · scheme: color-scheme for native controls
     sw: the 4 swatches shown on the picker chip (from the reference page). */
  const THEMES = [
    { id: "classic", name: "Classic", group: "classic", scheme: "light",
      sw: ["#ffffff", "#a87a16", "#cccccc", "#000000"], vars: null },

    { id: "brass", name: "Brass", group: "dark", scheme: "dark",
      sw: ["#181311", "#d9a441", "#a3432f", "#f3e9da"],
      vars: "--bg:#181311;--bg2:#1f1815;--card:#241d19;--card2:#2b231e;--accent:#d9a441;--accent-hi:#f2cc6b;--accent-dk:#8a6320;--accent2:#a3432f;--ink:#f3e9da;--muted:#a08c77;--muted2:#7c6c5b;--line:rgba(243,233,218,0.16);--line2:rgba(243,233,218,0.08);--on-accent:#23190a;--glow1:rgba(217,164,65,0.10);--glow2:rgba(163,67,47,0.10);" },
    { id: "midnight", name: "Midnight Teal", group: "dark", scheme: "dark",
      sw: ["#222831", "#00ADB5", "#ff5d6c", "#EEEEEE"],
      vars: "--bg:#1b2026;--bg2:#222831;--card:#2a313a;--card2:#333b46;--accent:#00ADB5;--accent-hi:#4fd6dd;--accent-dk:#00767b;--accent2:#ff5d6c;--ink:#EEEEEE;--muted:#9aa7b0;--muted2:#6d7a84;--line:rgba(238,238,238,0.14);--line2:rgba(238,238,238,0.07);--on-accent:#06262a;--glow1:rgba(0,173,181,0.13);--glow2:rgba(255,93,108,0.09);" },
    { id: "neon", name: "Neon Night", group: "dark", scheme: "dark",
      sw: ["#252A34", "#08D9D6", "#FF2E63", "#EAEAEA"],
      vars: "--bg:#1b1f27;--bg2:#252A34;--card:#2c323e;--card2:#353d4a;--accent:#08D9D6;--accent-hi:#5ff0ed;--accent-dk:#079190;--accent2:#FF2E63;--ink:#EAEAEA;--muted:#9aa1ad;--muted2:#6a7280;--line:rgba(234,234,234,0.14);--line2:rgba(234,234,234,0.07);--on-accent:#04201f;--glow1:rgba(8,217,214,0.14);--glow2:rgba(255,46,99,0.12);" },
    { id: "sunset", name: "Sunset", group: "dark", scheme: "dark",
      sw: ["#2D4059", "#F07B3F", "#FFD460", "#EA5455"],
      vars: "--bg:#1c2738;--bg2:#243349;--card:#2d4059;--card2:#374b67;--accent:#F07B3F;--accent-hi:#FFD460;--accent-dk:#b3551f;--accent2:#EA5455;--ink:#f6efe6;--muted:#a3b3c6;--muted2:#718296;--line:rgba(246,239,230,0.14);--line2:rgba(246,239,230,0.07);--on-accent:#2a1607;--glow1:rgba(240,123,63,0.14);--glow2:rgba(234,84,85,0.10);" },
    { id: "plum", name: "Retro Plum", group: "dark", scheme: "dark",
      sw: ["#6A2C70", "#F08A5D", "#F9ED69", "#B83B5E"],
      vars: "--bg:#241029;--bg2:#33173a;--card:#3f1f47;--card2:#4b2754;--accent:#F08A5D;--accent-hi:#F9ED69;--accent-dk:#b85f38;--accent2:#E5577D;--ink:#f6e9ee;--muted:#b596bf;--muted2:#835f8d;--line:rgba(246,233,238,0.13);--line2:rgba(246,233,238,0.06);--on-accent:#2a1206;--glow1:rgba(240,138,93,0.13);--glow2:rgba(184,59,94,0.18);" },
    { id: "forest", name: "Emerald", group: "dark", scheme: "dark",
      sw: ["#0F0F0F", "#1FC79B", "#C75D3C", "#E8F1EC"],
      vars: "--bg:#0f1311;--bg2:#15201b;--card:#1b2a23;--card2:#22332b;--accent:#1FC79B;--accent-hi:#5fe6c0;--accent-dk:#00684a;--accent2:#C75D3C;--ink:#e8f1ec;--muted:#8fa89c;--muted2:#637a6f;--line:rgba(232,241,236,0.13);--line2:rgba(232,241,236,0.06);--on-accent:#06241b;--glow1:rgba(31,199,155,0.12);--glow2:rgba(199,93,60,0.09);" },
    { id: "cream", name: "Coffee Cream", group: "dark", scheme: "light",
      sw: ["#E5E5CB", "#3C2A21", "#A9603B", "#1A120B"],
      vars: "--bg:#e7e6cf;--bg2:#dedcc2;--card:#f3f1df;--card2:#ecead6;--accent:#3C2A21;--accent-hi:#5e4434;--accent-dk:#1A120B;--accent2:#A9603B;--ink:#211610;--muted:#6e5f4d;--muted2:#9a8b73;--line:rgba(26,18,11,0.20);--line2:rgba(26,18,11,0.08);--on-accent:#f3f1df;--glow1:rgba(169,96,59,0.12);--glow2:rgba(60,42,33,0.05);" },

    { id: "meadow", name: "Meadow", group: "light", scheme: "light",
      sw: ["#478430", "#5BA13C", "#9BD872", "#FCBF56"],
      vars: "--bg:#FFF9EE;--bg2:#FFF5E4;--card:#FFFDF9;--card2:#FFFBF3;--accent:#D9A54A;--accent-hi:#E0B56B;--accent-dk:#83632D;--accent2:#84B861;--ink:#3B6D28;--muted:#8DA87B;--muted2:#B0C19F;--line:rgba(59,109,40,0.16);--line2:rgba(59,109,40,0.07);--on-accent:#705526;--glow1:rgba(217,165,74,0.14);--glow2:rgba(132,184,97,0.11);" },
    { id: "poppy", name: "Poppy", group: "light", scheme: "light",
      sw: ["#D82243", "#F79C38", "#F7EBCD", "#FBF4A9"],
      vars: "--bg:#FEF5EB;--bg2:#FEEFDF;--card:#FFFCF8;--card2:#FEF8F1;--accent:#F29937;--accent-hi:#F5AB5B;--accent-dk:#925C21;--accent2:#D82243;--ink:#BD1E3B;--muted:#D87885;--muted2:#E49FA4;--line:rgba(189,30,59,0.16);--line2:rgba(189,30,59,0.07);--on-accent:#7D4F1C;--glow1:rgba(242,153,55,0.14);--glow2:rgba(216,34,67,0.11);" },
    { id: "caramel", name: "Caramel", group: "light", scheme: "light",
      sw: ["#A47251", "#DE9E59", "#E4E6B4", "#F3F0D8"],
      vars: "--bg:#FCF5EE;--bg2:#FAEFE4;--card:#FEFCF9;--card2:#FDF8F3;--accent:#DE9E59;--accent-hi:#E4AF77;--accent-dk:#886136;--accent2:#ABAC87;--ink:#80593F;--muted:#B49A89;--muted2:#CAB7A8;--line:rgba(128,89,63,0.16);--line2:rgba(128,89,63,0.07);--on-accent:#74522E;--glow1:rgba(222,158,89,0.14);--glow2:rgba(171,172,135,0.11);" },
    { id: "peri", name: "Periwinkle", group: "light", scheme: "light",
      sw: ["#6366FF", "#8494FC", "#C9C8FB", "#F3D6FC"],
      vars: "--bg:#EFF0FF;--bg2:#E6E7FF;--card:#FAFAFF;--card2:#F4F4FF;--accent:#6366FF;--accent-hi:#7F82FF;--accent-dk:#5558DB;--accent2:#B8A2BF;--ink:#4F52CC;--muted:#9294E1;--muted2:#AFB0EB;--line:rgba(79,82,204,0.16);--line2:rgba(79,82,204,0.07);--on-accent:#FFFFFF;--glow1:rgba(99,102,255,0.14);--glow2:rgba(184,162,191,0.11);" },
    { id: "bubblegum", name: "Bubblegum", group: "light", scheme: "light",
      sw: ["#C23AE7", "#FF98D1", "#FBF5A6", "#FDF7C8"],
      vars: "--bg:#F9EBFD;--bg2:#F5DFFB;--card:#FDF8FE;--card2:#FBF1FD;--accent:#C23AE7;--accent-hi:#CD5DEB;--accent-dk:#A431C3;--accent2:#EA8CC0;--ink:#982EB6;--muted:#C17DD3;--muted2:#D29FE0;--line:rgba(152,46,182,0.16);--line2:rgba(152,46,182,0.07);--on-accent:#FFFFFF;--glow1:rgba(194,58,231,0.14);--glow2:rgba(234,140,192,0.11);" },
    { id: "lagoon", name: "Lagoon", group: "light", scheme: "light",
      sw: ["#27CBC2", "#6AEDDF", "#BFF6EE", "#FDC36F"],
      vars: "--bg:#E9FAF9;--bg2:#DCF7F5;--card:#F7FDFD;--card2:#F0FBFB;--accent:#25C1B8;--accent-hi:#4CCCC5;--accent-dk:#167570;--accent2:#D1A15C;--ink:#156D68;--muted:#6EA8A5;--muted2:#94C1BF;--line:rgba(21,109,104,0.16);--line2:rgba(21,109,104,0.07);--on-accent:#13645F;--glow1:rgba(37,193,184,0.14);--glow2:rgba(209,161,92,0.11);" },
    { id: "electric", name: "Electric", group: "light", scheme: "light",
      sw: ["#01F6FF", "#7BFAF6", "#AFFFFA", "#FB64A9"],
      vars: "--bg:#E6FEFF;--bg2:#D6FEFF;--card:#F6FFFF;--card2:#EDFEFF;--accent:#01C0C7;--accent-hi:#2FCCD1;--accent-dk:#007579;--accent2:#FB64A9;--ink:#9F3F6B;--muted:#BD8FA9;--muted2:#C9B2C4;--line:rgba(159,63,107,0.16);--line2:rgba(159,63,107,0.07);--on-accent:#006367;--glow1:rgba(1,192,199,0.14);--glow2:rgba(251,100,169,0.11);" },
    { id: "flamingo", name: "Flamingo", group: "light", scheme: "light",
      sw: ["#F13E92", "#F891BC", "#FBD3E2", "#F9EDCC"],
      vars: "--bg:#FEECF4;--bg2:#FDE0EE;--card:#FFF8FB;--card2:#FEF1F7;--accent:#F13E92;--accent-hi:#F461A6;--accent-dk:#BC3072;--accent2:#B2A992;--ink:#AF2D6A;--muted:#D07DA4;--muted2:#DE9FBD;--line:rgba(175,45,106,0.16);--line2:rgba(175,45,106,0.07);--on-accent:#FFFFFF;--glow1:rgba(241,62,146,0.14);--glow2:rgba(178,169,146,0.11);" },
    { id: "daybreak", name: "Daybreak", group: "light", scheme: "light",
      sw: ["#F9754C", "#8DE4FF", "#BFF0FF", "#FEED92"],
      vars: "--bg:#FEF1ED;--bg2:#FEE9E2;--card:#FFFAF9;--card2:#FFF5F2;--accent:#F9754C;--accent-hi:#FA8E6C;--accent-dk:#A74F33;--accent2:#6FB3C9;--ink:#9B492F;--muted:#C5907F;--muted2:#D7AEA1;--line:rgba(155,73,47,0.16);--line2:rgba(155,73,47,0.07);--on-accent:#8F432C;--glow1:rgba(249,117,76,0.14);--glow2:rgba(111,179,201,0.11);" },
    { id: "apricot", name: "Apricot", group: "light", scheme: "light",
      sw: ["#FF9A86", "#FFB399", "#FFD0BC", "#FDE6B5"],
      vars: "--bg:#FFF5F3;--bg2:#FFEFEC;--card:#FFFBFB;--card2:#FFF8F7;--accent:#F59481;--accent-hi:#F6A797;--accent-dk:#94594E;--accent2:#B9A884;--ink:#895348;--muted:#BB9790;--muted2:#D0B4AF;--line:rgba(137,83,72,0.16);--line2:rgba(137,83,72,0.07);--on-accent:#7E4C42;--glow1:rgba(245,148,129,0.14);--glow2:rgba(185,168,132,0.11);" },
    { id: "harbor", name: "Harbor", group: "light", scheme: "light",
      sw: ["#5E89AD", "#82A6C6", "#ABCCD9", "#D8CABA"],
      vars: "--bg:#EFF3F7;--bg2:#E5ECF2;--card:#F9FBFC;--card2:#F4F7F9;--accent:#5E89AD;--accent-hi:#7B9EBC;--accent-dk:#4A6C89;--accent2:#B4A89B;--ink:#45647F;--muted:#8CA0B1;--muted2:#ABBAC7;--line:rgba(69,100,127,0.16);--line2:rgba(69,100,127,0.07);--on-accent:#FFFFFF;--glow1:rgba(94,137,173,0.14);--glow2:rgba(180,168,155,0.11);" },
    { id: "cotton", name: "Cotton", group: "light", scheme: "light",
      sw: ["#5FBCFC", "#FE9DC6", "#FBC3DC", "#F9F6C3"],
      vars: "--bg:#EFF8FF;--bg2:#E5F4FF;--card:#F9FDFF;--card2:#F4FAFF;--accent:#5CB5F3;--accent-hi:#79C3F5;--accent-dk:#376E93;--accent2:#E78FB4;--ink:#346689;--muted:#82A3BA;--muted2:#A4BECF;--line:rgba(52,102,137,0.16);--line2:rgba(52,102,137,0.07);--on-accent:#2F5D7D;--glow1:rgba(92,181,243,0.14);--glow2:rgba(231,143,180,0.11);" }
  ];

  const GROUPS = [
    { id: "classic", label: "Classic" },
    { id: "dark", label: "Dark" },
    { id: "light", label: "Light · Color Hunt" }
  ];

  function loadTheme() {
    let id = null;
    try { id = localStorage.getItem(STORAGE_KEY); } catch { /* unavailable */ }
    return THEMES.some((t) => t.id === id) ? id : "classic";
  }

  function saveTheme(id) {
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* unavailable */ }
  }

  const darkStaffSelectors = THEMES
    .filter((t) => t.scheme === "dark")
    .map((t) => `:root[data-theme="${t.id}"] .staff-wrap svg`)
    .join(",\n");

  const style = document.createElement("style");
  style.textContent = `
    ${THEMES.filter((t) => t.vars)
      .map((t) => `:root[data-theme="${t.id}"] { color-scheme: ${t.scheme}; ${t.vars} }`)
      .join("\n")}
    /* One mapping for every theme: key diagrams follow the palette. */
    :root[data-theme] {
      --key-fill: var(--card2);
      --key-stroke: var(--muted);
      --key-label: var(--ink);
      --key-hover: var(--bg2);
      --key-pressed: var(--accent);
      --key-pressed-stroke: var(--accent-hi);
      --key-pressed-label: var(--on-accent);
    }
    /* Native form controls: WebAwesome's reset paints them white and ignores
       color-scheme, so theme them explicitly (lookup selects, file input,
       per-card variant selects, the note textarea, etc.). */
    :root[data-theme] textarea,
    :root[data-theme] select,
    :root[data-theme] input {
      background: var(--card);
      color: var(--ink);
      border-color: var(--line);
    }
    :root[data-theme] select option { background: var(--card); color: var(--ink); }
    /* The "Dark pressed fill" toggle is redundant under a theme; keep the
       themed pressed colors either way. */
    :root[data-theme] body.dark-pressed {
      --key-pressed: var(--accent);
      --key-pressed-stroke: var(--accent-hi);
      --key-pressed-label: var(--on-accent);
    }
    /* Same ambient glow backdrop as the reference page. */
    :root[data-theme] body {
      background:
        radial-gradient(1200px 600px at 78% -10%, var(--glow1), transparent 60%),
        radial-gradient(900px 500px at 10% 110%, var(--glow2), transparent 55%),
        var(--bg);
      background-attachment: fixed;
    }
    /* VexFlow draws the staff in black; invert it on dark themes so the
       notes stay readable. hue-rotate keeps colored glyphs roughly on-hue. */
    ${darkStaffSelectors} {
      filter: invert(.88) hue-rotate(180deg);
    }

    /* ---- Picker (chips, like the reference page) ---- */
    .theme-picker {
      display: block;
      width: fit-content;
      max-width: min(92vw, 640px);
      margin: 0 auto 12px;
      font-size: .78rem;
      color: var(--muted, #444);
    }
    .theme-picker > summary {
      cursor: pointer;
      list-style: none;
      display: flex;
      width: fit-content;
      margin: 0 auto;
      align-items: center;
      gap: 8px;
      padding: 3px 10px;
      border: 1px solid var(--line, #bbb);
      border-radius: 999px;
      background: var(--card, #fff);
    }
    .theme-picker > summary::-webkit-details-marker { display: none; }
    .theme-picker > summary:hover { color: var(--accent, #a87a16); border-color: var(--accent, #a87a16); }
    .theme-picker .theme-mini {
      display: flex;
      width: 34px;
      height: 14px;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid var(--line, #bbb);
    }
    .theme-picker .theme-mini b { flex: 1; display: block; }
    .theme-tray {
      margin-top: 8px;
      padding: 8px 12px 12px;
      border: 1px solid var(--line, #bbb);
      border-radius: 12px;
      background: var(--card, #fff);
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .theme-group-label {
      width: 100%;
      font-size: .62rem;
      font-weight: 600;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--muted2, #777);
      margin: 4px 0 0;
    }
    .theme-chip {
      width: 46px;
      height: 28px;
      padding: 0;
      border: 2px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      background: none;
      box-shadow: 0 2px 8px -2px rgba(0, 0, 0, .4);
      transition: transform .13s ease, border-color .15s ease;
    }
    .theme-chip:hover { transform: translateY(-2px); }
    .theme-chip[aria-pressed="true"] {
      border-color: var(--accent-hi, var(--accent, #a87a16));
      box-shadow: 0 4px 12px -3px rgba(0, 0, 0, .5);
    }
    /* A <button> can't be a flex container in Chrome (children get wrapped in
       an anonymous box), so the swatches live in an inner flex wrapper. */
    .theme-chip .chip-sw { display: flex; width: 100%; height: 100%; }
    .theme-chip .chip-sw b { flex: 1; display: block; }

    @media print {
      .theme-picker { display: none !important; }
      /* Print stays clean white no matter which screen theme is active. */
      :root[data-theme] { ${CLASSIC_VARS} }
      :root[data-theme] body { background: #fff; }
      :root[data-theme] body.dark-pressed {
        --key-pressed: #444;
        --key-pressed-stroke: #444;
        --key-pressed-label: #ffffff;
      }
      .staff-wrap svg { filter: none !important; }
    }
  `;
  document.head.appendChild(style);

  let current = loadTheme();

  function applyTheme(id) {
    current = id;
    if (id === "classic") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
  }

  applyTheme(current);

  function miniSwatchesHTML(theme) {
    return theme.sw.map((c) => `<b style="background:${c}"></b>`).join("");
  }

  function build() {
    const picker = document.createElement("details");
    picker.className = "theme-picker no-print";

    const summary = document.createElement("summary");
    const mini = document.createElement("span");
    mini.className = "theme-mini";
    const summaryLabel = document.createElement("span");
    summary.append(mini, summaryLabel);
    picker.appendChild(summary);

    const tray = document.createElement("div");
    tray.className = "theme-tray";
    picker.appendChild(tray);

    const chips = new Map();
    for (const group of GROUPS) {
      const themes = THEMES.filter((t) => t.group === group.id);
      if (group.id !== "classic") {
        const label = document.createElement("span");
        label.className = "theme-group-label";
        label.textContent = group.label;
        tray.appendChild(label);
      }
      for (const theme of themes) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "theme-chip";
        chip.title = theme.name;
        chip.setAttribute("aria-label", `${theme.name} theme`);
        chip.innerHTML = `<span class="chip-sw">${miniSwatchesHTML(theme)}</span>`;
        chip.addEventListener("click", () => {
          applyTheme(theme.id);
          saveTheme(theme.id);
          sync();
        });
        chips.set(theme.id, chip);
        tray.appendChild(chip);
      }
    }

    function sync() {
      const theme = THEMES.find((t) => t.id === current);
      mini.innerHTML = miniSwatchesHTML(theme);
      summaryLabel.textContent = `Theme · ${theme.name}`;
      for (const [id, chip] of chips) {
        chip.setAttribute("aria-pressed", String(id === current));
      }
    }
    sync();

    /* Sits under the nav pill, below the version watermark when present. */
    const anchor = document.querySelector(".site-version") || document.querySelector(".site-nav");
    if (anchor) {
      anchor.after(picker);
    } else {
      const wrap = document.querySelector(".wrap") || document.body;
      wrap.insertBefore(picker, wrap.firstChild);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
