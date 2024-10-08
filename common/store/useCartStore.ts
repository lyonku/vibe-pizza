import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Api } from "@/common/services/api-client";
import { getCartDetails } from "@/common/lib";
import { PreparedCartItem } from "@/@types/global";
import { CreateCartItemValues } from "@/@types/prisma";

interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: PreparedCartItem[];
}
type fetchCartItemsFunc = () => Promise<void>;
type updateItemQuantityFunc = (id: number, quantity: number) => Promise<void>;
type removeCartItemFunc = (id: number) => Promise<void>;
type AddCartItemFunc = (values: CreateCartItemValues) => Promise<void>;
const setCartState = (partialState: Partial<CartState>, actionName: string) => {
  useCartStore.setState(partialState, false, actionName);
};

const handleApiRequest = async (action: () => Promise<any>, actionName: string) => {
  try {
    setCartState({ loading: true, error: false }, actionName);
    const data = await action();
    setCartState(getCartDetails(data), actionName);
  } catch (error) {
    console.error(error);
    setCartState({ error: true }, actionName);
  } finally {
    setCartState({ loading: false }, actionName);
  }
};

const useCartStore = create<CartState>()(
  devtools<CartState>((set) => ({
    items: [],
    totalAmount: 0,
    error: false,
    loading: true,
  }))
);

export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotalAmount = () => useCartStore((state) => state.totalAmount);

export const useCartLoading = () => useCartStore((state) => state.loading);
export const useCartError = () => useCartStore((state) => state.error);

/* Получение всех товаров корзины */
export const fetchCartItems: fetchCartItemsFunc = async () => {
  await handleApiRequest(() => Api.cart.getCart(), "user/fetchCartItems");
};

/* Обновление количества товара в корзине */
export const updateItemQuantity: updateItemQuantityFunc = async (id: number, quantity: number) => {
  await handleApiRequest(() => Api.cart.patchItemQuantity(id, quantity), "user/updateItemQuantity");
};

/* Удаление товара из корзины */
export const removeCartItem: removeCartItemFunc = async (id: number) => {
  await handleApiRequest(() => Api.cart.deleteCartItem(id), "user/removeCartItem");
};

/* Добавление товара в корзину */
export const addCartItem: AddCartItemFunc = async (values: CreateCartItemValues) => {
  await handleApiRequest(() => Api.cart.postCartItem(values), "user/addCartItem");
};
