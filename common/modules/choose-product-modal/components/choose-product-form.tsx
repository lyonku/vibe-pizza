"use client";

import { cn } from "@/common/lib/utils";
import { FC } from "react";
import { Button, Title } from "@/common/ui";
import Image from "next/image";
import { ProductVariants } from "@/common/components";
import { ProductVariant } from "@prisma/client";
import { useProductOptions } from "../hooks";
import { useCartLoading } from "@/common/store/useCartStore";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  desc: string;
  variants: ProductVariant[];
  onSubmit: (variantId: number, ingredients?: number[]) => void;
  className?: string;
}

export const ChooseProductForm: FC<ChooseProductFormProps> = ({
  name,
  desc,
  imageUrl,
  variants,
  onSubmit,
  className,
}) => {
  const { activeVariant, preparedVariants, handleChooseVariant } = useProductOptions(variants);
  const activePreparedVariant = preparedVariants.find((variant) => variant.id === String(activeVariant.id));
  const loading = useCartLoading();

  const textDetails = `${activePreparedVariant?.name}, ${activeVariant.weight} г`;

  const handleClickAddCart = () => {
    if (activePreparedVariant?.id) {
      onSubmit(Number(activePreparedVariant?.id));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className={cn("flex items-center justify-center flex-1 relative w-full basis-1/2", className)}>
        <Image
          src={imageUrl}
          alt="Logo"
          width={350}
          height={350}
          className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
        />
      </div>

      <div className="flex flex-col justify-between flex-1 bg-[#F4F1EE] py-10 px-1 basis-1/2 rounded-e-[30px]">
        <div className="flex flex-col gap-5 overflow-auto scrollbar scrollbar-modal  px-9">
          <div className="flex flex-col">
            <Title text={name} size="md" className="font-extrabold leading-7 mb-1" />
            <p className="text-sm text-[#777777] mb-3">{textDetails}</p>
            <p className="text-sm">{desc}</p>
          </div>

          <ProductVariants
            items={preparedVariants}
            selected={String(activeVariant.id)}
            onClick={handleChooseVariant}
          />
        </div>

        <div className="px-9 pt-6 w-full">
          <Button
            loading={loading}
            className="h-[55px] text-base rounded-[18px] w-full"
            onClick={handleClickAddCart}
          >
            Добавить в корзину за {activeVariant.price} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
