import { Ingredient } from "@prisma/client";

export const AreIngredientsEqual = (arr1: Ingredient[], arr2: number[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((obj1) => arr2.some((id) => obj1.id === id));
};
