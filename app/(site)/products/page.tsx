import { Suspense } from "react";
import type { Metadata } from "next";
import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Reveal } from "@/components/reveal";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse solar panels, inverters, batteries, complete systems and accessories from Sun Power Solar.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const categoryId = categories.find((item) => item.slug === category)?.id;
  const term = q.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory = !categoryId || product.category_id === categoryId;
    const matchesTerm =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);
    return matchesCategory && matchesTerm;
  });

  return (
    <>
      <section className="border-b border-line bg-card">
        <div className="container-page py-14 lg:py-20">
          <span className="eyebrow">
            Our Catalogue
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Solar products & systems</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            Everything you need to generate, store and manage your own electricity — supplied with genuine
            warranties and professional installation support.
          </p>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <Suspense fallback={<div className="h-12" />}>
          <ProductFilters categories={categories} />
        </Suspense>

        <p className="mt-8 text-sm text-muted-soft">
          Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-card px-6 py-20 text-center">
            <PackageSearch className="h-10 w-10 text-ink-300" />
            <h2 className="mt-5 font-display text-xl font-bold">No products found</h2>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Try a different search term or category. You can also contact us directly and we will source
              what you need.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 5) * 70} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
