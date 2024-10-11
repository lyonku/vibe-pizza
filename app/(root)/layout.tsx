import { Header } from "@/common/modules/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe pizza | Главная",
  description: "Самая классная и вайбовая пицца",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
}
