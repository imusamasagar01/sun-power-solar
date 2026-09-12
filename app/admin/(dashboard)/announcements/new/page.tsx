import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnnouncementForm } from "@/components/admin/announcement-form";

export default function NewAnnouncementPage() {
  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/announcements"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to announcements
      </Link>

      <h1 className="mt-5 text-2xl font-bold">Add announcement</h1>
      <div className="mt-7">
        <AnnouncementForm />
      </div>
    </div>
  );
}
