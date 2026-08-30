import type { Metadata } from "next";
import { BubbleHero } from "@/components/hero/BubbleHero";
import { PackageCard } from "@/components/packages/PackageCard";
import { MenuSection } from "@/components/menu/MenuSection";
import { CTASection } from "@/components/cta/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PACKAGE_LIST } from "@/lib/config/packages";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Sunset Tea catering for events — Drop-Off at $5/drink or Full Booth Service with on-site staff. Toppings included. No minimum order.",
  openGraph: {
    title: "Sunset Tea Catering",
    description:
      "Drop-Off or Full Booth Service. $5 per drink with topping included. Flexible, simple, and fun.",
  },
};

export default function CateringPage() {
  return (
    <>
      <BubbleHero
        compact
        eyebrow="Sunset Tea Catering"
        title="Boba for your perfect event."
        description="Whether you want ready-to-serve drinks dropped off or a full Sunset Tea booth making drinks fresh for your guests, we keep catering simple, flexible, and fun."
        actions={
          <ButtonLink href="/inquiries" variant="soft" size="lg">
            Get a Quote
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Packages</Eyebrow>
            <h2 className="display-lg mt-3">Pick the experience that fits.</h2>
            <p className="lead mx-auto mt-4">
              Two clear options. Transparent pricing. Toppings always included.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {PACKAGE_LIST.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} variant="detail" />
            ))}
          </div>
        </Container>
      </Section>

      <MenuSection />

      <CTASection
        eyebrow="Planning something?"
        title="Tell us what you have in mind."
        description="We'll take it from there — and reply within 24 hours."
        ctaLabel="Start Your Inquiry"
        ctaHref="/inquiries"
      />
    </>
  );
}
