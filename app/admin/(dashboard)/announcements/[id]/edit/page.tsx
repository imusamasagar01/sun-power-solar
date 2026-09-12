import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AnnouncementForm } from "@/components/admin/announcement-form";
import { getAnnouncements } from "@/lib/data";

export default async function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const announcement = (await getAnnouncements()).find((item) => item.id === id);
  if (!announcement) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/announcements"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to announcements
      </Link>

      <h1 className="mt-5 text-2xl font-bold">Edit announcement</h1>
      <div className="mt-7">
        <AnnouncementForm announcement={announcement} />
      </div>
    </div>
  );
}
