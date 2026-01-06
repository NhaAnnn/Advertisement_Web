// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Manrope, Cinzel_Decorative } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import { Scroll } from "lucide-react";
import ScrollFix from "./components/scrollfix";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cinzel = Cinzel_Decorative({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "ArtPrint Studio | Luxury Printing Service",
  description: "Dịch vụ in ấn nghệ thuật cao cấp tại Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark ">
      {/* THÊM bg-noir VÀ text-sand VÀO ĐÂY */}
      <body className={`${playfair.variable} ${manrope.variable} ${cinzel.variable} font-sans bg-noir text-sand selection:bg-primary/30 selection:text-white antialiased`}>
        <ScrollFix />
        <Navbar />

        {children}

        <Footer />

      </body>
    </html>
  );
}