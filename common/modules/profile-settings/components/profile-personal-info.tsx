"use client";

import { updateUserInfo } from "@/app/actions";
import { FormAddressInput, FormInput } from "@/common/components/form";
import { profilePersonalInfoFormSchema, ProfilePersonalInfoType } from "@/common/schemas/profile-form-schema";
import { Button, Title } from "@/common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ProfileDatePicker from "./profile-date-picker";
import Image from "next/image";

interface ProfilePersonalInfoProps {
  data: User;
}

export const ProfilePersonalInfo: FC<ProfilePersonalInfoProps> = ({ data }) => {
  const [isBirthdayAdded, setBirthdayAdded] = useState(Boolean(data.birthday));

  const personalInfoForm = useForm({
    resolver: zodResolver(profilePersonalInfoFormSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName || undefined,
      email: data.email,
      phone: data.phone || undefined,
      address: data.address || undefined,
      birthday: data.birthday || undefined,
    },
  });

  const onSubmitPersonalInfo = async (data: ProfilePersonalInfoType) => {
    try {
      await updateUserInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        birthday: data.birthday,
      });

      if (data.birthday) {
        setBirthdayAdded(true);
      }

      toast.error("Данные обновлены 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  return (
    <div className="relative px-[35px] pb-[35px] pt-[30px] bg-white rounded-[30px] w-full">
      <Title text="Личные данные" size="md" className="font-bold" />

      {data.picture && (
        <Image
          src={
            data.provider === "yandex"
              ? `https://avatars.yandex.net/get-yapic/${data.picture}/islands-retina-50`
              : data.picture
          }
          alt=""
          width={60}
          height={60}
          className="absolute top-[30px] right-[35px] rounded-full"
        />
      )}

      <FormProvider {...personalInfoForm}>
        <form
          className="flex flex-col gap-5 mt-10"
          onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)}
        >
          <div className="grid grid-cols-2 gap-5">
            <FormInput name="firstName" label="Имя" placeholder="" />
            <FormInput name="lastName" label="Фамилия" />
            <FormInput name="email" label="E-Mail" />
            <FormInput name="phone" label="Телефон" type="tel" />
          </div>
          <FormAddressInput name="address" label="Адрес" />

          <ProfileDatePicker isBirthdayAdded={isBirthdayAdded} />

          <Button
            disabled={personalInfoForm.formState.isSubmitting}
            className="text-base self-end"
            type="submit"
          >
            Сохранить
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
