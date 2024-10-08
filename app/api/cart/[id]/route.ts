import { updateCartTotalAmount } from "@/app/helpers";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: ParamsType) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      throw new Error("Токен для корзины не был найден");
    }

    const cartItem = prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      throw new Error("Товар не был найден");
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error("[CART_PATCH] Server error", error);
    return NextResponse.json({ message: "Не удалось обновить товар в корзине" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      throw new Error("Токен для корзины не был найден");
    }

    const cartItem = prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      throw new Error("Товар не был найден");
    }

    await prisma.cartItem.delete({
      where: { id },
    });
    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error("[CART_DELETE] Server error", error);
    return NextResponse.json({ message: "Не удалось удалить товар из корзины" }, { status: 500 });
  }
}
