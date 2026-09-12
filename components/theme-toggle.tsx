"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Flips the `dark` class on <html> and remembers the choice.
 * The current theme is read from the DOM rather than React state so the button
 * renders identically on the server and never flashes the wrong icon.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("sps-theme", next);
    } catch {
      // Private browsing can block storage — the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong text-body transition-all duration-300 hover:border-brand-400 hover:text-brand active:scale-[0.94]",
        className,
      )}
    >
      <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
