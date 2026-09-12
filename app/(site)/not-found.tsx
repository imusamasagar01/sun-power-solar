import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-6xl font-extrabold text-brand-200">404</span>
      <h1 className="mt-5 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-[15px] text-ink-500">
        The page you are looking for has moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Back to home
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-ink-200 px-7 py-3.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-white"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
}
