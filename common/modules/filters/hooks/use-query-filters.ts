import QueryString from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import { Filters } from "./use-filters";
import { useUpdateEffect } from "react-use";

export const useQueryFilters = (filters: Filters) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useUpdateEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const params = {
      ...currentParams,
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
      tags: Array.from(filters.tags),
    };

    if (filters.prices && filters.prices.priceFrom === 0 && filters.prices.priceTo === 1500) {
      delete params.priceFrom;
      delete params.priceTo;
    }

    const query = QueryString.stringify(params, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [filters]);
};
