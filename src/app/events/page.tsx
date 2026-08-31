import type { Metadata } from "next";
import { BubbleHero } from "@/components/hero/BubbleHero";
import { EventsSpotlight } from "@/components/events/EventsSpotlight";
import { CTASection } from "@/components/cta/CTASection";
import { Container, Eyebrow, Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Pop-Ups & Events",
  description:
    "Find Sunset Tea at campuses, farmers markets, community events, and special activations — from Cal Poly / San Luis Obispo to Las Vegas.",
  openGraph: {
    title: "Pop-Ups & Events | Sunset Tea",
    description:
      "Catch Sunset Tea out in the wild — campuses, markets, community events, and special pop-ups.",
  },
};

export default function EventsPage() {
  return (
    <>
      <BubbleHero
        compact
        density="light"
        eyebrow="Find Sunset Tea"
        title="Catch us out in the wild."
        description="Sunset Tea pops up at campuses, markets, community events, and special activations — bringing handcrafted drinks directly to people. No permanent storefront, just good drinks wherever the moment is."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Moments</Eyebrow>
            <h2 className="display-lg mt-3">Out in the community.</h2>
            <p className="lead mx-auto mt-4">
              A look at Sunset Tea on the ground — booth days, campus pop-ups, and the events
              we love showing up for.
            </p>
          </div>
          <div className="mt-12">
            <EventsSpotlight />
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Hosting something?"
        title="Want Sunset Tea at your event?"
        description="Explore catering options for drop-off or a full on-site booth."
        ctaLabel="Explore Catering"
        ctaHref="/catering"
      />
    </>
  );
}
