import { GhostButton } from "@/common/components";
import { Dialog, DialogContent } from "@/common/ui";
import { DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/common/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FC, ReactNode, useState } from "react";

interface CheckoutDeliveryTimeChooseDialogProps {
  children: ReactNode;
  timeIntervals: string[];
  activeTime: string;
  onChoose: (time: string) => void;
}

export const CheckoutDeliveryTimeChooseDialog: FC<CheckoutDeliveryTimeChooseDialogProps> = ({
  children,
  timeIntervals,
  activeTime,
  onChoose,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-[#f4f1ee] max-md:rounded-[30px] max-md:max-w-[350px]">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-2xl">Время доставки</DialogTitle>
          <VisuallyHidden>
            <DialogDescription></DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="overflow-hidden rounded-b-[30px] pb-4">
          <div className="grid grid-cols-2 gap-4 max-h-[440px] mr-1 px-8 py-3 overflow-auto scrollbar scrollbar-modal pb-4">
            {timeIntervals.map((interval, index) => {
              return (
                <GhostButton
                  key={index}
                  onClick={() => {
                    onChoose(interval);
                    setOpen(false);
                  }}
                  active={interval === activeTime}
                  className="h-14 text-base bg-white"
                >
                  {interval}
                </GhostButton>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
