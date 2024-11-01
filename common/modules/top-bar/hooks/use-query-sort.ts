import QueryString from "qs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUpdateEffect } from "react-use";

export const useQuerySort = (value: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useUpdateEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const updatedParams = {
      ...currentParams,
      sort: value,
    };

    const queryString = QueryString.stringify(updatedParams, { arrayFormat: "comma" });

    router.push(`?${queryString}`, { scroll: false });
  }, [value]);
};
