import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MDMCCC - Marocains du Monde Classic Car Club",
  description: "De verbindende kracht van klassiekers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}