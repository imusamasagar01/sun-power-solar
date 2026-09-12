import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories, getProductById } from "@/lib/data";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), getCategories()]);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <h1 className="mt-5 text-2xl font-bold">Edit product</h1>
      <p className="mt-1.5 text-sm text-ink-500">{product.name}</p>

      <div className="mt-7">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
