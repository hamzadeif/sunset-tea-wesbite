import type { Metadata } from "next";
import { Suspense } from "react";
import { BubbleHero } from "@/components/hero/BubbleHero";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Container, Section } from "@/components/ui/Container";
import { RESPONSE_TIME_HOURS } from "@/lib/config/business";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Plan Your Event",
  description: `Plan your Sunset Tea catering — choose a service, customize drinks, and see your price instantly. We'll confirm within ${RESPONSE_TIME_HOURS} hours. No payment required today.`,
  openGraph: {
    title: "Plan Your Event | Sunset Tea",
    description: `See your price instantly for Drop-Off or Full Booth Service. Book when you're ready — we confirm within ${RESPONSE_TIME_HOURS} hours.`,
  },
};

export default function InquiriesPage() {
  return (
    <>
      <BubbleHero
        compact
        density="light"
        eyebrow="Event planner"
        title="Plan Your Event"
        description={
          <>
            <span className="block font-medium text-ink">
              See your price instantly. Book when you&apos;re ready.
            </span>
            <span className="mt-3 block">
              Choose your service, tell us about your event, and customize your drinks. You&apos;ll
              see your price before you book — no waiting around for a quote.
            </span>
            <span className="mt-3 block">
              Don&apos;t have every detail figured out yet? That&apos;s completely fine. Tell us
              what you know and we&apos;ll help with the rest.
            </span>
          </>
        }
      />

      <Section className="!pt-4 sm:!pt-6">
        <Container>
          <Reveal variant="up">
            <Suspense
              fallback={
                <div className="rounded-[2rem] border border-border bg-white/80 p-10 text-muted">
                  Loading planner…
                </div>
              }
            >
              <InquiryForm />
            </Suspense>
          </Reveal>
        </Container>
      </Section>

      <FAQAccordion />
    </>
  );
}
