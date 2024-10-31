"use client";

import { FC, useEffect, useRef } from "react";
import { cn } from "@/common/lib/utils";
import { useIntersection } from "react-use";
import { ProductCard } from "@/common/components";
import { Title } from "@/common/ui";
import { useCategoryStore } from "@/common/store/useCategoryStore";
import { ProductWithoutAdditives } from "@/@types/prisma";
import { addCartItem } from "@/common/store/useCartStore";
import toast from "react-hot-toast";

interface ProductGroupListProps {
  title: string;
  products: ProductWithoutAdditives[];
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

  const onSubmit = async (variantId: number | undefined) => {
    try {
      if (!variantId) {
        throw new Error();
      }
      await addCartItem({
        productVariantId: variantId,
      });
      toast.success("Продукт добавлен в корзину");
    } catch (error) {
      console.error(error);
      toast.error("Не удалось добавить продукт в корзину");
    }
  };

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid gap-[50px] product-list-group", listClassName)}>
        {products.map((product) => {
          const formattedProduct = {
            id: product.id,
            name: product.name,
            desc: product.desc,
            imageUrl: product.imageUrl,
            ingredients: product.ingredients,
            price: product.variants[0].price,
            hasVariants: product.variants.length >= 2,
            currentVariant: product.variants.length <= 3 ? product.variants[0] : undefined,
          };

          return <ProductCard key={product.id} product={formattedProduct} onSubmit={onSubmit} />;
        })}
      </div>
    </div>
  );
};
