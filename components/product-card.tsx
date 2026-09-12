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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
    >
      <div className="sheen relative aspect-4/3 bg-subtle">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {discount !== null && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-ink-900 shadow-sm">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.category && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            {product.category.name}
          </span>
        )}
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-fg transition-colors group-hover:text-brand">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{product.title}</p>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            {product.discount_price ? (
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-display text-xl font-bold text-fg">
                  {formatPrice(product.discount_price)}
                </span>
                <span className="text-sm text-muted-soft line-through">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="font-display text-xl font-bold text-fg">{formatPrice(product.price)}</span>
            )}
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/10 text-brand transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
