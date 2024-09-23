import { Product } from "@prisma/client";
import { axiosInstance } from "./instanse";
import { ApiRoutes } from "./api-routes";

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    }
  );

  return data;
};
