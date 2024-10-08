import { Variant } from "@/common/components/product-variants";
import { pizzaSizes, PizzaType } from "@/common/constants/pizza";
import { ProductVariant } from "@prisma/client";

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
