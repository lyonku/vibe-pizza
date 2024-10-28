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
  const [isFiltersOpen, setFilterOpen] = useState(false);
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={cn("overflow-hidden", className)}>
      <Button
        variant="secondary"
        className="absolute right-4 top-2"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <ChevronsRight className={cn("transition-transform", isFiltersOpen && "rotate-180")} />
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
    </div>
  );
};
