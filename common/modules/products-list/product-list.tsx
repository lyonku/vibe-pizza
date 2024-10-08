import { FC } from "react";
import { ProductGroupList } from "./components";
import { CategoryDTO } from "@/@types/prisma";

interface ProductListProps {
  categories: CategoryDTO[];
}

export const ProductList: FC<ProductListProps> = ({ categories }) => {
  return (
    <div className="flex flex-1 flex-col gap-[50px]">
      {categories.map((category) => {
        if (category.products.length > 0) {
          return (
            <ProductGroupList
              key={category.id}
              title={category.name}
              categoryId={category.id}
              products={category.products}
            />
          );
        }
      })}
    </div>
  );
};
