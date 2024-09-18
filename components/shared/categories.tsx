"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { FC } from "react";

interface CategoriesProps {}

const CategoriesData = [
  { id: 1, name: "Пиццы" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Коктейли" },
  { id: 5, name: "Кофе" },
  { id: 6, name: "Напитки" },
  { id: 7, name: "Десерты" },
];

export const Categories: FC<CategoriesProps> = () => {
  const activeIndex = useCategoryStore((state) => state.activeId);

  return (
    <div className="inline-flex gap-1 bg-gray-50 p-1.5 rounded-2xl">
      {CategoriesData.map(({ name, id }, index) => {
        return (
          <a
            className={cn(
              "flex items-center font-bold h-11 px-5 rounded-2xl transition-colors",
              activeIndex === id &&
                "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            href={`/#${name}`}
            key={index}
          >
            <button>{name}</button>
          </a>
        );
      })}
    </div>
  );
};
