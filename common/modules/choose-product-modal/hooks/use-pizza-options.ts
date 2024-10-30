/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/common/constants/pizza";
import { Variant } from "@/common/components/product-variants";
import { getAvailablePizzaSizes } from "../helpers";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  weight: number;
  selectedAdditives: Set<number>;
  availablePizzaSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  toggleAdditive: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[], activeVariantId?: number): ReturnProps => {
  const activeVariant = activeVariantId
    ? variants.find((variant) => variant.id === activeVariantId)
    : undefined;

  const [selectedAdditives, { toggle: toggleAdditive }] = useSet(new Set<number>([]));
  const [size, setSize] = useState<PizzaSize>((activeVariant?.size as 20 | 30 | 40) || 30);
  const [type, setType] = useState<PizzaType>((activeVariant?.pizzaType as 1 | 2) || 1);
  const [weight, setWeight] = useState(variants[0].weight ?? 0);

  const availablePizzaSizes = getAvailablePizzaSizes(type, variants);

  useEffect(() => {
    const isCurrentSizeUnavailable = availablePizzaSizes?.find((item) => Number(item.id) === size)?.disabled;

    if (isCurrentSizeUnavailable) {
      const firstAvailablePizzaSize = availablePizzaSizes?.find((item) => !item.disabled);

      if (firstAvailablePizzaSize) {
        setSize(Number(firstAvailablePizzaSize.id) as PizzaSize);
      }
    }
  }, [type]);

  useEffect(() => {
    const currentVariant = variants.find((variant) => variant.size === size && variant.pizzaType === type);
    setWeight(currentVariant?.weight as number);
  }, [type, size]);

  return {
    size,
    type,
    weight,
    selectedAdditives,
    availablePizzaSizes,
    setSize,
    setType,
    toggleAdditive,
  };
};
