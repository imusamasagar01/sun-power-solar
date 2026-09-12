"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
        <RefreshCw className="h-6 w-6" />
      </span>
      <h1 className="mt-6 text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
        We could not load this page just now. Please try again — it usually works on a second attempt.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-ink-200 px-7 py-3.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-white active:scale-[0.98]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
