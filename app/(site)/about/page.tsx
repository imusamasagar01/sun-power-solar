import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, Eye, HandCoins, Headset, ShieldCheck, Wrench } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — our mission, values and the solar services we deliver.`,
};

const services = [
  {
    Icon: Wrench,
    title: "Residential Solar",
    description:
      "Rooftop systems sized to your household consumption, with net metering handled end to end.",
  },
  {
    Icon: ShieldCheck,
    title: "Commercial & Industrial",
    description:
      "High-yield arrays for factories, warehouses and offices, designed around your load and tariff.",
  },
  {
    Icon: Compass,
    title: "Agricultural Solutions",
    description: "Solar water pumping and off-grid systems that cut diesel costs on farms and tube wells.",
  },
  {
    Icon: HandCoins,
    title: "Energy Storage",
    description: "Lithium battery backup that keeps essential loads running through outages and after dark.",
  },
  {
    Icon: Headset,
    title: "Maintenance & Support",
    description: "Scheduled cleaning, performance checks, fault diagnosis and warranty coordination.",
  },
  {
    Icon: Eye,
    title: "Consultancy & Audits",
    description: "Independent site surveys, feasibility studies and honest payback projections.",
  },
];

const values = [
  {
    title: "Honest sizing",
    description: "We recommend the system your property actually needs — never a larger one to inflate a quote.",
  },
  {
    title: "Quality first",
    description: "Only tier-1 equipment with verifiable certifications and warranties that are genuinely honoured.",
  },
  {
    title: "Clean workmanship",
    description: "Tidy cable management, correct earthing and proper structural mounting on every installation.",
  },
  {
    title: "Long-term service",
    description: "The relationship continues after commissioning, with support you can reach when it matters.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-card">
        <div className="container-page py-14 lg:py-20">
          <span className="eyebrow">About Us</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Solar engineering with a long-term view
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {site.name} designs, supplies and installs solar energy systems for homes, businesses and farms —
            built to perform for decades, not just to pass inspection.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/images/about-team.jpg"
                alt="Sun Power Solar engineers at work"
                width={1024}
                height={768}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-3xl font-bold sm:text-4xl">Who we are</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              {site.name} began as a small team of electrical engineers who believed solar was being sold
              badly — oversized systems, vague quotations and no support once the invoice was paid. We set
              out to build the company we would have wanted as customers.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Over a decade later we have delivered thousands of installations, from single-room off-grid
              setups to industrial rooftop arrays. Our engineers handle the design, our own crews handle the
              installation, and our service team stays reachable for the life of the system.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-line pt-8">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl font-bold text-brand">{stat.value}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-soft">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-card py-16 lg:py-24">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-surface dark:bg-subtle p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Compass className="h-5.5 w-5.5" />
              </span>
              <h2 className="mt-6 text-2xl font-bold">Our Mission</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                To make reliable solar energy accessible and affordable for every household and business we
                serve — through honest advice, quality equipment and workmanship we are proud to put our name
                on.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-line bg-surface dark:bg-subtle p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-fg">
                <Eye className="h-5.5 w-5.5" />
              </span>
              <h2 className="mt-6 text-2xl font-bold">Our Vision</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                A future where clean, self-generated power is the default choice — and where every customer
                who switches to solar has a partner they can trust for the full life of their system.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Our services</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            From the first site survey to long-term maintenance, we cover every stage of your solar project.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 70} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-card py-16 lg:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">How we work</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70} className="h-full">
                <div className="flex h-full gap-5 rounded-2xl border border-line bg-surface dark:bg-subtle p-7">
                  <span className="font-display text-2xl font-extrabold text-brand-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-20 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-14 text-center text-white sm:px-12">
            <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-brand-600/25 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Let&apos;s plan your solar project
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-200">
                Share a few details about your property and we will prepare a free system recommendation and
                quotation.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-fg transition-all duration-300 hover:bg-gold-400"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
