/* Shared top navigation for the sax chart pages.
   Single source of truth — include with <script src="nav.js"></script>.
   Injects a menu into the first .wrap and marks the current page. */
(function () {
  const INDEX_STATE_KEY = "sax_chart.index.state.v1";
  const INDEX_STATE_FIELDS = ["mode", "root", "scale", "octaves", "register", "flats", "dark"];

  const PAGES = [
    { href: "index.html", label: "Key chart" },
    { href: "notes-to-chart.html", label: "Notes → charts" }
  ];

  function normalizePage(pathname) {
    const raw = (String(pathname || "").split("/").pop() || "").toLowerCase();
    if (!raw || raw === "index" || raw === "index.html") return "index.html";
    if (raw === "notes-to-chart" || raw === "notes-to-chart.html") return "notes-to-chart.html";
    return raw;
  }

  const current = normalizePage(location.pathname);

  const style = document.createElement("style");
  style.textContent = `
    .site-nav {
      display: flex;
      width: fit-content;
      margin: 0 auto 12px;
      border: 1px solid var(--line, #bbb);
      border-radius: 999px;
      background: var(--card, #fff);
      overflow: hidden;
    }
    .site-nav a {
      padding: 6px 16px;
      font-size: .85rem;
      text-decoration: none;
      color: var(--muted, #444);
      background: transparent;
    }
    .site-nav a + a { border-left: 1px solid var(--line, #bbb); }
    .site-nav a:hover { color: var(--accent, #a87a16); }
    .site-nav a[aria-current="page"] {
      color: var(--on-accent, #fff);
      background: var(--accent, #a87a16);
      font-weight: 600;
    }
    .site-nav a[aria-current="page"]:hover { color: var(--on-accent, #fff); }
    .site-nav a[aria-current="page"] + a,
    .site-nav a:has(+ a[aria-current="page"]) { border-left-color: transparent; }
    .site-version {
      display: block;
      margin: -8px auto 12px;
      width: fit-content;
      font-size: .68rem;
      font-style: italic;
      letter-spacing: .12em;
      color: var(--muted, #888);
      opacity: .45;
      user-select: none;
      pointer-events: none;
    }
    @media print { .site-nav, .site-version { display: none !important; } }
  `;
  document.head.appendChild(style);

  function parseStoredIndexState(raw) {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }

  function getStoredIndexHref() {
    let state = null;
    for (const areaName of ["localStorage", "sessionStorage"]) {
      try {
        state = parseStoredIndexState(window[areaName].getItem(INDEX_STATE_KEY));
        if (state) break;
      } catch {
        // Ignore unavailable storage area.
      }
    }
    if (!state) return "index.html";

    const params = new URLSearchParams();
    for (const key of INDEX_STATE_FIELDS) {
      if (state[key] != null && state[key] !== "") {
        params.set(key, String(state[key]));
      }
    }
    const query = params.toString();
    return query ? `index.html?${query}` : "index.html";
  }

  function build() {
    const wrap = document.querySelector(".wrap") || document.body;
    const nav = document.createElement("nav");
    nav.className = "site-nav no-print";
    nav.setAttribute("aria-label", "Pages");
    for (const page of PAGES) {
      const a = document.createElement("a");
      a.href = page.href === "index.html" ? getStoredIndexHref() : page.href;
      a.textContent = page.label;
      if (normalizePage(page.href) === current) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    }
    wrap.insertBefore(nav, wrap.firstChild);

    if (window.APP_VERSION) {
      const version = document.createElement("div");
      version.className = "site-version no-print";
      version.textContent = `v${window.APP_VERSION}`;
      nav.after(version);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
