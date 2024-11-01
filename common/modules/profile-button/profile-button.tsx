"use client";

import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/ui/dropdown-menu";
import { ListCollapse, LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { useDebounce } from "react-use";
import { useMediaQuery } from "react-responsive";

interface ProfileButtonProps {
  className?: string;
  isAuthorize?: boolean;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ className, isAuthorize }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [debouncedDropdown, setDebouncedDropdown] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 950px)" });
  const { data: session } = useSession();

  useDebounce(
    () => {
      setDebouncedDropdown(openDropdown);
    },
    250,
    [openDropdown]
  );

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className={cn("", className)}>
      {isAuthorize || session ? (
        <DropdownMenu
          modal={false}
          open={!isTabletOrMobile && debouncedDropdown}
          onOpenChange={() => setOpenDropdown(false)}
        >
          <DropdownMenuTrigger asChild>
            <Link href="/profile" className="cursor-pointer">
              <Button
                variant="outline"
                className="flex items-center gap-1 lg:h-[50px] px-5 lg:font-semibold text-base max-md:p-3"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <User size={16} />
                <span className="max-md:hidden">Профиль</span>
              </Button>
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="w-[140px]"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <Link href="/profile/settings" scroll={false}>
              <DropdownMenuItem className="cursor-pointer font-semibold h-10">
                <Settings strokeWidth={1.5} />
                Настройки
              </DropdownMenuItem>
            </Link>
            <Link href="/profile/orders" scroll={false}>
              <DropdownMenuItem className="flex cursor-pointer font-semibold h-10">
                <ListCollapse strokeWidth={1.5} />
                Заказы
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClickSignOut} className="flex cursor-pointer font-semibold h-10">
              <LogOut strokeWidth={1.5} />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" scroll={false}>
          <Button
            variant="outline"
            className="flex items-center gap-1 lg:h-[50px] px-5 lg:font-semibold text-base max-md:p-3"
          >
            <User size={16} />
            <span className="max-md:hidden">Войти</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
