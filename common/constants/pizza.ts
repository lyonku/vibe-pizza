const mapPizzaSize = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const;

export const mapPizzaType = {
  1: "Традиционное",
  2: "Тонкое",
} as const;

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([key, value]) => ({
  id: key,
  name: value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([key, value]) => ({
  id: key,
  name: value,
}));
