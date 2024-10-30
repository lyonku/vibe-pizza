import React from "react";
import * as CartItem from "@/common/components/cart-item-details";
import { cn } from "@/common/lib/utils";
import Link from "next/link";

interface OrderInfoItemProps extends Omit<CartItem.Props, "onClickRemove" | "onClickCountButton"> {
  className?: string;
}

export const OrderInfoItem: React.FC<OrderInfoItemProps> = ({
  name,
  price,
  details,
  imageUrl,
  quantity,
  productId,
  disabled,
  className,
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

      <div className="flex flex-col items-center justify-center">
        <CartItem.Price value={price} className="text-base" />
        <span className="text-[#A1A1A1]">{quantity} шт.</span>
      </div>
    </Link>
  );
};
