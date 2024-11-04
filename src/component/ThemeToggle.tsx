import { useState, useEffect } from "react";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!localStorage.getItem("color-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={handleThemeToggle}>
      {!isDarkMode ? (
        <span id="themeToggleDarkIcon">🌙</span>
      ) : (
        <span id="themeToggleLightIcon">☀️</span>
      )}
    </button>
  );
}

export default ThemeToggle;
