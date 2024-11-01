"use client";

import React from "react";
import { X } from "lucide-react";
import * as CartItem from "@/common/components/cart-item-details";
import { cn } from "@/common/lib/utils";
import Link from "next/link";
import MediaQuery from "react-responsive";

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
      className={cn(
        "flex items-center justify-between gap-10 max-lg:gap-5 relative max-lg:items-end max-md:flex-col",
        disabled && "pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1 max-md:w-full">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <MediaQuery maxWidth={1024}>
        <div className="flex items-end gap-2 justify-end max-md:justify-between max-md:w-full max-md:flex-row-reverse">
          <CartItem.QuantityCounter onClick={onClickCountButton} value={quantity} />
          <button
            onClick={(e) => {
              e.preventDefault();
              onClickRemove();
            }}
          >
            <X
              className="text-gray-400 cursor-pointer hover:text-primary transition-colors absolute top-0 right-0"
              size={20}
            />
          </button>
          <CartItem.Price value={price} className="mr-5 max-lg:mr-0 max-md:text-lg max-md:pl-2" />
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1024}>
        <CartItem.Price value={price} className="mr-5 max-lg:mr-0" />

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
      </MediaQuery>
    </Link>
  );
};
