"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Go light" : "Go dark"}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-800 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10"
    >
      <span className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white dark:text-neutral-950">
        {dark ? "Go Light" : "Go Dark"}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-x-[5px] border-b-[6px] border-x-transparent border-b-neutral-950 dark:border-b-white" />
      </span>
      {dark ? (
        <Sun className="h-5 w-5" strokeWidth={1.75} />
      ) : (
        <Moon className="h-5 w-5 fill-current" strokeWidth={1.75} />
      )}
    </button>
  );
}
