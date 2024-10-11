"use client";

import { ChangeEvent, FC, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { cn } from "@/common/lib/utils";
import { Button, ContentBlock, Skeleton } from "@/common/ui";
import { CheckoutItemDetails, CheckoutPromocode } from "./components";
import { ArrowRight, Loader, Package, Percent, Truck } from "lucide-react";

interface CheckoutSidebarProps {
  itemsPrice: number;
  loading: boolean;
  isFirstLoading?: boolean;
  className?: string;
}

export const CheckoutSidebar: FC<CheckoutSidebarProps> = ({
  itemsPrice,
  loading,
  isFirstLoading,
  className,
}) => {
  const [promocodeValue, setPromocodeValue] = useState("");
  const [promocodeFocus, setPromocodeFocus] = useState(false);
  const [isPromocodeCorrect, setPromocodeCorrect] = useState(false);

  const isPromocodeEnter = promocodeValue.length > 0;

  const handleCheckPromocode = () => {
    if (promocodeValue.toLowerCase() === "халява") {
      toast.success(`Промокод ${promocodeValue} применен`);
      setPromocodeCorrect(true);
    } else {
      toast.error(`Промокод не найден`);
      setPromocodeValue("");
    }
  };

  const servicePrice = Number((itemsPrice * (1 / 100)).toFixed());
  const deliverPrice = itemsPrice > 0 ? 250 : 0;
  const totalPrice = itemsPrice + servicePrice + deliverPrice;

  const onChangePromocodeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPromocodeCorrect(false);
    setPromocodeValue(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      {isPromocodeEnter && isPromocodeCorrect && (
        <div className="absolute left-5 -top-[180px] animate-slide-in">
          <Image alt="" src={"/images/promocode-active.png"} width={400} height={230} />
        </div>
      )}

      {!isFirstLoading && loading && (
        <div className="absolute right-[45px] top-[45px] transition-opacity ease-in-out animate-fade-in z-10">
          <Loader className="animate-spin" />
        </div>
      )}

      <ContentBlock
        className="pt-[45px] sticky top-4"
        contentClassName="flex flex-col gap-8 px-[45px] pb-[45px]"
      >
        <div className="flex flex-col gap-1">
          <span className="text-2xl">Итого:</span>
          {isFirstLoading ? (
            <Skeleton className="w-28 h-9" />
          ) : (
            <div className="flex gap-5">
              <span
                className={cn("text-[34px] leading-9 font-extrabold", isPromocodeCorrect && "line-through")}
              >
                {totalPrice} ₽
              </span>
              {isPromocodeCorrect && <span className="text-[34px] leading-9 font-extrabold">0 ₽</span>}
            </div>
          )}
        </div>

        <hr className="-mx-[45px] border-0 border-b border-[#F3F3F3]" />

        <div className="flex flex-col gap-4">
          <CheckoutItemDetails
            title="Стоимость корзины:"
            value={itemsPrice}
            icon={<Package size={18} color="#B9B9B9" />}
            isFirstLoading={isFirstLoading}
          />
          <CheckoutItemDetails
            title="Сервисный сбор:"
            value={servicePrice}
            icon={<Percent size={18} color="#B9B9B9" />}
            isFirstLoading={isFirstLoading}
          />
          <CheckoutItemDetails
            title="Доставка:"
            value={deliverPrice}
            icon={<Truck size={18} color="#B9B9B9" />}
            isFirstLoading={isFirstLoading}
          />
        </div>

        <hr className="-mx-[45px] border-0 border-b border-[#F3F3F3]" />

        <div className="flex flex-col gap-6">
          <CheckoutPromocode
            promocodeValue={promocodeValue}
            promocodeFocus={promocodeFocus}
            isPromocodeCorrect={isPromocodeCorrect}
            onChangePromocodeValue={onChangePromocodeValue}
            setPromocodeFocus={setPromocodeFocus}
            handleCheckPromocode={handleCheckPromocode}
          />
          <Button
            disabled={loading || itemsPrice === 0}
            type="submit"
            className={cn(
              "w-full h-14 rounded-2xl text-base font-bold",
              loading && "transition-opacity delay-100"
            )}
          >
            Перейти к оплате
            <ArrowRight className="w-5 ml-2" />
          </Button>
        </div>
      </ContentBlock>
    </div>
  );
};
