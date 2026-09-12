import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Headset,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  Tag,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getActiveAnnouncement, getFeaturedProducts } from "@/lib/data";
import { site } from "@/lib/site";

const benefits = [
  {
    Icon: BadgeCheck,
    title: "Quality Products",
    description:
      "Tier-1 panels, inverters and batteries sourced from manufacturers with proven field performance and genuine warranties.",
  },
  {
    Icon: ShieldCheck,
    title: "Reliable Solutions",
    description:
      "Every system is sized around your actual load profile and installed by certified engineers, not subcontracted crews.",
  },
  {
    Icon: Tag,
    title: "Competitive Pricing",
    description:
      "Transparent quotations with no hidden charges, plus flexible instalment options on complete system packages.",
  },
  {
    Icon: Headset,
    title: "Professional Support",
    description:
      "Free site survey, full commissioning handover and responsive after-sales service for the life of your system.",
  },
];

export default async function HomePage() {
  const [products, announcement] = await Promise.all([getFeaturedProducts(4), getActiveAnnouncement()]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        <Image
          src="/images/hero-solar-home.jpg"
          alt="Modern home powered by rooftop solar panels"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/20" />

        <div className="container-page relative flex min-h-[86vh] flex-col justify-center py-24 lg:min-h-[88vh]">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm">
              <Sun className="h-3.5 w-3.5" />
              Powering homes &amp; businesses since 2013
            </span>

            <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Clean, dependable solar energy for every rooftop
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
              {site.name} supplies premium panels, inverters, batteries and complete systems — engineered,
              installed and supported by a team that stays with you long after handover.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:bg-brand-500 active:scale-[0.98]"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-ink-900 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                Request a Quote
              </Link>
            </div>
          </div>

          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-bold text-white">{stat.value}</dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-ink-300">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-20 lg:py-28">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              Featured Products
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Equipment we stand behind</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
              A curated selection of the systems our customers rely on most, each backed by manufacturer
              warranty and our own installation support.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 80} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Built on trust, proven in the field</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
              Solar is a twenty-year decision. We keep it straightforward — honest advice, quality hardware
              and service you can actually reach.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 80} className="h-full">
                <div className="group h-full rounded-2xl border border-ink-100 bg-sand p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lift">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container-page py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/images/about-team.jpg"
                alt="Sun Power Solar technicians installing panels"
                width={1024}
                height={768}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
              About {site.name}
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A solar partner that treats your energy bill like its own
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-500">
              We started with a simple frustration: customers were sold oversized systems they did not need,
              then left alone when something failed. {site.name} was built to do the opposite — size the
              system honestly, install it properly and answer the phone afterwards.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
              Today our team designs and delivers residential, commercial and agricultural solar projects
              across the country, from a single rooftop array to megawatt-scale installations.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "In-house certified engineers",
                "Free site survey & load analysis",
                "Net-metering documentation",
                "Genuine warranty support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink-700">
                  <BadgeCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift"
            >
              Learn more about us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Promotion */}
      {announcement && (
        <section className="container-page pb-20 lg:pb-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
              <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-brand-600/25 blur-3xl" />
              <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
              <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Current Offer
                  </span>
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                    {announcement.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-200">{announcement.message}</p>
                </div>
                <Link
                  href={announcement.cta_href || "/products"}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-300 hover:bg-gold-400"
                >
                  {announcement.cta_label || "View offers"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Contact CTA */}
      <section className="border-t border-ink-100 bg-white py-20 lg:py-24">
        <div className="container-page">
          <Reveal className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to lower your electricity bill?</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                Tell us about your property and monthly consumption. We will recommend the right system size
                and send you a clear, itemised quotation — no pressure, no hidden costs.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift"
              >
                Contact Us
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-7 py-3.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
