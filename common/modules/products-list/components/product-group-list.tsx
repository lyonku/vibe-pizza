"use client";

import { FC, useEffect, useRef } from "react";
import { cn } from "@/common/lib/utils";
import { useIntersection } from "react-use";
import { Product, ProductVariant } from "@prisma/client";
import { ProductCard } from "@/common/components";
import { Title } from "@/common/ui";
import { useCategoryStore } from "@/common/store/useCategoryStore";

interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

interface ProductGroupListProps {
  title: string;
  products: ProductWithVariants[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductGroupList: FC<ProductGroupListProps> = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection?.isIntersecting, categoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              desc={product.desc}
              imageUrl={product.imageUrl}
              price={product.variants[0].price}
            />
          );
        })}
      </div>
    </div>
  );
};
