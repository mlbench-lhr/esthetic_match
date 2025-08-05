import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Esthetic Landing Page",
  description: "Match with the right aesthetic expert for your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}
