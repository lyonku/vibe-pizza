/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

interface SuccessPaymentProps {
  orderId: number;
  orderUrl: string;
}

export const SuccessPayment: FC<SuccessPaymentProps> = ({ orderId, orderUrl }) => (
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
                    <h1 style={{ fontSize: "36px", margin: "0", fontWeight: "700", textDecoration: "none" }}>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
