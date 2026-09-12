import { WhatsAppIcon } from "./social-icons";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-brand-600 text-white shadow-lift transition-all duration-300 hover:scale-105 hover:bg-brand-700"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
