import Link from "next/link";
import { FC } from "react";
import { Button, Title } from "../ui";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Ingredient, ProductVariant } from "@prisma/client";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    desc: string | null;
    price: number;
    imageUrl: string;
    ingredients: Ingredient[];
    hasVariants?: boolean;
    currentVariant?: ProductVariant;
  };
  className?: string;
}

const formatIngredients = (ingredients: Ingredient[]) =>
  ingredients
    .map((ingredient, index) => (index === 0 ? ingredient.name : ingredient.name.toLowerCase()))
    .join(", ");

export const ProductCard: FC<ProductCardProps> = ({
  product: { id, name, desc, price, imageUrl, ingredients, hasVariants, currentVariant },
  className,
}) => {
  const ingredientsDesc = desc || formatIngredients(ingredients);
  const priceLabel = `${hasVariants ? "от " : ""}${price} ₽`;
  const getProductLink = (id: number, variantId?: number) =>
    `/product/${id}${variantId ? `?variant=${variantId}` : ""}`;

  return (
    <div className={className}>
      <Link
        href={getProductLink(id, currentVariant?.pizzaType ? currentVariant?.id : undefined)}
        className="flex flex-col gap-4 justify-between h-full"
        scroll={false}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center bg-secondary rounded-lg h-[260px]">
            <Image width={215} height={215} src={imageUrl} alt={name} />
          </div>

          <div className="flex flex-col gap-2">
            <Title text={name} size="sm" className="font-bold leading-7" />
            <p className="text-sm text-gray-400">{ingredientsDesc}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[20px]">
            <b>{priceLabel}</b>
          </span>
          <Button variant="secondary" className="text-base font-bold flex items-center gap-1">
            <Plus size={20} />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
