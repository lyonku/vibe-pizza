import { FC } from "react";
import { EmailLayout } from "./email-layout";

interface SuccessPaymentProps {
  orderId: number;
  orderUrl: string;
}

export const SuccessPayment: FC<SuccessPaymentProps> = ({ orderId, orderUrl }) => (
  <EmailLayout>
    <h2 style={{ fontSize: "36px", margin: "0" }}>
      Спасибо <br />
      за покупку! 🎉
    </h2>
    <p style={{ fontSize: "20px", color: "#5E5E5E" }}>Ваш заказ №{orderId} успешно оплачен.</p>
    <hr style={{ margin: "20px" }} />

    <p style={{ fontSize: "20px", color: "#5E5E5E" }}>
      Чтобы узнать статус выполнения,
      <br /> нажмите на кнопку ниже.
    </p>

    <a
      href={orderUrl}
      style={{
        display: "inline-block",
        padding: "15px 30px",
        marginTop: "20px",
        backgroundColor: "#E11D48",
        color: "#ffffff",
        borderRadius: "20px",
        textDecoration: "none",
        fontSize: "20px",
        width: "100%",
        maxWidth: "350px",
        boxSizing: "border-box",
      }}
    >
      Перейти
    </a>
  </EmailLayout>
);
