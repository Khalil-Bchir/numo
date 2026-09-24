"use client";

import React, { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("numo-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("numo-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("numo-theme", "light");
    }
  };

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return (
      <div
        className={`w-9 h-9 rounded-full border ${className}`}
        style={{
          backgroundColor: "var(--color-surface-container-low)",
          borderColor: "var(--color-outline-variant)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        color: "var(--color-primary)",
      }}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-90 hover:opacity-80 ${className}`}
    >
      <span
        className={`material-symbols-outlined text-[19px] transition-transform duration-300 ${
          isDark ? "rotate-0 scale-100" : "-rotate-12 scale-100"
        }`}
      >
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
