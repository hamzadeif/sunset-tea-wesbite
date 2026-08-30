import { MENU_CATEGORIES, MENU_DRINKS, POPULAR_COMBOS, TOPPINGS_DISPLAY } from "@/lib/config/menu";
import { DROP_OFF_PRICE_PER_DRINK } from "@/lib/config/business";
import { Container, Eyebrow, Section } from "@/components/ui/Container";

export function MenuSection() {
  return (
    <Section id="menu" alt>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Signature Drinks</Eyebrow>
          <h2 className="display-lg mt-3">The Menu</h2>
          <p className="lead mx-auto mt-4">
            Every event can be customized. Here are the Sunset Tea favorites — all{" "}
            ${DROP_OFF_PRICE_PER_DRINK} with a topping included.
          </p>
        </div>

        <CrowdFavorites />

        <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {MENU_CATEGORIES.map((category) => {
            const drinks = MENU_DRINKS.filter((d) => d.category === category.id);
            return (
              <div key={category.id}>
                <h3 className="font-display text-2xl text-charcoal">{category.name}</h3>
                <ul className="mt-5 space-y-3">
                  {drinks.map((drink) => (
                    <li
                      key={drink.id}
                      className="border-b border-border/80 pb-3 text-[1.05rem] text-ink"
                    >
                      {drink.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div>
            <h3 className="font-display text-2xl text-charcoal">Toppings</h3>
            <p className="mt-2 text-sm text-muted">Included with every drink.</p>
            <ul className="mt-5 space-y-3">
              {TOPPINGS_DISPLAY.map((topping) => (
                <li
                  key={topping.id}
                  className="border-b border-border/80 pb-3 text-[1.05rem] text-ink"
                >
                  {topping.name}
                </li>
              ))}
            </ul>
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
