import React, { FC } from "react";
import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import { Minus, Plus } from "lucide-react";

interface QuantityCounterProps {
  value?: number;
  size?: "sm" | "lg";
  className?: string;
  onClick: (type: "plus" | "minus") => void;
}

interface IconButtonProps {
  size?: QuantityCounterProps["size"];
  disabled?: boolean;
  type?: "plus" | "minus";
  onClick: () => void;
}

const CounterButton: FC<IconButtonProps> = ({ size = "sm", disabled, type, onClick }) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm" ? "w-[30px] h-[30px] rounded-[10px]" : "w-[38px] h-[38px] rounded-md"
      )}
    >
      {type === "plus" ? (
        <Plus className={size === "sm" ? "h-4" : "h-5"} />
      ) : (
        <Minus className={size === "sm" ? "h-4" : "h-5"} />
      )}
    </Button>
  );
};

export const QuantityCounter: FC<QuantityCounterProps> = ({ className, onClick, value = 1, size = "sm" }) => {
  return (
    <div className={cn("inline-flex items-center justify-between gap-3", className)}>
      <CounterButton onClick={() => onClick("minus")} disabled={value === 1} size={size} type="minus" />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CounterButton onClick={() => onClick("plus")} size={size} type="plus" />
    </div>
  );
};
