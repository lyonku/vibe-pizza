import { PreparedCartItem } from "@/@types/global";
import { mapPizzaSize, mapPizzaType, PizzaSize, PizzaType } from "@/common/constants/pizza";
import { SizeType } from "@prisma/client";
import { mapSizeUnits, SizeUnitType } from "@/common/constants/product";

export const getCartItemDetails = (
  size: number,
  sizeType: SizeType,
  pizzaType: PizzaType | null,
  weight: number,
  additives?: PreparedCartItem["additives"] | []
) => {
  let details = "";
  let additivesDetails = "";

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

  if (additives && additives.length >= 1) {
    additivesDetails = " + " + additives.map((additive) => additive.name.toLowerCase()).join(", ");
  }

  return `${details}, ${weight} г ${additivesDetails}`;
};
