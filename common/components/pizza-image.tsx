"use client";

import { cn } from "@/common/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { PizzaSize } from "../constants/pizza";
import { useMediaQuery } from "react-responsive";

interface PizzaImageProps {
  className?: string;
  src: string;
  size: PizzaSize;
}

// Карты размеров для разных устройств
const sizeMap = {
  desktop: {
    20: { width: 300, height: 300 },
    30: { width: 400, height: 400 },
    40: { width: 500, height: 500 },
  },
  tablet: {
    20: { width: 200, height: 200 },
    30: { width: 300, height: 300 },
    40: { width: 400, height: 400 },
  },
  mobile: {
    20: { width: 160, height: 160 },
    30: { width: 210, height: 210 },
    40: { width: 280, height: 280 },
  },
};

// Стили для фона с кругами
const bigRoundStyle = {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='%23DEDEDEFF' stroke-width='1' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
};

const smallRoundStyle = {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='%23DEDEDEFF' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
};

// Вспомогательная функция для получения размеров в зависимости от устройства
const getDimensions = (size: PizzaSize, isTablet: boolean, isMobile: boolean) => {
  if (isMobile) return sizeMap.mobile[size];
  if (isTablet) return sizeMap.tablet[size];
  return sizeMap.desktop[size];
};

export const PizzaImage: FC<PizzaImageProps> = ({ className, size, src }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const dimensions = getDimensions(size, isTablet, isMobile);

  return (
    <div className={cn("flex items-center justify-center flex-1 relative", className)}>
      <Image
        src={src}
        alt="Pizza"
        width={dimensions.width}
        height={dimensions.height}
        className="relative left-2 top-2 transition-all z-10 duration-300 max-md:left-1 max-md:top-1"
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] max-lg:w-[350px] max-lg:h-[350px] max-md:w-[260px] max-md:h-[260px]"
        style={bigRoundStyle}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[370px] max-lg:w-[270px] max-lg:h-[270px] max-md:w-[190px] max-md:h-[190px]"
        style={smallRoundStyle}
      />
    </div>
  );
};
