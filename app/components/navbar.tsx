'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Để kiểm tra trang hiện tại
import { Diamond, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Dịch vụ', href: '/services' },
//   { label: 'Dự án', href: '/#portfolio' }, // Dùng anchor link cho trang chủ
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
        className={`fixed top-0 z-50 w-full transition-all duration-500 border-b border-white/0
        ${isScrolled
          ? 'bg-noir/80 backdrop-blur-md py-3 border-white/5 shadow-lg'
          : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3 relative z-50">
            <div className={`w-10 h-10 border rounded-full flex items-center justify-center transition-colors duration-500
              ${isScrolled ? 'border-primary/20 bg-primary/10' : 'border-sand/30 group-hover:border-primary group-hover:bg-primary/10'}
            `}>
              <Diamond className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-wide text-sand">
                ART<span className="italic font-normal text-primary">PRINT</span>
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.3em] opacity-80 text-sand-dim">Studio</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2 bg-noir/20 px-2 py-2 rounded-full border border-white/5 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300
                    ${isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-sand hover:text-primary hover:bg-white/5'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-3 group bg-sand text-noir px-6 py-2.5 rounded-sm hover:bg-primary hover:text-white transition-all duration-300"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Báo giá ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-sand p-2 border border-sand/20 rounded-sm z-50 relative"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-noir flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-sand hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest rounded-sm"
            >
              Liên hệ tư vấn
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}