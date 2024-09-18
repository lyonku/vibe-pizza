import { cn } from "@/lib/utils";
import { FC } from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface HeaderProps {
  classname?: string;
}

export const Header: FC<HeaderProps> = ({ classname }) => {
  return (
    <header className={cn("border border-b", classname)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <div className="flex items-center gap-4">
          <Image src="/logo.svg" alt="Логотип пиццы" width={45} height={45} />
          <div className="flex flex-col">
            <h1 className="text-2xl uppercase font-black">Vibe pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вайбовей уже некуда
            </p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          <div>
            <Button className="group relative">
              <b>520 ₽</b>
              <span className="h-full w-[1px] bg-white/30 mx-3"></span>
              <div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={15} className="relative" />
                <b>3</b>
              </div>
              <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
