import { FC } from "react";
import { cn } from "@/common/lib/utils";
import { Skeleton } from "@/common/ui";

interface Props {
  className?: string;
}

export const CheckoutCartItemSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between gap-10", className)}>
      <div className="flex items-center gap-5 flex-1 ">
        <Skeleton className="min-w-[68px] h-[68px] rounded-full" />
        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-5" />
        </div>
      </div>

      <Skeleton className="w-12 h-6 mr-4" />

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[30px] h-[30px] rounded-[10px]" />
          <Skeleton className="w-2 h-5" />
          <Skeleton className="w-[30px] h-[30px] rounded-[10px]" />
        </div>
        <Skeleton className="w-[20px] h-[20px] rounded-[5px]" />
      </div>
    </div>
  );
};
