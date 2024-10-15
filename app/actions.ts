"use server";

import { CheckoutFormType } from "@/common/schemas";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { CreatePayment, sendEmail } from "./helpers";
import { PayOrder } from "@/common/components/email-templates";
import { CartItemDTO } from "@/@types/prisma";

export async function createOrder(data: CheckoutFormType) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const servicePrice = Number((userCart.totalAmount * (1 / 100)).toFixed());
    const deliverPrice = userCart.totalAmount < 600 ? 250 : 0;

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        deliveryTime: data.deliveryTime,
        totalAmount: userCart.totalAmount + servicePrice + deliverPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await CreatePayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа №" + order.id,
    });

    if (!paymentData) {
      throw new Error("Не удалось создать платеж");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    const items = JSON.parse(order.items as string) as CartItemDTO[];

    await sendEmail(
      data.email,
      "Vibe Pizza | Оплатите заказ №" + order.id,
      PayOrder({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl, items })
    );

    return paymentUrl;
  } catch (error) {
    console.error("[CreateOrder] Server error", error);
  }
}
