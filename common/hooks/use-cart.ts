import { useEffect } from "react";
import {
  addCartItem,
  addCartItemFunc,
  fetchCartItems,
  removeCartItem,
  removeCartItemFunc,
  updateItemQuantity,
  updateItemQuantityFunc,
  useCartItems,
  useCartLoading,
  useCartTotalAmount,
} from "@/common/store/useCartStore";
import { PreparedCartItem } from "@/@types/global";

type ReturnProps = {
  totalAmount: number;
  items: PreparedCartItem[];
  loading: boolean;
  updateItemQuantity: updateItemQuantityFunc;
  removeCartItem: removeCartItemFunc;
  addCartItem: addCartItemFunc;
};

export const useCart = (runFetch: boolean): ReturnProps => {
  const items = useCartItems();
  const totalAmount = useCartTotalAmount();
  const loading = useCartLoading();

  useEffect(() => {
    if (runFetch) {
      fetchCartItems();
    }
  }, []);

  return {
    items,
    totalAmount,
    loading,
    addCartItem,
    removeCartItem,
    updateItemQuantity,
  };
};
