import Image from "next/image";
import Link from "next/link";
import { FEATURED_BOOTH_IMAGE, POPUP_AREAS } from "@/lib/config/events";
import { SITE } from "@/lib/config/site";
import { InstagramIcon } from "@/components/ui/SocialIcons";

export function EventsSpotlight() {
  return (
    <div className="space-y-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-border shadow-[var(--shadow-soft)] sm:rounded-[2rem]">
          <Image
            src={FEATURED_BOOTH_IMAGE}
            alt="Sunset Tea booth at a pop-up event"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-lg leading-relaxed text-muted">
            Sunset Tea sets up at campuses, markets, and community gatherings — a small booth,
            handcrafted drinks, and good energy. No storefront, just pop-ups wherever the moment
            calls.
          </p>
          <ul className="mt-6 space-y-3">
            {POPUP_AREAS.map((area) => (
              <li key={area} className="flex items-center gap-3 text-ink">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full bg-orange-accent"
                />
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            More moments coming soon — we&apos;re always popping up somewhere new.
          </p>
        </div>
      </div>

      {SITE.social.instagram ? (
        <div className="rounded-[1.75rem] border border-orange-accent/20 bg-gradient-to-br from-peach-50 via-white to-peach-100/80 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h3 className="mt-2 font-display text-2xl text-charcoal sm:text-3xl">
              Follow us on Instagram!
            </h3>
            <p className="mt-2 max-w-md text-muted">
              Pop-up dates, new drinks, and where to find us next — all on Instagram.
            </p>
          </div>
          <Link
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-charcoal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink sm:mt-0 sm:inline-flex sm:w-auto"
          >
            <InstagramIcon className="h-5 w-5" />
            @{SITE.social.instagramHandle}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
