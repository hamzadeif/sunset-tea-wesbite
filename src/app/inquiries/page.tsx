import type { Metadata } from "next";
import { Suspense } from "react";
import { BubbleHero } from "@/components/hero/BubbleHero";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Container, Section } from "@/components/ui/Container";
import { RESPONSE_TIME_HOURS } from "@/lib/config/business";

export const metadata: Metadata = {
  title: "Inquiries + FAQ",
  description: `Request a Sunset Tea catering quote. Tell us about your event — we'll get back to you within ${RESPONSE_TIME_HOURS} hours.`,
  openGraph: {
    title: "Request a Quote | Sunset Tea",
    description: `Easy catering inquiries for Drop-Off or Full Booth Service. Response within ${RESPONSE_TIME_HOURS} hours.`,
  },
};

export default function InquiriesPage() {
  return (
    <>
      <BubbleHero
        compact
        density="light"
        eyebrow="Catering inquiry"
        title="Request a Quote"
        description={
          <>
            Tell us about your event and we&apos;ll get back to you as soon as possible — always
            within {RESPONSE_TIME_HOURS} hours.
            <span className="mt-3 block">
              Don&apos;t have every detail figured out yet? That&apos;s completely fine. Tell us
              what you know and we&apos;ll help with the rest.
            </span>
          </>
        }
      />

      <Section className="!pt-4 sm:!pt-6">
        <Container>
          <Suspense
            fallback={
              <div className="rounded-[2rem] border border-border bg-white/80 p-10 text-muted">
                Loading form…
              </div>
            }
          >
            <InquiryForm />
          </Suspense>
        </Container>
      </Section>

      <FAQAccordion />
    </>
  );
}
