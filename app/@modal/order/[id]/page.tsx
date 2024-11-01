import { OrderInfo } from "@/common/modules/order-info";
import { OrderModal } from "@/common/modules/order-modal.tsx";
import { Accordion } from "@/common/ui";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ParamsType = {
  params: { id: string };
};

export default async function OrderPage({ params: { id } }: ParamsType) {
  const lastDashIndex = id.lastIndexOf("-");
  const tokenValue = id.substring(0, lastDashIndex);
  const idValue = Number(id.substring(lastDashIndex + 1));

  const order = await prisma.order.findFirst({
    where: {
      AND: [{ token: tokenValue }, { id: idValue }],
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <div>
      <OrderModal id={order.id} status={order.status}>
        <Accordion
          type="single"
          className="w-full max-w-[750px] flex flex-col gap-6 border-b-0"
          defaultValue={`item-${order.id}`}
        >
          <OrderInfo
            key={order.id}
            id={order.id}
            totalAmount={order.totalAmount}
            items={JSON.parse(order.items as string)}
            date={order.updatedAt}
            status={order.status}
            withoutState={true}
          />
        </Accordion>
      </OrderModal>
    </div>
  );
}
