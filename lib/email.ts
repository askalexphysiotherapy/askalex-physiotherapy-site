// lib/email.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export type ContactFormData = Record<string, unknown>;

function toLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[sendContactEmail] Missing RESEND_API_KEY");
    throw new Error("Missing RESEND_API_KEY");
  }

  const entries = Object.entries(data ?? {}).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  const lines = entries.map(
    ([key, value]) => `${toLabel(key)}: ${String(value)}`
  );

  const textBody = lines.join("\n");
  const htmlBody = lines
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  console.log(
    "[sendContactEmail] calling resend.emails.send. API key present:",
    !!process.env.RESEND_API_KEY
  );

  try {
    const result = await resend.emails.send({
      from: "Ask Alex Physiotherapy <onboarding@resend.dev>",
      to: "hello@askalexphysiotherapy.com",
      subject: "New booking/enquiry | Ask Alex Physiotherapy",
      text: textBody,
      html: htmlBody,
    });

    console.log("[sendContactEmail] Resend response:", JSON.stringify(result));
  } catch (err) {
    console.error("[sendContactEmail] Resend error:", err);
    throw err;
  }
}
