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
          <p className="mt-1.5 text-sm text-muted">
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
            className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-fg">{announcement.title}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    announcement.is_active ? "bg-brand-100 text-brand" : "bg-line text-muted"
                  }`}
                >
                  {announcement.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted">{announcement.message}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <form action={toggleAnnouncementAction}>
                <input type="hidden" name="id" value={announcement.id} />
                <input type="hidden" name="activate" value={String(!announcement.is_active)} />
                <button
                  type="submit"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-subtle hover:text-brand"
                >
                  {announcement.is_active ? "Disable" : "Enable"}
                </button>
              </form>

              <Link
                href={`/admin/announcements/${announcement.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-subtle hover:text-brand"
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
          <div className="rounded-2xl border border-dashed border-line-strong bg-card px-6 py-16 text-center text-sm text-muted-soft">
            No announcements yet.
          </div>
        )}
      </div>
    </div>
  );
}
