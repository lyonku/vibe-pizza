import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { ChangeEvent, useState } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrice: (e: ChangeEvent<HTMLInputElement>) => void;
  setRangePrice: ([priceFrom, priceTo]: number[]) => void;
  togglePizzaType: (key: string) => void;
  toggleSize: (key: string) => void;
  toggleIngredient: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  /* Фильтр ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  /* Фильтр размеров */
  const [sizes, { toggle: toggleSize }] = useSet(
    new Set<string>(searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : [])
  );

  /* Фильтр типа пиццы */
  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : [])
  );

  /* Фильтр стоймости */
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = Number(e.target.value);
    if (value >= 0 && value <= 1500) {
      setPrices((prev) => ({ ...prev, [id]: value }));
    }
  };

  const updateRangePrice = ([priceFrom, priceTo]: number[]) => {
    setPrices({ priceFrom, priceTo });
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrice: updatePrice,
    setRangePrice: updateRangePrice,
    togglePizzaType,
    toggleSize,
    toggleIngredient,
  };
};
