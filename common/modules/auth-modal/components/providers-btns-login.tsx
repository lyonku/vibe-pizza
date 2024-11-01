import { Button } from "@/common/ui";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

export const ProvidersBtnsLogin: FC = () => {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
            redirect: false,
          })
        }
        type="button"
        className="gap-2 h-12 flex-1 text-base"
      >
        <Image src="/images/google-logo.svg" width={24} height={24} alt="Логотип google" />
        Google
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          signIn("yandex", {
            callbackUrl: "/",
            redirect: false,
          })
        }
        type="button"
        className="gap-2 h-12 flex-1 text-base"
      >
        <Image src="/images/yandex-logo.svg" width={24} height={24} alt="Логотип google" />
        Yandex
      </Button>
    </div>
  );
};
