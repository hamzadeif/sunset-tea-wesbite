import type { PackageId } from "@/lib/config/business";
import type { ToppingId } from "@/lib/config/menu";

export type InquiryStep =
  | "general"
  | "package"
  | "details"
  | "drinks"
  | "review";

export interface DrinkSelection {
  drinkId: string;
  quantity: number;
  toppingId: ToppingId;
}

export interface InquiryFormState {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  packageId: PackageId | null;
  // Drop-off
  dropOffTime: string;
  cupCount: number | "";
  tableSetup: boolean | null;
  letSunsetChoose: boolean;
  drinkSelections: DrinkSelection[];
  // Booth
  eventStartTime: string;
  eventEndTime: string;
  guestCount: number | "";
  boothDrinkIds: string[];
  letSunsetRecommendMenu: boolean;
  // Meta
  honeypot: string;
}

export interface PriceBreakdown {
  packageId: PackageId;
  drinkLine: { label: string; amount: number };
  serviceLine?: { label: string; amount: number };
  included: string[];
  total: number;
  isEstimate: boolean;
}

export const INITIAL_INQUIRY_STATE: InquiryFormState = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  packageId: null,
  dropOffTime: "",
  cupCount: "",
  tableSetup: null,
  letSunsetChoose: false,
  drinkSelections: [],
  eventStartTime: "",
  eventEndTime: "",
  guestCount: "",
  boothDrinkIds: [],
  letSunsetRecommendMenu: false,
  honeypot: "",
};
