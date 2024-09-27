import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe pizza | Дашбоард",
  description: "Самая классная и вайбовая пицца",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
