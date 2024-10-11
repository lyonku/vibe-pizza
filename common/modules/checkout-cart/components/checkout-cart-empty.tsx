import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CheckoutCartEmptyProps {
  className?: string;
}

export const CheckoutCartEmpty: React.FC<CheckoutCartEmptyProps> = (className) => {
  return (
    <div className={cn("flex flex-col gap-2 items-center justify-center w-72 mx-auto", className)}>
      <Image src="/images/emptycart.svg" alt="Пустая корзина" width={250} height={180} />
      <p className="text-center text-neutral-500 mb-4">
        Добавьте хотя бы один продукт, чтобы совершить заказ,
        <br /> пожалуйста 😊
      </p>

      <Link href="/">
        <Button className="w-56 h-12 text-base" size="lg">
          <ArrowLeft className="w-5 mr-2" />
          Вернуться назад
        </Button>
      </Link>
    </div>
  );
};
