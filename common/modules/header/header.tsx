import { cn } from "@/common/lib/utils";
import { FC, ReactNode } from "react";
import { Container } from "@/common/components";
import { SearchInput } from "./components";
import Image from "next/image";

interface HeaderProps {
  hasSearch?: boolean;
  classname?: string;
  children?: ReactNode;
  containerClassname?: string;
}

/**
 * Компонент Header
 *
 * @param {HeaderProps} props - Свойства компонента.
 * @returns JSX элемент, представляющий шапку сайта с логотипом, опциональным поиском и элементами в правой части.
 *
 * @example
 * <Header hasSearch>
 *   <Button>Войти</Button>
 *   <Button>Корзина</Button>
 * </Header>
 */

export const Header: FC<HeaderProps> = ({
  hasSearch = true,
  children,
  classname,
  containerClassname,
}: HeaderProps) => {
  return (
    <header className={cn("border-b border-[#EDEDED]", classname)}>
      <Container
        className={cn("flex items-start justify-between py-4 lg:py-8 max-lg:gap-5", containerClassname)}
      >
        {/* Левая часть */}
        <a href="/" className="flex items-center gap-2 lg:gap-5">
          <Image
            src="/logo.svg"
            alt="Логотип пиццы"
            width={48}
            height={48}
            className="max-lg:w-10 max-lg:h-12 lg:scale-[1.4] "
          />
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl uppercase font-black max-lg:leading-5">
              <span className="text-primary">Vibe</span> pizza
            </h1>
            <p className="text-[12px] leading-3 lg:text-sm text-gray-400 lg:leading-4">вайбовей уже некуда</p>
          </div>
        </a>

        {hasSearch && (
          <div className="lg:mx-10 flex-1 max-sm:hidden">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3 max-md:gap-2">{children}</div>
      </Container>
    </header>
  );
};
