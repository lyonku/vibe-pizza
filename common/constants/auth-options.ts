import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";
import { AuthOptions } from "next-auth";
import { generateVerificationCode, sendEmail } from "@/app/helpers";
import { VerificationUser } from "../components/email-templates";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID || "",
      clientSecret: process.env.YANDEX_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          firstName: profile.first_name || profile.login,
          email: profile.default_email,
          image: profile.default_avatar_id,
          role: "USER" as UserRole,
        };
      },
    }),
    CredentialsProvider({
      id: "email",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) {
          throw new Error("Пользователь не найден");
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid && !findUser.password) {
          return null;
        }

        if (!findUser.verified) {
          const code = generateVerificationCode(findUser.id);

          const findCode = await prisma.verificationCode.findFirst({
            where: {
              userId: findUser.id,
            },
          });

          if (findCode) {
            await prisma.verificationCode.delete({
              where: {
                userId: findUser.id,
              },
            });
          }

          await prisma.verificationCode.create({
            data: {
              code,
              userId: findUser.id,
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
          });

          await sendEmail(
            findUser.email,
            "Next Pizza / Подтверждение регистрации",
            VerificationUser({ code })
          );

          throw new Error("Пользователь не подтверждён, новое письмо с кодом было оправлено на почту");
        }

        return {
          id: String(findUser.id),
          email: findUser.email,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          role: findUser.role,
        };
      },
    }),
    CredentialsProvider({
      id: "phone",
      name: "Phone",
      credentials: {
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const findCode = await prisma.verificationCode.findFirst({
          where: {
            code: credentials.code,
          },
        });

        if (!findCode) {
          throw new Error("Введенный код не верный");
        }

        const findUser = await prisma.user.findFirst({
          where: {
            id: findCode.userId,
          },
        });

        if (!findUser) {
          throw new Error("Пользователь не найден");
        }

        await prisma.user.update({
          where: {
            id: findCode.userId,
          },
          data: {
            verified: new Date(),
          },
        });

        await prisma.verificationCode.delete({
          where: {
            id: findCode.id,
          },
        });

        return {
          id: String(findUser.id),
          email: findUser.email,
          firstName: findUser.firstName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "email" || account?.provider === "phone") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            firstName: user.name || "User #" + user.id,
            password: "",
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.error("Error [SIGNIN]", error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      let findUser;

      if (token.email) {
        findUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        });
      } else {
        findUser = await prisma.user.findFirst({
          where: {
            id: Number(token.sub),
          },
        });
      }

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.firstName = findUser.firstName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
