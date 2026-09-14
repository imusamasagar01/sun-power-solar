import { AnnouncementPopup } from "@/components/announcement-popup";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getActiveAnnouncement } from "@/lib/data";

// Always render on request so a flaky Supabase response cannot fail `next build`.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const announcement = await getActiveAnnouncement();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
      {announcement && <AnnouncementPopup announcement={announcement} />}
    </>
  );
}
