import { Popover, PopoverContent, PopoverTrigger } from "@/common/ui";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpDown, Flame, Sparkles } from "lucide-react";
import { FC, useState } from "react";
import { useQuerySort } from "../hooks/use-query-sort";

interface SortPopupProps {}

export const SortPopup: FC<SortPopupProps> = () => {
  const [open, setOpen] = useState(false);
  const sortValues = [
    { id: "1", name: "Сначала популярное", shortName: "популярное", icon: <Flame /> },
    { id: "2", name: "Сначала недорогие", shortName: "недорогое", icon: <ArrowDownNarrowWide /> },
    { id: "3", name: "Сначала дорогие", shortName: "дорогое", icon: <ArrowDownWideNarrow /> },
    { id: "4", name: "Сначала самые новые", shortName: "новизне", icon: <Sparkles /> },
  ];

  const [value, setValue] = useState(sortValues[0]);

  useQuerySort(value.shortName);

  return (
    <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger asChild>
        <div className="inline-flex items-center gap-1 bg-gray-50 px-5 h-[56px] rounded-2xl cursor-pointer">
          <ArrowUpDown size={16} strokeWidth={3} />
          <b>Сортировка:</b>
          <b className="text-primary">{value.shortName}</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 rounded-xl">
        <ul>
          {sortValues.map((item) => {
            return (
              <li
                key={item.id}
                className="flex items-center  gap-2 hover:bg-gray-50 hover:text-primary font-semibold p-2 px-4 cursor-pointer rounded-xl"
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
