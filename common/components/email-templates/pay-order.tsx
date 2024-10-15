/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { CartItemDTO } from "@/@types/prisma";
import { FC } from "react";

interface PayOrderProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  items: CartItemDTO[];
}

export const PayOrder: FC<PayOrderProps> = ({ orderId, totalAmount, paymentUrl, items }) => {
  return (
    <div
      style={{
        backgroundColor: "#F4F1EE",
        padding: "40px",
        maxWidth: "600px",
        boxSizing: "border-box",
      }}
    >
      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          maxWidth: "500px",
        }}
      >
        <tbody>
          <tr>
            <td align="center">
              <table role="presentation" style={{ paddingBottom: "20px" }}>
                <tr>
                  <td>
                    <a href="https://vibe-pizza.lyonku.ru/">
                      <img
                        src="https://i.ibb.co/yV2TCrC/pizza-slice-detailed-icon-by-Vexels.png"
                        alt="Vibe Pizza"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </a>
                  </td>
                  <td>
                    <a
                      href="https://vibe-pizza.lyonku.ru/"
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      <h1
                        style={{ fontSize: "36px", margin: "0", fontWeight: "700", textDecoration: "none" }}
                      >
                        <span style={{ color: "#E11D48" }}>VIBE</span> PIZZA
                      </h1>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "50px 30px",
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              <h2 style={{ fontSize: "40px", margin: "0" }}>Заказ №{orderId}</h2>
              <p style={{ fontSize: "32px", margin: "0" }}>на сумму {totalAmount} ₽</p>
              <p style={{ fontSize: "20px", color: "#5E5E5E" }}>
                В нашем невероятно <span style={{ color: "#E11D48" }}>вайбовом</span> месте вы оформили заказ,
                и вот что вы заказали:
              </p>
              <ul>
                {items?.map((item) => {
                  const product = item.productVariant.product;
                  return (
                    <li key={item.id} style={{ fontSize: "18px", color: "#5E5E5E", textAlign: "left" }}>
                      {`${product.name} (${item.quantity} шт.) - ${
                        item.productVariant.price * item.quantity
                      } ₽`}
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
