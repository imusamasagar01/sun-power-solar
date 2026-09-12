"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Push the search term into the URL after the user pauses typing.
  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (query === current) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) params.set("q", query);
      else params.delete("q");
      router.replace(`/products${params.toString() ? `?${params}` : ""}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  function selectCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    router.replace(`/products${params.toString() ? `?${params}` : ""}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        <FilterPill active={!activeCategory} onClick={() => selectCategory("")}>
          All Products
        </FilterPill>
        {categories.map((category) => (
          <FilterPill
            key={category.id}
            active={activeCategory === category.slug}
            onClick={() => selectCategory(category.slug)}
          >
            {category.name}
          </FilterPill>
        ))}
      </div>

      <div className="relative w-full lg:max-w-xs">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-full border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
          : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
      )}
    >
      {children}
    </button>
  );
}
