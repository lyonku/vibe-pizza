"use client";

import React from "react";
import { X } from "lucide-react";
import * as CartItem from "@/common/components/cart-item-details";
import { cn } from "@/common/lib/utils";
import Link from "next/link";

interface CheckoutCartItemProps extends CartItem.Props {
  className?: string;
}

export const CheckoutCartItem: React.FC<CheckoutCartItemProps> = ({
  name,
  price,
  details,
  imageUrl,
  quantity,
  productId,
  disabled,
  className,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <Link
      href={`/product/${productId}`}
      className={cn("flex items-center justify-between gap-10", disabled && "pointer-events-none", className)}
    >
      <div className="flex items-center gap-5 flex-1 ">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <CartItem.Price value={price} className="mr-5" />

      <div className="flex items-center gap-5">
        <CartItem.QuantityCounter onClick={onClickCountButton} value={quantity} />
        <button
          onClick={(e) => {
            e.preventDefault();
            onClickRemove();
          }}
        >
          <X className="text-gray-400 cursor-pointer hover:text-primary transition-colors" size={20} />
        </button>
      </div>
    </Link>
  );
};
