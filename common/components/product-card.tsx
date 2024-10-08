import Link from "next/link";
import { FC } from "react";
import { Button, Title } from "../ui";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  id: number;
  name: string;
  desc: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({ id, name, desc, price, imageUrl, className }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} className="flex flex-col gap-4 justify-between h-full" scroll={false}>
        <div className="flex flex-col gap-4">
          <div className="flex  justify-center items-center bg-secondary rounded-lg h-[260px]">
            <Image width={215} height={215} src={imageUrl} alt={name} />
          </div>

          <div className="flex flex-col gap-2">
            <Title text={name} size="sm" className="font-bold leading-7" />
            <p className="text-sm text-gray-400">{desc}</p>
          </div>
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
