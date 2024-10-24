import { NotAuth } from "@/common/components";
import { getUserSession } from "@/common/lib/get-user-session";
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

  return <div className="">ЗАКАЗЫ</div>;
}
