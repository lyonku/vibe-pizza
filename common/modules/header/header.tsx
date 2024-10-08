import { cn } from "@/common/lib/utils";
import { FC } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Container } from "@/common/components";
import { Button } from "@/common/ui";
import { CartButton, SearchInput } from "./components";
import Image from "next/image";

interface HeaderProps {
  classname?: string;
}

export const Header: FC<HeaderProps> = ({ classname }) => {
  return (
    <header className={cn("border border-b", classname)}>
      <Container className="flex items-start justify-between py-8">
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

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1 h-[50px] px-5 font-semibold text-base">
            <User size={16} />
            Войти
          </Button>
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
