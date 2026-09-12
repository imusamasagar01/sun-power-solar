"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { loginAction, type FormState } from "@/app/admin/actions";
import { adminField } from "./field-styles";

const initialState: FormState = { status: "idle", message: "" };

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={adminField} />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={adminField}
        />
      </div>

      {state.status === "error" && (
        <p className="flex items-start gap-2.5 rounded-xl bg-gold-100 px-4 py-3 text-sm text-gold-600">
          <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" />
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
      className="w-full rounded-xl bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}
