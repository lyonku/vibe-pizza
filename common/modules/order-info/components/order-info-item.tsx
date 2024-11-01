import React from "react";
import * as CartItem from "@/common/components/cart-item-details";
import { cn } from "@/common/lib/utils";
import Link from "next/link";
import { getDeviceType } from "@/app/helpers";

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
  const { isMobile } = getDeviceType();

  return (
    <Link
      href={`/product/${productId}`}
      className={cn(
        "flex items-center justify-between gap-10 max-s:relative max-s:min-h-[130px]",
        disabled && "pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1 max-s:self-start ">
        <CartItem.Image src={imageUrl} className="max-s:absolute max-s:top-0 max-s:-right-3" />
        <CartItem.Info name={name} details={details} />
      </div>

      <div className="flex flex-col items-center justify-center max-s:self-end max-s:pr-1 ">
        <CartItem.Price value={price} className="text-base" />
        <span className="text-[#A1A1A1]">{quantity} шт.</span>
      </div>
    </Link>
  );
};
