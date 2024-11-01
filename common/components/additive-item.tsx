import { cn } from "@/common/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface AdditiveItemProps {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AdditiveItem: FC<AdditiveItemProps> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "flex items-center flex-col justify-between p-3 rounded-md min-h-[200px] text-center relative cursor-pointer shadow-md bg-white border-2 border-[#ffffff] transition-[border]  focus-visible:outline-primary focus-visible:outline-2",
        { "border-2 border-primary": active },
        className
      )}
      onClick={onClick}
    >
      <CircleCheck
        className={cn(
          "absolute top-2 right-2 text-primary opacity-0 transition-opacity",
          active && "opacity-100"
        )}
      />

      <div className="flex flex-col items-center">
        <Image width={110} height={110} src={imageUrl} alt="" className="mb-1" />
        <span className="text-sm leading-4 font-medium">{name}</span>
      </div>
      <span className="font-bold">{price} ₽</span>
    </button>
  );
};
