"use client";

import { FC, useState } from "react";
import { cn } from "@/common/lib/utils";
import { AdditiveItem, PizzaImage, ProductVariants } from "@/common/components";
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "@/common/constants/pizza";
import { Additive, Ingredient, ProductVariant } from "@prisma/client";
import { Button, Title } from "@/common/ui";
import { usePizzaOptions } from "../hooks";
import { calcTotalPizzaPrice } from "../helpers";
import { useCartLoading } from "@/common/store/useCartStore";
import { useSearchParams } from "next/navigation";
import { RemovableIngredient } from "./removable-ingredient";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  additives: Additive[];
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onSubmit: (variantId: number, ingredients: number[], removedIngredinets: number[]) => void;
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
  const [removedIngredinets, setRemovedIngredinets] = useState<number[]>([]);

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
      onSubmit(currentVariantId, Array.from(selectedAdditives), removedIngredinets);
    }
  };

  // Скрытие ингредиента (сырного бортика) для пиццы с тонким тестом или маленьким размером
  const shouldHideCheesyBorder = (additive: Additive) => {
    return additive.name === "Сырный бортик" && (type === 2 || size === 20);
  };

  return (
    <div className={cn(className, "flex flex-1 max-md:h-[95dvh] max-md:grid max-md:grid-rows-[300px_1fr]")}>
      <PizzaImage src={imageUrl} className="basis-1/2" size={size} />

      <div className="flex flex-col flex-1 bg-[#F4F1EE] py-10 px-1 basis-1/2 rounded-e-[30px] max-md:pt-5 max-md:rounded-none max-md:overflow-auto">
        <div className="flex flex-col gap-5 overflow-auto scrollbar scrollbar-modal h-[600px] px-9 max-lg:px-6 max-s:px-4">
          <div className="flex flex-col">
            <Title text={name} size="md" className="font-extrabold" />
            <p className="text-sm text-[#777777] mb-3">{textDetails}</p>
            <div className="text-sm">
              {ingredients.map((ingredient, index) => {
                const isLastIngredient = index + 1 === ingredients.length;
                if (ingredient.removable) {
                  return (
                    <RemovableIngredient
                      key={ingredient.id}
                      ingredient={ingredient}
                      index={index}
                      isLastIngredient={isLastIngredient}
                      setRemovedIngredinets={setRemovedIngredinets}
                    />
                  );
                }
                return (
                  (index === 0 ? ingredient.name : ingredient.name.toLowerCase()) +
                  (isLastIngredient ? "" : ", ")
                );
              })}
            </div>
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

          <div className="grid grid-cols-3 gap-3 mb-4 max-lg:grid-cols-2 max-md:grid-cols-3 max-md:pb-12 max-s:grid-cols-2">
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
        <div className="px-9 pt-6 w-full max-lg:px-6 max-md:absolute max-md:bottom-2 max-md:left-0 max-md:p-4">
          <Button
            loading={loading}
            className="h-[55px] text-base rounded-[18px] w-full disabled:opacity-100"
            onClick={handleClickAddCart}
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
