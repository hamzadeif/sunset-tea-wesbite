"use client";

import { calculatePrice, formatCurrency } from "@/lib/inquiry/pricing";
import type { InquiryFormState } from "@/lib/inquiry/types";
import { PACKAGES } from "@/lib/config/packages";

export function PriceSummary({
  state,
  sticky = false,
}: {
  state: InquiryFormState;
  sticky?: boolean;
}) {
  const price = calculatePrice(state);
  if (!price || !state.packageId) return null;

  const pkg = PACKAGES[state.packageId];

  return (
    <aside
      className={`rounded-[1.5rem] border border-border bg-white/90 p-5 shadow-[var(--shadow-soft)] backdrop-blur-sm ${
        sticky ? "lg:sticky lg:top-24" : ""
      }`}
      aria-live="polite"
    >
      <p className="eyebrow">Summary</p>
      <h3 className="mt-2 font-display text-xl text-charcoal">{pkg.name}</h3>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-start justify-between gap-3">
          <dt className="text-muted">{price.drinkLine.label}</dt>
          <dd className="font-semibold text-charcoal">
            {formatCurrency(price.drinkLine.amount)}
          </dd>
        </div>
        {price.serviceLine ? (
          <div className="flex items-start justify-between gap-3">
            <dt className="text-muted">{price.serviceLine.label}</dt>
            <dd className="font-semibold text-charcoal">
              {formatCurrency(price.serviceLine.amount)}
            </dd>
          </div>
        ) : null}
        {price.included.map((line) => (
          <div key={line} className="flex items-start justify-between gap-3">
            <dt className="text-muted">{line.split("—")[0].trim()}</dt>
            <dd className="font-medium text-orange-accent">Included</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <p className="text-sm font-semibold text-ink">
          {price.isEstimate ? "Estimated Total" : "Total"}
        </p>
        <p className="font-display text-3xl text-charcoal">{formatCurrency(price.total)}</p>
      </div>
      {price.isEstimate ? (
        <p className="mt-2 text-xs text-muted">
          Based on approximate guest count — final details confirmed together.
        </p>
      ) : null}
    </aside>
  );
}
