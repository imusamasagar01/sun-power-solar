import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Download,
  FileText,
  MessageCircle,
  Phone,
  PlayCircle,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { Reveal } from "@/components/reveal";
import { getProductBySlug, getProducts } from "@/lib/data";
import { site } from "@/lib/site";
import { discountPercent, formatPrice, youtubeEmbedUrl } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.title || product.description.slice(0, 160),
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((item) => item.id !== product.id && item.category_id === product.category_id)
    .slice(0, 3);

  const discount = discountPercent(product.price, product.discount_price);
  const inquiryMessage = encodeURIComponent(`Hello ${site.name}, I would like to know more about ${product.name}.`);

  return (
    <>
      <section className="border-b border-line bg-card">
        <div className="container-page py-10 lg:py-14">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <ProductGallery images={product.images} alt={product.name} />

            <div className="flex flex-col">
              {product.category && (
                <span className="eyebrow">
                  {product.category.name}
                </span>
              )}
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
              {product.title && (
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.title}</p>
              )}

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2 rounded-2xl bg-surface px-6 py-5 dark:bg-subtle">
                {product.discount_price ? (
                  <>
                    <span className="font-display text-3xl font-extrabold text-fg">
                      {formatPrice(product.discount_price)}
                    </span>
                    <span className="text-lg text-muted-soft line-through">{formatPrice(product.price)}</span>
                    {discount !== null && (
                      <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-fg">
                        Save {discount}%
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-display text-3xl font-extrabold text-fg">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="w-full text-xs text-muted-soft">
                  Price excludes installation unless stated. Contact us for a tailored quotation.
                </span>
              </div>

              {product.features.length > 0 && (
                <ul className="mt-7 space-y-3">
                  {product.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[15px] text-body">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand">
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift active:scale-[0.98]"
                >
                  Request a Quote
                </Link>
                <a
                  href={`${site.whatsappHref}?text=${inquiryMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-body transition-colors hover:bg-subtle active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>

              <a
                href={site.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                Prefer to talk? Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-14">
            {product.description && (
              <Reveal>
                <h2 className="text-2xl font-bold">Product overview</h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-body">
                  {product.description.split("\n").filter(Boolean).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            )}

            {product.features.length > 0 && (
              <Reveal>
                <h2 className="text-2xl font-bold">Key features</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-line bg-card p-4 text-sm leading-relaxed text-body"
                    >
                      <BadgeCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
                      {feature}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {product.videos.length > 0 && (
              <Reveal>
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <PlayCircle className="h-5 w-5 text-brand" />
                  Videos
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {product.videos.map((video) => {
                    const embed = youtubeEmbedUrl(video);
                    return (
                      <div
                        key={video}
                        className="aspect-video overflow-hidden rounded-2xl border border-line bg-ink-900"
                      >
                        {embed ? (
                          <iframe
                            src={embed}
                            title="Product video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                            allowFullScreen
                            className="h-full w-full"
                          />
                        ) : (
                          <video src={video} controls className="h-full w-full object-cover" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>

          <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {product.specifications.length > 0 && (
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-card">
                  <h2 className="border-b border-line px-6 py-5 font-display text-lg font-bold">
                    Specifications
                  </h2>
                  <dl className="divide-y divide-line">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="flex gap-4 px-6 py-3.5 text-sm">
                        <dt className="w-2/5 shrink-0 text-muted-soft">{spec.label}</dt>
                        <dd className="font-medium text-fg">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}

            {product.documents.length > 0 && (
              <Reveal>
                <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
                  <h2 className="font-display text-lg font-bold">Documents</h2>
                  <div className="mt-4 space-y-3">
                    {product.documents.map((doc) => (
                      <a
                        key={doc.url}
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-body transition-colors hover:border-brand-200 hover:bg-brand-50"
                      >
                        <FileText className="h-4.5 w-4.5 text-brand" />
                        <span className="flex-1">{doc.name}</span>
                        <Download className="h-4 w-4 text-muted-soft transition-transform duration-300 group-hover:translate-y-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal>
              <div className="rounded-2xl bg-ink-900 p-7 text-white">
                <h2 className="font-display text-lg font-bold text-white">Need help choosing?</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                  Our engineers will review your consumption and recommend the right configuration — free of
                  charge.
                </p>
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-card px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-gold-400"
                >
                  Talk to an expert
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-card py-16 lg:py-20">
          <div className="container-page">
            <h2 className="text-2xl font-bold sm:text-3xl">Related products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 80} className="h-full">
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
