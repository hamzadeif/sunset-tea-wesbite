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
}

export function BubbleHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  density = "full",
  compact = false,
}: BubbleHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-warm-wash ${
        compact ? "pb-16 pt-10 sm:pb-20 sm:pt-14" : "pb-20 pt-10 sm:pb-28 sm:pt-16"
      }`}
    >
      <Bubbles density={density} />
      <Container className="relative z-10">
        <div
          className={`grid items-center gap-10 lg:gap-16 ${
            aside ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
          }`}
        >
          <div className="motion-safe-fade max-w-3xl">
            {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
            <h1 className="display-xl">{title}</h1>
            {description ? <div className="lead mt-6">{description}</div> : null}
            {actions ? (
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">{actions}</div>
            ) : null}
          </div>
          {aside ? (
            <div className="motion-safe-fade relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "120ms" }}>
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
