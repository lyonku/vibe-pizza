import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import { FC, ReactNode } from "react";

interface NavButtonProps {
  isActive?: boolean;
  children?: ReactNode;
}

export const NavButton: FC<NavButtonProps> = ({ isActive, children }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "gap-2 text-base w-full justify-start max-md:p-1",
        isActive && "text-primary hover:text-primary"
      )}
    >
      {children}
    </Button>
  );
};
