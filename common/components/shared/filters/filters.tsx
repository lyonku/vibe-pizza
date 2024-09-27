"use client";

import { FC } from "react";
import { FilterPrice } from "./filter-price";
import { useFilters, useIngredients, useQueryFilters } from "@/common/hooks";
import CheckboxFiltersGroup from "./checkbox-filters-group";
import { Title } from "../title";

interface FiltersProps {}

export const Filters: FC<FiltersProps> = () => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className="flex flex-col gap-5">
      <Title text="Фильтрация" size="sm" className="font-bold" />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="flex flex-col gap-4"
        title="Тип теста"
        onClickCheckbox={filters.togglePizzaType}
        selectedValues={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="flex flex-col gap-4"
        title="Размеры"
        onClickCheckbox={filters.toggleSize}
        selectedValues={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      {/* Фильтр по цене */}
      <FilterPrice
        priceFrom={filters.prices.priceFrom}
        priceTo={filters.prices.priceTo}
        setPrice={filters.setPrice}
        setRangePrice={filters.setRangePrice}
      />

      {/* Фильтр ингредиентов */}
      <CheckboxFiltersGroup
        className="flex flex-col gap-4"
        title="Ингредиенты"
        name="ingredients"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.toggleIngredient}
        selectedValues={filters.selectedIngredients}
      />
    </div>
  );
};
