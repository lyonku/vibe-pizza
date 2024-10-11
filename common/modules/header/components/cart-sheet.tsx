"use client";

import { FC, PropsWithChildren, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/common/ui";
import { Button, Title, SheetClose } from "@/common/ui";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CartSheetItem } from "./cart-sheet-item";
import { getCartItemDetails } from "@/common/lib";
import { SizeType } from "@prisma/client";
import { PizzaType } from "@/common/constants/pizza";
import plural from "plural-ru";
import Image from "next/image";
import { cn } from "@/common/lib/utils";
import { useCart } from "@/common/hooks/use-cart";

interface CartSheetProps {
  className?: string;
}

export const CartSheet: FC<PropsWithChildren<CartSheetProps>> = ({ children }) => {
  const { items, totalAmount, loading, removeCartItem, updateItemQuantity } = useCart(true);
  const [redirecting, setRedirecting] = useState(false);

  const onClickCountBtn = (id: number, quantity: number, type: "plus" | "minus") => {
    const nextQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, nextQuantity);
  };

  const isCartEmpty = items.length <= 0;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          "flex flex-col justify-between pb-0 bg-[#F4F1EE]",
          isCartEmpty && "justify-center overflow-hidden"
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>Боковая панель с добавленными продуктами</SheetDescription>
        </VisuallyHidden>

        {isCartEmpty && (
          <div className="flex flex-col gap-2 items-center justify-center w-72 mx-auto">
            <Image src="/images/emptycart.svg" alt="Пустая корзина" width={250} height={180} />
            <Title size="sm" text="Корзина пустая" className="text-center font-bold" />
            <p className="text-center text-neutral-500 mb-4">
              Добавьте хотя бы один продукт, чтобы совершить заказ,
              <br /> пожалуйста 😊
            </p>

            <SheetClose asChild>
              <Button className="w-56 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}

        {!isCartEmpty && (
          <>
            <SheetHeader className="flex flex-row items-center justify-between p-5 pb-2">
              <p className="text-xl">
                В корзине{" "}
                <strong className="font-bold">
                  {plural(items.length, "%d товар", "%d товара", "%d товаров")}
                </strong>
              </p>
              {loading && (
                <div className="transition-opacity ease-in-out animate-fade-in">
                  <Loader className="animate-spin" />
                </div>
              )}
            </SheetHeader>

            <div className="flex flex-col gap-3 overflow-auto scrollbar scrollbar-modal flex-1">
              {items.map(({ size, weight, ingredients, ...item }) => {
                if (size && weight) {
                  const pizzaType = item.pizzaType as PizzaType | null;
                  const sizeType = item.sizeType as SizeType;

                  return (
                    <CartSheetItem
                      key={item.id}
                      productId={item.productId}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(size, sizeType, pizzaType, weight, ingredients)}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) => onClickCountBtn(item.id, item.quantity, type)}
                      onClickRemove={() => removeCartItem(item.id)}
                      disabled={item.disabled}
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

                <Link
                  href="/checkout"
                  onClick={(e) => {
                    if (loading || redirecting) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Button
                    onClick={() => setRedirecting(true)}
                    disabled={loading}
                    loading={redirecting}
                    type="submit"
                    className="flex gap-3 w-full h-14 text-base font-bold rounded-2xl"
                  >
                    Оформить заказ
                    <ArrowRight className="w-5" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
