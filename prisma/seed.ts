import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import { additives, categories, ingredients, pizzas, products } from "./constants";

const prisma = new PrismaClient();

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const sizesForPizzaType1 = [20, 30, 40]; // Размеры для pizzaType = 1
const sizesForPizzaType2 = [30, 40]; // Размеры для pizzaType = 2

interface SizeAttributes {
  priceCoefficient: number;
  weightCoefficient: number;
}

const sizeAttributes: Record<number, SizeAttributes> = {
  20: { priceCoefficient: 1.0, weightCoefficient: 1.0 }, // Маленькая
  30: { priceCoefficient: 1.3, weightCoefficient: 1.4 }, // Средняя
  40: { priceCoefficient: 1.6, weightCoefficient: 1.7 }, // Большая
};

// Функция для создания вариантов пиццы
async function createProductVariants(pizzaId: number) {
  // Варианты для pizzaType = 1

  const basePrice = randomDecimalNumber(250, 450);
  const baseWeight = randomDecimalNumber(200, 350);

  for (const size of sizesForPizzaType1) {
    const { priceCoefficient, weightCoefficient } = sizeAttributes[size];

    await prisma.productVariant.create({
      data: {
        productId: pizzaId,
        price: basePrice * priceCoefficient,
        pizzaType: 1,
        size: size,
        sizeType: "PORTIONS",
        weight: baseWeight * weightCoefficient,
      },
    });
  }

  // Варианты для pizzaType = 2
  for (const size of sizesForPizzaType2) {
    const { priceCoefficient, weightCoefficient } = sizeAttributes[size];

    await prisma.productVariant.create({
      data: {
        productId: pizzaId,
        price: basePrice * (priceCoefficient + 0.1),
        pizzaType: 2,
        size: size,
        sizeType: "PORTIONS",
        weight: baseWeight * (weightCoefficient - 0.02),
      },
    });
  }
}

// Функция для создания пицц
async function createPizzas() {
  for (const pizza of pizzas) {
    const createdPizza = await prisma.product.create({
      data: {
        name: pizza.name,
        imageUrl: pizza.imageUrl,
        categoryId: pizza.categoryId,
        additives: {
          connect: additives,
        },
        ingredients: {
          connect: pizza.ingredients.map((ingredientId) => ({ id: ingredientId })),
        },
        isNew: pizza.isNew,
        isVegan: pizza.isVegan,
        isSpicy: pizza.isSpicy,
        isPopular: pizza.isPopular,
      },
    });

    // Создание вариантов для каждой пиццы
    await createProductVariants(createdPizza.id);
  }
}

// Функция для создания остальных продуктов
async function createProducts() {
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        desc: product.desc,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      },
    });

    for (const variant of product.variants) {
      // Создание вариации для обычного продукта
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          price: randomDecimalNumber(120, 400),
          weight: variant.weight,
          size: variant.size,
          sizeType: product.sizeType as "LITERS" | "PIECES" | "PORTIONS",
        },
      });
    }
  }
}

// Основная функция для выполнения сидирования
async function up() {
  // Создание пользователей
  await prisma.user.createMany({
    data: [
      {
        firstName: "User",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        firstName: "Admin",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  // Создание категорий
  await prisma.category.createMany({
    data: categories,
  });

  // Создание ингредиентов
  await prisma.additive.createMany({
    data: additives,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  // Создание пицц и их вариантов
  await createPizzas();

  // Создание остальных продуктов (напр. напитки, десерты)
  await createProducts();

  // Создание корзин
  // await prisma.cart.createMany({
  //   data: [
  //     { userId: 1, totalAmount: 0, token: "11111" },
  //     { userId: 2, totalAmount: 0, token: "11111" },
  //   ],
  // });

  // Пример создания элемента корзины
  // await prisma.cartItem.create({
  //   data: {
  //     productVariantId: 1, // ID варианта продукта
  //     cartId: 1, // ID корзины
  //     quantity: 1,
  //     ingredients: {
  //       connect: [{ id: 1 }, { id: 2 }, { id: 3 }], // Подключение ингредиентов
  //     },
  //   },
  // });
}

// Очищаем базу данных
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

// Запуск миграции
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
