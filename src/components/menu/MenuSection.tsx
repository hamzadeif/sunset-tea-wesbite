import {
  MENU_CATEGORIES,
  MENU_DRINKS,
  POPULAR_COMBOS,
  TOPPINGS_DISPLAY,
  type DrinkCategory,
} from "@/lib/config/menu";
import { DROP_OFF_PRICE_PER_DRINK } from "@/lib/config/business";
import { Container, Eyebrow, Section } from "@/components/ui/Container";

const CATEGORY_STYLE: Record<
  DrinkCategory,
  { gradient: string; dot: string; label: string }
> = {
  "milk-teas": {
    gradient: "from-peach-100/90 via-white to-peach-50/40",
    dot: "bg-orange-accent",
    label: "Creamy & classic",
  },
  matcha: {
    gradient: "from-[#eef0e4]/90 via-white to-peach-50/50",
    dot: "bg-[#7d8f5e]",
    label: "Smooth & earthy",
  },
  "fruit-teas": {
    gradient: "from-[#fff0e8]/90 via-white to-peach-100/30",
    dot: "bg-orange-soft",
    label: "Bright & refreshing",
  },
  "fresh-drinks": {
    gradient: "from-cream-deep/80 via-white to-peach-50/60",
    dot: "bg-orange-deep",
    label: "Sweet & simple",
  },
};

export function MenuSection() {
  return (
    <Section id="menu" alt className="!pt-10 sm:!pt-12 lg:!pt-14">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Signature Drinks</Eyebrow>
          <h2 className="display-lg mt-3">The Menu</h2>
          <p className="lead mx-auto mt-4">
            Boba, matcha, and more — every drink is ${DROP_OFF_PRICE_PER_DRINK} with a topping
            included. Mix and match for your event.
          </p>
        </div>

        <CrowdFavorites />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {MENU_CATEGORIES.map((category, index) => {
            const drinks = MENU_DRINKS.filter((d) => d.category === category.id);
            const style = CATEGORY_STYLE[category.id];

            return (
              <article
                key={category.id}
                className={`group relative overflow-hidden rounded-[1.25rem] border border-border bg-gradient-to-br ${style.gradient} p-5 shadow-[0_12px_40px_rgba(42,37,34,0.05)] transition-transform duration-300 sm:rounded-[1.75rem] sm:p-7 sm:hover:-translate-y-0.5 ${
                  index === 0 ? "lg:col-span-1" : ""
                }`}
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/50 blur-2xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${style.dot}`}
                      aria-hidden
                    />
                    <h3 className="mt-3 font-display text-2xl text-charcoal sm:text-[1.65rem]">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{style.label}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-orange-deep shadow-sm">
                    ${DROP_OFF_PRICE_PER_DRINK}
                  </span>
                </div>

                <ul className="relative mt-6 space-y-2.5">
                  {drinks.map((drink) => (
                    <li
                      key={drink.id}
                      className="flex flex-col gap-1 rounded-2xl border border-white/60 bg-white/55 px-4 py-3 text-[0.95rem] font-medium text-ink backdrop-blur-sm transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-[0.98rem] group-hover:bg-white/70"
                    >
                      <span>{drink.name}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-soft">
                        incl. topping
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-orange-accent/20 bg-gradient-to-r from-charcoal via-ink to-charcoal p-5 text-white shadow-[var(--shadow-soft)] sm:rounded-[1.75rem] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-soft">
                Always included
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl">Pick your topping</h3>
              <p className="mt-2 max-w-md text-sm text-white/75">
                Homemade Boba or Lychee Jelly — no extra charge on any drink.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {TOPPINGS_DISPLAY.map((topping) => (
                <span
                  key={topping.id}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
                >
                  {topping.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CrowdFavorites() {
  return (
    <div className="mt-12 rounded-[2rem] border border-orange-accent/15 bg-gradient-to-br from-white via-peach-50 to-peach-100/80 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Most Loved</p>
          <h3 className="mt-2 font-display text-2xl text-charcoal sm:text-3xl">
            Crowd Favorites
          </h3>
        </div>
        <p className="max-w-sm text-sm text-muted">
          The three combinations guests ask for again and again.
        </p>
      </div>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {POPULAR_COMBOS.map((combo, index) => (
          <li
            key={combo.label}
            className="relative rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-[0_10px_30px_rgba(42,37,34,0.04)]"
          >
            <span className="absolute -top-3 left-5 rounded-full bg-orange-accent px-2.5 py-1 text-xs font-bold text-white">
              #{index + 1}
            </span>
            <p className="mt-2 font-semibold text-charcoal leading-snug">{combo.label}</p>
            <p className="mt-2 text-sm text-muted">${DROP_OFF_PRICE_PER_DRINK} · topping included</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
