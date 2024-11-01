import { cn } from "@/common/lib/utils";
import { Ingredient } from "@prisma/client";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface RemovableIngredientProps {
  ingredient: Ingredient;
  index: number;
  isLastIngredient: boolean;
  setRemovedIngredinets: Dispatch<SetStateAction<number[]>>;
}

export const RemovableIngredient: FC<RemovableIngredientProps> = ({
  ingredient,
  index,
  isLastIngredient,
  setRemovedIngredinets,
}) => {
  const [isRemoved, setRemoved] = useState(false);

  const setState = () => {
    if (isRemoved) {
      setRemovedIngredinets((prev) => prev.filter((id) => id !== ingredient.id));
    } else {
      setRemovedIngredinets((prev) => [...prev, ingredient.id]);
    }
    setRemoved((prev) => !prev);
  };

  return (
    <>
      <a
        role="button"
        className={cn(
          "inline-flex items-center gap-1 underline underline-offset-4 decoration-dotted",
          isRemoved && "line-through decoration-solid"
        )}
        onClick={setState}
      >
        {index === 0 ? ingredient.name : ingredient.name.toLowerCase()}
        {isRemoved ? <CirclePlus size={16} strokeWidth={1.5} /> : <CircleMinus size={16} strokeWidth={1.5} />}
      </a>
      {isLastIngredient ? "" : ", "}
    </>
  );
};
