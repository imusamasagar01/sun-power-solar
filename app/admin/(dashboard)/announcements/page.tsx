import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { deleteAnnouncementAction, toggleAnnouncementAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { getAnnouncements } from "@/lib/data";

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="mt-1.5 text-sm text-ink-500">
            The active announcement appears as a popup and a homepage banner.
          </p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Add announcement
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink-900">{announcement.title}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    announcement.is_active ? "bg-brand-100 text-brand-700" : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {announcement.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{announcement.message}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <form action={toggleAnnouncementAction}>
                <input type="hidden" name="id" value={announcement.id} />
                <input type="hidden" name="activate" value={String(!announcement.is_active)} />
                <button
                  type="submit"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700"
                >
                  {announcement.is_active ? "Disable" : "Enable"}
                </button>
              </form>

              <Link
                href={`/admin/announcements/${announcement.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>

              <DeleteButton
                action={deleteAnnouncementAction}
                id={announcement.id}
                confirmMessage={`Delete "${announcement.title}"?`}
              />
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center text-sm text-ink-400">
            No announcements yet.
          </div>
        )}
      </div>
    </div>
  );
}
