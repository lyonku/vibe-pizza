import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (userId: number, token: string) => {
  let userCart = await prisma.cart.findFirst({
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
  });

  if (!userCart) {
    console.log(userId);

    userCart = await prisma.cart.create({
      data: {
        token,
        userId: userId,
      },
    });
  }

  return userCart;
};
