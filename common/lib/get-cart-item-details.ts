import { PreparedCartItem } from "@/@types/global";
import { mapPizzaSize, mapPizzaType, PizzaSize, PizzaType } from "@/common/constants/pizza";
import { SizeType } from "@prisma/client";
import { mapSizeUnits, SizeUnitType } from "@/common/constants/product";

export const getCartItemDetails = (
  size: number,
  sizeType: SizeType,
  pizzaType: PizzaType | null,
  weight: number,
  additives?: PreparedCartItem["additives"] | [],
  removedIngredinets?: PreparedCartItem["removedIngredinets"] | []
) => {
  const details = { desc: "", additives: "", removedIngredinets: "" };

  if (!pizzaType) {
    if (sizeType === "PORTIONS") {
      details.desc = mapSizeUnits[("PORTION_" + size) as SizeUnitType];
    } else {
      details.desc = `${size} ${mapSizeUnits[sizeType as SizeUnitType]}`;
    }
  }

  if (pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.desc = `${mapPizzaSize[size as PizzaSize]} ${size} см, ${typeName.toLowerCase()} тесто`;
  }

  if (additives && additives.length >= 1) {
    details.additives = additives.map((additive) => additive.name.toLowerCase()).join(", ");
  }

  if (removedIngredinets && removedIngredinets.length >= 1) {
    details.removedIngredinets = removedIngredinets.map((additive) => additive.name.toLowerCase()).join(", ");
  }

  details.desc += `, ${weight} г`;

  return details;
};
