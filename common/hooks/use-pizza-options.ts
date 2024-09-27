import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductVariant } from "@prisma/client";
import { Variant } from "../components/shared/product-variants";

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
    const isCurrentSizeUnavailable = availablePizzaSizes?.find(
      (item) => Number(item.id) === size
    )?.disabled;

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
