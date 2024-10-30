"use client";

import { FC, useState } from "react";
import { Button, Title } from "@/common/ui";
import { useFilters, useIngredients, useQueryFilters } from "./hooks";
import { CheckboxFiltersGroup, FilterPrice } from "./components";
import { cn } from "@/common/lib/utils";
import { ChevronsRight } from "lucide-react";

interface FiltersProps {
  className?: string;
}

export const Filters: FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients
    .map((item) => ({
      value: String(item.id),
      text: item.name,
    }))
    .sort((a, b) => {
      const isAChecked = filters.selectedIngredients?.has(a.value) ? 1 : 0;
      const isBChecked = filters.selectedIngredients?.has(b.value) ? 1 : 0;
      return isBChecked - isAChecked;
    });

  const activeFiltersSize =
    filters.tags.size +
    filters.pizzaTypes.size +
    filters.sizes.size +
    filters.selectedIngredients.size +
    (filters.prices?.priceFrom ? 1 : 0) +
    (filters.prices?.priceTo && filters.prices?.priceTo !== 1500 ? 1 : 0);

  const [isFiltersOpen, setFilterOpen] = useState(activeFiltersSize > 0);

  return (
    <div className={cn("overflow-hidden", className)}>
      <Button
        variant="secondary"
        className="absolute right-4 top-2"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <ChevronsRight className={cn("transition-transform", isFiltersOpen && "rotate-180")} />
        {activeFiltersSize > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
            {activeFiltersSize}
          </span>
        )}
      </Button>
      <div
        className={cn(
          "flex flex-col gap-5 transition-all -ml-[250px] w-[250px]",
          isFiltersOpen && " mr-[80px] ml-0"
        )}
      >
        <Title text="Фильтрация" size="sm" className="font-bold" />

        {/* Верхние чекбоксы */}
        <CheckboxFiltersGroup
          name="tags"
          className="flex flex-col gap-4 pb-5 border-b border-b-neutral-100 "
          onClickCheckbox={filters.toggleTag}
          selectedValues={filters.tags}
          items={[
            { text: "Новинки", value: "new" },
            { text: "Вегетерианское 🌱", value: "vegan" },
            { text: "Острое 🌶️", value: "spicy" },
          ]}
        />

        <CheckboxFiltersGroup
          name="pizzaTypes"
          className="flex flex-col gap-4"
          title="Тип теста"
          onClickCheckbox={filters.togglePizzaType}
          selectedValues={filters.pizzaTypes}
          items={[
            { text: "Традиционное", value: "1" },
            { text: "Тонкое", value: "2" },
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
    </div>
  );
};
