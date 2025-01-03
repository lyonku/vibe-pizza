import React from "react";
import { Title } from "./title";
import { cn } from "@/common/lib/utils";

interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  contentClassName?: string;
  className?: string;
}

export const ContentBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-[30px] bg-white rounded-3xl transition-opacity max-md:gap-0",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b p-[35px] pb-[25px] max-lg:p-[20px] max-lg:pb-[20px] border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div
        className={cn(
          "px-[35px] pb-[35px] max-lg:px-[20px] max-lg:pb-[20px] max-lg:pt-[15px] ",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
