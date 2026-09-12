"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/inquiries", label: "Enquiries" },
];

export function AdminNav({ email, logoutAction }: { email: string; logoutAction: () => Promise<void> }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <circle cx="12" cy="9" r="3.2" fill="currentColor" className="text-gold-300" />
              <path d="M4.4 20.6 6 16.4h12l1.6 4.2H4.4Z" fill="currentColor" />
            </svg>
          </span>
          <div>
            <p className="font-display text-sm font-bold">Sun Power Solar</p>
            <p className="text-xs text-muted-soft">{email}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "bg-brand-600 text-white" : "text-muted hover:bg-subtle hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-subtle hover:text-fg"
          >
            View site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <ThemeToggle className="ml-1 h-9 w-9 rounded-lg" />

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-subtle hover:text-fg"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
