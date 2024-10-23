import { ChooseProductModal } from "@/common/modules/choose-product-modal/choose-product-modal";
// import { ChooseProductModalSkeleton } from "@/common/modules/choose-product-modal/components/choose-product-modal-skeleton";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
// import { Suspense } from "react";

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
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    // <Suspense fallback={<ChooseProductModalSkeleton isPizza={Boolean(product.variants[0].pizzaType)} />}>
    <ChooseProductModal product={product} />
    // </Suspense>
  );
}
