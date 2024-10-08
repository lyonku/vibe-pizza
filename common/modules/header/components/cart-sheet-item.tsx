import { cn } from "@/common/lib/utils";
import { FC } from "react";

import * as CartItem from "@/common/components/cart-item-details";
import { X } from "lucide-react";
import Link from "next/link";

interface CartSheetItemProps {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  details: string;
  onClickCounterBtn: (type: "plus" | "minus") => void;
  onClickRemove: () => void;
  className?: string;
}

export const CartSheetItem: FC<CartSheetItemProps> = ({
  id,
  productId,
  imageUrl,
  name,
  price,
  quantity,
  details,
  onClickCounterBtn,
  onClickRemove,
  className,
}) => {
  return (
    <Link href={`/product/${productId}`} className={cn("flex bg-white p-5 gap-5 relative", className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex flex-col gap-3 flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="border-[#EDEDED]" />

        <div className="flex items-center justify-between">
          <CartItem.QuantityCounter value={quantity} onClick={(type) => onClickCounterBtn(type)} />

          <CartItem.Price value={price} />
        </div>
      </div>
      <X
        onClick={(e) => {
          e.preventDefault();
          onClickRemove();
        }}
        color="#a1a1b6"
        className="absolute right-4 top-3 text-gray-400 cursor-pointer hover:text-gray-600 hover:stroke-primary transition-colors"
        size={18}
      />
    </Link>
  );
};
