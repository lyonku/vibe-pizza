import { InfoBlock } from "@/common/components";
import { headers } from "next/headers";
import HomeLayout from "./(root)/layout";
import Home from "./(root)/page";
import { GetSearchParams } from "./helpers";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vibe pizza | Главная",
  description: "Самая классная и вайбовая пицца",
};

export default function RootLayout({ searchParams }: { searchParams: GetSearchParams }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isModal =
    pathname.startsWith("/product/") || pathname.startsWith("/login") || pathname.startsWith("/order");

  return (
    <HomeLayout>
      {isModal ? (
        <Home searchParams={searchParams} />
      ) : (
        <div className="flex flex-col items-center justify-center my-auto h-[calc(80vh)]">
          <InfoBlock
            title="Страница не найдена"
            text="Проверьте корректность введённого адреса или повторите попытку позже"
            image={<Image src="/images/not-found.svg" alt="" width={340} height={345} />}
          />
        </div>
      )}
    </HomeLayout>
  );
}
