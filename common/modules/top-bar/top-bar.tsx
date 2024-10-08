import { FC } from "react";
import { Categories, SortPopup } from "./components";
import { Container } from "@/common/components";
import { CategoryDTO } from "@/@types/prisma";

interface TopBarProps {
  categories: CategoryDTO[];
}

export const TopBar: FC<TopBarProps> = ({ categories }) => {
  return (
    <div className="sticky top-0 bg-white py-5  z-10">
      <Container className="flex items-center justify-between">
        <Categories items={categories.filter((category) => category.products.length > 0)} />
        <SortPopup />
      </Container>
    </div>
  );
};
