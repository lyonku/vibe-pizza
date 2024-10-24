import { Container } from "@/common/components";
import { getUserSession } from "@/common/lib/get-user-session";
import { CartButton } from "@/common/modules/cart-sheet";
import { Header } from "@/common/modules/header";
import { ProfileButton } from "@/common/modules/profile-button";
import { ProfileSidebar } from "@/common/modules/profile-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe pizza | Профиль",
  description: "Самый классный и крутой профиль пользователя",
};

export default async function CheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getUserSession();

  return (
    <div className="h-dvh flex flex-col">
      <Header
        classname="bg-[#F4F1EE] border-0"
        containerClassname="border-b border-[#DEDEDE]"
        hasSearch={false}
      >
        <ProfileButton isAuthorize={Boolean(session?.id)} />
        <CartButton />
      </Header>
      <main className="flex-1 bg-[#F4F1EE]">
        {session ? (
          <Container className="flex pt-10 flex-1 gap-10 items-start">
            <ProfileSidebar />
            {children}
          </Container>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
