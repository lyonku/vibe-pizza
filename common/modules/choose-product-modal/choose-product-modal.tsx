/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/common/ui";
import { FC, useEffect, useState } from "react";
import { cn, wait } from "@/common/lib/utils";
import { useRouter } from "next/navigation";
import { addCartItem } from "@/common/store/useCartStore";
import toast from "react-hot-toast";
import { ProductDTO } from "@/@types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "./components";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ChooseProductModalProps {
  product: ProductDTO;
  className?: string;
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({ product, className }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleCloseDialog = () => {
    setDialogOpen(false);
    wait().then(() => (window.history.length > 2 ? router.back() : (window.location.href = "/")));
  };

  const onSubmit = async (variantId: number, additives?: number[], removedIngredinets?: number[]) => {
    try {
      await addCartItem({
        productVariantId: variantId,
        additives,
        removedIngredinets,
      });
      toast.success("Продукт добавлен в корзину");
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      toast.error("Не удалось добавить продукт в корзину");
    }
  };

  useEffect(() => {
    if (product && !isDialogOpen) {
      setDialogOpen(true);
    }
  }, [product]);

  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={cn(
          "p-0 w-full max-w-[1100px] min-h-[580px] bg-white",
          "max-xl:max-w-[1000px] max-lg:max-w-[780px]",
          "max-md:max-w-[600px] max-md:max-h-[95vh] max-md:overflow-hidden max-md:rounded-[30px]",
          "max-sm:max-w-[500px] max-s:max-w-[400px] max-xs:max-w-[350px]",
          className
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Модальное окно с товаром</DialogDescription>
        </VisuallyHidden>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            additives={product.additives}
            variants={product.variants}
            onSubmit={onSubmit}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            desc={product.desc}
            variants={product.variants}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
