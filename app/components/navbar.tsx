/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";

// Menu gốc của bạn (chỉ 3 mục)
const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Liên hệ", href: "/contact" },
];

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"], // Độ đậm nhất để tạo khối vững chắc
  display: "swap",
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 border-b
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl py-3 border-black/5 shadow-sm"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* ================= LOGO MỚI (Ảnh + Chữ HOÀNG THẢO ANH) ================= */}
          <Link
            href="/"
            // Giảm khoảng cách gap để kết nối ảnh và chữ tốt hơn
            className="group flex items-center relative z-50"
          >
            {/* 1. Phần Ảnh Logo: Thu nhỏ lại kích thước chuẩn */}
            {/* Mobile: 40px (w-10), Desktop: 56px (w-14) -> Vừa vặn, không bị thô */}
            <div
              className={`relative w-10 h-10 md:w-14 md:h-14  rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300

        `}
            >
              <img
                src="/logo-blue.png"
                alt="Logo Hoàng Thảo Anh"
                className="w-full h-full object-contain p-1" // p-1 tạo khoảng thở nhẹ
              />
            </div>

            {/* 2. Phần Chữ Thương Hiệu: Giảm size chữ tương ứng */}
            <div className="flex flex-col justify-center">
              {/* TÊN THƯƠNG HIỆU:
                  - Áp dụng font montserrat.className
                  - Bỏ scale-y để chữ không bị méo
                  - Chữ sẽ tự động đậm và đẹp tự nhiên
              */}
              <h1
                className={`${montserrat.className} text-base md:text-md text-[#16579e] uppercase whitespace-nowrap tracking-tighter leading-none`}
              >
                HOÀNG THẢO ANH
              </h1>
              {/* Slogan: Nhỏ lại để tinh tế hơn */}
              <div className="w-full flex justify-between items-center text-[#16579e] font-bold ">
                <span className="text-[0.5rem]  md:text-[0.58rem] uppercase  leading-none tracking-widest mt-1">
                  Khác biệt tạo thành công
                </span>
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 px-2 py-1.5 rounded-full border border-black/5 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-muted hover:text-foreground hover:bg-black/5"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ================= CTA BUTTON ================= */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/30 group"
            >
              <span>Báo giá ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-foreground border border-border bg-white/80 backdrop-blur-md rounded-sm z-50 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif font-medium text-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-4 mt-8 w-full px-12">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" /> Liên hệ tư vấn
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
