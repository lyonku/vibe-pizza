import { CreateCartItemValues } from "@/@types/prisma";
import { AreIngredientsEqual, findOrCreateCart, updateCartTotalAmount } from "@/app/helpers";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
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

    return NextResponse.json({ ...userCart });
  } catch (error) {
    console.error("[CART_GET] Server error", error);
    return NextResponse.json({ message: "Не удалось получить товары из корзины" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    const existingCartVariants = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
      },
      include: {
        ingredients: true,
      },
    });

    const existingCartVariant = existingCartVariants.find((cartItem) =>
      AreIngredientsEqual(cartItem.ingredients, data.ingredients as number[])
    );

    if (existingCartVariant) {
      // Если такой товар уже есть в корзине, то добавляем к нему + 1
      await prisma.cartItem.update({
        where: {
          id: existingCartVariant.id,
        },
        data: {
          quantity: existingCartVariant.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", token);
    return response;
  } catch (error) {
    console.error("[CART_POST] Server error", error);
    return NextResponse.json({ message: "Не удалось добавить товар в корзину" }, { status: 500 });
  }
}
