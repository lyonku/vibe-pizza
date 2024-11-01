import { ChangeEvent, FC } from "react";
import { cn } from "@/common/lib/utils";
import { Button, Input } from "@/common/ui";
import { BadgeCheck } from "lucide-react";

interface CheckoutPromocodeProps {
  promocodeValue: string;
  promocodeFocus: boolean;
  isPromocodeCorrect: boolean;
  onChangePromocodeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  setPromocodeFocus: (state: boolean) => void;
  handleCheckPromocode: () => void;
  className?: string;
}

export const CheckoutPromocode: FC<CheckoutPromocodeProps> = ({
  promocodeValue,
  promocodeFocus,
  isPromocodeCorrect,
  onChangePromocodeValue,
  setPromocodeFocus,
  handleCheckPromocode,
  className,
}) => {
  const isPromocodeEnter = promocodeValue.length > 0;

  return (
    <div className={cn("flex gap-2 items-center justify-between w-full", className)}>
      <div className="relative">
        <Input
          type="text"
          id="floating_outlined"
          placeholder=" "
          className={cn(
            "w-full text-lg peer white-autofill",
            "shadow-none h-[40px]",
            !isPromocodeEnter && "border-[#fff] "
          )}
          onChange={onChangePromocodeValue}
          onFocus={() => setPromocodeFocus(true)}
          onBlur={() => setPromocodeFocus(false)}
          value={promocodeValue}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-base text-gray-500 cursor-pointer duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 max-md:text-base"
        >
          {promocodeFocus || isPromocodeEnter ? "Промокод:" : "У меня есть промокод"}
        </label>
      </div>

      {isPromocodeCorrect && (
        <div className="flex gap-2 font-bold text-[#008e5b]">
          <span>-100%</span>
          <BadgeCheck color="#008e5b" />
        </div>
      )}

      {(promocodeFocus || isPromocodeEnter) && !isPromocodeCorrect && (
        <Button onClick={handleCheckPromocode}>Применить</Button>
      )}
    </div>
  );
};
