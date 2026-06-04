/* Fills [data-app-version] from version.js (requires window.APP_VERSION). */
(function () {
  function apply() {
    const label = window.APP_VERSION ? `v${window.APP_VERSION}` : "";
    for (const el of document.querySelectorAll("[data-app-version]")) {
      el.textContent = label;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
