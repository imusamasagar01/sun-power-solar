import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./social-icons";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const productLinks = [
  { href: "/products?category=solar-panels", label: "Solar Panels" },
  { href: "/products?category=inverters", label: "Inverters" },
  { href: "/products?category=batteries", label: "Batteries" },
  { href: "/products?category=complete-systems", label: "Complete Systems" },
  { href: "/products?category=water-heating", label: "Water Heating" },
];

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-ink-900 text-ink-200">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <circle cx="12" cy="9" r="3.2" fill="currentColor" className="text-gold-300" />
                <path d="M4.4 20.6 6 16.4h12l1.6 4.2H4.4Z" fill="currentColor" />
              </svg>
            </span>
            <span className="font-display text-lg font-extrabold text-white">{site.name}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-300">{site.description}</p>
          <div className="mt-6 flex gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-ink-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block text-ink-300 transition-all duration-300 hover:translate-x-1 hover:text-brand-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Products</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block text-ink-300 transition-all duration-300 hover:translate-x-1 hover:text-brand-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Get in Touch</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={site.phoneHref} className="inline-block text-ink-300 transition-all duration-300 hover:translate-x-1 hover:text-brand-300">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={site.emailHref} className="inline-block text-ink-300 transition-all duration-300 hover:translate-x-1 hover:text-brand-300">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span className="text-ink-300">{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
