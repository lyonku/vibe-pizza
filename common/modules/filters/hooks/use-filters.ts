import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { ChangeEvent, useMemo, useState } from "react";

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
  tags: string;
}

export interface Filters {
  tags: Set<string>;
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
  toggleTag: (key: string) => void;
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

  const [tags, { toggle: toggleTag }] = useSet(
    new Set<string>(searchParams.get("tags") ? searchParams.get("tags")?.split(",") : [])
  );

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

  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      tags,
      setPrice: updatePrice,
      setRangePrice: updateRangePrice,
      togglePizzaType,
      toggleSize,
      toggleIngredient,
      toggleTag,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sizes, pizzaTypes, selectedIngredients, prices, tags]
  );
};
