import { Category, Ingredient, Product, ProductVariant } from "@prisma/client";

export type ProductWithRelations = Product & {
  variants: ProductVariant[];
  ingredients: Ingredient[];
};

export type CategoryWithRelations = Category & {
  products: ProductWithRelations[];
};
