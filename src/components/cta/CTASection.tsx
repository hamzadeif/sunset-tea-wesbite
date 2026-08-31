import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Container";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-peach-100 via-cream to-peach-200/50" />
      <div className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-orange-soft/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-peach-300/40 blur-3xl" />
      <Container className="relative z-10 text-center">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="display-md mx-auto mt-3 max-w-2xl">{title}</h2>
        <p className="lead mx-auto mt-4">{description}</p>
        <div className="mt-8 flex justify-center px-2">
          <ButtonLink href={ctaHref} variant="soft" size="lg" className="w-full max-w-sm sm:w-auto">
            {ctaLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
