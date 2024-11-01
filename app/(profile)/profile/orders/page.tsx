import { NotAuth } from "@/common/components";
import { getUserSession } from "@/common/lib/get-user-session";
import { OrderInfo } from "@/common/modules/order-info";
import { Accordion, Title } from "@/common/ui";
import { prisma } from "@/prisma/prisma-client";

export default async function ProfileOrdersPage() {
  const session = await getUserSession();

  if (!session) {
    return <NotAuth />;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });

  if (!user) {
    return <NotAuth />;
  }

  const orders = await prisma.order.findMany({
    where: {
      OR: [{ userId: user.id }, { email: user.email }, user.phone ? { phone: user.phone } : {}],
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const ordersWithoutUser = orders.some((order) => !order.userId);
  if (ordersWithoutUser) {
    for (const order of orders) {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          userId: user.id,
        },
      });
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <Title text="Мои заказы" size="xl" className="font-semibold max-lg:text-2xl" />

      <Accordion
        type="multiple"
        className="w-full max-w-[750px] flex flex-col gap-6"
        defaultValue={[`item-${orders[0]?.id}`]}
      >
        {orders.map((order) => {
          return (
            <OrderInfo
              key={order.id}
              id={order.id}
              totalAmount={order.totalAmount}
              items={JSON.parse(order.items as string)}
              date={order.updatedAt}
              status={order.status}
            />
          );
        })}
      </Accordion>
    </div>
  );
}
