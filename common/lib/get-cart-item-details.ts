import { PreparedCartItem } from "@/@types/global";
import { mapPizzaSize, mapPizzaType, PizzaSize, PizzaType } from "@/common/constants/pizza";
import { SizeType } from "@prisma/client";
import { mapSizeUnits, SizeUnitType } from "@/common/constants/product";

export const getCartItemDetails = (
  size: number,
  sizeType: SizeType,
  pizzaType: PizzaType | null,
  weight: number,
  ingredients?: PreparedCartItem["ingredients"] | []
) => {
  let details = "";
  let ingredientsDetails = "";

  if (!pizzaType) {
    if (sizeType === "PORTIONS") {
      details = mapSizeUnits[("PORTION_" + size) as SizeUnitType];
    } else {
      details = `${size} ${mapSizeUnits[sizeType as SizeUnitType]}`;
    }
  }

  if (pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details = `${mapPizzaSize[size as PizzaSize]} ${size} см, ${typeName.toLowerCase()} тесто`;
  }

  if (ingredients && ingredients.length >= 1) {
    ingredientsDetails = " + " + ingredients.map((ingredient) => ingredient.name.toLowerCase()).join(", ");
  }

  return `${details}, ${weight} г ${ingredientsDetails}`;
};
