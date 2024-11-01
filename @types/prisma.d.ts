import { Additive, Cart, CartItem, Category, Ingredient, Product, ProductVariant } from "@prisma/client";

export type ProductDTO = Product & {
  variants: ProductVariant[];
  ingredients: Ingredient[];
  additives: Additive[];
};

export type ProductWithoutAdditives = Omit<ProductDTO, "additives">;

export type CategoryDTO = Category & {
  products: ProductWithoutAdditives[];
};

export type CartItemDTO = CartItem & {
  productVariant: ProductVariant & {
    product: Product;
  };
  additives: Additive[];
  removedIngredinets: Ingredient[];
};

export type CartDTO = Cart & {
  items: CartItemDTO[];
};

export interface CreateCartItemValues {
  productVariantId: number;
  additives?: number[];
  removedIngredinets?: number[];
}
