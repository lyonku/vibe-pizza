"use client";

import { Dialog } from "@/common/ui";
import { DialogContent, DialogDescription, DialogTitle } from "@/common/ui/dialog";
import { FC } from "react";
import { cn } from "@/common/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-full max-w-[1100px] min-h-[580px] bg-white ", className)}>
        <VisuallyHidden.Root>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Модальное окно с товаром</DialogDescription>
        </VisuallyHidden.Root>

        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
