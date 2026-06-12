/* Lightweight stroke icons for toolbar buttons (Lucide-style, inline SVG). */
(function () {
  const NS = "http://www.w3.org/2000/svg";

  /** @type {Record<string, string | string[]>} */
  const ICONS = {
    "arrow-right": ["M5 12h14", "M12 5l7 7-7 7"],
    "list-plus": ["M11 12H3", "M16 6H3", "M10 18H3", "M21 12h-6", "M18 9v6"],
    "refresh": ["M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5", "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", "M16 16h5v5"],
    printer: ["M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 9V3h12v6", "M6 14h12v8H6z"],
    bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
    trash: ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M10 11v6", "M14 11v6"],
    link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
    undo: ["M3 7v6h6", "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"],
    redo: ["M21 7v6h-6", "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"],
    play: "M5 3l14 9-14 9V3z",
    square: "M5 5h14v14H5z"
  };

  function create(name) {
    const def = ICONS[name];
    if (!def) return null;
    const paths = Array.isArray(def) ? def : [def];
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "ui-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    for (const d of paths) {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      svg.appendChild(path);
    }
    return svg;
  }

  function decorate(root = document) {
    for (const el of root.querySelectorAll("[data-ui-icon]")) {
      if (el.querySelector(".ui-icon")) continue;
      const svg = create(el.getAttribute("data-ui-icon"));
      if (!svg) continue;
      el.classList.add("btn-with-icon");
      el.insertBefore(svg, el.firstChild);
    }
  }

  window.UI_ICONS = { create, decorate };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => decorate());
  } else {
    decorate();
  }
})();
