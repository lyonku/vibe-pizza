import { FC } from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input, RangeSlider } from "../ui";
import CheckboxFiltersGroup from "./checkbox-filters-group";

interface FiltersProps {}

export const Filters: FC<FiltersProps> = () => {
  return (
    <div className="flex flex-col gap-5">
      <Title text="Фильтрация" size="sm" className="font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4 ">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Фильтр по цене */}
      <div className="flex flex-col gap-4 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold ">Цена от и до:</p>
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} />
      </div>

      {/* Фильтр ингредиентов */}
      <CheckboxFiltersGroup
        className="flex flex-col gap-4 "
        title="Ингредиенты"
        limit={6}
        defaultItems={[
          { text: "Сырный соус", value: "1" },
          { text: "Моццарелла", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Солёные огурчики", value: "4" },
          { text: "Красный лук", value: "5" },
          { text: "Томаты", value: "6" },
        ]}
        items={[
          { text: "Сырный соус", value: "1" },
          { text: "Моццарелла", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Солёные огурчики", value: "4" },
          { text: "Красный лук", value: "5" },
          { text: "Томаты", value: "6" },
          { text: "Сырный соус", value: "1" },
          { text: "Моццарелла", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Солёные огурчики", value: "4" },
          { text: "Красный лук", value: "5" },
          { text: "Томаты", value: "6" },
          { text: "Сырный соус", value: "1" },
          { text: "Моццарелла", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Солёные огурчики", value: "4" },
          { text: "Красный лук", value: "5" },
          { text: "Томаты", value: "6" },
        ]}
      />
    </div>
  );
};
