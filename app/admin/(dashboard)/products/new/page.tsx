import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/data";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <h1 className="mt-5 text-2xl font-bold">Add product</h1>
      <div className="mt-7">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
