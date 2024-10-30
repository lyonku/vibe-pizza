"use server";

import { CheckoutFormType } from "@/common/schemas";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { CreatePayment, generateVerificationCode, sendEmail, sendSMS } from "./helpers";
import { PayOrder, VerificationUser } from "@/common/components/email-templates";
import { CartItemDTO } from "@/@types/prisma";
import { getUserSession } from "@/common/lib/get-user-session";
import { compare, hashSync } from "bcrypt";

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
            additives: true,
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
        firstName: data.firstName,
        lastName: data.lastName,
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

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        birthday: findUser?.birthday || body.birthday,
      },
    });
  } catch (error) {
    console.error("Error [UPDATE_USER_INFO]", error);
    throw error;
  }
}

export async function updateUserPassword(body: { oldPassword: string; password: string }) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (!findUser) {
      throw new Error("Пользователь не найден в базе данных");
    }

    const isPasswordValid = await compare(body.oldPassword, findUser.password);

    if (!isPasswordValid) {
      throw new Error("Старый пароль указан неверно");
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        password: hashSync(body.password, 10),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error [UPDATE_USER]", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        firstName: body.firstName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = generateVerificationCode(createdUser.id);

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendEmail(createdUser.email, "Next Pizza / Подтверждение аккаунта", VerificationUser({ code }));
  } catch (error) {
    console.error("Error [CREATE_USER]", error);
    throw error;
  }
}

export async function registerUserWithPhone(phone: string) {
  const user = await prisma.user.findFirst({
    where: {
      phone: { endsWith: phone.slice(-15) },
    },
  });

  let userId;
  let createdUser;

  if (!user) {
    createdUser = await prisma.user.create({
      data: {
        firstName: "",
        email: "",
        password: "",
        phone,
      },
    });
    await prisma.user.update({
      where: {
        id: createdUser.id,
      },
      data: {
        firstName: "User #" + createdUser.id,
      },
    });
    userId = createdUser.id;
  } else {
    userId = user.id;
  }

  const findCode = await prisma.verificationCode.findFirst({
    where: {
      userId,
    },
  });

  if (findCode) {
    await prisma.verificationCode.delete({
      where: {
        id: findCode.id,
      },
    });
  }

  const code = generateVerificationCode();

  await prisma.verificationCode.create({
    data: {
      code,
      userId,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  await sendSMS(phone, `Ваш код для подтверждения регистрации на сайте Vibe Pizza: ${code}`);
}

export async function resendCode(type: "email" | "phone", email: string, phone: string) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone: { endsWith: phone.slice(-15) },
          },
        ],
      },
    });

    if (!findUser) {
      throw new Error("Пользователь не найден");
    }

    const code = generateVerificationCode(findUser.id);

    const findCode = await prisma.verificationCode.findFirst({
      where: {
        userId: findUser.id,
      },
    });

    if (findCode) {
      await prisma.verificationCode.delete({
        where: {
          userId: findUser.id,
        },
      });
    }

    await prisma.verificationCode.create({
      data: {
        code,
        userId: findUser.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    if (type === "email") {
      await sendEmail(email, "Next Pizza / Подтверждение аккаунта", VerificationUser({ code }));
    }

    if (type === "phone") {
      await sendSMS(phone, `Ваш код для подтверждения регистрации на сайте Vibe Pizza: ${code}`);
    }
  } catch (error) {
    console.error("Error [RESEND_CODE]", error);
    throw error;
  }
}
