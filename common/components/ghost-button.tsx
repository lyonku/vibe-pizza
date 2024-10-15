import { FC, ReactNode } from "react";
import { Button } from "../ui";
import { cn } from "../lib/utils";

interface GhostButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const GhostButton: FC<GhostButtonProps> = ({ children, active, onClick, className }) => {
  return (
    <Button
      type="button"
      className={cn(
        "transition-all ease-out hover:bg-white",
        !active && "border border-white text-black shadow-ghost hover:shadow-lightghost",
        className
      )}
      variant="outline"
      onClick={() => onClick?.()}
    >
      {children}
    </Button>
  );
};
