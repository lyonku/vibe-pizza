import { InfoBlock } from "@/common/components";
import { headers } from "next/headers";
import HomeLayout from "./(root)/layout";
import Home from "./(root)/page";
import { GetSearchParams } from "./helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe pizza | Главная",
  description: "Самая классная и вайбовая пицца",
};

export default function RootLayout({ searchParams }: { searchParams: GetSearchParams }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isModal = pathname.startsWith("/product/") || pathname.startsWith("/auth");

  return (
    <HomeLayout>
      {isModal ? (
        <Home searchParams={searchParams} />
      ) : (
        <div className="flex flex-col items-center justify-center my-auto h-[calc(80vh)]">
          <InfoBlock
            title="Страница не найдена"
            text="Проверьте корректность введённого адреса или повторите попытку позже"
            imageUrl="/images/not-found.svg"
          />
        </div>
      )}
    </HomeLayout>
  );
}
