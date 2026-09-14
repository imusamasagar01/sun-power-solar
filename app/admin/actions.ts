"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession, getSession, verifyCredentials } from "@/lib/auth";
import { MEDIA_BUCKET, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { linesToArray, linesToPairs, slugify } from "@/lib/utils";

export type FormState = { status: "idle" | "error"; message: string };

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function requireDatabase() {
  if (!isSupabaseConfigured) {
    throw new Error("Connect Supabase first — add your project keys to .env.local, then restart the app.");
  }
}

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    if (!verifyCredentials(email, password)) {
      return { status: "error", message: "Incorrect email or password." };
    }
    await createSession(email);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Login failed." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/** Parses "Name | https://url" lines into document objects. */
function parseDocuments(value: FormDataEntryValue | null) {
  return linesToArray(value).map((line) => {
    const [name, url] = line.split("|");
    return { name: (name ?? "").trim() || "Document", url: (url ?? "").trim() };
  });
}

export async function saveProductAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { status: "error", message: "Product name is required." };

  const baseSlug = slugify(String(formData.get("slug") ?? "") || name) || `product-${Date.now()}`;

  const payload = {
    name,
    slug: baseSlug,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: Number(formData.get("price") ?? 0) || 0,
    discount_price: formData.get("discount_price") ? Number(formData.get("discount_price")) : null,
    category_id: String(formData.get("category_id") ?? "") || null,
    images: linesToArray(formData.get("images")),
    videos: linesToArray(formData.get("videos")),
    documents: parseDocuments(formData.get("documents")),
    features: linesToArray(formData.get("features")),
    specifications: linesToPairs(formData.get("specifications")),
    is_active: formData.get("is_active") === "on",
    is_featured: formData.get("is_featured") === "on",
    updated_at: new Date().toISOString(),
  };

  try {
    requireDatabase();
    const supabase = getSupabaseAdmin();

    if (id) {
      const { error } = await withWriteRetry(() =>
        supabase.from("products").update(payload).eq("id", id),
      );
      if (error) {
        return {
          status: "error",
          message: isDuplicateSlug(error)
            ? "A product with this URL slug already exists. Change the slug and try again."
            : friendlyWriteError(error.message),
        };
      }
    } else {
      // If the slug is taken, append -2, -3… instead of failing the whole create.
      let attempt = 0;
      let lastError: { message: string; code?: string } | null = null;
      let created = false;

      while (attempt < 6) {
        const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;
        const { error } = await withWriteRetry(() =>
          supabase.from("products").insert({ ...payload, slug }),
        );

        if (!error) {
          created = true;
          break;
        }

        lastError = error;
        if (!isDuplicateSlug(error)) break;
        attempt += 1;
      }

      if (!created) {
        return {
          status: "error",
          message: lastError
            ? isDuplicateSlug(lastError)
              ? "A product with this URL slug already exists. Change the slug and try again."
              : friendlyWriteError(lastError.message)
            : "Could not save product.",
        };
      }
    }
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Could not save product." };
  }

  revalidateAll();
  redirect("/admin/products");
}

function isDuplicateSlug(error: { message: string; code?: string }) {
  return (
    error.code === "23505" ||
    /duplicate key|unique constraint|already exists/i.test(error.message)
  );
}

function friendlyWriteError(message: string) {
  if (/timeout|timed out|gateway|504|502|503/i.test(message)) {
    return "The database timed out. Please wait a moment and try saving again.";
  }
  return message;
}

async function withWriteRetry<T extends { error: { message: string; code?: string } | null }>(
  run: () => PromiseLike<T>,
): Promise<T> {
  let last = await run();
  if (!last.error || !/timeout|timed out|gateway|504|502|503|fetch failed/i.test(last.error.message)) {
    return last;
  }
  await new Promise((resolve) => setTimeout(resolve, 800));
  last = await run();
  return last;
}

export async function deleteProductAction(formData: FormData) {
  await requireSession();
  requireDatabase();

  const id = String(formData.get("id") ?? "");
  const { error } = await getSupabaseAdmin().from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAll();
}

export async function saveAnnouncementAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { status: "error", message: "Announcement title is required." };

  const id = String(formData.get("id") ?? "");
  const payload = {
    title,
    message: String(formData.get("message") ?? "").trim(),
    cta_label: String(formData.get("cta_label") ?? "").trim() || null,
    cta_href: String(formData.get("cta_href") ?? "").trim() || null,
    is_active: formData.get("is_active") === "on",
  };

  try {
    requireDatabase();
    const supabase = getSupabaseAdmin();

    // Only one announcement shows on the site, so activating this one deactivates the rest.
    if (payload.is_active) {
      await supabase.from("announcements").update({ is_active: false }).neq("id", id || crypto.randomUUID());
    }

    const { error } = id
      ? await supabase.from("announcements").update(payload).eq("id", id)
      : await supabase.from("announcements").insert(payload);

    if (error) return { status: "error", message: error.message };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save announcement.",
    };
  }

  revalidateAll();
  redirect("/admin/announcements");
}

export async function toggleAnnouncementAction(formData: FormData) {
  await requireSession();
  requireDatabase();

  const id = String(formData.get("id") ?? "");
  const activate = formData.get("activate") === "true";
  const supabase = getSupabaseAdmin();

  if (activate) {
    await supabase.from("announcements").update({ is_active: false }).neq("id", id);
  }
  const { error } = await supabase.from("announcements").update({ is_active: activate }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAll();
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireSession();
  requireDatabase();

  const id = String(formData.get("id") ?? "");
  const { error } = await getSupabaseAdmin().from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAll();
}

/** Uploads files to Supabase Storage and returns their public URLs. */
export async function uploadMediaAction(formData: FormData): Promise<{ urls: string[]; error?: string }> {
  await requireSession();

  const files = formData.getAll("files").filter((file): file is File => file instanceof File && file.size > 0);
  if (files.length === 0) return { urls: [], error: "No files selected." };

  try {
    requireDatabase();
    const supabase = getSupabaseAdmin();
    const urls: string[] = [];

    for (const file of files) {
      const extension = file.name.split(".").pop() ?? "bin";
      const path = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });

      if (error) return { urls, error: error.message };
      urls.push(supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl);
    }

    return { urls };
  } catch (error) {
    return { urls: [], error: error instanceof Error ? error.message : "Upload failed." };
  }
}
