import { CartItemDTO } from "@/@types/prisma";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + item.productVariant.price) * item.quantity;
};
