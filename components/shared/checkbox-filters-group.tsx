"use client";

import { ChangeEvent, FC, useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  onChange,
  defaultValue,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const onChangeSeacrchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems?.slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold">{title}</p>

      {showAll && (
        <Input
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
          onChange={onChangeSeacrchInput}
          value={searchValue}
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => {
          return (
            <FilterCheckbox
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={false}
              onCheckedChange={(ids) => console.log(ids)}
            />
          );
        })}
      </div>

      {items.length > limit && (
        <div>
          <button className="text-primary" onClick={handleShowAll}>
            {showAll ? "Скрыть" : "+ Показать всё"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFiltersGroup;
