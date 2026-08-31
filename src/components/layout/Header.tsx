"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramLink } from "@/components/ui/SocialIcons";

const SCROLL_THRESHOLD = 32;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathWhenOpened, setPathWhenOpened] = useState(pathname);

  if (pathname !== pathWhenOpened) {
    setPathWhenOpened(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const showBar = scrolled || open;

  return (
    <>
      <header
        className={`safe-top fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out ${
          showBar
            ? "border-b border-border bg-cream/92 shadow-[0_8px_30px_rgba(42,37,34,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent shadow-none backdrop-blur-none"
        }`}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-3">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src={SITE.logo}
              alt="Sunset Tea logo"
              width={52}
              height={52}
              priority
              className="h-10 w-10 shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-12 sm:w-12"
            />
            <span className="truncate font-display text-base tracking-tight text-charcoal sm:text-xl">
              Sunset Tea
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <nav className="flex items-center gap-1" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      active
                        ? showBar
                          ? "bg-peach-100 text-charcoal"
                          : "bg-white/45 text-charcoal backdrop-blur-sm"
                        : "text-ink hover:bg-white/40 hover:text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {SITE.social.instagram ? (
              <InstagramLink
                href={SITE.social.instagram}
                label={`Follow Sunset Tea on Instagram @${SITE.social.instagramHandle}`}
                className={`ml-2 ${showBar ? "" : "border-white/40 bg-white/40 backdrop-blur-sm"}`}
              />
            ) : null}

            <ButtonLink href="/inquiries" variant="soft" size="md" className="ml-2">
              Get a Quote
            </ButtonLink>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            {SITE.social.instagram ? (
              <InstagramLink
                href={SITE.social.instagram}
                label={`Follow Sunset Tea on Instagram @${SITE.social.instagramHandle}`}
                className={showBar ? "" : "border-white/40 bg-white/40 backdrop-blur-sm"}
              />
            ) : null}
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-charcoal transition-colors ${
                showBar
                  ? "border-border bg-white/70"
                  : "border-white/40 bg-white/40 backdrop-blur-sm"
              }`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full rounded bg-charcoal transition-transform ${
                    open ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-charcoal transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-full rounded bg-charcoal transition-transform ${
                    open ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-charcoal/20 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div
          className={`safe-top absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col bg-cream/98 shadow-xl backdrop-blur-xl transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container-page flex h-[var(--header-h)] items-center justify-between">
            <span className="font-display text-lg text-charcoal">Menu</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-charcoal"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav
            className="container-page safe-bottom flex-1 overflow-y-auto pb-8 pt-2"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-2xl px-4 py-4 text-lg font-medium ${
                        active ? "bg-peach-100 text-charcoal" : "text-ink"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink
              href="/inquiries"
              variant="soft"
              size="lg"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </ButtonLink>
          </nav>
        </div>
      </div>
    </>
  );
}
