"use client";

import { FC } from "react";
import { ListCollapse, LogOut, Settings } from "lucide-react";
import { Button } from "@/common/ui";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavButton } from "./components";

interface ProfileSidebarProps {}

export const ProfileSidebar: FC<ProfileSidebarProps> = () => {
  const pathname = usePathname();

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <nav className="flex flex-col items-left rounded-[30px] px-[20px] py-[30px] gap-4 max-lg:sticky max-lg:top-2 max-lg:z-10 top-bar xs:bg-white max-lg:flex-row max-lg:py-2 max-lg:px-2 max-md:justify-between max-md:w-full">
      <div className="flex gap-4 lg:flex-col max-md:gap-2">
        <Link href="/profile/settings">
          <NavButton isActive={pathname === "/profile/settings"}>
            <Settings strokeWidth={1.5} className="max-lg:w-4" /> Настройки
          </NavButton>
        </Link>
        <Link href="/profile/orders">
          <NavButton isActive={pathname === "/profile/orders"}>
            <ListCollapse strokeWidth={1.5} className="max-lg:w-4 " /> Заказы
          </NavButton>
        </Link>
      </div>

      {/* <Link href="/profile/settings">
        <NavButton>
          <MessageCircleWarning strokeWidth={1.5} /> Обратная связь
        </NavButton>
      </Link> */}
      <hr className="-mx-[20px] border-0 border-b border-[#F3F3F3] max-lg:hidden" />
      <Button variant="ghost" className="gap-2 text-base lg:w-full justify-start" onClick={onClickSignOut}>
        <LogOut strokeWidth={1.5} className="max-lg:w-4" />{" "}
        <span className="max-xs:hidden max-md:inline md:hidden">Выйти</span>
        <span className="max-md:hidden md:inline">Выйти из профиля</span>
      </Button>
    </nav>
  );
};
