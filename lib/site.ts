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
  phone: "+92 315 0622185",
  phoneHref: "tel:+923150622185",
  whatsapp: "+92 315 0622185",
  whatsappHref: "https://wa.me/923150622185",
  email: "info@sunpowersolar.com",
  emailHref: "mailto:info@sunpowersolar.com",
  address: "Comprehensive School Muhammad pur Road Nazd sohni Dharti 89/6R",
  mapHref: "https://maps.google.com/?q=Comprehensive+School+Muhammad+pur+Road+Nazd+sohni+Dharti+89/6R",
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
