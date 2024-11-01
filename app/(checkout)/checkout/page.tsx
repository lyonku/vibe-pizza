import { Title } from "@/common/ui";
import { Container } from "@/common/components";
import { CheckoutPageForm } from "@/common/modules/checkout-page-form";
import { getUserSession } from "@/common/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export default async function CheckoutPage() {
  const session = await getUserSession();
  let userData;

  if (session) {
    userData = await prisma.user.findFirst({
      where: {
        id: Number(session.id),
      },
    });
  }

  return (
    <Container className="flex flex-col gap-12 pt-10 max-lg:pt-5 max-lg:gap-5">
      <Title text="Оформление заказа" size="lg" className="font-extrabold" />

      <CheckoutPageForm userData={userData} />
    </Container>
  );
}
