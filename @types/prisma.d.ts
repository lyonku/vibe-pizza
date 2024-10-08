import { Cart, CartItem, Category, Ingredient, Product, ProductVariant } from "@prisma/client";

export type ProductDTO = Product & {
  variants: ProductVariant[];
  ingredients: Ingredient[];
};

export type CategoryDTO = Category & {
  products: ProductDTO[];
};

export type CartItemDTO = CartItem & {
  productVariant: ProductVariant & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export type CartDTO = Cart & {
  items: CartItemDTO[];
};

export interface CreateCartItemValues {
  productVariantId: number;
  ingredients?: number[];
}
