"use-client";

import { FC, useState } from "react";
import { GhostButton } from "@/common/components";
import { Button } from "@/common/ui";
import { calculateTimeIntervals } from "../helpers/calculate-time-intervals";
import { CheckoutDeliveryTimeChooseDialog } from "./checkout-delivery-time-choose-dialog";
import { useFormContext } from "react-hook-form";

interface CheckoutDeliveryTimeChooseProps {}

export const CheckoutDeliveryTimeChoose: FC<CheckoutDeliveryTimeChooseProps> = () => {
  const [timeIntervals] = useState<string[]>(calculateTimeIntervals());
  const { setValue, watch } = useFormContext();
  const activeTime = watch("deliveryTime");

  const setActiveTime = (time: string) => {
    setValue("deliveryTime", time);
  };

  const customActiveTime = timeIntervals.slice(4).find((time) => time === activeTime);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold mb-2">Время доставки</p>
      <div className="flex items-center gap-3">
        <GhostButton active={activeTime === "Побыстрее"} onClick={() => setActiveTime("Побыстрее")}>
          Побыстрее
        </GhostButton>
        {timeIntervals.length > 1 && <hr className="w-[1px] h-4 bg-[#e4e4e7]" />}
        {timeIntervals.slice(1, 3).map((interval, index) => {
          return (
            <GhostButton active={activeTime === interval} key={index} onClick={() => setActiveTime(interval)}>
              {interval}
            </GhostButton>
          );
        })}
        {customActiveTime && (
          <GhostButton
            active={activeTime === customActiveTime}
            onClick={() => setActiveTime(customActiveTime)}
          >
            {customActiveTime}
          </GhostButton>
        )}
        {timeIntervals.length > 1 && (
          <CheckoutDeliveryTimeChooseDialog
            timeIntervals={timeIntervals}
            activeTime={activeTime}
            onChoose={(time) => setActiveTime(time)}
          >
            <Button
              type="button"
              className="transition-all ease-out hover:bg-white border border-white text-black shadow-ghost hover:shadow-lightghost"
              variant="outline"
            >
              Другое время
            </Button>
          </CheckoutDeliveryTimeChooseDialog>
        )}
      </div>
    </div>
  );
};
