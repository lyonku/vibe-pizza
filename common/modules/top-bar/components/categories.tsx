"use client";

import { cn } from "@/common/lib/utils";
import { useCategoryStore } from "@/common/store/useCategoryStore";
import { Category } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { createBreakpoint } from "react-use";
import CategoriesSelect from "./categories-select";
import { useMediaQuery } from "react-responsive";

interface CategoriesProps {
  isSticky?: boolean;
  items: Category[];
}
const useBreakpoint = createBreakpoint({ 5: 1230, 4: 1100, 3: 1000, 2: 768, 1: 480, 0: 350 });

export const Categories: FC<CategoriesProps> = ({ items, isSticky }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  const [length, setLength] = useState(6);
  const breakpoint = useBreakpoint();
  const activeIndex = useCategoryStore((state) => state.activeId);

  const isMobile = useMediaQuery({ query: "(max-width: 480px)" }) && domLoaded;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    const nextLength = isSticky ? Number(breakpoint) - 1 : Number(breakpoint) + 1;

    setLength(nextLength < 0 ? 0 : nextLength);
  }, [breakpoint, isSticky]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1.5 rounded-2xl max-lg:p-1 max-s:overflow-auto scrollbar-hidden"
      )}
    >
      <a
        className={cn(
          "flex items-center font-bold h-11 px-5 rounded-2xl transition-colors max-lg:h-8",
          !isSticky && "bg-white shadow-md shadow-gray-200 text-primary"
        )}
        href={`/`}
        onClick={handleScrollToTop}
      >
        <button>Все</button>
      </a>
      {items.slice(0, isMobile ? items.length : length ?? 6).map(({ name, id }, index) => (
        <a
          className={cn(
            "category-item flex items-center font-bold h-11 px-5 rounded-2xl transition-colors max-lg:h-8",
            isSticky && activeIndex === id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}

      {length < items.length && !isMobile && (
        <CategoriesSelect activeIndex={activeIndex} isSticky={isSticky} items={items} length={length} />
      )}
    </div>
  );
};
