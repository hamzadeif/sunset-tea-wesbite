"use client";

import {
  getCategoryName,
  MENU_CATEGORIES,
  MENU_DRINKS,
  TOPPINGS,
  type ToppingId,
} from "@/lib/config/menu";
import { RECOMMENDATION_MAX_CUPS } from "@/lib/config/business";
import { buildRecommendedMix, selectedDrinkTotal } from "@/lib/inquiry/recommendations";
import type { InquiryFormState } from "@/lib/inquiry/types";
import { POPULAR_COMBOS } from "@/lib/config/menu";

interface DrinkSelectorProps {
  state: InquiryFormState;
  onChange: (patch: Partial<InquiryFormState>) => void;
  error?: string;
}

export function DrinkSelector({ state, onChange, error }: DrinkSelectorProps) {
  const cups = typeof state.cupCount === "number" ? state.cupCount : 0;
  const total = selectedDrinkTotal(state.drinkSelections);
  const remaining = Math.max(0, cups - total);
  const showRecommendation = cups > 0 && cups <= RECOMMENDATION_MAX_CUPS;

  function getQty(drinkId: string): number {
    return state.drinkSelections.find((s) => s.drinkId === drinkId)?.quantity ?? 0;
  }

  function getTopping(drinkId: string): ToppingId {
    return state.drinkSelections.find((s) => s.drinkId === drinkId)?.toppingId ?? "homemade-boba";
  }

  function setSelection(drinkId: string, quantity: number, toppingId: ToppingId) {
    const next = state.drinkSelections.filter((s) => s.drinkId !== drinkId);
    if (quantity > 0) {
      next.push({ drinkId, quantity, toppingId });
    }
    onChange({ drinkSelections: next, letSunsetChoose: false });
  }

  function adjust(drinkId: string, delta: number) {
    if (state.letSunsetChoose) return;
    const current = getQty(drinkId);
    const topping = getTopping(drinkId);
    let nextQty = current + delta;
    if (nextQty < 0) nextQty = 0;
    const others = total - current;
    if (others + nextQty > cups) nextQty = Math.max(0, cups - others);
    setSelection(drinkId, nextQty, topping);
  }

  function applyRecommendation() {
    const mix = buildRecommendedMix(cups);
    onChange({ drinkSelections: mix, letSunsetChoose: false });
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() =>
          onChange({
            letSunsetChoose: !state.letSunsetChoose,
            drinkSelections: !state.letSunsetChoose ? [] : state.drinkSelections,
          })
        }
        className={`w-full rounded-[1.5rem] border p-5 text-left transition-all ${
          state.letSunsetChoose
            ? "border-orange-accent bg-peach-50 shadow-[0_0_0_4px_rgba(224,122,61,0.12)]"
            : "border-border bg-white/80 hover:border-orange-accent/40"
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              state.letSunsetChoose
                ? "border-orange-accent bg-orange-accent text-white"
                : "border-muted-soft"
            }`}
          >
            {state.letSunsetChoose ? "✓" : ""}
          </span>
          <div>
            <p className="font-semibold text-charcoal">Let Sunset Tea choose for me</p>
            <p className="mt-1 text-sm text-muted">
              Not sure what to pick? We&apos;ll put together a crowd-friendly mix and confirm it
              with you before your event.
            </p>
          </div>
        </div>
      </button>

      {showRecommendation && !state.letSunsetChoose ? (
        <RecommendationCard cupCount={cups} onUse={applyRecommendation} />
      ) : null}

      {!state.letSunsetChoose ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-peach-50 px-4 py-3 text-sm font-medium text-ink">
            <span>
              {total} of {cups} drinks selected
            </span>
            <span className={remaining === 0 && total === cups ? "text-orange-accent" : "text-muted"}>
              {remaining === 0 && total === cups
                ? "All set"
                : `${remaining} remaining`}
            </span>
          </div>

          <div className="space-y-8">
            {MENU_CATEGORIES.map((category) => {
              const drinks = MENU_DRINKS.filter((d) => d.category === category.id);
              return (
                <div key={category.id}>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                    {category.name}
                  </h4>
                  <div className="space-y-3">
                    {drinks.map((drink) => {
                      const qty = getQty(drink.id);
                      const topping = getTopping(drink.id);
                      return (
                        <div
                          key={drink.id}
                          className={`rounded-[1.25rem] border bg-white/85 p-4 transition-colors sm:p-5 ${
                            qty > 0 ? "border-orange-accent/40" : "border-border"
                          }`}
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold text-charcoal">{drink.name}</p>
                              <p className="text-xs font-medium uppercase tracking-wider text-muted-soft">
                                {getCategoryName(drink.category)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between gap-3 sm:justify-end">
                              <button
                                type="button"
                                aria-label={`Decrease ${drink.name}`}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream text-lg font-semibold hover:bg-peach-100 disabled:opacity-40"
                                onClick={() => adjust(drink.id, -1)}
                                disabled={qty <= 0}
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-lg font-semibold tabular-nums">
                                {qty}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase ${drink.name}`}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream text-lg font-semibold hover:bg-peach-100 disabled:opacity-40"
                                onClick={() => adjust(drink.id, 1)}
                                disabled={total >= cups}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          {qty > 0 ? (
                            <fieldset className="mt-4">
                              <legend className="sr-only">Topping for {drink.name}</legend>
                              <div className="flex flex-wrap gap-2">
                                {TOPPINGS.map((t) => (
                                  <label
                                    key={t.id}
                                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                                      topping === t.id
                                        ? "border-orange-accent bg-peach-100 text-charcoal"
                                        : "border-border bg-white text-muted hover:border-orange-accent/30"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      className="sr-only"
                                      name={`topping-${drink.id}`}
                                      checked={topping === t.id}
                                      onChange={() => setSelection(drink.id, qty, t.id)}
                                    />
                                    {t.name}
                                  </label>
                                ))}
                              </div>
                              <p className="mt-2 text-xs text-muted">
                                Still $5 — topping never changes the price.
                              </p>
                            </fieldset>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="rounded-2xl border border-dashed border-orange-accent/30 bg-peach-50/50 px-4 py-4 text-sm text-muted">
          Sunset Tea will confirm your final mix before the event. No need to allocate quantities
          manually.
        </p>
      )}

      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}

function RecommendationCard({
  cupCount,
  onUse,
}: {
  cupCount: number;
  onUse: () => void;
}) {
  const mix = buildRecommendedMix(cupCount);

  return (
    <div className="rounded-[1.5rem] border border-orange-accent/20 bg-gradient-to-br from-white to-peach-100/80 p-5 sm:p-6">
      <p className="eyebrow">Our Recommendation</p>
      <h4 className="mt-2 font-display text-xl text-charcoal">A crowd-friendly mix</h4>
      <p className="mt-1 text-sm text-muted">
        An even split of our three most popular combinations — totaling exactly {cupCount}.
      </p>
      <ul className="mt-4 space-y-2">
        {mix.map((sel) => {
          const combo = POPULAR_COMBOS.find((c) => c.drinkId === sel.drinkId);
          return (
            <li key={sel.drinkId} className="flex justify-between gap-3 text-sm text-ink">
              <span>{combo?.label ?? sel.drinkId}</span>
              <span className="font-semibold tabular-nums">{sel.quantity}</span>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onUse}
        className="mt-5 flex w-full items-center justify-center rounded-full bg-charcoal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink sm:w-auto"
      >
        Use This Mix
      </button>
    </div>
  );
}

export function BoothMenuSelector({
  state,
  onChange,
  error,
}: {
  state: InquiryFormState;
  onChange: (patch: Partial<InquiryFormState>) => void;
  error?: string;
}) {
  function toggleDrink(id: string) {
    if (state.letSunsetRecommendMenu) return;
    const exists = state.boothDrinkIds.includes(id);
    onChange({
      boothDrinkIds: exists
        ? state.boothDrinkIds.filter((d) => d !== id)
        : [...state.boothDrinkIds, id],
    });
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() =>
          onChange({
            letSunsetRecommendMenu: !state.letSunsetRecommendMenu,
            boothDrinkIds: !state.letSunsetRecommendMenu ? [] : state.boothDrinkIds,
          })
        }
        className={`w-full rounded-[1.5rem] border p-5 text-left transition-all ${
          state.letSunsetRecommendMenu
            ? "border-orange-accent bg-peach-50 shadow-[0_0_0_4px_rgba(224,122,61,0.12)]"
            : "border-border bg-white/80 hover:border-orange-accent/40"
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              state.letSunsetRecommendMenu
                ? "border-orange-accent bg-orange-accent text-white"
                : "border-muted-soft"
            }`}
          >
            {state.letSunsetRecommendMenu ? "✓" : ""}
          </span>
          <div>
            <p className="font-semibold text-charcoal">Let Sunset Tea recommend the menu</p>
            <p className="mt-1 text-sm text-muted">
              We&apos;ll suggest a crowd-friendly booth menu and confirm it with you before the
              event.
            </p>
          </div>
        </div>
      </button>

      {!state.letSunsetRecommendMenu ? (
        <div className="space-y-8">
          {MENU_CATEGORIES.map((category) => {
            const drinks = MENU_DRINKS.filter((d) => d.category === category.id);
            return (
              <div key={category.id}>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  {category.name}
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {drinks.map((drink) => {
                    const selected = state.boothDrinkIds.includes(drink.id);
                    return (
                      <button
                        key={drink.id}
                        type="button"
                        onClick={() => toggleDrink(drink.id)}
                        className={`rounded-[1.25rem] border p-4 text-left transition-all ${
                          selected
                            ? "border-orange-accent bg-peach-50"
                            : "border-border bg-white/85 hover:border-orange-accent/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-charcoal">{drink.name}</p>
                            <p className="text-xs uppercase tracking-wider text-muted-soft">
                              {getCategoryName(drink.category)}
                            </p>
                          </div>
                          <span
                            aria-hidden
                            className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                              selected
                                ? "border-orange-accent bg-orange-accent text-white"
                                : "border-muted-soft"
                            }`}
                          >
                            {selected ? "✓" : ""}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <p className="text-sm text-muted">Toppings are included in the $5 drink price.</p>
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}
