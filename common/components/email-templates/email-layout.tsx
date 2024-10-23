/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode } from "react";

interface EmailLayoutProps {
  children: ReactNode;
}

export const EmailLayout: FC<EmailLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#F4F1EE",
        padding: "10px",
        paddingBottom: "40px",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: "450px",
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
                        style={{ width: "60px", height: "60px" }}
                      />
                    </a>
                  </td>
                  <td>
                    <a
                      href="https://vibe-pizza.lyonku.ru/"
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      <h1
                        style={{
                          fontSize: "28px",
                          margin: "0",
                          fontWeight: "700",
                          textDecoration: "none",
                        }}
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
                padding: "30px 20px",
                textAlign: "center",
              }}
            >
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
