import { ProductVariant } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/product-variants";

/**
 * Функция для определения доступных размеров пиццы по типу тесту
 *
 * @param type - тип теста
 * @param variants - вариации выбранной пиццы
 * @returns массив размеров пиццы с полем disabled
 */

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
  const filteredPizzasByType = variants.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((pizzaSize) => ({
    name: pizzaSize.name,
    id: pizzaSize.id,
    disabled: !filteredPizzasByType.some((item) => item.size === Number(pizzaSize.id)),
  }));
};
