import { SizeType } from "@prisma/client";

export type PreparedCartItem = {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  weight: number | null;
  imageUrl: string;
  price: number;
  size?: number | null;
  sizeType?: SizeType;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
  disabled?: boolean;
};
