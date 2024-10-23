import { CartItemDTO } from "@/@types/prisma";
import { FC } from "react";
import { EmailLayout } from "./email-layout";

interface PayOrderProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  items: CartItemDTO[];
}

export const PayOrder: FC<PayOrderProps> = ({ orderId, totalAmount, paymentUrl, items }) => {
  return (
    <EmailLayout>
      <h2 style={{ fontSize: "40px", margin: "0" }}>Заказ №{orderId}</h2>
      <p style={{ fontSize: "32px", margin: "0" }}>на сумму {totalAmount} ₽</p>
      <p style={{ fontSize: "20px", color: "#5E5E5E" }}>
        В нашем невероятно <span style={{ color: "#E11D48" }}>вайбовом</span> месте вы оформили заказ, и вот
        что вы заказали:
      </p>
      <ul>
        {items?.map((item) => {
          const product = item.productVariant.product;
          return (
            <li key={item.id} style={{ fontSize: "18px", color: "#5E5E5E", textAlign: "left" }}>
              {`${product.name} (${item.quantity} шт.) - ${item.productVariant.price * item.quantity} ₽`}
            </li>
          );
        })}
      </ul>

      <hr style={{ margin: "20px" }} />

      <p style={{ fontSize: "20px", color: "#5E5E5E" }}>
        Для оплаты перейдите по следующей <a href={paymentUrl}>ссылке</a> или нажмите на кнопку ниже
      </p>

      <a
        href={paymentUrl}
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
        }}
      >
        Оплатить
      </a>
    </EmailLayout>
  );
};
