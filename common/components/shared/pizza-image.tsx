import { cn } from "@/common/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface PizzaImageProps {
  className?: string;
  src: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: FC<PizzaImageProps> = ({ className, size, src }) => {
  const sizeMap = {
    20: { width: 300, height: 300 },
    30: { width: 400, height: 400 },
    40: { width: 500, height: 500 },
  };

  const dimensions = sizeMap[size] || { width: undefined, height: undefined };

  const bigRoundStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='%23DEDEDEFF' stroke-width='1' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  };

  const smallRoundStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='%23DEDEDEFF' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative ",
        className
      )}
    >
      <Image
        src={src}
        alt="Logo"
        width={dimensions.width}
        height={dimensions.height}
        className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px]"
        style={bigRoundStyle}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[370px]"
        style={smallRoundStyle}
      />
    </div>
  );
};
