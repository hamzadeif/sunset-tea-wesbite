import {
  BOOTH_PRICE_PER_DRINK,
  BOOTH_SERVICE_FEE,
  DROP_OFF_PRICE_PER_DRINK,
  type PackageId,
} from "./business";

export interface PackageConfig {
  id: PackageId;
  name: string;
  shortName: string;
  priceLabel: string;
  priceNote?: string;
  tagline: string;
  description: string;
  bestFor: string[];
  features: string[];
  homeFeatures: string[];
  ctaLabel: string;
  inquireHref: string;
  image: string;
  imageAlt: string;
}

export const PACKAGES: Record<PackageId, PackageConfig> = {
  dropoff: {
    id: "dropoff",
    name: "Drop-Off Catering",
    shortName: "Drop-Off",
    priceLabel: `$${DROP_OFF_PRICE_PER_DRINK} / drink`,
    priceNote: "Drink + topping included. No extra fees.",
    tagline: "Ready-to-serve drinks delivered to your event.",
    description:
      "Freshly prepared drinks dropped off and ready for guests — simple, flexible, and fully customizable.",
    bestFor: [
      "Offices",
      "Campus events",
      "Parties",
      "Meetings",
      "Birthdays",
      "Casual celebrations",
    ],
    features: [
      "Freshly prepared drinks",
      "Topping included",
      "Free delivery",
      "Free drop-off",
      "Free table setup on request",
      "Customizable drink selection",
      "Flexible quantities",
      "No minimum order",
      "Drinks arrive ready to serve",
    ],
    homeFeatures: [
      "Freshly prepared drinks",
      "Selected topping included",
      "Free delivery & drop-off",
      "Free table setup if requested",
      "Customizable drink selection",
      "Flexible quantities",
      "No minimum order",
    ],
    ctaLabel: "Choose Drop-Off",
    inquireHref: "/inquiries?package=dropoff",
    image: "/images/drop-off-catering-wide-view.PNG",
    imageAlt: "Sunset Tea drop-off catering setup",
  },
  booth: {
    id: "booth",
    name: "Full Booth Service",
    shortName: "Full Booth",
    priceLabel: `$${BOOTH_PRICE_PER_DRINK} / drink + $${BOOTH_SERVICE_FEE} service fee`,
    priceNote: "Estimate based on approximate guest count.",
    tagline: "A staffed Sunset Tea booth making drinks fresh on-site.",
    description:
      "An on-site Sunset Tea booth with staff, setup, and drinks made fresh during your event.",
    bestFor: [
      "Weddings",
      "Corporate events",
      "Large celebrations",
      "School/campus events",
      "Brand activations",
      "High-traffic events",
    ],
    features: [
      "Drinks and toppings included",
      "On-site Sunset Tea booth",
      "Drinks prepared fresh during the event",
      "On-site staff/server",
      "Booth setup",
      "Service during the event",
      "Cleanup included",
      "Customizable drink selection",
    ],
    homeFeatures: [
      "Drinks and toppings",
      "On-site Sunset Tea booth",
      "Drinks made fresh on the spot",
      "On-site server/staff",
      "Booth setup & cleanup",
      "Service during the event",
      "Customizable drink selection",
    ],
    ctaLabel: "Choose Full Booth",
    inquireHref: "/inquiries?package=booth",
    image: "/images/catering-booth-wedding.PNG",
    imageAlt: "Sunset Tea full booth service at a wedding",
  },
};

export const PACKAGE_LIST = [PACKAGES.dropoff, PACKAGES.booth];
