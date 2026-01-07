'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Diamond, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Dịch vụ', href: '/services' },
  { label: 'Liên hệ', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 border-b
        ${isScrolled
          // TRẠNG THÁI 1: ĐÃ CUỘN (Nổi bật hẳn lên)
          // bg-white/90: Nền trắng đục sạch sẽ
          // shadow-md: Bóng đổ tạo chiều sâu
          // border-black/5: Viền cực mờ để cắt khối
          ? 'bg-white/90 backdrop-blur-md py-3 border-black/5 shadow-md'

          // TRẠNG THÁI 2: Ở ĐẦU TRANG (Trong suốt)
          : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* === LOGO === */}
          <Link href="/" className="group flex items-center gap-3 relative z-50">
            {/* Vòng tròn Logo: Có nền nhẹ khi chưa cuộn để luôn nổi bật */}
            <div className={`w-10 h-10 border rounded-full flex items-center justify-center transition-colors duration-500
              ${isScrolled
                ? 'border-primary/20 bg-primary/10'
                : 'border-foreground/10 bg-white/50 backdrop-blur-sm group-hover:border-primary group-hover:bg-primary/10'}
            `}>
              <Diamond className="w-5 h-5 text-primary" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-wide text-foreground">
                ART<span className="italic font-normal text-primary">PRINT</span>
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.3em] opacity-60 text-muted">Studio</span>
            </div>
          </Link>

         {/* DESKTOP NAV */}
          {/* Thay đổi: border-black/10 và shadow-sm */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/50 px-1.5 py-1.5 rounded-full border border-black/10 backdrop-blur-md shadow-sm transition-all duration-500 hover:bg-white/80 hover:shadow-md hover:border-black/20">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300
                    ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-muted hover:text-foreground hover:bg-white' // Chữ màu xám, hover đen
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* === CTA BUTTON === */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-3 group bg-foreground text-background px-6 py-2.5 rounded-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/30"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Báo giá ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* === MOBILE TOGGLE === */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 border border-border bg-white/50 backdrop-blur-md rounded-sm z-50 relative hover:text-primary transition-colors shadow-sm"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* === MOBILE MENU OVERLAY === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            // Nền mobile cũng làm mờ (Glassmorphism)
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest rounded-sm shadow-xl"
            >
              Liên hệ tư vấn
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}