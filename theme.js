(function () {
  const storageKey = "motochefe-theme";
  const root = document.documentElement;
  const validThemes = ["dark", "light"];

  function getStoredTheme() {
    const stored = window.localStorage.getItem(storageKey);
    return validThemes.includes(stored) ? stored : "dark";
  }

  function updateTheme(theme) {
    const nextTheme = validThemes.includes(theme) ? theme : "dark";
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: nextTheme } }));
    return nextTheme;
  }

  window.ThemeController = {
    get: () => root.dataset.theme || "dark",
    set: updateTheme,
    toggle: () => updateTheme((root.dataset.theme || "dark") === "dark" ? "light" : "dark")
  };

  updateTheme(getStoredTheme());
})();
