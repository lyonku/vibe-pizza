import { FC } from "react";
import { EmailLayout } from "./email-layout";

interface VerificationUserProps {
  code: string;
}

export const VerificationUser: FC<VerificationUserProps> = ({ code }) => {
  return (
    <EmailLayout>
      <h2 style={{ fontSize: "32px", margin: "0" }}>Код подтверждения:</h2>
      <p
        style={{
          fontSize: "26px",
          margin: "10px 0",
          padding: "10px",
          backgroundColor: "#f4f1ee",
          borderRadius: "10px",
        }}
      >
        {code}
      </p>

      <p style={{ fontSize: "16px", color: "#5E5E5E" }}>Введите код на сайте или нажмите кнопку ниже:</p>

      <a
        href={`https://vibe-pizza.lyonku.ru/api/auth/verify?code=${code}`}
        style={{
          display: "inline-block",
          padding: "12px 20px",
          marginTop: "20px",
          backgroundColor: "#E11D48",
          color: "#ffffff",
          borderRadius: "10px",
          textDecoration: "none",
          fontSize: "18px",
          width: "100%",
          maxWidth: "280px",
        }}
      >
        Подтвердить регистрацию
      </a>
    </EmailLayout>
  );
};
