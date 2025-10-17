"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dp_theme"; // "light" | "dark"

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as "light" | "dark" | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setMode(initial);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-lg border border-gray-700/40 px-3 py-2 text-sm hover:bg-gray-800/40"
      onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
    >
      {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}





