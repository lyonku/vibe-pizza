import { Header } from "@/common/modules/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe pizza | Корзина",
  description: "Самый классный и крутой покупатель в корзине",
};

export default function CheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header
        classname="bg-[#F4F1EE] border-0"
        containerClassname="border-b border-[#DEDEDE]"
        hasCartBtn={false}
        hasSearch={false}
      />
      <main className="flex-1 bg-[#F4F1EE]">{children}</main>
    </>
  );
}
