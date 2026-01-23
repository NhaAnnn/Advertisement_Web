// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Manrope, Cinzel_Decorative } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import { Scroll } from "lucide-react";
import ScrollFix from "./components/scrollfix";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  // 1. Tên hiển thị trên Tab
  title: "Hoàng Thảo Anh | In Ấn & Quảng Cáo Chuyên Nghiệp",

  // 2. Mô tả khi chia sẻ link (SEO)
  description:
    "Dịch vụ thiết kế, in ấn, thi công quảng cáo và tổ chức sự kiện chuyên nghiệp.",

  // 3. Logo nhỏ trên Tab (Favicon)
  icons: {
    icon: "/logo-blue.png",
    shortcut: "/logo-blue.png",
    apple: "/logo-blue.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" style={{ colorScheme: 'light' }} className="light">
      {/* THÊM bg-noir VÀ text-sand VÀO ĐÂY */}
      <body
        className={`${playfair.variable} ${manrope.variable} ${cinzel.variable} font-sans bg-noir text-sand selection:bg-primary/30 selection:text-white antialiased`}
      >
        <ScrollFix />
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
