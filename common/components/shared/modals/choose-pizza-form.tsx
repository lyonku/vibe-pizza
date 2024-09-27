"use client";

import { FC } from "react";
import { PizzaImage } from "../pizza-image";
import { Title } from "../title";
import { ProductVariants } from "../product-variants";
import { cn } from "@/common/lib/utils";
import { Button } from "../../ui";
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "@/common/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";
import { IngredientItem } from "../ingredient-item";
import { calcTotalPizzaPrice } from "@/common/lib";
import { usePizzaOptions } from "@/common/hooks";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  onClickAddCart?: VoidFunction;
  variants: ProductVariant[];
  className?: string;
}

export const ChoosePizzaForm: FC<ChoosePizzaFormProps> = ({
  name,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
  variants,
}) => {
  const { size, type, selectedIngredients, availablePizzaSizes, setSize, setType, toggleIngredient } =
    usePizzaOptions(variants);

  const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто, 380 г`;

  const handleClickAddCart = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredients,
    });
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage src={imageUrl} className="basis-1/2" size={size} />

      <div className="flex flex-col  flex-1 bg-[#F4F1EE] py-10 px-1 basis-1/2 rounded-e-[30px]">
        <div className="overflow-auto scrollbar scrollbar-modal h-[600px] px-9">
          <div className="flex flex-col mb-5">
            <Title text={name} size="md" className="font-extrabold" />
            <p className="text-sm text-[#777777]">{textDetails}</p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
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

          <Title text="Добавить по вкусу" size="sm" className="font-bold text-lg mb-4" />

          <div className="grid grid-cols-3 gap-3 mb-8">
            {ingredients.map((ingredient, index) => {
              return (
                <IngredientItem
                  key={index}
                  imageUrl={ingredient.imageUrl}
                  name={ingredient.name}
                  price={ingredient.price}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => toggleIngredient(ingredient.id)}
                />
              );
            })}
          </div>
        </div>
        <div className="px-9 pt-6 w-full">
          <Button className="h-[55px] text-base rounded-[18px] w-full" onClick={handleClickAddCart}>
            Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
