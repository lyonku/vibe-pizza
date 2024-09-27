import { Header } from "@/common/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe pizza | Главная",
  description: "Самая классная и вайбовая пицца",
};

interface HomeLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function HomeLayout({
  children,
  modal,
}: Readonly<HomeLayoutProps>) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      {modal}
    </>
  );
}
