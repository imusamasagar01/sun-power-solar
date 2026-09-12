"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/(site)/contact/actions";

const initialState: InquiryState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function ContactForm({ product }: { product?: string }) {
  const [state, formAction] = useActionState(submitInquiry, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {product && <input type="hidden" name="product" value={product} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
            Full name *
          </label>
          <input id="name" name="name" required placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            Phone
          </label>
          <input id="phone" name="phone" placeholder="+92 300 0000000" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={
            product
              ? `I would like a quotation for ${product}.`
              : "Tell us about your property and average monthly electricity bill."
          }
          className={`${fieldClass} resize-y`}
        />
      </div>

      {state.status !== "idle" && (
        <p
          className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ${
            state.status === "success"
              ? "bg-brand-50 text-brand-800"
              : "bg-gold-100 text-gold-600"
          }`}
        >
          {state.status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0" />
          ) : (
            <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" />
          )}
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      <Send className="h-4 w-4" />
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}
