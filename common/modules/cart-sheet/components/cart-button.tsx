"use client";

import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { FC, useState } from "react";
import { useCartItems, useCartLoading, useCartTotalAmount } from "@/common/store/useCartStore";
import { CartSheet } from "../cart-sheet";
import { useDebounce } from "react-use";

interface CartButtonProps {
  needRunFetch?: boolean;
  className?: string;
}

export const CartButton: FC<CartButtonProps> = ({ className, needRunFetch }) => {
  const items = useCartItems();
  const totalAmount = useCartTotalAmount();
  const loading = useCartLoading();

  const [debouncedLoading, setDebouncedLoading] = useState(loading);
  const [isEmptyCart, setEmptyCart] = useState(items.length === 0);

  useDebounce(
    () => {
      setDebouncedLoading(loading);
      setTimeout(() => {
        setEmptyCart(items.length === 0);
      }, 100);
    },
    150,
    [loading]
  );

  return (
    <CartSheet needRunFetch={needRunFetch}>
      <Button
        isLoadingOver={!isEmptyCart}
        loading={debouncedLoading}
        className={cn(
          "group relative lg:h-[50px] w-[50px] p-3 text-base animate-cart-button transition-all overflow-hidden max-lg:w-auto ",
          "max-s:fixed max-s:bottom-4 max-s:right-4 max-s:shadow-lg max-s:z-20 ",
          !isEmptyCart &&
            (totalAmount > 10000 ? "w-[165px]" : totalAmount < 1000 ? "w-[140px]" : "w-[150px]"),
          isEmptyCart &&
            "text-primary bg-transparent border border-primary hover:bg-secondary max-s:bg-white",
          className
        )}
        variant={"default"}
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
