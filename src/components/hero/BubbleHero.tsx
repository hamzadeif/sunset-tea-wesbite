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
}: BubbleHeroProps) {
  const contentPad = compact
    ? "pb-12 pt-[calc(var(--header-h)+1.75rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+3rem)]"
    : "pb-14 pt-[calc(var(--header-h)+1.75rem)] sm:pb-28 sm:pt-[calc(var(--header-h)+3.5rem)]";

  return (
    <section className={`relative overflow-hidden ${contentPad}`}>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(-1*var(--header-h))] -z-10 overflow-hidden bg-warm-wash"
        aria-hidden
      >
        <Bubbles density={density} />
      </div>

      <Container className="relative z-10">
        <div
          className={`grid gap-8 sm:gap-10 lg:gap-16 ${
            aside ? "items-start lg:grid-cols-[1.15fr_0.85fr]" : "items-center"
          }`}
        >
          <div className="motion-safe-fade max-w-3xl">
            {eyebrow ? <p className="eyebrow mb-3 sm:mb-4">{eyebrow}</p> : null}
            <h1 className="display-xl">{title}</h1>
            {description ? <div className="lead mt-4 sm:mt-6">{description}</div> : null}
            {actions ? (
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 [&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto">
                {actions}
              </div>
            ) : null}
            {microcopy ? (
              <p className="mt-4 text-sm text-muted sm:mt-5">{microcopy}</p>
            ) : null}
          </div>
          {aside ? (
            <div
              className="motion-safe-fade relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:ml-auto lg:max-w-[23rem] xl:max-w-[24rem]"
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
