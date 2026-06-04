/* One-shot handoff from index.html (key chart) to notes-to-chart.html. */
(function () {
  const KEY = "saxChart.transfer";

  window.SAX_CHART_TRANSFER = {
    push(payload) {
      sessionStorage.setItem(KEY, JSON.stringify({
        text: String(payload.text ?? ""),
        mode: payload.mode === "append" ? "append" : "replace",
        title: String(payload.title ?? ""),
        flats: !!payload.flats,
        at: Date.now()
      }));
    },
    pull() {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return null;
      sessionStorage.removeItem(KEY);
      try {
        const data = JSON.parse(raw);
        if (!data || typeof data.text !== "string" || !data.text) return null;
        return data;
      } catch {
        return null;
      }
    }
  };
})();
