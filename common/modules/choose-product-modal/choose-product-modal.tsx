"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/common/ui";
import { FC, useEffect, useState } from "react";
import { cn } from "@/common/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { addCartItem } from "@/common/store/useCartStore";
import toast from "react-hot-toast";
import { ProductDTO } from "@/@types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "./components";

interface ChooseProductModalProps {
  product: ProductDTO;
  className?: string;
}
const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

export const ChooseProductModal: FC<ChooseProductModalProps> = ({ product, className }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleCloseDialog = () => {
    setDialogOpen(false);
    wait().then(() => router.back());
  };

  const onSubmit = async (variantId: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productVariantId: variantId,
        ingredients: ingredients,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className={cn("p-0 w-full max-w-[1100px] min-h-[580px] bg-white ", className)}>
        <VisuallyHidden.Root>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Модальное окно с товаром</DialogDescription>
        </VisuallyHidden.Root>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            desc={product.desc}
            ingredients={product.ingredients}
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
