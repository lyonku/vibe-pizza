import {
  Container,
  PizzaImage,
  ProductVariants,
  Title,
} from "@/common/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ParamsType = {
  params: { id: string };
};

export default async function ProductPage({ params: { id } }: ParamsType) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage src={product.imageUrl} className="" size={40} />

        <div className="w-[490px] bg-[#f9f9f9] p-7 rounded-xl">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты,
            соус альфредо, чеснок
          </p>

          <ProductVariants
            selected="1"
            items={[
              {
                name: "Маленькая",
                id: "1",
              },
              {
                name: "Средняя",
                id: "2",
              },
              {
                name: "Большая",
                id: "3",
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
