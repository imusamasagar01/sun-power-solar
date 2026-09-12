import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { discountPercent, formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] ?? "/images/product-solar-panel.jpg";
  const discount = discountPercent(product.price, product.discount_price);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-ink-50">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {discount !== null && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-ink-900 shadow-sm">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.category && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            {product.category.name}
          </span>
        )}
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{product.title}</p>

        <div className="mt-5 flex items-end justify-between border-t border-ink-100 pt-4">
          <div>
            {product.discount_price ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-display text-xl font-bold text-ink-900">
                  {formatPrice(product.discount_price)}
                </span>
                <span className="text-sm text-ink-400 line-through">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="font-display text-xl font-bold text-ink-900">{formatPrice(product.price)}</span>
            )}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            View
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
