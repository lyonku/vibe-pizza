import { useState, useMemo } from "react";
import { ProductVariant } from "@prisma/client";
import { mapSizeUnits, SizeUnitType } from "@/common/constants/product";

interface PreparedVariant {
  id: string;
  name: string;
}

interface ReturnProps {
  activeVariant: ProductVariant;
  preparedVariants: PreparedVariant[];
  handleChooseVariant: (id: string) => void;
}

export const useProductOptions = (variants: ProductVariant[]): ReturnProps => {
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(variants[0]);

  const preparedVariants = useMemo(() => {
    if (!variants || variants.length === 0) {
      return [];
    }

    return variants.map(({ size, sizeType, id }) => {
      let sizeName: string;

      if (sizeType === "PORTIONS") {
        sizeName = mapSizeUnits[("PORTION_" + size) as SizeUnitType];
      } else {
        sizeName = `${size} ${mapSizeUnits[sizeType as SizeUnitType]}`;
      }

      return {
        name: sizeName,
        id: String(id),
      };
    });
  }, [variants]);

  const handleChooseVariant = (id: string) => {
    const nextActiveVariant = variants.find((variant) => variant.id === Number(id));
    setActiveVariant(nextActiveVariant as ProductVariant);
  };

  return {
    activeVariant,
    preparedVariants,
    handleChooseVariant,
  };
};
