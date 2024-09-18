import Link from "next/link";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} className="flex flex-col gap-4">
        <div className="flex justify-center items-center bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <div className="flex flex-col gap-2">
          <Title text={name} size="sm" className="font-bold" />

          <p className="text-sm text-gray-400">
            Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты,
            соус альфредо, чеснок
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
