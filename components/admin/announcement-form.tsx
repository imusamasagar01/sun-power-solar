"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { saveAnnouncementAction, type FormState } from "@/app/admin/actions";
import { adminField, adminHint, adminLabel } from "./field-styles";
import type { Announcement } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export function AnnouncementForm({ announcement }: { announcement?: Announcement | null }) {
  const [state, formAction] = useActionState(saveAnnouncementAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-7">
      {announcement && <input type="hidden" name="id" value={announcement.id} />}

      <div>
        <label htmlFor="title" className={adminLabel}>
          Title *
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={announcement?.title}
          placeholder="New Solar Scheme Available"
          className={adminField}
        />
      </div>

      <div>
        <label htmlFor="message" className={adminLabel}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={announcement?.message}
          placeholder="Special discount on selected products this month."
          className={adminField}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cta_label" className={adminLabel}>
            Button label
          </label>
          <input
            id="cta_label"
            name="cta_label"
            defaultValue={announcement?.cta_label ?? ""}
            placeholder="View offers"
            className={adminField}
          />
        </div>
        <div>
          <label htmlFor="cta_href" className={adminLabel}>
            Button link
          </label>
          <input
            id="cta_href"
            name="cta_href"
            defaultValue={announcement?.cta_href ?? ""}
            placeholder="/products"
            className={adminField}
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={announcement?.is_active ?? true}
            className="h-4 w-4 rounded border-ink-300 accent-brand-600"
          />
          Active — show this announcement on the website
        </label>
        <p className={adminHint}>Only one announcement is shown at a time; activating this hides the others.</p>
      </div>

      {state.status === "error" && (
        <p className="flex items-start gap-2.5 rounded-xl bg-gold-100 px-4 py-3 text-sm text-gold-600">
          <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton isEdit={Boolean(announcement)} />
        <Link
          href="/admin/announcements"
          className="rounded-xl border border-ink-200 px-6 py-2.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Saving..." : isEdit ? "Save changes" : "Create announcement"}
    </button>
  );
}
