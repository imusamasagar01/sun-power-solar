/**
 * Company details used across the site. Edit this file to update contact
 * information, social links or currency — no database changes needed.
 */
export const site = {
  name: "Sun Power Solar",
  tagline: "Clean energy solutions engineered for everyday reliability",
  description:
    "Sun Power Solar supplies premium solar panels, inverters, batteries and complete energy systems backed by expert support and honest pricing.",
  currency: "PKR",
  locale: "en-PK",
  phone: "+92 323 0782150",
  phoneHref: "tel:+923230782150",
  whatsapp: "+92 323 0782150",
  whatsappHref: "https://wa.me/923230782150",
  email: "info@sunpowersolar.com",
  emailHref: "mailto:info@sunpowersolar.com",
  address: "Plot 12, Industrial Area, Main Boulevard, Lahore, Pakistan",
  mapHref: "https://maps.google.com/?q=Lahore,Pakistan",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
  stats: [
    { value: "12+", label: "Years of experience" },
    { value: "3,500+", label: "Installations delivered" },
    { value: "25 yr", label: "Panel performance warranty" },
    { value: "98%", label: "Customer satisfaction" },
  ],
};

export type Site = typeof site;
