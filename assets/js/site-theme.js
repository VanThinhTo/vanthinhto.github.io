(function () {
  const storageKey = "site-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function updateToggleButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      const isDark = theme === "dark";
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("aria-pressed", isDark ? "true" : "false");
      button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    storeTheme(theme);
    updateToggleButtons(theme);
  }

  setTheme(getStoredTheme() || "light");

  document.addEventListener("DOMContentLoaded", function () {
    updateToggleButtons(document.documentElement.getAttribute("data-theme") || "light");

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });
  });
})();
