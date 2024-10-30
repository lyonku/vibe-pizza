"use client";
import { cn, wait } from "@/common/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/common/ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FC, ReactNode, useState } from "react";

interface OrderModalProps {
  id: number;
  status: string;
  className?: string;
  children: ReactNode;
}

export const OrderModal: FC<OrderModalProps> = ({ className, children, id, status }) => {
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    wait().then(() => (window.location.href = "/"));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={cn("max-w-[750px] w-full bg-white ", className)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>Заказ №{id}</DialogTitle>
          <DialogDescription>{status}</DialogDescription>
        </VisuallyHidden>

        {children}
      </DialogContent>
    </Dialog>
  );
};
