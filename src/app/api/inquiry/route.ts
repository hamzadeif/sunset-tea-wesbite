import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/config/site";
import { buildInquiryEmail } from "@/lib/inquiry/email";
import { INITIAL_INQUIRY_STATE, type InquiryFormState } from "@/lib/inquiry/types";
import { canSubmit } from "@/lib/inquiry/validation";

export const runtime = "nodejs";

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

function getClientKey(req: Request, email: string): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `${ip}:${email.toLowerCase()}`;
}

function normalizeBody(raw: Partial<InquiryFormState>): InquiryFormState {
  return {
    ...INITIAL_INQUIRY_STATE,
    ...raw,
    additionalNotes: raw.additionalNotes ?? "",
    drinkSelections: raw.drinkSelections ?? [],
    boothDrinkIds: raw.boothDrinkIds ?? [],
    honeypot: raw.honeypot ?? "",
  };
}

export async function POST(req: Request) {
  try {
    let raw: Partial<InquiryFormState>;

    try {
      raw = (await req.json()) as Partial<InquiryFormState>;
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const body = normalizeBody(raw);

    if (body.honeypot) {
      return NextResponse.json({ ok: true, delivered: false });
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

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.INQUIRY_TO_EMAIL || SITE.inquiryEmail;
    const fromEmail =
      process.env.INQUIRY_FROM_EMAIL?.trim() ||
      "Sunset Tea Inquiries <onboarding@resend.dev>";

    const keyLooksUnset =
      !apiKey || apiKey.includes("xxxxxxxx") || apiKey === "re_xxxxxxxx";

    if (keyLooksUnset) {
      console.info("[inquiry] RESEND_API_KEY missing or placeholder — logging inquiry.");
      console.info(JSON.stringify({ to: toEmail, ...body }, null, 2));
      return NextResponse.json({ ok: true, delivered: false });
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
        console.error("[inquiry] inquiry payload", JSON.stringify(body, null, 2));
        // Customer still sees confirmation — inquiry is logged for follow-up.
        return NextResponse.json({ ok: true, delivered: false });
      }

      return NextResponse.json({ ok: true, delivered: true });
    } catch (error) {
      console.error("[inquiry] send failed", error);
      console.error("[inquiry] inquiry payload", JSON.stringify(body, null, 2));
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (error) {
    console.error("[inquiry] unhandled error", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
