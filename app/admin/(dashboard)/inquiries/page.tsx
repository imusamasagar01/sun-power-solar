import { getInquiries } from "@/lib/data";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-2xl font-bold">Enquiries</h1>
      <p className="mt-1.5 text-sm text-ink-500">Messages submitted through the contact form.</p>

      <div className="mt-8 space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-2xl border border-ink-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-ink-900">{inquiry.name}</p>
              <p className="text-xs text-ink-400">
                {new Date(inquiry.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>

            <p className="mt-1 text-sm text-ink-500">
              <a href={`mailto:${inquiry.email}`} className="text-brand-700 hover:underline">
                {inquiry.email}
              </a>
              {inquiry.phone && ` · ${inquiry.phone}`}
              {inquiry.product_name && ` · ${inquiry.product_name}`}
            </p>

            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-700">{inquiry.message}</p>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center text-sm text-ink-400">
            No enquiries yet.
          </div>
        )}
      </div>
    </div>
  );
}
