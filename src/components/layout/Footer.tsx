import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const socialEntries = Object.entries(SITE.social).filter(([, url]) => Boolean(url));

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-cream to-peach-100/60">
      <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-orange-soft/20 blur-3xl" />
      <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/sunset-tea-logo.png"
              alt="Sunset Tea logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <span className="font-display text-2xl text-charcoal">Sunset Tea</span>
          </Link>
          <p className="mt-4 max-w-sm text-muted leading-relaxed">{SITE.shortLine}</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink transition-colors hover:text-orange-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/inquiries"
                className="font-semibold text-orange-accent transition-colors hover:text-orange-deep"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-4 space-y-2.5 text-muted">
            {SITE.contact.email ? (
              <li>
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-orange-deep">
                  {SITE.contact.email}
                </a>
              </li>
            ) : null}
            {SITE.contact.phone ? (
              <li>
                <a href={`tel:${SITE.contact.phone}`} className="hover:text-orange-deep">
                  {SITE.contact.phone}
                </a>
              </li>
            ) : null}
            {socialEntries.map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="capitalize hover:text-orange-deep"
                >
                  {name}
                </a>
              </li>
            ))}
            {socialEntries.length === 0 && !SITE.contact.email && !SITE.contact.phone ? (
              <li className="text-sm text-muted-soft">
                Reach out through the inquiry form — we reply within 24 hours.
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="container-page border-t border-border/70 py-6 text-sm text-muted-soft">
        © {year} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
