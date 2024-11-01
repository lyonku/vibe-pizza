import { z } from "zod";

export const loginPhoneFormSchema = z.object({
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
});

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать не менее 6 символов" })
  .max(20, { message: "Пароль должен содержать не более чем 20 символов" });

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .merge(
    z.object({
      firstName: z.string().min(2, { message: "Введите ваше имя" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginFormType = z.infer<typeof loginFormSchema>;
export type RegisterFormType = z.infer<typeof registerFormSchema>;
export type LoginPhoneFormType = z.infer<typeof loginPhoneFormSchema>;
