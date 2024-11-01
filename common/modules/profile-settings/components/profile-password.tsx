"use client";

import { updateUserPassword } from "@/app/actions";
import { FormInput } from "@/common/components/form";
import {
  profileOauthPasswordFormSchema,
  profilePasswordFormSchema,
  ProfilePasswordFormType,
} from "@/common/schemas/profile-form-schema";
import { Button, Title } from "@/common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProfilePasswordProps {
  provider: string | null;
}

export const ProfilePassword: FC<ProfilePasswordProps> = ({ provider }) => {
  const isOauthSession = provider === "google" || provider === "yandex";

  const passwordform = useForm<ProfilePasswordFormType>({
    resolver: zodResolver(isOauthSession ? profileOauthPasswordFormSchema : profilePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitPassword = async (data: ProfilePasswordFormType) => {
    try {
      await updateUserPassword({
        oldPassword: isOauthSession ? "" : data.oldPassword,
        password: data.password,
      });

      passwordform.reset();

      toast.success("Данные обновлены 📝", {
        icon: "✅",
      });
    } catch (error) {
      console.error(error);

      toast.error(error instanceof Error ? error.message : "Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  return (
    <div className="px-[35px] pb-[35px] pt-[30px] bg-white rounded-[30px] flex-1 w-1/2 max-lg:px-[20px] max-lg:pb-[20px] max-lg:pt-[15px] max-md:w-full">
      <Title text="Изменить пароль" size="md" className="font-bold" />

      <FormProvider {...passwordform}>
        <form className="flex flex-col gap-5 mt-10" onSubmit={passwordform.handleSubmit(onSubmitPassword)}>
          <div className="flex flex-col gap-5">
            {!isOauthSession && (
              <FormInput type="password" name="oldPassword" label="Старый пароль" autoComplete="" />
            )}
            <FormInput type="password" name="password" label="Новый пароль" autoComplete="new-password" />
            <FormInput
              type="password"
              name="confirmPassword"
              label="Повторите пароль"
              autoComplete="new-password"
            />
          </div>

          <Button disabled={passwordform.formState.isSubmitting} className="text-base self-end" type="submit">
            Сохранить
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
