import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать не менее 6 символов" })
  .max(20, { message: "Пароль должен содержать не более чем 20 символов" });

export const profilePersonalInfoFormSchema = z.object({
  firstName: z.string().min(2, { message: "Введите корректное имя" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Введите корректную почту" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.date({ message: "Введите корректный дату рождения" }).optional(),
});

export const profilePasswordFormSchema = z
  .object({
    oldPassword: passwordSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type ProfilePersonalInfoType = z.infer<typeof profilePersonalInfoFormSchema>;
export type ProfilePasswordFormType = z.infer<typeof profilePasswordFormSchema>;
