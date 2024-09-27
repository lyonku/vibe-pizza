"use client";

import { cn } from "@/common/lib/utils";
import { FC } from "react";
import { Button, Title } from "@/common/ui";
import Image from "next/image";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;

  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: FC<ChooseProductFormProps> = ({ name, imageUrl, className }) => {
  const totalPrice = 150;

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
        <Image
          src={imageUrl}
          alt="Logo"
          width={350}
          height={350}
          className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
        />
      </div>

      <div className="flex flex-col justify-between w-[490px] bg-[#f9f9f9] p-7 rounded-xl">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
