import { Providers } from "./providers";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--nunito-font",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
      </head>
      <body className={nunito.className}>
        <Providers>
          <>
            {children}
            {modal}
          </>
        </Providers>
      </body>
    </html>
  );
}
