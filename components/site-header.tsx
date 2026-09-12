"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-line bg-card/85 shadow-[0_1px_20px_-12px_rgba(11,20,32,0.35)] backdrop-blur-md"
          : "border-transparent bg-card/70 backdrop-blur-sm",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between py-3.5">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "text-brand" : "text-muted hover:text-fg",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <ThemeToggle />
          <Link
            href="/products"
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500"
          >
            Explore Products
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong text-body transition-colors hover:bg-subtle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-line bg-card md:hidden">
          <nav className="container-page flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-[15px] font-medium text-body transition-colors hover:bg-subtle hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white dark:bg-brand-600"
            >
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
