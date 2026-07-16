import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "nexus-theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function useTheme() {
  // Default dark; the inline script in __root sets the class before hydration.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as Theme | null)) || "dark";
    setTheme(stored);
    apply(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
  };

  return { theme, toggle };
}
