"use client";

import { cn, wait } from "@/common/lib/utils";
import { Button, Dialog, DialogContent, DialogDescription, DialogTitle } from "@/common/ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface AuthModalProps {
  className?: string;
}

export const AuthModal: FC<AuthModalProps> = ({ className }) => {
  const [isDialogOpen, setDialogOpen] = useState(true);
  const router = useRouter();

  const handleCloseDialog = () => {
    setDialogOpen(false);
    wait().then(() => (window.history.length > 2 ? router.back() : (window.location.href = "/")));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <VisuallyHidden>
        <DialogTitle>Авторизация</DialogTitle>
        <DialogDescription>Модальное окно с авторизацией</DialogDescription>
      </VisuallyHidden>
      <DialogContent className={cn("w-[450px] bg-white p-10", className)}>
        FORM
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image src="/images/google-logo.svg" width={24} height={24} alt="Логотип google" />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
