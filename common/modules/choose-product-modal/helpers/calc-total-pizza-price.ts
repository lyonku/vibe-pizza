import { PizzaSize, PizzaType } from "@/common/constants/pizza";
import { Additive, ProductVariant } from "@prisma/client";

/**
 * Функция для подсчета общей стоймости пиццы
 *
 * @param type - тип теста
 * @param size - размер выбранной пиццы
 * @param variants - список вариаций
 * @param additives - список добавок
 * @param selectedAdditives - выбранные добавки
 *
 * @returns Общая стоймость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  additives: Additive[],
  selectedAdditives: Set<number>
) => {
  const pizzaPrice =
    variants.find((variant) => variant.pizzaType === type && variant.size === size)?.price || 0;

  const totalAdditivesPrice = additives
    .filter((additive) => selectedAdditives.has(additive.id))
    .reduce((acc, additive) => acc + additive.price, 0);

  return pizzaPrice + totalAdditivesPrice;
};
