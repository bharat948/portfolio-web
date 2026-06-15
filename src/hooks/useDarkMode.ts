import { useEffect, useState } from "react";

const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  if (stored === "light") return false;
  if (stored === "dark") return true;
  // Default to the user's system preference, falling back to dark.
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
};

// Manages the `dark` class on <html> and persists the choice. Lives at the App
// level so the theme stays consistent across every route.
export function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return { darkMode, toggleTheme: () => setDarkMode((prev) => !prev) };
}
