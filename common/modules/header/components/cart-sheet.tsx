"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/common/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CartSheetItem } from "./cart-sheet-item";
import { getCartItemDetails } from "@/common/lib";
import {
  fetchCartItems,
  removeCartItem,
  updateItemQuantity,
  useCartItems,
  useCartTotalAmount,
} from "@/common/store/useCartStore";
import { SizeType } from "@prisma/client";
import { PizzaType } from "@/common/constants/pizza";
import plural from "plural-ru";

interface CartSheetProps {
  className?: string;
}

export const CartSheet: FC<PropsWithChildren<CartSheetProps>> = ({ children }) => {
  const items = useCartItems();
  const totalAmount = useCartTotalAmount();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountBtn = (id: number, quantity: number, type: "plus" | "minus") => {
    const nextQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, nextQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between pb-0 bg-[#F4F1EE]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>Боковая панель с добавленными продуктами</SheetDescription>
        </VisuallyHidden>
        <SheetHeader className="p-5 pb-2">
          <p className="text-xl">
            В корзине{" "}
            <strong className="font-bold">
              {plural(items.length, "%d товар", "%d товара", "%d товаров")}
            </strong>
          </p>
        </SheetHeader>

        <div className="flex flex-col gap-3 overflow-auto scrollbar scrollbar-modal flex-1">
          {items.map(({ size, weight, ingredients, ...item }) => {
            if (size && weight) {
              const pizzaType = item.pizzaType as PizzaType | null;
              const sizeType = item.sizeType as SizeType;

              return (
                <CartSheetItem
                  key={item.id}
                  id={item.id}
                  productId={item.productId}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(size, sizeType, pizzaType, weight, ingredients)}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCounterBtn={(type) => onClickCountBtn(item.id, item.quantity, type)}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              );
            }
          })}
        </div>

        <SheetFooter className="bg-white p-7">
          <div className="w-full">
            <div className="flex mb-4 text-lg">
              <span className="flex flex-1 ">
                Итого:
                <div className="flex-1 border-b border-dashed border-b-[#DFDFDF] relative h-5 mx-3" />
              </span>

              <span className="font-bold">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="flex gap-3 w-full h-14 text-base font-bold rounded-2xl">
                Оформить заказ
                <ArrowRight className="w-5" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
