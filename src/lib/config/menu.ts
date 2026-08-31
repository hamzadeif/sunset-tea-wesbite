export type DrinkCategory = "milk-teas" | "matcha" | "fruit-teas" | "fresh-drinks";

export type ToppingId = "homemade-boba" | "lychee-jelly" | "none";

export interface MenuDrink {
  id: string;
  name: string;
  category: DrinkCategory;
}

export interface ToppingOption {
  id: ToppingId;
  name: string;
}

export interface PopularCombo {
  drinkId: string;
  toppingId: Exclude<ToppingId, "none">;
  label: string;
}

export const MENU_CATEGORIES: { id: DrinkCategory; name: string }[] = [
  { id: "milk-teas", name: "Milk Teas" },
  { id: "matcha", name: "Matcha" },
  { id: "fruit-teas", name: "Fruit Teas" },
  { id: "fresh-drinks", name: "Fresh Drinks" },
];

export const MENU_DRINKS: MenuDrink[] = [
  { id: "classic-black-milk-tea", name: "Classic Black Milk Tea", category: "milk-teas" },
  { id: "jasmine-milk-tea", name: "Jasmine Milk Tea", category: "milk-teas" },
  { id: "mango-milk-tea", name: "Mango Milk Tea", category: "milk-teas" },
  { id: "strawberry-milk-tea", name: "Strawberry Milk Tea", category: "milk-teas" },
  { id: "classic-matcha", name: "Classic Matcha", category: "matcha" },
  { id: "strawberry-matcha", name: "Strawberry Matcha", category: "matcha" },
  { id: "vanilla-matcha", name: "Vanilla Matcha", category: "matcha" },
  { id: "salted-caramel-matcha", name: "Salted Caramel Matcha", category: "matcha" },
  { id: "strawberry-fruit-tea", name: "Strawberry Fruit Tea", category: "fruit-teas" },
  { id: "strawberry-mango-fruit-tea", name: "Strawberry Mango Fruit Tea", category: "fruit-teas" },
  { id: "brown-sugar-boba-milk", name: "Brown Sugar Boba Milk", category: "fresh-drinks" },
  { id: "strawberry-milk", name: "Strawberry Milk", category: "fresh-drinks" },
];

export const TOPPINGS: ToppingOption[] = [
  { id: "homemade-boba", name: "Homemade Boba" },
  { id: "lychee-jelly", name: "Lychee Jelly" },
  { id: "none", name: "No Topping" },
];

export const TOPPINGS_DISPLAY = TOPPINGS.filter((t) => t.id !== "none");

/** Crowd favorites — order matters for recommendation splits. */
export const POPULAR_COMBOS: PopularCombo[] = [
  {
    drinkId: "classic-black-milk-tea",
    toppingId: "homemade-boba",
    label: "Classic Black Milk Tea + Homemade Boba",
  },
  {
    drinkId: "mango-milk-tea",
    toppingId: "homemade-boba",
    label: "Mango Milk Tea + Homemade Boba",
  },
  {
    drinkId: "strawberry-mango-fruit-tea",
    toppingId: "lychee-jelly",
    label: "Strawberry Mango Fruit Tea + Lychee Jelly",
  },
];

export function getDrinkById(id: string): MenuDrink | undefined {
  return MENU_DRINKS.find((d) => d.id === id);
}

export function getToppingName(id: ToppingId): string {
  return TOPPINGS.find((t) => t.id === id)?.name ?? id;
}

export function getCategoryName(id: DrinkCategory): string {
  return MENU_CATEGORIES.find((c) => c.id === id)?.name ?? id;
}
