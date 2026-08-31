"use client";

import { calculatePrice, formatCurrency } from "@/lib/inquiry/pricing";
import type { InquiryFormState } from "@/lib/inquiry/types";
import { PACKAGES } from "@/lib/config/packages";

export function PriceSummary({
  state,
  sticky = false,
  className = "",
}: {
  state: InquiryFormState;
  sticky?: boolean;
  className?: string;
}) {
  const price = calculatePrice(state);
  if (!price || !state.packageId) return null;

  const pkg = PACKAGES[state.packageId];

  return (
    <aside
      className={`rounded-[1.25rem] border border-border bg-white/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:rounded-[1.5rem] sm:p-5 ${
        sticky ? "lg:sticky lg:top-24" : ""
      } ${className}`}
      aria-live="polite"
    >
      <p className="eyebrow">Summary</p>
      <h3 className="mt-2 font-display text-lg text-charcoal sm:text-xl">{pkg.name}</h3>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-start justify-between gap-3">
          <dt className="max-w-[65%] text-muted">{price.drinkLine.label}</dt>
          <dd className="shrink-0 font-semibold text-charcoal">
            {formatCurrency(price.drinkLine.amount)}
          </dd>
        </div>
        {price.serviceLine ? (
          <div className="flex items-start justify-between gap-3">
            <dt className="text-muted">{price.serviceLine.label}</dt>
            <dd className="shrink-0 font-semibold text-charcoal">
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
        <p className="font-display text-2xl text-charcoal sm:text-3xl">
          {formatCurrency(price.total)}
        </p>
      </div>
      {price.isEstimate ? (
        <p className="mt-2 text-xs text-muted">
          Based on approximate guest count — final details confirmed together.
        </p>
      ) : null}
    </aside>
  );
}
