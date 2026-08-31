import { type ReactNode } from "react";
import { Bubbles } from "./Bubbles";
import { Container } from "@/components/ui/Container";

interface BubbleHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  density?: "full" | "light";
  compact?: boolean;
  /** Subtle secondary line under CTAs (e.g. pricing reassurance). */
  microcopy?: ReactNode;
  /** Extra breathing room and calmer mobile layout (home hero). */
  home?: boolean;
}

export function BubbleHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  density = "full",
  compact = false,
  microcopy,
  home = false,
}: BubbleHeroProps) {
  const contentPad = compact
    ? "pb-12 pt-[calc(var(--header-h)+1.75rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+3rem)]"
    : home
      ? "pb-8 pt-[calc(var(--header-h)+2.25rem)] sm:pb-28 sm:pt-[calc(var(--header-h)+3.5rem)]"
      : "pb-14 pt-[calc(var(--header-h)+1.75rem)] sm:pb-28 sm:pt-[calc(var(--header-h)+3.5rem)]";

  return (
    <section className={`relative overflow-hidden ${contentPad}`}>
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 top-[calc(-1*var(--header-h))] -z-10 overflow-hidden bg-warm-wash ${
          home ? "hero-bubbles" : ""
        }`}
        aria-hidden
      >
        <Bubbles density={home ? "light" : density} />
      </div>

      <Container className="relative z-10">
        <div
          className={`grid ${
            home ? "gap-10 sm:gap-10" : "gap-8 sm:gap-10"
          } lg:gap-16 ${aside ? "items-start lg:grid-cols-[1.15fr_0.85fr]" : "items-center"}`}
        >
          <div className={`motion-safe-fade max-w-3xl ${home ? "" : ""}`}>
            {eyebrow ? (
              <p className={`eyebrow ${home ? "mb-5 tracking-[0.18em] sm:mb-4 sm:tracking-[0.14em]" : "mb-3 sm:mb-4"}`}>
                {eyebrow}
              </p>
            ) : null}
            <h1 className={home ? "hero-headline display-xl" : "display-xl"}>{title}</h1>
            {description ? (
              <div
                className={`lead mt-5 sm:mt-6 ${home ? "max-w-[19rem] text-[0.9375rem] leading-relaxed sm:max-w-[36rem] sm:text-base" : ""}`}
              >
                {description}
              </div>
            ) : null}
            {actions ? (
              <div
                className={`mt-7 flex flex-col sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${
                  home ? "gap-3.5 sm:gap-4" : "gap-3"
                } [&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto`}
              >
                {actions}
              </div>
            ) : null}
            {microcopy ? (
              <p
                className={`mt-5 text-xs leading-relaxed text-muted/80 sm:mt-5 sm:text-sm ${
                  home ? "hidden sm:block" : ""
                }`}
              >
                {microcopy}
              </p>
            ) : null}
          </div>
          {aside ? (
            <div
              className={`motion-safe-fade relative mx-auto w-full ${
                home
                  ? "max-w-[16.5rem] pt-1 sm:max-w-[21rem] sm:pt-0 lg:ml-auto lg:max-w-[23rem] xl:max-w-[24rem]"
                  : "max-w-[19rem] sm:max-w-[21rem] lg:ml-auto lg:max-w-[23rem] xl:max-w-[24rem]"
              }`}
              style={{ animationDelay: "120ms" }}
            >
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
