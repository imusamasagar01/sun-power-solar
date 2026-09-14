import "server-only";
import { getSupabase, getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { seedAnnouncements, seedCategories, seedProducts } from "./seed-data";
import type { Announcement, Category, Inquiry, Product } from "./types";

/** Service-role client for admin reads (needed to see inactive rows), or null in demo mode. */
function adminClient() {
  return isSupabaseConfigured && process.env.SUPABASE_SERVICE_ROLE_KEY ? getSupabaseAdmin() : null;
}

function isTransientError(message: string) {
  return /timeout|timed out|gateway|502|503|504|fetch failed|network|ECONNRESET|ETIMEDOUT/i.test(
    message,
  );
}

/**
 * Runs a Supabase query with a couple of retries on transient failures.
 * Cold starts and brief network blips would otherwise surface as a 500 page
 * (or fail the Vercel build during prerender).
 */
async function withRetry<T>(run: () => PromiseLike<{ data: T; error: { message: string } | null }>) {
  let last = await run();
  if (!last.error) return last;

  for (const delayMs of [600, 1500]) {
    if (!isTransientError(last.error.message)) break;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    last = await run();
    if (!last.error) return last;
  }

  return last;
}

const PRODUCT_FIELDS =
  "id, slug, name, title, description, price, discount_price, category_id, images, videos, documents, features, specifications, is_active, is_featured, created_at";

function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    ...(row as Product),
    images: (row.images as string[]) ?? [],
    videos: (row.videos as string[]) ?? [],
    documents: (row.documents as Product["documents"]) ?? [],
    features: (row.features as string[]) ?? [],
    specifications: (row.specifications as Product["specifications"]) ?? [],
  };
}

function withCategory(products: Product[], categories: Category[]): Product[] {
  return products.map((product) => ({
    ...product,
    category: categories.find((category) => category.id === product.category_id) ?? null,
  }));
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) return seedCategories;

  const { data, error } = await withRetry(() =>
    supabase.from("categories").select("id, name, slug").order("name"),
  );
  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return data as Category[];
}

export async function getProducts(options: { includeInactive?: boolean } = {}): Promise<Product[]> {
  const categories = await getCategories();
  const supabase = options.includeInactive ? adminClient() : getSupabase();

  if (!supabase) {
    const products = options.includeInactive
      ? seedProducts
      : seedProducts.filter((product) => product.is_active);
    return withCategory(products, categories);
  }

  const { data, error } = await withRetry(() => {
    const query = supabase.from("products").select(PRODUCT_FIELDS).order("created_at", { ascending: false });
    return options.includeInactive ? query : query.eq("is_active", true);
  });
  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return withCategory((data ?? []).map(normalizeProduct), categories);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((product) => product.is_featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const categories = await getCategories();
  const supabase = getSupabase();

  if (!supabase) {
    const product = seedProducts.find((item) => item.slug === slug && item.is_active);
    return product ? withCategory([product], categories)[0] : null;
  }

  const { data, error } = await withRetry(() =>
    supabase.from("products").select(PRODUCT_FIELDS).eq("slug", slug).eq("is_active", true).maybeSingle(),
  );

  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? withCategory([normalizeProduct(data)], categories)[0] : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = adminClient();
  if (!supabase) return seedProducts.find((product) => product.id === id) ?? null;

  const { data, error } = await supabase.from("products").select(PRODUCT_FIELDS).eq("id", id).maybeSingle();
  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? normalizeProduct(data) : null;
}

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  const supabase = getSupabase();
  if (!supabase) return seedAnnouncements.find((item) => item.is_active) ?? null;

  const { data, error } = await withRetry(() =>
    supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  );

  // Popup is optional — never fail a page (or the production build) for it.
  if (error) {
    console.error(`Failed to load announcement: ${error.message}`);
    return null;
  }
  return (data as Announcement) ?? null;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = adminClient();
  if (!supabase) return seedAnnouncements;

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load announcements: ${error.message}`);
  return (data ?? []) as Announcement[];
}

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = adminClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(`Failed to load enquiries: ${error.message}`);
  return (data ?? []) as Inquiry[];
}

export { isSupabaseConfigured };
