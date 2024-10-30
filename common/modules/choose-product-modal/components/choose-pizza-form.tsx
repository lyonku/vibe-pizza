"use client";

import { FC } from "react";
import { cn } from "@/common/lib/utils";
import { AdditiveItem, PizzaImage, ProductVariants } from "@/common/components";
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "@/common/constants/pizza";
import { Additive, Ingredient, ProductVariant } from "@prisma/client";
import { Button, Title } from "@/common/ui";
import { usePizzaOptions } from "../hooks";
import { calcTotalPizzaPrice } from "../helpers";
import { useCartLoading } from "@/common/store/useCartStore";
import { useSearchParams } from "next/navigation";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  additives: Additive[];
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onSubmit: (variantId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: FC<ChoosePizzaFormProps> = ({
  name,
  imageUrl,
  ingredients,
  className,
  onSubmit,
  variants,
  additives,
}) => {
  const searchParams = useSearchParams();
  const activeVariantId = Number(searchParams.get("variant")) || undefined;

  const { size, type, weight, selectedAdditives, availablePizzaSizes, setSize, setType, toggleAdditive } =
    usePizzaOptions(variants, activeVariantId);
  const loading = useCartLoading();
  const totalPrice = calcTotalPizzaPrice(type, size, variants, additives, selectedAdditives);
  const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто, ${weight} г`;

  const handleClickAddCart = async () => {
    const currentVariantId = variants.find(
      (variant) => variant.pizzaType === type && variant.size === size
    )?.id;

    if (currentVariantId) {
      onSubmit(currentVariantId, Array.from(selectedAdditives));
    }
  };

  // Скрытие ингредиента (сырного бортика) для пиццы с тонким тестом или маленьким размером
  const shouldHideCheesyBorder = (additive: Additive) => {
    return additive.name === "Сырный бортик" && (type === 2 || size === 20);
  };

  const ingredientsDesc = ingredients
    .map((ingredient, index) => (index === 0 ? ingredient.name : ingredient.name.toLowerCase()))
    .join(", ");

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage src={imageUrl} className="basis-1/2" size={size} />

      <div className="flex flex-col flex-1 bg-[#F4F1EE] py-10 px-1 basis-1/2 rounded-e-[30px]">
        <div className="flex flex-col gap-5 overflow-auto scrollbar scrollbar-modal h-[600px] px-9">
          <div className="flex flex-col">
            <Title text={name} size="md" className="font-extrabold" />
            <p className="text-sm text-[#777777] mb-3">{textDetails}</p>
            <p className="text-sm">{ingredientsDesc}</p>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <ProductVariants
              items={availablePizzaSizes}
              selected={String(size)}
              onClick={(id) => setSize(Number(id) as PizzaSize)}
            />
            <ProductVariants
              items={pizzaTypes}
              selected={String(type)}
              onClick={(id) => setType(Number(id) as PizzaType)}
            />
          </div>

          <Title text="Добавить по вкусу" size="sm" className="font-bold text-lg" />

          <div className="grid grid-cols-3 gap-3 mb-4">
            {additives.map((additive, index) => {
              if (shouldHideCheesyBorder(additive)) {
                if (selectedAdditives.has(additive.id)) {
                  toggleAdditive(additive.id);
                }
                return null;
              }
              return (
                <AdditiveItem
                  key={index}
                  imageUrl={additive.imageUrl}
                  name={additive.name}
                  price={additive.price}
                  active={selectedAdditives.has(additive.id)}
                  onClick={() => toggleAdditive(additive.id)}
                />
              );
            })}
          </div>
        </div>
        <div className="px-9 pt-6 w-full">
          <Button
            loading={loading}
            className="h-[55px] text-base rounded-[18px] w-full"
            onClick={handleClickAddCart}
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
