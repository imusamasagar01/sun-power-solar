/**
 * Loads the sample catalogue from lib/seed-data.ts into Supabase.
 * Safe to re-run: products are matched on their slug and updated in place.
 *
 *   npm run seed
 */
import { createClient } from "@supabase/supabase-js";
import { seedAnnouncements, seedCategories, seedProducts } from "../lib/seed-data.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: categories, error: categoryError } = await supabase.from("categories").select("id, slug");
if (categoryError) {
  console.error("Could not read categories:", categoryError.message);
  process.exit(1);
}

// Sample products reference placeholder category ids, so map them across by slug.
const slugById = new Map(seedCategories.map((category) => [category.id, category.slug]));
const idBySlug = new Map((categories ?? []).map((category) => [category.slug, category.id]));

const rows = seedProducts.map(({ id, category, category_id, ...product }) => ({
  ...product,
  category_id: idBySlug.get(slugById.get(category_id ?? "") ?? "") ?? null,
}));

const { error: productError } = await supabase.from("products").upsert(rows, { onConflict: "slug" });
if (productError) {
  console.error("Could not save products:", productError.message);
  process.exit(1);
}
console.log(`Products loaded: ${rows.length}`);

const { data: existing } = await supabase.from("announcements").select("id").limit(1);
if (existing && existing.length > 0) {
  console.log("Announcement already exists — skipped.");
} else {
  const [announcement] = seedAnnouncements;
  const { error } = await supabase.from("announcements").insert({
    title: announcement.title,
    message: announcement.message,
    cta_label: announcement.cta_label,
    cta_href: announcement.cta_href,
    is_active: announcement.is_active,
  });
  console.log(error ? `Announcement failed: ${error.message}` : "Announcement loaded.");
}
