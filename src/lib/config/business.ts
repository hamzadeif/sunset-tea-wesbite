/** Central business rules — edit here when pricing or policies change. */

export const DROP_OFF_PRICE_PER_DRINK = 5;
export const BOOTH_PRICE_PER_DRINK = 5;
export const BOOTH_SERVICE_FEE = 300;
export const RESPONSE_TIME_HOURS = 24;

/** Show the automatic 3-drink recommendation card under this cup count. */
export const RECOMMENDATION_MAX_CUPS = 49;

export const PACKAGE_IDS = {
  dropoff: "dropoff",
  booth: "booth",
} as const;

export type PackageId = (typeof PACKAGE_IDS)[keyof typeof PACKAGE_IDS];
