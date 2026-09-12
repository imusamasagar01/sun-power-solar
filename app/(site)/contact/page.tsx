import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} for quotations, site surveys and support.`,
};

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <section className="border-b border-line bg-card">
        <div className="container-page py-14 lg:py-20">
          <span className="eyebrow">
            Contact Us
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">Let&apos;s talk solar</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            Call, message or send us the details of your project. We usually respond the same working day.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <ContactCard Icon={Phone} title="Phone" href={site.phoneHref} value={site.phone} />
              <ContactCard
                Icon={WhatsAppIcon}
                title="WhatsApp"
                href={site.whatsappHref}
                value={site.whatsapp}
                external
              />
              <ContactCard Icon={Mail} title="Email" href={site.emailHref} value={site.email} />
              <ContactCard
                Icon={MapPin}
                title="Address"
                href={site.mapHref}
                value={site.address}
                external
              />
              <ContactCard Icon={Clock} title="Business hours" value={site.hours} />
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-card p-6">
              <h2 className="font-display text-base font-bold">Follow us</h2>
              <div className="mt-4 flex gap-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition-all duration-300 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-line bg-card p-7 shadow-card sm:p-9">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {product
                  ? `Enquiry about ${product}. Add any details below and we will prepare a quotation.`
                  : "Tell us what you need and our team will get back to you with a recommendation."}
              </p>
              <div className="mt-7">
                <ContactForm product={product} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  Icon,
  title,
  value,
  href,
  external,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-soft">{title}</p>
        <p className="mt-1 text-[15px] font-medium text-fg">{value}</p>
      </div>
    </>
  );

  const className =
    "group flex items-start gap-4 rounded-2xl border border-line bg-card p-5 transition-all duration-300 hover:border-brand-200 hover:shadow-card";

  if (!href) return <div className={className}>{content}</div>;

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
