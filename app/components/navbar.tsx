/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Montserrat } from "next/font/google";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Liên hệ", href: "/contact" },
];

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

// --- VARIANT ANIMATION (Cấu hình chuyển động) ---
const menuVars: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.2,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Thêm ": Variants"
const containerVars: Variants = {
  initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  open: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

// Thêm ": Variants"
const mobileLinkVars: Variants = {
  initial: {
    y: "30vh",
    transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
  },
  open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-xl border-black/5 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between relative z-50 bg-inherit">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300">
              <img
                src="/logo-blue.png"
                alt="Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1
                className={`${montserrat.className} text-base md:text-md text-[#16579e] uppercase whitespace-nowrap tracking-tighter leading-none`}
              >
                HOÀNG THẢO ANH
              </h1>
              <span className="text-[0.5rem] md:text-[0.58rem] text-[#16579e] font-bold uppercase leading-none tracking-widest mt-1">
                Khác biệt tạo thành công
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 px-2 py-1.5 rounded-full border border-black/5 backdrop-blur-md shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300
                    ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted hover:text-foreground hover:bg-black/5"}
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/30 group"
            >
              <span>Báo giá ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* MOBILE TOGGLE (Icon xoay hiệu ứng) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#16579e] rounded-full hover:bg-blue-50 transition-colors relative z-50"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* === PREMIUM MOBILE DROPDOWN === */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 top-[70px] w-full bg-white/95 backdrop-blur-2xl border-b border-black/5 shadow-2xl origin-top overflow-hidden lg:hidden"
            >
              <div className="container mx-auto px-6 pb-8 pt-4">
                {/* Background Decor (Logo mờ xoay nhẹ) */}
                <div className="absolute -right-10 top-10 w-64 h-64 opacity-[0.03] pointer-events-none">
                  <img
                    src="/logo-blue.png"
                    className="w-full h-full object-contain animate-[spin_60s_linear_infinite]"
                    alt=""
                  />
                </div>

                {/* Danh sách Link (Hiệu ứng bay lên) */}
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col gap-1 relative z-10"
                >
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <div key={idx} className="overflow-hidden">
                        <motion.div variants={mobileLinkVars}>
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`group flex items-center justify-between py-4 border-b border-dashed border-gray-100
                              ${isActive ? "text-[#16579e]" : "text-gray-600"}
                            `}
                          >
                            <span
                              className={`text-sm font-bold uppercase tracking-wider transition-all group-hover:text-[#16579e] group-hover:pl-2`}
                            >
                              {link.label}
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    );
                  })}

                  {/* Nút Liên hệ cuối cùng */}
                  {/* <div className="overflow-hidden mt-6">
                    <motion.div variants={mobileLinkVars}>
                      <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#16579e] text-white rounded-sm text-sm font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform hover:bg-[#0F265C]"
                      >
                        <Phone className="w-5 h-5" /> Nhận tư vấn ngay
                      </Link>
                    </motion.div>
                  </div> */}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop mờ (Bấm ra ngoài để tắt) */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          style={{ top: "70px" }} // Tránh che mất header
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
