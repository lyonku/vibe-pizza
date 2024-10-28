import { prisma } from "@/prisma/prisma-client";
import { AreAdditivesEqual } from "@/app/helpers";
import { CreateCartItemValues } from "@/@types/prisma";
import { Cart } from "@prisma/client";

/**
 * Логика добавления или обновления товара в корзине
 * @param userCart - корзина пользователя
 * @param data - данные о добавляемом товаре
 * @returns обновленная корзина
 */

export async function addOrUpdateCart(userCart: Cart, data: CreateCartItemValues) {
  // Ищем варианты товаров в корзине пользователя
  const existingCartVariants = await prisma.cartItem.findMany({
    where: {
      cartId: userCart.id,
      productVariantId: data.productVariantId,
    },
    include: {
      additives: true,
    },
  });

  // Находим существующий товар с такими же ингредиентами
  const existingCartVariant = existingCartVariants.find((cartItem) =>
    AreAdditivesEqual(cartItem.additives, data.additives ? (data.additives as number[]) : [])
  );

  if (existingCartVariant) {
    // Если такой товар уже есть в корзине, добавляем +1 к количеству
    await prisma.cartItem.update({
      where: {
        id: existingCartVariant.id,
      },
      data: {
        quantity: existingCartVariant.quantity + 1,
      },
    });
  } else {
    // Если товара нет, создаем новый элемент корзины
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        additives: { connect: data.additives?.map((id) => ({ id })) },
      },
    });
  }
}
