"use client";

import { cn } from "@/common/lib/utils";
import { useCategoryStore } from "@/common/store/category";
import { Category } from "@prisma/client";
import { FC } from "react";

interface CategoriesProps {
  items: Category[];
}

export const Categories: FC<CategoriesProps> = ({ items }) => {
  const activeIndex = useCategoryStore((state) => state.activeId);

  return (
    <div className="inline-flex gap-1 bg-gray-50 p-1.5 rounded-2xl">
      {items.map(({ name, id }, index) => {
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
