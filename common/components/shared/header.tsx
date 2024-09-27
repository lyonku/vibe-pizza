import { cn } from "@/common/lib/utils";
import { FC } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { SearchInput } from "./search-input";

interface HeaderProps {
  classname?: string;
}

export const Header: FC<HeaderProps> = ({ classname }) => {
  return (
    <header className={cn("border border-b", classname)}>
      <Container className="flex items-start justify-between py-8">
        {/* Левая часть */}
        <Link href="/" className="flex items-center gap-5">
          <Image
            src="/logo.svg"
            alt="Логотип пиццы"
            width={48}
            height={48}
            className="scale-[1.4] "
          />
          <div className="flex flex-col">
            <h1 className="text-2xl uppercase font-black">
              <span className="text-primary">Vibe</span> pizza
            </h1>
            <p className="text-sm text-gray-400 leading-4">
              вайбовей уже некуда
            </p>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-1 h-[50px] px-5 font-semibold text-base"
          >
            <User size={16} />
            Войти
          </Button>
          <div>
            <Button className="group relative h-[50px] px-5 text-base">
              <b>520 ₽</b>
              <span className="h-full w-[1px] bg-white/30 mx-3 max-h-[25px]"></span>
              <div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
                <ShoppingCart
                  size={16}
                  className="relative -mt-[2px]"
                  strokeWidth={2.5}
                />
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
