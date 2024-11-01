"use client";

import { ChangeEvent, FC, useState } from "react";
import { Input, Skeleton } from "@/common/ui";
import { FilterCheckboxProps, FilterCheckbox } from "./filter-checkbox";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title?: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  className?: string;
  loading?: boolean;
  selectedValues?: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  onClickCheckbox,
  selectedValues,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className="flex gap-3">
                <Skeleton className="min-w-6 h-6 rounded-[8px]" />
                <Skeleton className="w-full h-6 rounded-[8px]" />
              </div>
            );
          })}
        <Skeleton className="w-28 h-6 rounded-[8px]" />
      </div>
    );
  }

  const filteredItems = items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()));
  const dataSource = defaultItems ?? items;
  const list = showAll ? filteredItems : dataSource.slice(0, limit);

  return (
    <div className={className}>
      {title && <p className="font-bold">{title}</p>}

      {showAll && (
        <Input
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
          onChange={onChangeSearchInput}
          value={searchValue}
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => {
          return (
            <FilterCheckbox
              key={item.value}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={selectedValues?.has(item.value)}
              onCheckedChange={() => onClickCheckbox?.(item.value)}
              name={name}
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
