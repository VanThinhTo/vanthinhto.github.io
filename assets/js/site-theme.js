(function () {
  const storageKey = "site-theme";
  const initialTheme = localStorage.getItem(storageKey) || "light";

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(storageKey, theme);
  }

  setTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });
  });
})();
