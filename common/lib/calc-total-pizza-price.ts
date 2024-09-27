import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для подсчета общей стоймости пиццы
 *
 * @param type - тип теста
 * @param size - размер выбранной пиццы
 * @param variants - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns Общая стоймость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    variants.find(
      (variant) => variant.pizzaType === type && variant.size === size
    )?.price || 0;

  const totalIgredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIgredientsPrice;
};
