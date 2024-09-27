import { Container } from "@/common/components";
import { Filters } from "@/common/modules/filters";
import { ProductList } from "@/common/modules/products-list";
import { TopBar } from "@/common/modules/top-bar";
import { Title } from "@/common/ui";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все продукты" size="lg" className="font-extrabold" />
      </Container>

      {/* Верхняя панель с категориями и сортировкой */}
      <TopBar categories={categories} />

      <Container className="flex gap-[80px] mt-10 pb-14 ">
        {/* Фильтрация */}
        <Filters className="w-[250px]" />

        {/* Список товаров */}
        <ProductList categories={categories} />
      </Container>
    </>
  );
}
