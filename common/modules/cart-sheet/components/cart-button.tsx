"use client";

import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { FC } from "react";
import { useCartItems, useCartLoading, useCartTotalAmount } from "@/common/store/useCartStore";
import { CartSheet } from "../cart-sheet";

interface CartButtonProps {
  className?: string;
}

export const CartButton: FC<CartButtonProps> = ({ className }) => {
  const items = useCartItems();
  const totalAmount = useCartTotalAmount();
  const loading = useCartLoading();

  const isEmptyCart = items.length === 0;

  return (
    <CartSheet>
      <Button
        isLoadingOver={!isEmptyCart}
        loading={loading}
        className={cn(
          "group relative h-[50px] px-5 text-base",
          isEmptyCart && "px-4",
          loading && isEmptyCart && "px-[14px]",
          className
        )}
        variant={isEmptyCart ? "outline" : "default"}
      >
        {isEmptyCart ? (
          <ShoppingCart size={16} className="relative" strokeWidth={2.5} />
        ) : (
          <>
            <b>{totalAmount} ₽</b>
            <span className="h-full w-[1px] bg-white/30 mx-3 max-h-[25px]"></span>
            <div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative -mt-[2px]" strokeWidth={2.5} />
              <b>{items.length}</b>
            </div>
            <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0" />
          </>
        )}
      </Button>
    </CartSheet>
  );
};
