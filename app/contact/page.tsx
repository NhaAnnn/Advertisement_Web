import React from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { CONTACT_INFO } from "../data/contact_content";
import ContactForm from "./contact_page"; // Import Form vừa tách

export const metadata = {
  title: "Liên Hệ | Hoàng Thảo Anh",
  description: "Liên hệ ngay để nhận báo giá in ấn tốt nhất.",
};

export default function ContactPage() {
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
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
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
          {/* LEFT COLUMN: Info (Server Side Rendered - Tốt cho SEO) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-surface-dark p-8 md:p-10 rounded-sm border border-border relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]"></div>
              <h3 className="text-2xl font-serif text-white mb-8 relative z-10">
                Thông tin liên hệ
              </h3>
              <div className="space-y-8 relative z-10">
                {/* 1. VĂN PHÒNG CHÍNH */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">
                      Văn phòng chính
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-primary transition-colors leading-relaxed"
                    >
                      {CONTACT_INFO.address}
                    </a>
                  </div>
                </div>

                {/* 2. HOTLINE */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">
                      Hotline tư vấn
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.hotline.replace(/\D/g, "")}`}
                      className="text-white text-sm hover:text-primary transition-colors block leading-snug"
                    >
                      {CONTACT_INFO.hotline}
                    </a>
                  </div>
                </div>

                {/* 3. EMAIL */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">
                      Email hỗ trợ
                    </span>
                    {CONTACT_INFO.emails.map((email, i) => (
                      <a
                        key={i}
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-primary transition-colors block mb-1"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (Client Component) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
