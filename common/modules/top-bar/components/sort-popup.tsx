import { Popover, PopoverContent, PopoverTrigger } from "@/common/ui";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpDown, Flame, Sparkles } from "lucide-react";
import { FC, useState } from "react";
import { useQuerySort } from "../hooks/use-query-sort";
import { cn } from "@/common/lib/utils";

interface SortPopupProps {
  className?: string;
}

export const SortPopup: FC<SortPopupProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const sortValues = [
    { id: "1", name: "Сначала популярное", shortName: "популярное", icon: <Flame /> },
    { id: "2", name: "Сначала недорогие", shortName: "недорогое", icon: <ArrowDownNarrowWide /> },
    { id: "3", name: "Сначала дорогие", shortName: "дорогое", icon: <ArrowDownWideNarrow /> },
    { id: "4", name: "Сначала самые новые", shortName: "новое", icon: <Sparkles strokeWidth={1.5} /> },
  ];

  const [value, setValue] = useState(sortValues[0]);

  useQuerySort(value.shortName);

  return (
    <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "inline-flex items-center gap-1 bg-gray-50 px-5 h-[56px] rounded-2xl cursor-pointer max-lg:h-[40px]",
            className
          )}
        >
          <ArrowUpDown size={16} strokeWidth={3} />
          <b className="max-lg:hidden">Сортировка:</b>
          <b className="max-md:hidden text-primary max-lg:first-letter:uppercase max-lg:text-black">
            {value.shortName}
          </b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 rounded-xl mr-[14px]">
        <ul>
          {sortValues.map((item) => {
            return (
              <li
                key={item.id}
                className={cn(
                  "flex items-center gap-2 hover:bg-gray-50 hover:text-primary font-semibold p-2 px-4 cursor-pointer rounded-xl",
                  value.id === item.id && "text-primary"
                )}
                onClick={() => {
                  setOpen(false);
                  setValue(item);
                }}
              >
                {item.icon}
                {item.name}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
