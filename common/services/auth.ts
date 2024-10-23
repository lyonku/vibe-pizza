import { ApiRoutes } from "./api-routes";
import { axiosInstance } from "./instance";

export const verify = async (code: string) => {
  const { data } = await axiosInstance.get(ApiRoutes.VERIFY, {
    params: { code },
  });

  return data;
};
