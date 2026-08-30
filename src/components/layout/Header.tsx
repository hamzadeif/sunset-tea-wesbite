"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/config/site";
import { ButtonLink } from "@/components/ui/Button";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-cream/90 shadow-[0_8px_30px_rgba(42,37,34,0.04)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE.name} home`}>
          <Image
            src="/images/sunset-tea-logo.png"
            alt="Sunset Tea logo"
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-12 sm:w-12"
          />
          <span className="font-display text-lg tracking-tight text-charcoal sm:text-xl">
            Sunset Tea
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
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
                    ? "bg-peach-100 text-charcoal"
                    : "text-muted hover:bg-peach-50 hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ButtonLink href="/inquiries" variant="soft" size="md" className="ml-2">
            Get a Quote
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-charcoal lg:hidden"
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

      <div
        id="mobile-nav"
        className={`lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
        hidden={!open}
      >
        <div className="border-t border-border bg-cream/95 px-4 pb-8 pt-4 backdrop-blur-xl">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-3.5 text-lg font-medium ${
                    active ? "bg-peach-100 text-charcoal" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <ButtonLink href="/inquiries" variant="soft" size="lg" className="mt-3 w-full">
              Get a Quote
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
