/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
export type updateItemQuantityFunc = (id: number, quantity: number) => Promise<void>;
export type removeCartItemFunc = (id: number) => Promise<void>;
export type addCartItemFunc = (values: CreateCartItemValues) => Promise<void>;

const setCartState = (partialState: Partial<CartState>, actionName: string) => {
  useCartStore.setState(partialState, false, actionName);
};

const handleApiRequest = async (action: () => Promise<any>, actionName: string, id?: number) => {
  try {
    const { items } = useCartStore.getState();
    const nextItems = items.map((item) => (item.id === id ? { ...item, disabled: true } : item));

    setCartState({ loading: true, items: nextItems }, actionName);
    const data = await action();
    setCartState(getCartDetails(data), actionName);
  } catch (error) {
    console.error(error);
    setCartState({ error: true }, actionName);
  } finally {
    const { items } = useCartStore.getState();
    const nextItems = items.map((item) => (item.id === id ? { ...item, disabled: false } : item));

    setCartState({ loading: false, items: nextItems }, actionName);
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
  await handleApiRequest(() => Api.cart.patchItemQuantity(id, quantity), "user/updateItemQuantity", id);
};

/* Удаление товара из корзины */
export const removeCartItem: removeCartItemFunc = async (id: number) => {
  await handleApiRequest(() => Api.cart.deleteCartItem(id), "user/removeCartItem", id);
};

/* Добавление товара в корзину */
export const addCartItem: addCartItemFunc = async (values: CreateCartItemValues) => {
  await handleApiRequest(() => Api.cart.postCartItem(values), "user/addCartItem");
};
