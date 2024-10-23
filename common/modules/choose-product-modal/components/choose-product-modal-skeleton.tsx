import { Skeleton } from "@/common/ui";
import { FC } from "react";
import { cn } from "@/common/lib/utils";

interface ChooseProductModalSkeletonProps {
  isPizza: boolean;
}
export const ChooseProductModalSkeleton: FC<ChooseProductModalSkeletonProps> = ({ isPizza }) => {
  return (
    <div className="absolute inset-0">
      <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>
      <div
        className={cn(
          "fixed left-[50.52%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[30px]",
          "p-0 w-full max-w-[1100px] min-h-[580px] bg-white"
        )}
      >
        <div className="flex flex-1">
          <div className="flex items-center justify-center flex-1 relative w-full basis-1/2">
            {isPizza ? (
              <Skeleton className="relative left-2 top-2 w-[450px] h-[450px] rounded-full" />
            ) : (
              <Skeleton className="relative left-2 top-2 w-[350px] h-[350px]" />
            )}
          </div>

          <div className="flex flex-col justify-between flex-1 bg-[#F4F1EE] py-10 px-1 basis-1/2 rounded-e-[30px]">
            <div
              className={cn(
                "flex flex-col gap-5 overflow-auto scrollbar scrollbar-modal  px-9",
                isPizza && "h-[600px]"
              )}
            >
              <div className="flex flex-col">
                <Skeleton className="w-[250px] h-[39px] mb-1" />
                <Skeleton className="w-[300px] h-[20px] mb-3" />
                <Skeleton className="w-[460px] h-[60px]" />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Skeleton className="w-full h-[40px] rounded-[30px]" />
                {isPizza && <Skeleton className="w-full h-[40px] rounded-[30px]" />}
              </div>

              {isPizza && <Skeleton className="w-[200px] h-[28px]" />}

              {isPizza && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <Skeleton className="w-full h-[200px]" />
                  <Skeleton className="w-full h-[200px]" />
                  <Skeleton className="w-full h-[200px]" />
                  <Skeleton className="w-full h-[200px]" />
                  <Skeleton className="w-full h-[200px]" />
                  <Skeleton className="w-full h-[200px]" />
                </div>
              )}
            </div>

            <div className="px-9 pt-6 w-full">
              <Skeleton className="h-[55px] text-base rounded-[18px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
