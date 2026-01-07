// components/footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Diamond, ArrowRight, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    // Sử dụng bg-surface-dark cho nền tối sang trọng
    <footer className="bg-surface-dark pt-24 pb-12 border-t border-white/5 relative overflow-hidden text-white">

      {/* Decorative BG Text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <span className="text-[20vw] font-serif leading-none whitespace-nowrap text-white absolute -top-10 left-0 blur-sm select-none">
          ARTPRINT
        </span>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Diamond className="text-primary w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
              <span className="font-serif text-3xl font-bold text-white">ArtPrint</span>
            </Link>
            <p className="text-white/70 font-normal text-sm leading-relaxed pr-8">
              Định hình lại tiêu chuẩn in ấn cao cấp tại Việt Nam. Chúng tôi tin rằng mỗi tờ giấy đều có linh hồn và câu chuyện riêng.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8 border-b border-primary/50 pb-2 inline-block">
              Danh mục
            </h4>
            <ul className="space-y-4 text-sm text-white/60 font-medium">
              {['Fine Art', 'Packaging', 'Editorial', 'Branding'].map(item => (
                <li key={item}>
                  <Link href="/services" className="hover:text-primary hover:pl-2 transition-all duration-300 block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8 border-b border-primary/50 pb-2 inline-block">
              Văn phòng
            </h4>
            <ul className="space-y-4 text-sm text-white/60 font-medium">
              <li>123 Nguyễn Văn Cừ, Q.1, TP.HCM</li>
              <li className="hover:text-primary transition-colors cursor-pointer">+84 28 3999 8888</li>
              <li className="hover:text-primary transition-colors cursor-pointer">hello@artprint.vn</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8 border-b border-primary/50 pb-2 inline-block">
              Newsletter
            </h4>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-sm"
                  placeholder="Email của bạn"
                />
                <button type="submit" className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center bg-primary text-white rounded-sm hover:bg-primary-dark transition-colors shadow-lg">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/40 italic">Nhận tin tức về xu hướng thiết kế mới nhất.</p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/40 uppercase tracking-wider font-bold">
          <p>© 2026 ArtPrint Studio. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}