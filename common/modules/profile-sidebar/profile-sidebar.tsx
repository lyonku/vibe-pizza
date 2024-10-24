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
    <nav className="flex flex-col items-left bg-white rounded-[30px] px-[20px] py-[30px] gap-4">
      <Link href="/profile/settings">
        <NavButton isActive={pathname === "/profile/settings"}>
          <Settings strokeWidth={1.5} /> Настройки
        </NavButton>
      </Link>
      <Link href="/profile/orders">
        <NavButton isActive={pathname === "/profile/orders"}>
          <ListCollapse strokeWidth={1.5} /> Заказы
        </NavButton>
      </Link>
      {/* <Link href="/profile/settings">
        <NavButton>
          <MessageCircleWarning strokeWidth={1.5} /> Обратная связь
        </NavButton>
      </Link> */}
      <hr className="-mx-[20px] border-0 border-b border-[#F3F3F3]" />
      <Button variant="ghost" className="gap-2 text-base w-full justify-start" onClick={onClickSignOut}>
        <LogOut strokeWidth={1.5} /> Выйти из профиля
      </Button>
    </nav>
  );
};
