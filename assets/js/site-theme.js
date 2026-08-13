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

  function initializePublicationFilters() {
    document.querySelectorAll("[data-publication-browser]").forEach(function (browser) {
      const buttons = Array.from(browser.querySelectorAll("[data-publication-filter]"));
      const entries = Array.from(browser.querySelectorAll("[data-publication-entry]"));

      function applyFilter(filter) {
        buttons.forEach(function (button) {
          const isActive = button.dataset.publicationFilter === filter;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        entries.forEach(function (entry) {
          const categories = (entry.dataset.categories || "").split(/\s+/);
          entry.hidden = filter !== "all" && !categories.includes(filter);
        });
      }

      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          applyFilter(button.dataset.publicationFilter);
        });
      });

      const initialButton = buttons.find(function (button) {
        return button.getAttribute("aria-pressed") === "true";
      });
      applyFilter(initialButton ? initialButton.dataset.publicationFilter : "highlights");
    });
  }

  setTheme(getStoredTheme() || "light");

  document.addEventListener("DOMContentLoaded", function () {
    updateToggleButtons(document.documentElement.getAttribute("data-theme") || "light");
    initializePublicationFilters();

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });
  });
})();
