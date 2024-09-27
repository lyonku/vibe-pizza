import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/common/constants/pizza";
import { Variant } from "@/common/components/product-variants";
import { getAvailablePizzaSizes } from "../helpers/get-available-pizza-sizes";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  toggleIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const availablePizzaSizes = getAvailablePizzaSizes(type, variants);

  useEffect(() => {
    const isCurrentSizeUnavailable = availablePizzaSizes?.find((item) => Number(item.id) === size)?.disabled;

    if (isCurrentSizeUnavailable) {
      const firstAvailablePizzaSize = availablePizzaSizes?.find((item) => !item.disabled);

      if (firstAvailablePizzaSize) {
        setSize(Number(firstAvailablePizzaSize.id) as PizzaSize);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    setSize,
    setType,
    toggleIngredient,
  };
};
