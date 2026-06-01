/* Shared top navigation for the sax chart pages.
   Single source of truth — include with <script src="nav.js"></script>.
   Injects a menu into the first .wrap and marks the current page. */
(function () {
  const PAGES = [
    { href: "index.html", label: "Key chart" },
    { href: "notes-to-chart.html", label: "Notes → charts" }
  ];

  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const style = document.createElement("style");
  style.textContent = `
    .site-nav { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 16px; }
    .site-nav a {
      padding: 6px 12px;
      border: 1px solid var(--line, #bbb);
      border-radius: 999px;
      font-size: .85rem;
      text-decoration: none;
      color: var(--muted, #444);
      background: #fff;
    }
    .site-nav a:hover { border-color: var(--ink, #000); color: var(--ink, #000); }
    .site-nav a[aria-current="page"] {
      color: var(--ink, #000);
      border-color: var(--ink, #000);
      font-weight: 600;
    }
    @media print { .site-nav { display: none !important; } }
  `;
  document.head.appendChild(style);

  function build() {
    const wrap = document.querySelector(".wrap") || document.body;
    const nav = document.createElement("nav");
    nav.className = "site-nav no-print";
    nav.setAttribute("aria-label", "Pages");
    for (const page of PAGES) {
      const a = document.createElement("a");
      a.href = page.href;
      a.textContent = page.label;
      if (page.href.toLowerCase() === current) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    }
    wrap.insertBefore(nav, wrap.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
