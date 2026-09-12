"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { saveProductAction, type FormState } from "@/app/admin/actions";
import { MediaUploader } from "./media-uploader";
import { adminField, adminHint, adminLabel } from "./field-styles";
import type { Category, Product } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: Category[];
}) {
  const [state, formAction] = useActionState(saveProductAction, initialState);
  const [images, setImages] = useState((product?.images ?? []).join("\n"));
  const [videos, setVideos] = useState((product?.videos ?? []).join("\n"));
  const [documents, setDocuments] = useState(
    (product?.documents ?? []).map((doc) => `${doc.name} | ${doc.url}`).join("\n"),
  );

  function appendLines(current: string, urls: string[]) {
    return [...current.split("\n").filter(Boolean), ...urls].join("\n");
  }

  return (
    <form action={formAction} className="space-y-8">
      {product && <input type="hidden" name="id" value={product.id} />}

      <Section title="Basics">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Product name *" htmlFor="name">
            <input id="name" name="name" required defaultValue={product?.name} className={adminField} />
          </Field>

          <Field label="URL slug" htmlFor="slug" hint="Leave empty to generate from the product name.">
            <input
              id="slug"
              name="slug"
              defaultValue={product?.slug}
              placeholder="solar-panel-580w"
              className={adminField}
            />
          </Field>
        </div>

        <Field label="Short title" htmlFor="title" hint="One line shown on product cards and the details page.">
          <input id="title" name="title" defaultValue={product?.title} className={adminField} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Price" htmlFor="price">
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              defaultValue={product?.price ?? 0}
              className={adminField}
            />
          </Field>

          <Field label="Discount price" htmlFor="discount_price" hint="Optional.">
            <input
              id="discount_price"
              name="discount_price"
              type="number"
              min="0"
              step="1"
              defaultValue={product?.discount_price ?? ""}
              className={adminField}
            />
          </Field>

          <Field label="Category" htmlFor="category_id">
            <select
              id="category_id"
              name="category_id"
              defaultValue={product?.category_id ?? ""}
              className={adminField}
            >
              <option value="">Uncategorised</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Description" htmlFor="description" hint="Separate paragraphs with a blank line.">
          <textarea
            id="description"
            name="description"
            rows={6}
            defaultValue={product?.description}
            className={adminField}
          />
        </Field>
      </Section>

      <Section title="Media">
        <Field label="Images" htmlFor="images" hint="One image URL per line. The first image is the main one.">
          <textarea
            id="images"
            name="images"
            rows={4}
            value={images}
            onChange={(event) => setImages(event.target.value)}
            placeholder="https://.../panel.jpg"
            className={adminField}
          />
          <MediaUploader
            accept="image/*"
            label="Upload images"
            onUploaded={(urls) => setImages((current) => appendLines(current, urls))}
          />
        </Field>

        <Field label="Videos" htmlFor="videos" hint="One URL per line. YouTube links are embedded automatically.">
          <textarea
            id="videos"
            name="videos"
            rows={3}
            value={videos}
            onChange={(event) => setVideos(event.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className={adminField}
          />
          <MediaUploader
            accept="video/*"
            label="Upload videos"
            onUploaded={(urls) => setVideos((current) => appendLines(current, urls))}
          />
        </Field>

        <Field
          label="Documents"
          htmlFor="documents"
          hint="One per line in the format: Datasheet (PDF) | https://.../file.pdf"
        >
          <textarea
            id="documents"
            name="documents"
            rows={3}
            value={documents}
            onChange={(event) => setDocuments(event.target.value)}
            className={adminField}
          />
          <MediaUploader
            accept=".pdf,.doc,.docx"
            label="Upload documents"
            onUploaded={(urls) =>
              setDocuments((current) =>
                appendLines(
                  current,
                  urls.map((url) => `Document | ${url}`),
                ),
              )
            }
          />
        </Field>
      </Section>

      <Section title="Details">
        <Field label="Features" htmlFor="features" hint="One feature per line.">
          <textarea
            id="features"
            name="features"
            rows={5}
            defaultValue={product?.features.join("\n")}
            placeholder={"25-year performance warranty\nIP68 rated junction box"}
            className={adminField}
          />
        </Field>

        <Field
          label="Specifications"
          htmlFor="specifications"
          hint="One per line in the format: Label: Value"
        >
          <textarea
            id="specifications"
            name="specifications"
            rows={6}
            defaultValue={product?.specifications.map((spec) => `${spec.label}: ${spec.value}`).join("\n")}
            placeholder={"Peak power: 580 W\nEfficiency: 22.4%"}
            className={adminField}
          />
        </Field>
      </Section>

      <Section title="Visibility">
        <div className="space-y-3">
          <Checkbox
            name="is_active"
            label="Active — visible to customers on the website"
            defaultChecked={product?.is_active ?? true}
          />
          <Checkbox
            name="is_featured"
            label="Featured — show on the homepage"
            defaultChecked={product?.is_featured ?? false}
          />
        </div>
      </Section>

      {state.status === "error" && (
        <p className="flex items-start gap-2.5 rounded-xl bg-gold-100 px-4 py-3 text-sm text-gold-600">
          <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton isEdit={Boolean(product)} />
        <Link
          href="/admin/products"
          className="rounded-xl border border-ink-200 px-6 py-2.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-7">
      <h2 className="font-display text-base font-bold">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={adminLabel}>
        {label}
      </label>
      {children}
      {hint && <p className={adminHint}>{hint}</p>}
    </div>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-ink-700">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-ink-300 text-brand-600 accent-brand-600"
      />
      {label}
    </label>
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Saving..." : isEdit ? "Save changes" : "Create product"}
    </button>
  );
}
