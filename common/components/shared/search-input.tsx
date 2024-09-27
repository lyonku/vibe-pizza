"use client";

import { cn } from "@/common/lib/utils";
import { Api } from "@/common/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

interface SearchInputProps {
  className?: string;
}

export const SearchInput: FC<SearchInputProps> = (className) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const items = await Api.products.search(searchQuery);
        setProducts(items);
      } catch (error) {
        console.log();
      }
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      <div
        className={cn(
          "fixed bg-black/50 -z-10 opacity-0 transition-opacity",
          focused && "inset-0 z-30 opacity-100"
        )}
      ></div>
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-[50px] z-30",
          className
        )}
      >
        <Search
          size={16}
          className="absolute top-1/2 translate-y-[-50%] left-5 text-[#ADADAD]"
        />
        <input
          className="rounded-2xl outline-none w-full bg-[#F9F9F9] pl-12 placeholder-[#C0C0C0]"
          type="text"
          placeholder="Поиск пиццы..."
          onFocus={handleInputFocus}
          onChange={handleChangeInput}
          value={searchQuery}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl px-2 py-3 top-20 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-16"
            )}
          >
            {products.map((product, index) => {
              return (
                <Link
                  href={`/product/${product.id}`}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/10 rounded-xl transition-colors"
                  key={index}
                  onClick={onClickItem}
                >
                  <Image width={32} height={32} src={product.imageUrl} alt="" />
                  <span className="">{product.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
