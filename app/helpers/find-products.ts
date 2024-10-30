import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
  tags?: string;
  sort?: "популярное" | "недорогое" | "дорогое" | "новизне";
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1500;

export const findProducts = async (params: GetSearchParams) => {
  const ingredientsIdArr = params?.ingredients?.split(",").map(Number);
  const pizzaTypes = params?.pizzaTypes?.split(",").map(Number);
  const sizes = params?.sizes?.split(",").map(Number);
  const isNew = params.tags?.includes("new");
  const isVegan = params.tags?.includes("vegan");
  const isSpicy = params.tags?.includes("spicy");

  const minPrice = Number(params?.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params?.priceTo) || DEFAULT_MAX_PRICE;

  const sort = params?.sort || "популярное";

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
          OR:
            isSpicy || isVegan || isNew
              ? [
                  { isSpicy: isSpicy || undefined },
                  { isVegan: isVegan || undefined },
                  { isNew: isNew || undefined },
                ]
              : undefined,
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              size: sizes ? { in: sizes } : undefined,
              pizzaType: pizzaTypes ? { in: pizzaTypes } : undefined,
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
      },
    },
  });

  categories.forEach((category) => {
    category.products.sort((a, b) => {
      if (sort === "популярное") {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }

      if (sort === "новизне") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }

      const minPriceA = Math.min(...(a.variants.map((v) => v.price) || [Infinity]));
      const minPriceB = Math.min(...(b.variants.map((v) => v.price) || [Infinity]));
      return sort === "недорогое" ? minPriceA - minPriceB : minPriceB - minPriceA;
    });
  });

  return categories;
};
