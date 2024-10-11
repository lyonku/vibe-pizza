import { cn } from "@/common/lib/utils";
import { Skeleton } from "@/common/ui";
import { FC, ReactNode } from "react";

interface CheckoutItemDetailsProps {
  title: string;
  value: number;
  icon?: ReactNode;
  isFirstLoading?: boolean;
  className?: string;
}

export const CheckoutItemDetails: FC<CheckoutItemDetailsProps> = ({
  title,
  value,
  icon,
  isFirstLoading,
  className,
}) => {
  return (
    <div className={cn("flex", className)}>
      <span className="flex flex-1 text-lg">
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1.5 mx-3" />
      </span>

      {isFirstLoading ? (
        <Skeleton className="w-12 h-7" />
      ) : (
        <span className="font-bold text-lg">{value} ₽</span>
      )}
    </div>
  );
};
