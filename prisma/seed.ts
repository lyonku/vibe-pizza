import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import { categories, ingredients, pizzas, products } from "./constants";

const prisma = new PrismaClient();

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const sizesForPizzaType1 = [20, 30, 40]; // Размеры для pizzaType = 1
const sizesForPizzaType2 = [30, 40]; // Размеры для pizzaType = 2

// Функция для создания вариантов пиццы
async function createProductVariants(pizzaId: number) {
  // Варианты для pizzaType = 1
  for (const size of sizesForPizzaType1) {
    await prisma.productVariant.create({
      data: {
        productId: pizzaId,
        price: randomDecimalNumber(250, 700) + size,
        pizzaType: 1,
        size,
      },
    });
  }

  // Варианты для pizzaType = 2
  for (const size of sizesForPizzaType2) {
    await prisma.productVariant.create({
      data: {
        productId: pizzaId,
        price: randomDecimalNumber(250, 700) + size,
        pizzaType: 2,
        size,
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
        desc: pizza.desc,
        imageUrl: pizza.imageUrl,
        categoryId: pizza.categoryId,
        ingredients: {
          connect: ingredients,
        },
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

    // Создание вариации для обычного продукта
    await prisma.productVariant.create({
      data: {
        productId: createdProduct.id,
        price: randomDecimalNumber(50, 300),
      },
    });
  }
}

// Основная функция для выполнения сидирования
async function up() {
  // Создание пользователей
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
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
  await prisma.ingredient.createMany({
    data: ingredients,
  });

  // Создание пицц и их вариантов
  await createPizzas();

  // Создание остальных продуктов (напр. напитки, десерты)
  await createProducts();

  // Создание корзин
  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "11111" },
      { userId: 2, totalAmount: 0, token: "11111" },
    ],
  });

  // Пример создания элемента корзины
  await prisma.cartItem.create({
    data: {
      productItemId: 1, // ID варианта продукта
      cartId: 1, // ID корзины
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }], // Подключение ингредиентов
      },
    },
  });
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
