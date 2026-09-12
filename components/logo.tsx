import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="12" cy="9" r="3.2" fill="currentColor" className="text-gold-300" />
          <path
            d="M12 2.6v1.6M12 13.8v1.4M5.6 9H4M20 9h-1.6M7.5 4.5 6.4 3.4M17.6 3.4l-1.1 1.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-gold-300"
          />
          <path d="M4.4 20.6 6 16.4h12l1.6 4.2H4.4Z" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-extrabold tracking-tight",
            variant === "light" ? "text-white" : "text-fg",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
            variant === "light" ? "text-white/60" : "text-muted-soft",
          )}
        >
          Solar Energy Solutions
        </span>
      </span>
    </Link>
  );
}
