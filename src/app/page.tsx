import type { Metadata } from "next";
import Image from "next/image";
import { BubbleHero } from "@/components/hero/BubbleHero";
import { PackageCard } from "@/components/packages/PackageCard";
import { CTASection } from "@/components/cta/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PACKAGE_LIST } from "@/lib/config/packages";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Sunset Tea | Boba, Matcha & Events",
  description:
    "Handcrafted boba and matcha for everyday moments, pop-ups, and celebrations. Easy catering for offices, weddings, campus events, and more.",
  openGraph: {
    title: "Sunset Tea",
    description: SITE.tagline,
  },
};

// const EVENT_TYPES = [
//   { name: "Weddings", tone: "booth" as const },
//   { name: "Corporate Events", tone: "dropoff" as const },
//   { name: "Campus Events", tone: "event" as const },
//   { name: "Birthdays", tone: "about" as const },
//   { name: "Graduations", tone: "hero" as const },
//   { name: "Private Celebrations", tone: "generic" as const },
// ];

export default function HomePage() {
  return (
    <>
      <BubbleHero
        eyebrow="Boba · Matcha · Events"
        title={
          <>
            Made to Sip.
            <br />
            Made to Celebrate.
          </>
        }
        description="Handcrafted boba and matcha for everyday moments, events, pop-ups, and celebrations."
        actions={
          <>
            <ButtonLink href="/inquiries" variant="soft" size="lg">
              Get a Quote
            </ButtonLink>
            <ButtonLink href="/catering" variant="secondary" size="lg">
              View Packages
            </ButtonLink>
          </>
        }
        aside={
          <div className="motion-safe-float">
            <Image
              src="/images/drop-off-catering-close-up.PNG"
              alt="Sunset Tea drop-off catering drinks ready to serve"
              width={600}
              height={750}
              priority
              className="aspect-[4/5] w-full rounded-[1.25rem] object-cover shadow-[var(--shadow-soft)] sm:rounded-[2rem]"
            />
          </div>
        }
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Choose your experience</Eyebrow>
            <h2 className="display-lg mt-3">Two ways to bring Sunset Tea</h2>
            <p className="lead mx-auto mt-4">
              Simple pricing. Flexible quantities. Toppings included. Tell us what you&apos;re
              planning — we&apos;ll handle the drinks.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {PACKAGE_LIST.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} variant="home" />
            ))}
          </div>
        </Container>
      </Section>

      <Section alt>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Image
              src="/images/sunset_tea_four_cups.JPG"
              alt="Four Sunset Tea drinks on a table"
              width={900}
              height={720}
              className="aspect-[5/4] w-full max-w-xl rounded-[1.25rem] object-cover shadow-[var(--shadow-soft)] sm:rounded-[2rem]"
            />
            <div>
              <Eyebrow>About Us</Eyebrow>
              <h2 className="display-lg mt-3">A little sunshine in every cup.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Sunset Tea started with a simple goal: make handcrafted boba and matcha that
                people genuinely look forward to. What began with pop-ups and campus booths has
                grown into events, catering, and celebrations — while keeping the same focus on
                quality drinks, friendly service, and making every experience feel easy and fun.
              </p>
              <div className="mt-6 sm:mt-8">
                <ButtonLink href="/catering" variant="primary" size="lg" className="w-full sm:w-auto">
                  Explore Catering
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Made for gatherings — hidden until more photography is available
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Made for gatherings</Eyebrow>
            <h2 className="display-lg mt-3">Made for every kind of gathering.</h2>
            <p className="lead mx-auto mt-4">
              From intimate birthdays to campus days and big celebrations — Sunset Tea fits the
              moment.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((event) => (
              <Link
                key={event.name}
                href="/inquiries"
                className="group relative overflow-hidden rounded-[1.75rem] border border-border transition-transform duration-300 hover:-translate-y-1"
              >
                <ImagePlaceholder
                  tone={event.tone}
                  label={event.name}
                  logo={false}
                  className="aspect-[4/3] rounded-none"
                  rounded="rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl text-white">{event.name}</h3>
                  <p className="mt-1 text-sm font-medium text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Plan yours →
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/inquiries" variant="soft" size="lg">
              Plan Your Event
            </ButtonLink>
          </div>
        </Container>
      </Section>
      */}

      <CTASection
        eyebrow="Ready when you are"
        title="Tell us what you're planning."
        description="We'll handle the drinks — and get back to you within 24 hours."
        ctaLabel="Get a Quote"
        ctaHref="/inquiries"
      />
    </>
  );
}
