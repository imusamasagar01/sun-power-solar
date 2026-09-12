import { getInquiries } from "@/lib/data";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-2xl font-bold">Enquiries</h1>
      <p className="mt-1.5 text-sm text-muted">Messages submitted through the contact form.</p>

      <div className="mt-8 space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-2xl border border-line bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-fg">{inquiry.name}</p>
              <p className="text-xs text-muted-soft">
                {new Date(inquiry.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>

            <p className="mt-1 text-sm text-muted">
              <a href={`mailto:${inquiry.email}`} className="text-brand hover:underline">
                {inquiry.email}
              </a>
              {inquiry.phone && ` · ${inquiry.phone}`}
              {inquiry.product_name && ` · ${inquiry.product_name}`}
            </p>

            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-body">{inquiry.message}</p>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line-strong bg-card px-6 py-16 text-center text-sm text-muted-soft">
            No enquiries yet.
          </div>
        )}
      </div>
    </div>
  );
}
