import { ChooseProductModal } from "@/common/modules/choose-product-modal/choose-product-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ParamsType = {
  params: { id: string };
};

export default async function ProductModalPage({ params: { id } }: ParamsType) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      additives: true,
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
