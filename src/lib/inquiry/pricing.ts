import {
  BOOTH_PRICE_PER_DRINK,
  BOOTH_SERVICE_FEE,
  DROP_OFF_PRICE_PER_DRINK,
} from "@/lib/config/business";
import type { InquiryFormState, PriceBreakdown } from "./types";

export function calculatePrice(state: InquiryFormState): PriceBreakdown | null {
  if (!state.packageId) return null;

  if (state.packageId === "dropoff") {
    const cups = typeof state.cupCount === "number" ? state.cupCount : 0;
    if (cups <= 0) return null;

    const included = [
      "Toppings — Included",
      "Delivery — Included",
      "Drop-Off — Included",
    ];
    if (state.tableSetup === true) {
      included.push("Table Setup — Included");
    }

    return {
      packageId: "dropoff",
      drinkLine: {
        label: `${cups} drinks × $${DROP_OFF_PRICE_PER_DRINK}`,
        amount: cups * DROP_OFF_PRICE_PER_DRINK,
      },
      included,
      total: cups * DROP_OFF_PRICE_PER_DRINK,
      isEstimate: false,
    };
  }

  const guests = typeof state.guestCount === "number" ? state.guestCount : 0;
  if (guests <= 0) return null;

  return {
    packageId: "booth",
    drinkLine: {
      label: `${guests} guests × $${BOOTH_PRICE_PER_DRINK}`,
      amount: guests * BOOTH_PRICE_PER_DRINK,
    },
    serviceLine: {
      label: "Full Booth Service",
      amount: BOOTH_SERVICE_FEE,
    },
    included: ["Toppings — Included"],
    total: guests * BOOTH_PRICE_PER_DRINK + BOOTH_SERVICE_FEE,
    isEstimate: true,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
