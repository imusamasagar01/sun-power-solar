"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";
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
          ? "border-ink-100 bg-white/85 shadow-[0_1px_20px_-12px_rgba(11,20,32,0.35)] backdrop-blur-md"
          : "border-transparent bg-white/70 backdrop-blur-sm",
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
                  active ? "text-brand-700" : "text-ink-500 hover:text-ink-900",
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
            className="flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            href="/products"
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift"
          >
            Explore Products
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-ink-700 transition-colors hover:bg-ink-50 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-ink-100 bg-white md:hidden">
          <nav className="container-page flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-[15px] font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
