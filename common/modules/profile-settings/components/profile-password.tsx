"use client";

import { updateUserPassword } from "@/app/actions";
import { FormInput } from "@/common/components/form";
import { profilePasswordFormSchema, ProfilePasswordFormType } from "@/common/schemas/profile-form-schema";
import { Button, Title } from "@/common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProfilePasswordProps {}

export const ProfilePassword: FC<ProfilePasswordProps> = () => {
  const passwordform = useForm<ProfilePasswordFormType>({
    resolver: zodResolver(profilePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitPassword = async (data: ProfilePasswordFormType) => {
    try {
      await updateUserPassword({
        oldPassword: data.oldPassword,
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
    <div className="px-[35px] pb-[35px] pt-[30px] bg-white rounded-[30px] flex-1 w-1/2">
      <Title text="Изменить пароль" size="md" className="font-bold" />

      <FormProvider {...passwordform}>
        <form className="flex flex-col gap-5 mt-10" onSubmit={passwordform.handleSubmit(onSubmitPassword)}>
          <div className="flex flex-col gap-5">
            <FormInput type="password" name="oldPassword" label="Старый пароль" autoComplete="" />
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