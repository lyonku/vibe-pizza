import { CreateCartItemValues } from "@/@types/prisma";
import { addOrUpdateCart, findOrCreateCart, updateCartTotalAmount } from "@/app/helpers";
import { getUserSession } from "@/common/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;
    const currentUser = await getUserSession();
    const userId = Number(currentUser?.id);

    if (!token && !currentUser) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    if (token && currentUser) {
      const findUserCart = await prisma.cart.findFirst({ where: { userId } });
      const findTokenCart = await prisma.cart.findFirst({ where: { token } });

      if (findUserCart && findTokenCart && findUserCart.id !== findTokenCart.id) {
        const findTokenCartItems = await prisma.cartItem.findMany({
          where: {
            cartId: findTokenCart.id,
          },
          include: {
            additives: true,
            removedIngredinets: true,
          },
        });

        for (const item of findTokenCartItems) {
          const additivesIds = item.additives.map((additive) => additive.id);

          await addOrUpdateCart(findUserCart, {
            productVariantId: item.productVariantId,
            additives: additivesIds,
            removedIngredinets: item.removedIngredinets.map((item) => item.id),
          });
        }

        await prisma.cartItem.deleteMany({
          where: {
            cartId: findTokenCart.id,
          },
        });

        await prisma.cart.delete({
          where: {
            id: findTokenCart.id,
          },
        });
      }
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            userId,
          },
          {
            token,
          },
        ],
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
            additives: true,
            removedIngredinets: true,
          },
        },
      },
    });

    if (!userCart) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    if (!userCart.userId && userId) {
      await prisma.cart.update({
        where: {
          id: userCart.id,
        },
        data: {
          userId,
        },
      });
    }

    if (userCart.userId && userCart.userId !== userId) {
      const response = NextResponse.json({ totalAmount: 0, items: [] });
      response.cookies.delete("cartToken");
      return response;
    }

    const response = NextResponse.json(userCart);
    response.cookies.set("cartToken", userCart.token);
    return response;
  } catch (error) {
    console.error("[CART_GET] Server error", error);
    return NextResponse.json({ message: "Не удалось получить товары из корзины" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getUserSession();
    const userId = Number(currentUser?.id);
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(userId, token);

    const data = (await req.json()) as CreateCartItemValues;

    await addOrUpdateCart(userCart, data);

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", token);
    return response;
  } catch (error) {
    console.error("[CART_POST] Server error", error);
    return NextResponse.json({ message: "Не удалось добавить товар в корзину" }, { status: 500 });
  }
}
