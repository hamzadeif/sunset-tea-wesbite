import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/config/site";
import { InstagramIcon, MailIcon, PhoneIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="safe-bottom relative overflow-hidden border-t border-border bg-gradient-to-b from-cream to-peach-100/60">
      <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-orange-soft/20 blur-3xl" />
      <div className="container-page relative grid gap-8 py-10 sm:py-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src={SITE.logo}
              alt="Sunset Tea logo"
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
            />
            <span className="font-display text-xl text-charcoal">Sunset Tea</span>
          </Link>
          <p className="mt-2.5 max-w-sm text-sm text-muted leading-relaxed">{SITE.shortLine}</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-3 space-y-2">
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
                Plan Your Event
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-3 space-y-2">
            {SITE.social.instagram ? (
              <li>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-orange-deep"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/70 text-muted transition-colors group-hover:border-orange-accent/30 group-hover:text-orange-deep">
                    <InstagramIcon className="h-4 w-4" />
                  </span>
                  <span>@{SITE.social.instagramHandle}</span>
                </a>
              </li>
            ) : null}
            {SITE.contact.phone ? (
              <li>
                <a
                  href={`tel:+1${SITE.contact.phone}`}
                  className="group flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-orange-deep"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/70 text-muted transition-colors group-hover:border-orange-accent/30 group-hover:text-orange-deep">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span>{SITE.contact.phoneDisplay}</span>
                </a>
              </li>
            ) : null}
            {SITE.contact.email ? (
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="group flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-orange-deep"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/70 text-muted transition-colors group-hover:border-orange-accent/30 group-hover:text-orange-deep">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <span className="break-all">{SITE.contact.email}</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="container-page border-t border-border/70 py-4 text-sm text-muted-soft">
        © {year} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
