import { useMediaQuery } from "react-responsive";
import { CartButton } from "../../cart-sheet";
import { cn } from "@/common/lib/utils";
import { FC } from "react";

interface Props {
  isSticky: boolean;
}

export const CartButtonWithMedia: FC<Props> = ({ isSticky }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    !isMobile && (
      <CartButton
        className={cn("", isSticky && "ml-3 w-n", !isSticky && "max-sm:w-0 sm:w-0 p-0 m-0 border-0 ")}
        needRunFetch={false}
      />
    )
  );
};
