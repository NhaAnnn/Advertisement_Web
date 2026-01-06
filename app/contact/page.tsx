// app/contact/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, Send } from 'lucide-react';

// IMPORT DATA
import {
  CONTACT_INFO,
  SOCIAL_LINKS,
  SERVICE_OPTIONS,
  FAQ_ITEMS
} from '../data/contact_content';

export default function ContactPage() {
  return (
    <main className="relative overflow-x-hidden min-h-screen pt-28 pb-20">

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-30 mix-blend-overlay"></div>

      {/* Breadcrumb */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-sand-dim font-bold">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-primary">Liên hệ</span>
        </nav>
      </div>

      {/* Hero Text */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 mb-20 text-center relative">
          <div className="relative z-10">
             <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-primary/20">Get in touch</span>
             <h1 className="text-4xl md:text-6xl font-serif text-sand mb-6">{CONTACT_INFO.title}</h1>
             <p className="text-sand-dim text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                {CONTACT_INFO.subtitle}
             </p>
          </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

             {/* LEFT COLUMN: Info */}
             <div className="lg:col-span-5 space-y-12">
                <div className="bg-[#1a1a1a]/60 backdrop-blur-md p-8 md:p-10 rounded-sm border border-white/10 relative overflow-hidden group">
                   <h3 className="text-2xl font-serif text-sand mb-8">Thông tin liên hệ</h3>
                   <div className="space-y-8">
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0"><MapPin className="w-5 h-5"/></div>
                         <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sand-dim block mb-1">Văn phòng chính</span>
                            <p className="text-sand text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0"><Phone className="w-5 h-5"/></div>
                         <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sand-dim block mb-1">Hotline tư vấn</span>
                            <p className="text-sand text-lg font-serif font-bold">{CONTACT_INFO.hotline}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0"><Mail className="w-5 h-5"/></div>
                         <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sand-dim block mb-1">Email hỗ trợ</span>
                            {CONTACT_INFO.emails.map((email, i) => (
                               <p key={i} className="text-sand text-sm">{email}</p>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: Form */}
             <div className="lg:col-span-7">
                <div className="bg-[#1a1a1a] p-8 md:p-12 rounded-sm border border-white/5 relative">
                   <h3 className="text-3xl font-serif text-sand mb-2">Gửi tin nhắn</h3>
                   <form className="space-y-8 mt-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-sand-dim group-focus-within:text-primary transition-colors">Họ và tên</label>
                            <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-sand focus:outline-none focus:border-primary" placeholder="Nguyễn Văn A" />
                         </div>
                         <div className="space-y-2 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-sand-dim group-focus-within:text-primary transition-colors">Số điện thoại</label>
                            <input type="tel" className="w-full bg-transparent border-b border-white/20 py-3 text-sand focus:outline-none focus:border-primary" placeholder="0909 xxx xxx" />
                         </div>
                      </div>
                      <div className="pt-6">
                         <button type="button" className="group relative px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-sm hover:shadow-lg hover:bg-orange-600 transition-all flex items-center gap-3">
                            Gửi yêu cầu <Send className="w-4 h-4" />
                         </button>
                      </div>
                   </form>
                </div>
             </div>
          </div>
      </section>
    </main>
  );
}