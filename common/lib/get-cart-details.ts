import { CartDTO } from "@/@types/prisma";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import { PreparedCartItem } from "@/@types/global";

interface ReturnProps {
  items: PreparedCartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  if (!data.items || data.items.length === 0) {
    return {
      totalAmount: 0,
      items: [],
    };
  }

  const items = data.items.map((item) => ({
    id: item.id,
    productId: item.productVariant.product.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    weight: item.productVariant.weight,
    imageUrl: item.productVariant.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    size: item.productVariant.size,
    sizeType: item.productVariant.sizeType,
    pizzaType: item.productVariant.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
    disabled: false,
  })) as PreparedCartItem[];

  return {
    totalAmount: data.totalAmount,
    items,
  };
};
