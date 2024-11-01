import { resendCode } from "@/app/actions";
import { Api } from "@/common/services/api-client";
import { useUserStore } from "@/common/store/useUserStore";
import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@/common/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface VerificationFormProps {
  onClose?: VoidFunction;
  type: "email" | "phone";
}

export const VerificationForm: FC<VerificationFormProps> = ({ type, onClose }) => {
  const email = useUserStore((state) => state.email);
  const phone = useUserStore((state) => state.phone);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(30);
  const router = useRouter();

  async function auth() {
    try {
      setLoading(true);

      if (type === "phone") {
        const response = await signIn("phone", {
          code: value,
          redirect: false,
        });

        if (!response?.ok) {
          throw Error(response?.error || "");
        }

        toast.success("Вы успешно авторизовались!");

        onClose?.();
      }
      if (type === "email") {
        await Api.auth.verify(value);

        router.replace("/login?verified");
      }
    } catch (error) {
      console.error("Error [LOGIN_PHONE]", error);

      toast.error(error instanceof Error ? error.message : "Неверный верификационный код", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (value.length === 6) {
      auth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, router]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleRequestCode = async () => {
    if (!timer) {
      setTimer(30);
      try {
        await resendCode(type, email, phone);
        toast.success("Новый код успешно сгенерирован", {
          icon: "✅",
        });
      } catch (error) {
        console.error(error);

        toast.error(error instanceof Error ? error.message : "Произошла ошибка с созданием кода", {
          icon: "❌",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <InputOTPGroup key={i}>
              <InputOTPSlot index={i} className="h-[60px] w-[50px] text-2xl max-s:w-[40px] max-s:h-[50px] " />
            </InputOTPGroup>
          ))}
      </InputOTP>
      <Button
        loading={loading}
        className="w-full h-[55px] text-base mt-5"
        onClick={handleRequestCode}
        disabled={timer > 0}
      >
        {timer > 0 ? `Запросить код - через ${timer} сек.` : "Запросить код"}
      </Button>
    </div>
  );
};
