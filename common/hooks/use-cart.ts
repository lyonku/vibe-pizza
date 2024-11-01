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
import { useSession } from "next-auth/react";

type ReturnProps = {
  totalAmount: number;
  items: PreparedCartItem[];
  loading: boolean;
  updateItemQuantity: updateItemQuantityFunc;
  removeCartItem: removeCartItemFunc;
  addCartItem: addCartItemFunc;
};

export const useCart = (runFetch: boolean): ReturnProps => {
  const { data: session } = useSession();
  const items = useCartItems();
  const totalAmount = useCartTotalAmount();
  const loading = useCartLoading();

  useEffect(() => {
    if (runFetch) {
      fetchCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return {
    items,
    totalAmount,
    loading,
    addCartItem,
    removeCartItem,
    updateItemQuantity,
  };
};
