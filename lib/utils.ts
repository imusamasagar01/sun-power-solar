import { site } from "./site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat(site.locale, {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(price: number, discountPrice: number | null) {
  if (!discountPrice || discountPrice >= price || price <= 0) return null;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Turns a textarea value into a clean list, one item per line. */
export function linesToArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Parses "Label: Value" lines into specification pairs. */
export function linesToPairs(value: FormDataEntryValue | null) {
  return linesToArray(value).map((line) => {
    const [label, ...rest] = line.split(":");
    return { label: label.trim(), value: rest.join(":").trim() };
  });
}

export function youtubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
