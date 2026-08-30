export type EventCategory = "campus" | "markets" | "community" | "special";

export interface EventItem {
  id: string;
  name: string;
  city: string;
  /** Display date string — leave empty for placeholders without a date. */
  date: string;
  category: EventCategory;
  description: string;
  /** Path under /public, or empty for gradient placeholder. */
  image: string;
  placeholder: boolean;
}

export const EVENT_CATEGORIES: { id: EventCategory; label: string }[] = [
  { id: "campus", label: "Campus" },
  { id: "markets", label: "Markets" },
  { id: "community", label: "Community" },
  { id: "special", label: "Special Events" },
];

/**
 * Gallery entries — replace placeholders with real event photos and details later.
 * Do not invent specific event names, dates, or attendance numbers.
 */
export const EVENTS: EventItem[] = [
  {
    id: "campus-slo",
    name: "Campus Pop-Up",
    city: "San Luis Obispo",
    date: "",
    category: "campus",
    description:
      "Sunset Tea shows up on Cal Poly lawns and campus gatherings — cold drinks, friendly faces, easy vibes.",
    image: "",
    placeholder: true,
  },
  {
    id: "farmers-market",
    name: "Farmers Market Booth",
    city: "Central Coast",
    date: "",
    category: "markets",
    description:
      "Market mornings, matcha in hand. We love bringing Sunset Tea directly into the weekend rhythm.",
    image: "",
    placeholder: true,
  },
  {
    id: "community-day",
    name: "Community Gathering",
    city: "California",
    date: "",
    category: "community",
    description:
      "Neighborhood events and local celebrations — a little sunshine in every cup.",
    image: "",
    placeholder: true,
  },
  {
    id: "vegas-activation",
    name: "Special Activation",
    city: "Las Vegas",
    date: "",
    category: "special",
    description:
      "From California campuses to special activations in Las Vegas, we pop up wherever the moment calls.",
    image: "",
    placeholder: true,
  },
];
