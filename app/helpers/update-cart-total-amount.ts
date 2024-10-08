import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "@/common/lib";

export const updateCartTotalAmount = async (token: string) => {
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Корзина не найдена");
    }

    const totalAmount = userCart?.items.reduce((acc, item) => {
      return acc + calcCartItemTotalPrice(item);
    }, 0);

    return await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
