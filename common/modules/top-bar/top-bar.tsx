"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Categories, SortPopup } from "./components";
import { Container } from "@/common/components";
import { CategoryDTO } from "@/@types/prisma";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/common/lib/utils";
import { CartButton } from "../cart-sheet";
import { useIntersection } from "react-use"; // Импортируем useDebounce

interface TopBarProps {
  categories: CategoryDTO[];
}

export const TopBar: FC<TopBarProps> = ({ categories }) => {
  const [isSticky, setIsSticky] = useState(false);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    if (intersection) {
      setIsSticky(Boolean(!intersection.isIntersecting));
    }
  }, [intersection]);

  const filteredCategories = categories.filter((category) => category.products.length > 0);

  return (
    <div ref={intersectionRef} className={cn("sticky bg-white py-5 z-10 -top-[1px]", isSticky && "top-bar")}>
      <Container className="flex items-center">
        <Link
          href="/"
          className={cn("flex gap-2 w-0 transition-all overflow-hidden", isSticky && "w-[105px] mr-5")}
        >
          <Image src="/logo.svg" alt="Логотип пиццы" width={48} height={48} className="" />
          <div className="flex flex-col justify-center text-base uppercase font-black leading-4">
            <span className="text-primary">Vibe</span>Pizza
          </div>
        </Link>
        <div className="flex items-center justify-between flex-1">
          <Categories items={filteredCategories} isSticky={isSticky} />
          <SortPopup />
        </div>
        <CartButton
          className={cn(isSticky && "ml-3 w-n", !isSticky && "w-0 p-0 m-0 border-0")}
          needRunFetch={false}
        />
      </Container>
    </div>
  );
};
