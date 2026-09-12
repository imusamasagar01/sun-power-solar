"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import type { Announcement } from "@/lib/types";

/** Shows the active announcement once per browser session. */
export function AnnouncementPopup({ announcement }: { announcement: Announcement }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = `sps_announcement_${announcement.id}`;
    if (sessionStorage.getItem(key)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(key, "seen");
    }, 1200);

    return () => clearTimeout(timer);
  }, [announcement.id]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink-900/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-lift"
      >
        <div className="relative bg-ink-900 px-7 py-8 text-white">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-brand-600/30 blur-2xl" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            Announcement
          </span>
          <h2 id="announcement-title" className="relative mt-4 font-display text-2xl font-bold text-white">
            {announcement.title}
          </h2>
        </div>

        <div className="px-7 py-6">
          <p className="text-[15px] leading-relaxed text-body">{announcement.message}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {announcement.cta_href && (
              <Link
                href={announcement.cta_href}
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {announcement.cta_label || "Learn more"}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-body transition-colors hover:bg-subtle"
            >
              Maybe later
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close announcement"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
