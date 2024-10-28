"use client";

import { cn } from "@/common/lib/utils";
import { useCategoryStore } from "@/common/store/useCategoryStore";
import { Category } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { createBreakpoint } from "react-use";
import CategoriesSelect from "./categories-select";

interface CategoriesProps {
  isSticky?: boolean;
  items: Category[];
}
const useBreakpoint = createBreakpoint({ 5: 1230, 4: 1100, 3: 1000, 2: 900, 1: 720, 0: 620 });

export const Categories: FC<CategoriesProps> = ({ items, isSticky }) => {
  const [length, setLength] = useState(items.length);
  const breakpoint = useBreakpoint();
  const activeIndex = useCategoryStore((state) => state.activeId);

  useEffect(() => {
    const nextLength = isSticky ? Number(breakpoint) - 1 : Number(breakpoint) + 1;

    setLength(nextLength < 0 ? 0 : nextLength);
  }, [breakpoint, isSticky]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1.5 rounded-2xl", isSticky && "sticky")}>
      <a
        className={cn(
          "flex items-center font-bold h-11 px-5 rounded-2xl transition-colors",
          !isSticky && "bg-white shadow-md shadow-gray-200 text-primary"
        )}
        href={`/`}
        onClick={handleScrollToTop}
      >
        <button>Все</button>
      </a>
      {items.slice(0, length).map(({ name, id }, index) => (
        <a
          className={cn(
            "category-item flex items-center font-bold h-11 px-5 rounded-2xl transition-colors",
            isSticky && activeIndex === id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}

      {length < items.length && (
        <CategoriesSelect activeIndex={activeIndex} isSticky={isSticky} items={items} length={length} />
      )}
    </div>
  );
};
