import Image from "next/image";
import Link from "next/link";
import { type PackageConfig } from "@/lib/config/packages";
import { ButtonLink } from "@/components/ui/Button";

interface PackageCardProps {
  pkg: PackageConfig;
  variant?: "home" | "detail";
}

export function PackageCard({ pkg, variant = "home" }: PackageCardProps) {
  const features = variant === "home" ? pkg.homeFeatures : pkg.features;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white/75 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-transform duration-300 sm:rounded-[2rem] sm:hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.imageAlt}
          width={800}
          height={640}
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-accent backdrop-blur-sm">
          {pkg.shortName}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-8">
        <p className="font-display text-2xl text-charcoal sm:text-4xl">{pkg.priceLabel}</p>
        {pkg.priceNote ? <p className="mt-1 text-sm text-muted">{pkg.priceNote}</p> : null}
        <h3 className="mt-4 font-display text-2xl text-charcoal sm:text-[1.7rem]">{pkg.name}</h3>
        <p className="mt-2 text-muted leading-relaxed">{pkg.description}</p>
        <p className="mt-4 text-sm font-medium text-ink">
          Best for {pkg.bestFor.slice(0, 4).join(", ").toLowerCase()}
          {pkg.bestFor.length > 4 ? ", and more" : ""}.
        </p>

        <ul className="mt-6 space-y-2.5 text-sm text-ink sm:text-[0.95rem]">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2.5">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          {variant === "home" ? (
            <ButtonLink href="/catering" variant="secondary" size="md" className="w-full sm:w-auto">
              View Package Details
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href={pkg.inquireHref} variant="soft" size="md" className="w-full sm:w-auto">
                {pkg.ctaLabel}
              </ButtonLink>
              <Link
                href="/catering#menu"
                className="inline-flex w-full items-center justify-center py-2 text-sm font-semibold text-muted underline-offset-4 hover:text-orange-deep hover:underline sm:w-auto sm:justify-start"
              >
                See the menu
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
