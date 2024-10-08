import { Container } from "@/common/components";
import { Filters } from "@/common/modules/filters";
import { ProductList } from "@/common/modules/products-list";
import { TopBar } from "@/common/modules/top-bar";
import { Title } from "@/common/ui";
import { Suspense } from "react";
import { findProducts, GetSearchParams } from "../helpers";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findProducts(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все продукты" size="lg" className="font-extrabold" />
      </Container>

      {/* Верхняя панель с категориями и сортировкой */}
      <TopBar categories={categories} />

      <Container className="flex gap-[80px] mt-10 pb-14 ">
        {/* Фильтрация */}
        <Suspense>
          <Filters className="w-[250px]" />
        </Suspense>

        {/* Список товаров */}
        <ProductList categories={categories} />
      </Container>
    </>
  );
}
