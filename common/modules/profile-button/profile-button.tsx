"use client";

import { cn } from "@/common/lib/utils";
import { Button } from "@/common/ui";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

interface ProfileButtonProps {
  className?: string;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ className }) => {
  const { data: session } = useSession();

  return (
    <div className={cn("", className)}>
      <Link href={session ? "/profile" : "/auth"}>
        <Button variant="outline" className="flex items-center gap-1 h-[50px] px-5 font-semibold text-base">
          <User size={16} />
          {session ? "Профиль" : "Войти"}
        </Button>
      </Link>
    </div>
  );
};
