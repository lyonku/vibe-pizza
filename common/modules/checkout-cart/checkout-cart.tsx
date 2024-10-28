import { PreparedCartItem } from "@/@types/global";
import { ContentBlock } from "@/common/ui";
import { Trash2 } from "lucide-react";
import React, { FC, Fragment } from "react";
import { CheckoutCartEmpty, CheckoutCartItem, CheckoutCartItemSkeleton } from "./components";
import { getCartItemDetails } from "@/common/lib";
import { removeCartItem, updateItemQuantity } from "@/common/store/useCartStore";
import { PizzaType } from "@/common/constants/pizza";
import { SizeType } from "@prisma/client";

type CheckoutCartProps = {
  items: PreparedCartItem[];
  loading: boolean;
  className?: string;
};

export const CheckoutCart: FC<CheckoutCartProps> = ({ items, loading, className }) => {
  const onClickCountBtn = (id: number, quantity: number, type: "plus" | "minus") => {
    const nextQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, nextQuantity);
  };

  const onClickClearCart = () => {
    for (const item of items) {
      removeCartItem(item.id);
    }
  };

  if (loading) {
    return (
      <ContentBlock title="1. Корзина" contentClassName="flex flex-col">
        {...Array(3)
          .fill(0)
          .map((_, index) => {
            return (
              <Fragment key={index}>
                <CheckoutCartItemSkeleton />
                <hr className="border-0 border-b border-[#F3F3F3] my-5 last:hidden" />
              </Fragment>
            );
          })}
      </ContentBlock>
    );
  }

  return (
    <ContentBlock
      title="1. Корзина"
      endAdornment={
        items.length > 0 && (
          <button
            type="button"
            className="flex items-center gap-1 text-base text-[#999999] hover:text-primary transition-colors"
            onClick={onClickClearCart}
          >
            <Trash2 size={16} className="-mt-[2px]" />
            Очистить коризну
          </button>
        )
      }
      className={className}
    >
      {items.map(({ size, weight, additives, ...item }) => {
        if (size && weight) {
          const pizzaType = item.pizzaType as PizzaType | null;
          const sizeType = item.sizeType as SizeType;

          return (
            <Fragment key={item.id}>
              <CheckoutCartItem
                productId={item.productId}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(size, sizeType, pizzaType, weight, additives)}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) => onClickCountBtn(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
                disabled={item.disabled}
              />
              <hr className="border-0 border-b border-[#F3F3F3] my-5 last:hidden" />
            </Fragment>
          );
        }
      })}
      {items.length === 0 && <CheckoutCartEmpty />}
    </ContentBlock>
  );
};
