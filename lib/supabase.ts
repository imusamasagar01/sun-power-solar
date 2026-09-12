import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** The site falls back to bundled demo content until Supabase is configured. */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const MEDIA_BUCKET = "media";

/** Read-only client used for public pages. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

/** Service-role client. Server-side only — never import this from a client component. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment.",
    );
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
