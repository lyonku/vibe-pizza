"use client";

import { cn, wait } from "@/common/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/common/ui";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { ProvidersBtnsLogin, AlternativeBtnsLogin } from "./components";
import toast from "react-hot-toast";
import { headerData } from "./constants/header-data";
import { RegisterForm, RegisterFormProps } from "./components/register-form";
import { LoginForm, LoginFormProps } from "./components/login-form";
import { LoginPhoneForm, LoginPhoneFormProps } from "./components/login-phone-form";
import { VerificationForm } from "./components/verification-form";

interface AuthModalProps {
  className?: string;
}

const formComponents = {
  register: (props: RegisterFormProps) => <RegisterForm {...props} setType={props.setType} />,
  login: (props: LoginFormProps) => <LoginForm {...props} />,
  "phone-login": (props: LoginPhoneFormProps) => <LoginPhoneForm {...props} />,
  "verification-email": (props: LoginFormProps) => <VerificationForm {...props} type="email" />,
  "verification-phone": (props: LoginFormProps) => <VerificationForm {...props} type="phone" />,
};

export type FormType = keyof typeof formComponents;

export const AuthModal: FC<AuthModalProps> = ({ className }) => {
  const [type, setType] = useState<FormType>("phone-login");
  const [isDialogOpen, setDialogOpen] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCloseDialog = () => {
    setDialogOpen(false);
    wait().then(() => (window.history.length > 2 ? router.back() : (window.location.href = "/")));
  };

  const isVerified = searchParams.has("verified");

  useEffect(() => {
    if (isVerified) {
      setType("login");
      setTimeout(() => {
        toast.success("Аккаунт подтверждён, осталось авторизоваться", {
          icon: "✅",
        });
      }, 100);
    }
  }, [isVerified]);

  const SelectedForm = formComponents[type];

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={cn("w-[450px] bg-white p-10", className)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-end gap-3 mb-2">
          <div>
            <DialogTitle className="text-3xl font-bold">{headerData[type].title}</DialogTitle>
            <DialogDescription className="text-[#7C7C7C] max-w-[250px] text-base">
              {headerData[type].desc}
            </DialogDescription>
          </div>
          <Image src={headerData[type].img} alt="phone-icon" width={80} height={80} />
        </div>

        <SelectedForm onClose={handleCloseDialog} setType={setType} />

        {!type.includes("verification") && <ProvidersBtnsLogin />}

        {!type.includes("verification") && (
          <div className="w-full flex items-center gap-3 text-gray-400">
            <hr className="flex-1" />
            или
            <hr className="flex-1" />
          </div>
        )}

        {!type.includes("verification") && <AlternativeBtnsLogin type={type} setType={setType} />}
      </DialogContent>
    </Dialog>
  );
};
