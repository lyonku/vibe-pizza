import { registerUserWithPhone } from "@/app/actions";
import { FormInput } from "@/common/components/form";
import { loginPhoneFormSchema, LoginPhoneFormType } from "@/common/schemas";
import { Button } from "@/common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormType } from "../auth-modal";
import { useUserStore } from "@/common/store/useUserStore";

export interface LoginPhoneFormProps {
  onClose?: VoidFunction;
  setType: Dispatch<SetStateAction<FormType>>;
}

export const LoginPhoneForm: FC<LoginPhoneFormProps> = ({ setType }) => {
  const setPhone = useUserStore((state) => state.setPhone);
  const form = useForm<LoginPhoneFormType>({
    resolver: zodResolver(loginPhoneFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: LoginPhoneFormType) => {
    try {
      await registerUserWithPhone(data.phone);

      setPhone(data.phone);
      setType("verification-phone");

      toast.success("Для подтверждения аккаунта введите код из СМС");

      // onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Не удалось войти в аккаунт", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="phone" type="tel" label="Телефон" required autoFocus={false} />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Получить код в SMS
        </Button>
      </form>
    </FormProvider>
  );
};
