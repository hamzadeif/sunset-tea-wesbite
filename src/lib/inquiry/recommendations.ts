import { POPULAR_COMBOS } from "@/lib/config/menu";
import type { DrinkSelection } from "./types";

/**
 * Split cupCount as evenly as possible across the three popular combos.
 * Remainder goes to the first combo(s) so the total always equals cupCount.
 */
export function buildRecommendedMix(cupCount: number): DrinkSelection[] {
  if (cupCount <= 0) return [];

  const n = POPULAR_COMBOS.length;
  const base = Math.floor(cupCount / n);
  const remainder = cupCount % n;

  return POPULAR_COMBOS.map((combo, index) => ({
    drinkId: combo.drinkId,
    toppingId: combo.toppingId,
    quantity: base + (index < remainder ? 1 : 0),
  })).filter((s) => s.quantity > 0);
}

export function selectedDrinkTotal(selections: DrinkSelection[]): number {
  return selections.reduce((sum, s) => sum + s.quantity, 0);
}
