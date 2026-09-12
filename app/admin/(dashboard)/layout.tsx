import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { logoutAction } from "@/app/admin/actions";
import { getSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex flex-1 flex-col">
      <AdminNav email={session.email} logoutAction={logoutAction} />

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 lg:px-8 lg:py-10">
        {!isSupabaseConfigured && (
          <p className="mb-6 rounded-xl border border-gold-300 bg-gold-100 px-5 py-4 text-sm text-gold-600">
            Supabase is not connected yet, so you are viewing demo content and changes cannot be saved. Add
            your Supabase keys to <code className="font-mono">.env.local</code> and restart the app.
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
