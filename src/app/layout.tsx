import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import Header from "@/components/admin/Header";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata: Metadata = {
  title: "Esthetic Match",
  description: "Match with the right aesthetic expert for your goals",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SidebarProvider>
        <NotificationProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} antialiased`}
          >
            {/* <Header /> */}
            {children}
          </body>
        </NotificationProvider>
      </SidebarProvider>
    </html>
  );
}
