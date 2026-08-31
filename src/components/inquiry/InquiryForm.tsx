"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGES } from "@/lib/config/packages";
import { RESPONSE_TIME_HOURS } from "@/lib/config/business";
import { getDrinkById, getToppingName } from "@/lib/config/menu";
import {
  INITIAL_INQUIRY_STATE,
  type InquiryFormState,
  type InquiryStep,
} from "@/lib/inquiry/types";
import { calculatePrice, formatCurrency } from "@/lib/inquiry/pricing";
import { canSubmit, parsePackageParam, validateStep } from "@/lib/inquiry/validation";
import { Button } from "@/components/ui/Button";
import { PriceSummary } from "./PriceSummary";
import { BoothMenuSelector, DrinkSelector } from "./DrinkSelector";

const STEPS: { id: InquiryStep; label: string }[] = [
  { id: "general", label: "Your Event" },
  { id: "package", label: "Service" },
  { id: "details", label: "Details" },
  { id: "drinks", label: "Drinks" },
  { id: "review", label: "Your Price" },
];

export function InquiryForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package");
  const [state, setState] = useState<InquiryFormState>(() => ({
    ...INITIAL_INQUIRY_STATE,
    packageId: parsePackageParam(packageParam),
  }));
  const [step, setStep] = useState<InquiryStep>("general");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const submitErrorRef = useRef<HTMLParagraphElement>(null);

  const patch = useCallback((partial: Partial<InquiryFormState>) => {
    setState((s) => ({ ...s, ...partial }));
    setErrors({});
  }, []);

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const showPrice = step === "drinks" || step === "review";

  function goNext() {
    const nextErrors = validateStep(step, state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order: InquiryStep[] = ["general", "package", "details", "drinks", "review"];
    const i = order.indexOf(step);
    if (i < order.length - 1) setStep(order[i + 1]);
  }

  function goBack() {
    const order: InquiryStep[] = ["general", "package", "details", "drinks", "review"];
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
    setErrors({});
  }

  function showSubmitError(message: string) {
    setSubmitError(message);
    requestAnimationFrame(() => {
      submitErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  async function handleSubmit() {
    setSubmitError(null);
    const nextErrors = validateStep("review", state);
    setErrors(nextErrors);
    if (!canSubmit(state) || Object.keys(nextErrors).length > 0) {
      showSubmitError(
        Object.keys(nextErrors).length > 0
          ? "Please fix the items below before booking."
          : "Please complete all required fields.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      let data: { ok?: boolean; error?: string } = {};
      try {
        data = (await res.json()) as { ok?: boolean; error?: string };
      } catch {
        showSubmitError("Unexpected server response. Please try again or email us directly.");
        return;
      }

      if (!res.ok || !data.ok) {
        showSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      showSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    const price = calculatePrice(state);
    return (
      <div className="rounded-[1.25rem] border border-border bg-white/85 p-6 text-center shadow-[var(--shadow-soft)] sm:rounded-[2rem] sm:p-12">
        <p className="eyebrow">Event request received</p>
        <h2 className="display-md mt-3">We&apos;ve got it.</h2>
        <p className="lead mx-auto mt-4">
          Thanks for choosing Sunset Tea. We&apos;ve received your event details and will be in
          touch within {RESPONSE_TIME_HOURS} hours to confirm everything.
        </p>
        {price ? (
          <p className="mt-5 font-display text-2xl text-charcoal">
            {price.isEstimate ? "Your estimated price" : "Your price"}:{" "}
            {formatCurrency(price.total)}
          </p>
        ) : null}
        <p className="mt-4 text-sm text-muted">
          No payment was required today — we&apos;ll confirm your event details together.
        </p>
      </div>
    );
  }

  const reviewPrice = calculatePrice(state);
  const bookLabel = (() => {
    if (!reviewPrice) return "Book My Event";
    if (reviewPrice.isEstimate) {
      return `Book My Event — Est. ${formatCurrency(reviewPrice.total)}`;
    }
    return `Book My Event — ${formatCurrency(reviewPrice.total)}`;
  })();

  return (
    <div ref={formRef} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
      <div className="relative rounded-[1.25rem] border border-border bg-white/85 p-4 shadow-[var(--shadow-soft)] sm:rounded-[2rem] sm:p-8">
        <Progress steps={STEPS} current={stepIndex} />

        <div className="mt-8">
          {step === "general" ? (
            <GeneralStep state={state} onChange={patch} errors={errors} />
          ) : null}
          {step === "package" ? (
            <PackageStep state={state} onChange={patch} errors={errors} />
          ) : null}
          {step === "details" ? (
            <DetailsStep state={state} onChange={patch} errors={errors} />
          ) : null}
          {step === "drinks" ? (
            state.packageId === "booth" ? (
              <BoothMenuSelector state={state} onChange={patch} error={errors.drinks} />
            ) : (
              <DrinkSelector state={state} onChange={patch} error={errors.drinks} />
            )
          ) : null}
          {step === "review" ? (
            <ReviewStep state={state} onEdit={setStep} onChange={patch} errors={errors} />
          ) : null}
        </div>

        {/* Honeypot — avoid "company"/name labels that trigger browser autofill */}
        <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" aria-hidden>
          <label htmlFor="st-inquiry-hp">Leave blank</label>
          <input
            id="st-inquiry-hp"
            name="st-inquiry-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={state.honeypot}
            onChange={(e) => patch({ honeypot: e.target.value })}
          />
        </div>

        {submitError ? (
          <p
            ref={submitErrorRef}
            role="alert"
            className="error-text mt-4 rounded-xl border border-orange-deep/20 bg-peach-50 px-4 py-3"
          >
            {submitError}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={stepIndex === 0 || isSubmitting}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          {step !== "review" ? (
            <Button type="button" variant="soft" size="lg" onClick={goNext} className="w-full sm:w-auto">
              Continue
            </Button>
          ) : (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
              <Button
                type="button"
                variant="soft"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full whitespace-normal text-center sm:w-auto sm:min-w-[16rem]"
              >
                {isSubmitting ? "Sending…" : bookLabel}
              </Button>
              <p className="text-center text-xs text-muted sm:text-right">
                No payment required today. We&apos;ll confirm your event details within{" "}
                {RESPONSE_TIME_HOURS} hours.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={showPrice ? "block" : "hidden lg:block lg:invisible"}>
        {showPrice ? <PriceSummary state={state} className="sm:sticky sm:top-24" /> : <div />}
      </div>
    </div>
  );
}

function Progress({
  steps,
  current,
}: {
  steps: { id: string; label: string }[];
  current: number;
}) {
  return (
    <ol
      className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      aria-label="Form progress"
    >
      {steps.map((s, i) => (
        <li
          key={s.id}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide ${
            i === current
              ? "bg-orange-accent text-white"
              : i < current
                ? "bg-peach-100 text-orange-deep"
                : "bg-cream-deep text-muted-soft"
          }`}
          aria-current={i === current ? "step" : undefined}
        >
          {i + 1}. {s.label}
        </li>
      ))}
    </ol>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label-field" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}

function GeneralStep({
  state,
  onChange,
  errors,
}: {
  state: InquiryFormState;
  onChange: (p: Partial<InquiryFormState>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">Your event</h2>
        <p className="mt-2 text-muted">Don&apos;t have every detail yet? That&apos;s completely fine.</p>
      </div>
      <Field label="Name" id="name" error={errors.name}>
        <input
          id="name"
          className="input-field"
          value={state.name}
          onChange={(e) => onChange({ name: e.target.value })}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" id="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className="input-field"
            value={state.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            className="input-field"
            value={state.email}
            onChange={(e) => onChange({ email: e.target.value })}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>
      <Field label="Event Date" id="eventDate" error={errors.eventDate}>
        <input
          id="eventDate"
          type="date"
          className="input-field"
          value={state.eventDate}
          onChange={(e) => onChange({ eventDate: e.target.value })}
          aria-invalid={Boolean(errors.eventDate)}
        />
      </Field>
    </div>
  );
}

function PackageStep({
  state,
  onChange,
  errors,
}: {
  state: InquiryFormState;
  onChange: (p: Partial<InquiryFormState>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
          Choose your service
        </h2>
      </div>
      <div className="grid gap-4">
        {(["dropoff", "booth"] as const).map((id) => {
          const pkg = PACKAGES[id];
          const selected = state.packageId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ packageId: id })}
              className={`rounded-[1.5rem] border p-5 text-left transition-all sm:p-6 ${
                selected
                  ? "border-orange-accent bg-peach-50 shadow-[0_0_0_4px_rgba(224,122,61,0.12)]"
                  : "border-border bg-white hover:border-orange-accent/30"
              }`}
            >
              <p className="font-display text-2xl text-charcoal">{pkg.name}</p>
              <p className="mt-1 text-lg font-semibold text-orange-accent">{pkg.priceLabel}</p>
              <p className="mt-2 text-muted">{pkg.tagline}</p>
            </button>
          );
        })}
      </div>
      {errors.packageId ? <p className="error-text">{errors.packageId}</p> : null}
    </div>
  );
}

function DetailsStep({
  state,
  onChange,
  errors,
}: {
  state: InquiryFormState;
  onChange: (p: Partial<InquiryFormState>) => void;
  errors: Record<string, string>;
}) {
  if (state.packageId === "booth") {
    return (
      <div className="space-y-5">
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">Booth details</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Event start time" id="eventStartTime" error={errors.eventStartTime}>
            <input
              id="eventStartTime"
              type="time"
              className="input-field"
              value={state.eventStartTime}
              onChange={(e) => onChange({ eventStartTime: e.target.value })}
              aria-invalid={Boolean(errors.eventStartTime)}
            />
          </Field>
          <Field label="Event end time" id="eventEndTime" error={errors.eventEndTime}>
            <input
              id="eventEndTime"
              type="time"
              className="input-field"
              value={state.eventEndTime}
              onChange={(e) => onChange({ eventEndTime: e.target.value })}
              aria-invalid={Boolean(errors.eventEndTime)}
            />
          </Field>
        </div>
        <Field label="Approximate number of guests" id="guestCount" error={errors.guestCount}>
          <input
            id="guestCount"
            type="number"
            min={1}
            inputMode="numeric"
            className="input-field"
            value={state.guestCount}
            onChange={(e) =>
              onChange({
                guestCount: e.target.value === "" ? "" : Math.max(0, Number(e.target.value)),
              })
            }
            aria-invalid={Boolean(errors.guestCount)}
          />
        </Field>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl text-charcoal sm:text-3xl">Drop-off details</h2>
      <Field label="Drop-off time" id="dropOffTime" error={errors.dropOffTime}>
        <input
          id="dropOffTime"
          type="time"
          className="input-field"
          value={state.dropOffTime}
          onChange={(e) => onChange({ dropOffTime: e.target.value })}
          aria-invalid={Boolean(errors.dropOffTime)}
        />
      </Field>
      <Field label="Number of cups" id="cupCount" error={errors.cupCount}>
        <input
          id="cupCount"
          type="number"
          min={1}
          inputMode="numeric"
          className="input-field"
          value={state.cupCount}
          onChange={(e) =>
            onChange({
              cupCount: e.target.value === "" ? "" : Math.max(0, Number(e.target.value)),
              drinkSelections: [],
            })
          }
          aria-invalid={Boolean(errors.cupCount)}
        />
      </Field>
      <fieldset>
        <legend className="label-field">Would you like our free table setup?</legend>
        <div className="flex flex-wrap gap-3">
          {[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange({ tableSetup: opt.value })}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                state.tableSetup === opt.value
                  ? "border-orange-accent bg-peach-100 text-charcoal"
                  : "border-border bg-white text-muted hover:border-orange-accent/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.tableSetup ? <p className="error-text">{errors.tableSetup}</p> : null}
      </fieldset>
    </div>
  );
}

function ReviewStep({
  state,
  onEdit,
  onChange,
  errors,
}: {
  state: InquiryFormState;
  onEdit: (step: InquiryStep) => void;
  onChange: (p: Partial<InquiryFormState>) => void;
  errors: Record<string, string>;
}) {
  const price = calculatePrice(state);
  const pkg = state.packageId ? PACKAGES[state.packageId] : null;

  const drinkLines = useMemo(() => {
    if (state.packageId === "dropoff") {
      if (state.letSunsetChoose) return ["Sunset Tea will choose a crowd-friendly mix."];
      return state.drinkSelections
        .filter((s) => s.quantity > 0)
        .map(
          (s) =>
            `${s.quantity}× ${getDrinkById(s.drinkId)?.name ?? s.drinkId} — ${getToppingName(s.toppingId)}`,
        );
    }
    if (state.letSunsetRecommendMenu) return ["Sunset Tea will recommend the menu."];
    return state.boothDrinkIds.map((id) => getDrinkById(id)?.name ?? id);
  }, [state]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">Your price</h2>
        <p className="mt-2 text-muted">
          Review everything below, then book when you&apos;re ready — no payment required today.
        </p>
      </div>

      {Object.keys(errors).length > 0 ? (
        <div
          className="rounded-[1.25rem] border border-orange-deep/25 bg-peach-50 px-4 py-3 text-sm text-orange-deep"
          role="alert"
        >
          <p className="font-semibold">A few things need your attention:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {Object.values(errors).map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <ReviewBlock title="Contact" onEdit={() => onEdit("general")}>
        <p>{state.name}</p>
        <p>{state.phone}</p>
        <p>{state.email}</p>
        <p>Event date: {state.eventDate}</p>
      </ReviewBlock>

      <ReviewBlock title="Service" onEdit={() => onEdit("package")}>
        <p>{pkg?.name}</p>
      </ReviewBlock>

      <ReviewBlock title="Event details" onEdit={() => onEdit("details")}>
        {state.packageId === "dropoff" ? (
          <>
            <p>Drop-off time: {state.dropOffTime}</p>
            <p>Cups: {state.cupCount}</p>
            <p>Table setup: {state.tableSetup ? "Yes" : "No"}</p>
          </>
        ) : (
          <>
            <p>
              Time: {state.eventStartTime} – {state.eventEndTime}
            </p>
            <p>Approx. guests: {state.guestCount}</p>
          </>
        )}
      </ReviewBlock>

      <ReviewBlock title="Drinks" onEdit={() => onEdit("drinks")}>
        <ul className="space-y-1">
          {drinkLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </ReviewBlock>

      <div className="rounded-[1.25rem] border border-border bg-white/85 p-4 sm:p-5">
        <label htmlFor="additionalNotes" className="label-field">
          Anything else we should know?
        </label>
        <p className="mb-3 text-sm text-muted">
          Optional — special requests, venue details, or anything else about your event.
        </p>
        <textarea
          id="additionalNotes"
          className="input-field min-h-[7rem] resize-y"
          value={state.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          placeholder="Tell us anything else that would help plan your event…"
          rows={4}
        />
      </div>

      {price ? (
        <div className="rounded-[1.25rem] bg-peach-50 p-5">
          <p className="text-sm font-semibold text-muted">
            {price.isEstimate ? "Your estimated price" : "Your price"}
          </p>
          <p className="font-display text-3xl text-charcoal">{formatCurrency(price.total)}</p>
          {!price.isEstimate ? (
            <p className="mt-2 text-xs text-muted">That&apos;s your price. No waiting for a quote.</p>
          ) : (
            <p className="mt-2 text-xs text-muted">
              Based on approximate guest count — we&apos;ll confirm final details together.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.25rem] border border-border bg-cream/50 p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-charcoal">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-semibold text-orange-accent hover:text-orange-deep"
        >
          Edit
        </button>
      </div>
      <div className="space-y-1 text-muted">{children}</div>
    </div>
  );
}
