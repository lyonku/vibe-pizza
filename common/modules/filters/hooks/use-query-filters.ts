import { useEffect } from "react";
import QueryString from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = QueryString.stringify(params, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [filters]);
};
