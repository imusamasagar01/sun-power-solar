import Link from "next/link";
import { Megaphone, MessageSquare, PackageCheck, Plus } from "lucide-react";
import { getAnnouncements, getInquiries, getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [products, announcements, inquiries] = await Promise.all([
    getProducts({ includeInactive: true }),
    getAnnouncements(),
    getInquiries(),
  ]);

  const activeProducts = products.filter((product) => product.is_active).length;
  const activeAnnouncement = announcements.find((announcement) => announcement.is_active);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1.5 text-sm text-muted">Manage your catalogue and site announcements.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          Icon={PackageCheck}
          label="Active products"
          value={`${activeProducts} / ${products.length}`}
        />
        <StatCard
          Icon={Megaphone}
          label="Active announcement"
          value={activeAnnouncement ? activeAnnouncement.title : "None"}
        />
        <StatCard Icon={MessageSquare} label="Enquiries received" value={String(inquiries.length)} />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-base font-bold">Recent products</h2>
          <Link href="/admin/products" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-line">
          {products.slice(0, 5).map((product) => (
            <li key={product.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{product.name}</p>
                <p className="mt-0.5 text-xs text-muted-soft">
                  {product.category?.name ?? "Uncategorised"} ·{" "}
                  {formatPrice(product.discount_price ?? product.price)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  product.is_active ? "bg-brand-100 text-brand" : "bg-line text-muted"
                }`}
              >
                {product.is_active ? "Active" : "Inactive"}
              </span>
            </li>
          ))}
          {products.length === 0 && (
            <li className="px-6 py-10 text-center text-sm text-muted-soft">No products yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/10 text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-soft">{label}</p>
      <p className="mt-1.5 truncate font-display text-xl font-bold text-fg">{value}</p>
    </div>
  );
}
