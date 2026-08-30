import type { PackageId } from "@/lib/config/business";
import { MENU_DRINKS } from "@/lib/config/menu";
import { selectedDrinkTotal } from "./recommendations";
import type { InquiryFormState, InquiryStep } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateGeneral(state: InquiryFormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.name.trim()) errors.name = "Please enter your name.";
  if (!state.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!state.email.trim()) errors.email = "Please enter an email.";
  else if (!isValidEmail(state.email)) errors.email = "Please enter a valid email.";
  if (!state.eventDate) errors.eventDate = "Please choose an event date.";
  return errors;
}

export function validatePackage(state: InquiryFormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.packageId) errors.packageId = "Please select a package.";
  return errors;
}

export function validateDetails(state: InquiryFormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (state.packageId === "dropoff") {
    if (!state.dropOffTime) errors.dropOffTime = "Please choose a drop-off time.";
    if (state.cupCount === "" || state.cupCount <= 0) {
      errors.cupCount = "Enter how many cups you need.";
    }
    if (state.tableSetup === null) {
      errors.tableSetup = "Please choose whether you'd like table setup.";
    }
  }

  if (state.packageId === "booth") {
    if (!state.eventStartTime) errors.eventStartTime = "Please choose a start time.";
    if (!state.eventEndTime) errors.eventEndTime = "Please choose an end time.";
    if (
      state.eventStartTime &&
      state.eventEndTime &&
      state.eventEndTime <= state.eventStartTime
    ) {
      errors.eventEndTime = "End time should be after start time.";
    }
    if (state.guestCount === "" || state.guestCount <= 0) {
      errors.guestCount = "Enter an approximate guest count.";
    }
  }

  return errors;
}

export function validateDrinks(state: InquiryFormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (state.packageId === "dropoff") {
    if (state.letSunsetChoose) return errors;

    const cups = typeof state.cupCount === "number" ? state.cupCount : 0;
    const total = selectedDrinkTotal(state.drinkSelections);

    if (total === 0) {
      errors.drinks = "Select your drinks, use our recommendation, or let Sunset Tea choose.";
    } else if (total !== cups) {
      errors.drinks = `Please select exactly ${cups} drinks (currently ${total}).`;
    }

    for (const sel of state.drinkSelections) {
      if (sel.quantity > 0 && !MENU_DRINKS.some((d) => d.id === sel.drinkId)) {
        errors.drinks = "One of the selected drinks is invalid.";
      }
    }
  }

  if (state.packageId === "booth") {
    if (!state.letSunsetRecommendMenu && state.boothDrinkIds.length === 0) {
      errors.drinks = "Select at least one drink, or let Sunset Tea recommend the menu.";
    }
  }

  return errors;
}

export function validateStep(
  step: InquiryStep,
  state: InquiryFormState,
): Record<string, string> {
  switch (step) {
    case "general":
      return validateGeneral(state);
    case "package":
      return validatePackage(state);
    case "details":
      return validateDetails(state);
    case "drinks":
      return validateDrinks(state);
    case "review":
      return {
        ...validateGeneral(state),
        ...validatePackage(state),
        ...validateDetails(state),
        ...validateDrinks(state),
      };
    default:
      return {};
  }
}

export function canSubmit(state: InquiryFormState): boolean {
  return Object.keys(validateStep("review", state)).length === 0;
}

export function parsePackageParam(value: string | null): PackageId | null {
  if (value === "dropoff" || value === "booth") return value;
  return null;
}
