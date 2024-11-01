import { FormInput } from "@/common/components/form";
import { loginFormSchema, LoginFormType } from "@/common/schemas";
import { Button } from "@/common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormType } from "../auth-modal";

export interface LoginFormProps {
  onClose?: VoidFunction;
  setType: Dispatch<SetStateAction<FormType>>;
}

export const LoginForm: FC<LoginFormProps> = ({ onClose, setType }) => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await signIn("email", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!response?.ok) {
        throw Error(response?.error || "");
      }

      toast.success("Вы успешно авторизовались!");

      onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]", error);

      if (error instanceof Error && error.message.includes("Пользователь не подтверждён")) {
        setType("verification-email");
      }

      toast.error(error instanceof Error ? error.message : "Не верный логин и(или) пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required inputClassName="white-autofill" autoCompleteFix />
        <FormInput
          type="password"
          name="password"
          label="Пароль"
          required
          inputClassName="white-autofill"
          autoCompleteFix
        />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
