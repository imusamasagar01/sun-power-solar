import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getSession } from "@/lib/auth";
import { site } from "@/lib/site";

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              <circle cx="12" cy="9" r="3.2" fill="currentColor" className="text-gold-300" />
              <path d="M4.4 20.6 6 16.4h12l1.6 4.2H4.4Z" fill="currentColor" />
            </svg>
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">{site.name}</h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage products and announcements.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-card p-7 shadow-card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
