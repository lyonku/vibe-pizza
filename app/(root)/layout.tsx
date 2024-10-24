import { ProfileButton } from "@/common/modules/profile-button";
import { CartButton } from "@/common/modules/cart-sheet";
import { Header } from "@/common/modules/header";
import type { Metadata } from "next";
import { getUserSession } from "@/common/lib/get-user-session";

export const metadata: Metadata = {
  title: "Vibe pizza | Главная",
  description: "Самая классная и вайбовая пицца",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  const session = await getUserSession();

  return (
    <>
      <Header>
        <ProfileButton isAuthorize={Boolean(session?.id)} />
        <CartButton />
      </Header>
      <main className="">{children}</main>
    </>
  );
}
