import { cn } from "@/common/lib/utils";
import { FC } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Container } from "@/common/components";
import { Button } from "@/common/ui";
import { CartButton, SearchInput } from "./components";
import Image from "next/image";

interface HeaderProps {
  hasSearch?: boolean;
  hasCartBtn?: boolean;
  classname?: string;
  containerClassname?: string;
}

export const Header: FC<HeaderProps> = ({
  hasSearch = true,
  hasCartBtn = true,
  classname,
  containerClassname,
}) => {
  return (
    <header className={cn("border-b border-[#EDEDED]", classname)}>
      <Container className={cn("flex items-start justify-between py-8", containerClassname)}>
        {/* Левая часть */}
        <Link href="/" className="flex items-center gap-5">
          <Image src="/logo.svg" alt="Логотип пиццы" width={48} height={48} className="scale-[1.4] " />
          <div className="flex flex-col">
            <h1 className="text-2xl uppercase font-black">
              <span className="text-primary">Vibe</span> pizza
            </h1>
            <p className="text-sm text-gray-400 leading-4">вайбовей уже некуда</p>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1 h-[50px] px-5 font-semibold text-base">
            <User size={16} />
            Войти
          </Button>
          {hasCartBtn && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
