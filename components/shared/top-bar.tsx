import { FC } from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Container } from "./container";

interface TopBarProps {}

export const TopBar: FC<TopBarProps> = () => {
  return (
    <div className="sticky top-0 bg-white py-5  z-10">
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
