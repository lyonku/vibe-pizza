import { cn } from "@/common/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/ui";
import { Category } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";

interface CategoriesSelectProps {
  activeIndex: number;
  items: Category[];
  isSticky?: boolean;
  length: number;
}

const CategoriesSelect: FC<CategoriesSelectProps> = ({ activeIndex, items, isSticky, length }) => {
  const [isSelectOpen, setSelectOpen] = useState(false);

  return (
    <Popover open={isSelectOpen} onOpenChange={() => setSelectOpen((prev) => !prev)}>
      <PopoverTrigger
        className={cn(
          "flex items-center font-bold h-11 px-5 rounded-2xl transition-colors border-0 shadow-none text-base max-lg:h-8",
          activeIndex > length && "bg-white shadow-md shadow-gray-200 text-primary"
        )}
      >
        Ещё <ChevronDown size={18} />
      </PopoverTrigger>

      <PopoverContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="bg-[#f9fafb] w-auto p-2 rounded-lg"
      >
        {items.slice(length).map(({ name, id }, index) => (
          <a
            className={cn(
              "category-item flex items-center font-bold h-11 px-5 rounded-2xl transition-colors",
              isSticky && activeIndex === id && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            href={`/#${name}`}
            key={index}
            onClick={() => setSelectOpen(false)}
          >
            <button>{name}</button>
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesSelect;
