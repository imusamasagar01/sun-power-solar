import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { deleteProductAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await getProducts({ includeInactive: true });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-1.5 text-sm text-ink-500">{products.length} products in the catalogue.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <ul className="divide-y divide-ink-100">
          {products.map((product) => (
            <li key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-50">
                {product.images[0] && (
                  <Image src={product.images[0]} alt="" fill sizes="80px" className="object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-medium text-ink-900">{product.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      product.is_active ? "bg-brand-100 text-brand-700" : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                  {product.is_featured && (
                    <span className="rounded-full bg-gold-200 px-2.5 py-0.5 text-xs font-semibold text-gold-600">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-ink-400">
                  {product.category?.name ?? "Uncategorised"} ·{" "}
                  {product.discount_price
                    ? `${formatPrice(product.discount_price)} (was ${formatPrice(product.price)})`
                    : formatPrice(product.price)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
                <DeleteButton
                  action={deleteProductAction}
                  id={product.id}
                  label="Delete"
                  confirmMessage={`Delete "${product.name}"? This cannot be undone.`}
                />
              </div>
            </li>
          ))}

          {products.length === 0 && (
            <li className="px-6 py-16 text-center text-sm text-ink-400">
              No products yet — add your first one.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
