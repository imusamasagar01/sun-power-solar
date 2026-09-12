"use server";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { site } from "@/lib/site";

export type InquiryState = { status: "idle" | "success" | "error"; message: string };

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const productName = String(formData.get("product") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }

  if (!isSupabaseConfigured) {
    return {
      status: "error",
      message: `The enquiry form is not connected yet. Please call ${site.phone} or email ${site.email}.`,
    };
  }

  const { error } = await getSupabaseAdmin().from("inquiries").insert({
    name,
    email,
    phone: phone || null,
    message,
    product_name: productName || null,
  });

  if (error) {
    return {
      status: "error",
      message: `We could not send your message. Please call ${site.phone} or try again.`,
    };
  }

  return {
    status: "success",
    message: "Thank you — your message has been received. Our team will contact you shortly.",
  };
}
