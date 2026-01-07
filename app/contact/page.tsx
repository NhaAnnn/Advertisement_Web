'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, Send } from 'lucide-react';

// IMPORT DATA
import {
  CONTACT_INFO,
} from '../data/contact_content';

export default function ContactPage() {

  // Cuộn lên đầu khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground pt-28 pb-20 selection:bg-primary/20 selection:text-primary">

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
         <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12 relative z-10">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-muted font-bold">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-primary">Liên hệ</span>
        </nav>
      </div>

      {/* Hero Text */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 mb-20 text-center relative z-10">
          <div className="relative">
             <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-primary/20">
               Get in touch
             </span>
             <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
               {CONTACT_INFO.title}
             </h1>
             <p className="text-muted text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                {CONTACT_INFO.subtitle}
             </p>
          </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 mb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

             {/* LEFT COLUMN: Info */}
             <div className="lg:col-span-5 space-y-12">
                {/* Info Card (Dark Theme để nổi bật) */}
                <div className="bg-surface-dark p-8 md:p-10 rounded-sm border border-border relative overflow-hidden group shadow-xl">
                   {/* Background Decor */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]"></div>

                   <h3 className="text-2xl font-serif text-white mb-8 relative z-10">Thông tin liên hệ</h3>
                   <div className="space-y-8 relative z-10">
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center text-primary shrink-0">
                           <MapPin className="w-5 h-5"/>
                         </div>
                         <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">Văn phòng chính</span>
                            <p className="text-white text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center text-primary shrink-0">
                           <Phone className="w-5 h-5"/>
                         </div>
                         <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">Hotline tư vấn</span>
                            <p className="text-white text-lg font-serif font-bold">{CONTACT_INFO.hotline}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center text-primary shrink-0">
                           <Mail className="w-5 h-5"/>
                         </div>
                         <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">Email hỗ trợ</span>
                            {CONTACT_INFO.emails.map((email, i) => (
                               <p key={i} className="text-white text-sm">{email}</p>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: Form */}
             <div className="lg:col-span-7">
                <div className="bg-surface p-8 md:p-12 rounded-sm border border-border relative shadow-sm">
                   <h3 className="text-3xl font-serif text-foreground mb-2">Gửi tin nhắn</h3>
                   <p className="text-muted text-sm mb-10">Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24h.</p>

                   <form className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">Họ và tên</label>
                            <input
                              type="text"
                              className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors"
                              placeholder="Nguyễn Văn A"
                            />
                         </div>
                         <div className="space-y-2 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">Số điện thoại</label>
                            <input
                              type="tel"
                              className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors"
                              placeholder="0909 xxx xxx"
                            />
                         </div>
                      </div>

                      <div className="space-y-2 group">
                         <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">Email</label>
                         <input
                           type="email"
                           className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors"
                           placeholder="example@gmail.com"
                         />
                      </div>

                      <div className="space-y-2 group">
                         <label className="text-xs font-bold uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors">Nội dung cần tư vấn</label>
                         <textarea
                           rows={4}
                           className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted/30 focus:outline-none focus:border-primary transition-colors resize-none"
                           placeholder="Tôi quan tâm đến dịch vụ in bao bì..."
                         />
                      </div>

                      <div className="pt-6">
                         <button type="button" className="group relative px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-sm hover:shadow-lg hover:bg-primary-dark transition-all flex items-center gap-3">
                            Gửi yêu cầu <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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