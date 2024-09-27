import { FC } from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface TopBarProps {
  categories: Category[];
}

export const TopBar: FC<TopBarProps> = ({ categories }) => {
  return (
    <div className="sticky top-0 bg-white py-5  z-10">
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
