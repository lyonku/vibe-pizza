import { ArrowUpDown } from "lucide-react";
import { FC } from "react";

interface SortPopupProps {}

export const SortPopup: FC<SortPopupProps> = () => {
  return (
    <div className="inline-flex items-center gap-1 bg-gray-50 px-5 h-[56px] rounded-2xl cursor-pointer">
      <ArrowUpDown size={16} strokeWidth={3} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
