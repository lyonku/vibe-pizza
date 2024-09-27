"use client";

import { cn } from "@/common/lib/utils";
import { FC } from "react";

export type Variant = {
  name: string;
  id: string;
  disabled?: boolean;
};

interface ProductVariantsProps {
  items: readonly Variant[];
  onClick?: (id: Variant["id"]) => void;
  selected?: Variant["id"];
  className?: string;
}

export const ProductVariants: FC<ProductVariantsProps> = ({
  items,
  onClick,
  className,
  selected,
}) => {
  const activeWidth = Math.floor(100 / items.length);
  const activeIndex = items.findIndex((item) => item.id === selected);

  return (
    <div
      className={cn(
        "relative flex justify-between bg-[#ECECEC] rounded-3xl p-[2px] select-none h-[40px] w-full overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute h-[35px] transition-transform duration-200 before:bg-white before:shadow before:w-full before:h-full before:absolute before:inset-0 before:rounded-[30px] before:block "
        )}
        style={{
          width: activeWidth + "%",
          transform: `translate3d(${activeIndex * 100}%, 0, 0)`,
          willChange: "transform",
        }}
      ></div>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.id)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[35px] px-5 flex-1 rounded-[30px] text-sm z-[1] focus-visible:outline-primary focus-visible:outline-2 transition-colors",
            {
              "text-gray-500 opacity-50 pointer-events-none cursor-not-allowed": item.disabled,
            }
          )}
          disabled={item.disabled}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
