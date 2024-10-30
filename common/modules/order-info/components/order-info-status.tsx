import { cn } from "@/common/lib/utils";
import { OrderStatus } from "@prisma/client";
import { FC } from "react";

interface OrderInfoStatusProps {
  status: OrderStatus;
}

export const OrderInfoStatus: FC<OrderInfoStatusProps> = ({ status }) => {
  const statusValue = {
    SUCCEEDED: "Оплачено",
    CANCELLED: "Отклонено",
    PENDING: "В ожидании",
  };
  const statusColor = {
    SUCCEEDED: { text: "text-[#1BB486]", bg: "bg-[#eaf8f4]" },
    CANCELLED: { text: "text-[#ff544a]", bg: "bg-[#fff0ef]" },
    PENDING: { text: "text-[#917c12]", bg: "bg-[#fff3b4]" },
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-[30px] h-[35px] px-3 text-sm font-semibold",
        statusColor[status].bg,
        statusColor[status].text
      )}
    >
      {statusValue[status]}
    </div>
  );
};
