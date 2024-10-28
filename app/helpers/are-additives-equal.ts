import { Additive } from "@prisma/client";

export const AreAdditivesEqual = (arr1: Additive[], arr2: number[]) => {
  if (arr1.length !== arr2?.length) {
    return false;
  }

  return arr1.every((obj1) => arr2.some((id) => obj1.id === id));
};
