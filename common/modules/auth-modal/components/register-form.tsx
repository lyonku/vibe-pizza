"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInput } from "@/common/components/form";
import { Button } from "@/common/ui";
import { registerFormSchema, RegisterFormType } from "@/common/schemas";
import { registerUser } from "@/app/actions";
import { FormType } from "../auth-modal";
import { useUserStore } from "@/common/store/useUserStore";

export interface RegisterFormProps {
  onClose?: VoidFunction;
  setType: Dispatch<SetStateAction<FormType>>;
}

export const RegisterForm: FC<RegisterFormProps> = ({ setType }) => {
  const setEmail = useUserStore((state) => state.setEmail);
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerUser({
        email: data.email,
        firstName: data.firstName,
        password: data.password,
      });

      setEmail(data.email);
      toast.success("Регистрация успешна 📝. На почту отправлена инструкция", {
        icon: "✅",
      });

      setType("verification-email");
    } catch (error) {
      console.error(error);

      toast.error(error instanceof Error ? error.message : "Неверный E-Mail или пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="firstName" label="Имя" required type="text" />
        <FormInput name="email" label="E-Mail" required type="email" />
        <FormInput name="password" label="Пароль" type="password" required autoComplete="new-password" />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
          autoComplete="new-password"
        />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
