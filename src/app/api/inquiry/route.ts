import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/config/site";
import { buildInquiryEmail } from "@/lib/inquiry/email";
import type { InquiryFormState } from "@/lib/inquiry/types";
import { canSubmit } from "@/lib/inquiry/validation";

export const runtime = "nodejs";

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

function getClientKey(req: Request, email: string): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `${ip}:${email.toLowerCase()}`;
}

export async function POST(req: Request) {
  let body: InquiryFormState;

  try {
    body = (await req.json()) as InquiryFormState;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!canSubmit(body)) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const key = getClientKey(req, body.email);
  const last = recentSubmissions.get(key);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { ok: false, error: "Please wait a moment before submitting again." },
      { status: 429 },
    );
  }
  recentSubmissions.set(key, now);

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL || SITE.inquiryEmail;
  const fromEmail =
    process.env.INQUIRY_FROM_EMAIL || "Sunset Tea Inquiries <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[inquiry] RESEND_API_KEY missing — logging inquiry instead of sending email.");
    console.info(JSON.stringify({ to: toEmail, ...body }, null, 2));
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Inquiry received (email delivery not configured).",
    });
  }

  const { subject, html, text } = buildInquiryEmail(body);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: body.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("[inquiry] Resend error", result.error);
      return NextResponse.json(
        { ok: false, error: "Could not send email. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[inquiry] send failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not send email. Please try again shortly." },
      { status: 502 },
    );
  }
}
