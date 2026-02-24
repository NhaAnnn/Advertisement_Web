/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Loader2, Send } from "lucide-react";
import { Montserrat } from "next/font/google";
import { CONTACT_INFO } from "../../data/contact_content";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const GOOGLE_FORM_CONFIG = {
  URL: "https://docs.google.com/forms/d/e/1FAIpQLSe6mYTbFhYkYRJ6am4vP7Nrc3ev4T0LPH3KdSTGeSuJ30Q-mw/formResponse",
  ENTRY_IDS: {
    NAME: "entry.657724628",
    PHONE: "entry.75967512",
    EMAIL: "entry.1327365006",
    MESSAGE: "entry.793401319",
  },
};

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [dbData, setDbData] = useState<any>(null);
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  // Lấy dữ liệu Footer từ Database
  useEffect(() => {
    fetch("/api/config?key=footer_data&t=" + Date.now())
      .then((r) => r.json())
      .then((val) => {
        if (val) setDbData(val);
      });
  }, []);

  if (
    pathname &&
    (pathname.startsWith("/admin") || pathname.startsWith("/login"))
  ) {
    return null;
  }

  // Dữ liệu hiển thị: Ưu tiên DB, nếu không có thì dùng file tĩnh mặc định
  const footer = {
    mission:
      dbData?.mission ||
      "Với sứ mệnh mang đến những sản phẩm chất lượng, Hoàng Thảo Anh cam kết cung cấp các giải pháp in ấn toàn diện...",
    address: dbData?.address || CONTACT_INFO.address,
    hotline: dbData?.hotline || CONTACT_INFO.hotline,
    emails: dbData?.emails || CONTACT_INFO.emails,
    categories: dbData?.categories || [
      "In ấn",
      "Quảng cáo",
      "Sự kiện",
      "Xin phép",
    ],
    facebook:
      dbData?.facebook ||
      "https://www.facebook.com/profile.php?id=61584185078976",
  };

  // Tạo link Zalo từ số điện thoại
  const zaloLink = `https://zalo.me/${footer.hotline.replace(/\D/g, "")}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const googleFormData = new FormData();

    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.NAME,
      "Yêu cầu từ Footer",
    );
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.EMAIL,
      (formData.get("user_email") as string) || "",
    );
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.MESSAGE,
      "Liên hệ tư vấn báo giá.",
    );

    try {
      await fetch(GOOGLE_FORM_CONFIG.URL, {
        method: "POST",
        body: googleFormData,
        mode: "no-cors",
      });
      alert("Gửi yêu cầu thành công!");
      formRef.current?.reset();
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-surface-dark pt-16 pb-12 border-t border-white/5 relative overflow-hidden text-white">
      {/* Nền chữ chìm trang trí (Giữ nguyên) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none opacity-[0.02] flex items-center">
        <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] flex gap-20">
          <span className="text-[15vw] font-black font-serif text-white uppercase">
            HOÀNG THẢO ANH
          </span>
          <span className="text-[15vw] font-black font-serif text-white uppercase">
            HOÀNG THẢO ANH
          </span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="w-16 h-16 relative -ml-3">
                <Image
                  src="/logo-white.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2
                  className={`${montserrat.className} text-lg font-black text-white uppercase leading-none`}
                >
                  HOÀNG THẢO ANH
                </h2>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/70 font-bold mt-1">
                  Khác biệt tạo thành công
                </span>
              </div>
            </Link>
            <div className="text-white text-justify text-sm font-medium leading-relaxed">
              {footer.mission}
            </div>
            <div className="flex gap-4 items-center mt-4">
              <a
                href={footer.facebook}
                target="_blank"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white font-black text-[10px] hover:bg-blue-500 transition-all"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* CỘT 2: DANH MỤC (Lấy từ DB) */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/20 pb-2 inline-block">
              DANH MỤC
            </h3>
            <ul className="space-y-3 text-sm text-white/70 font-medium">
              {footer.categories.map((item: string, i: number) => (
                <li key={i}>
                  <Link
                    href="/services"
                    className="hover:text-white hover:translate-x-1 transition-all block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: VĂN PHÒNG (Lấy từ DB) */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/20 pb-2 inline-block">
              VĂN PHÒNG
            </h3>
            <ul className="space-y-4 text-sm text-white/70 font-medium">
              <li className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase opacity-50">
                  Địa chỉ
                </span>
                <span className="text-white font-bold">{footer.address}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase opacity-50">
                  Hotline
                </span>
                <a
                  href={`tel:${footer.hotline.replace(/\D/g, "")}`}
                  className="text-white font-bold hover:text-primary-light transition-all"
                >
                  {footer.hotline}
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase opacity-50">
                  Email liên hệ
                </span>
                {footer.emails.map((email: string, i: number) => (
                  <a
                    key={i}
                    href={`mailto:${email}`}
                    className="text-white font-bold hover:text-primary-light block"
                  >
                    {email}
                  </a>
                ))}
              </li>
            </ul>
          </div>

          {/* CỘT 4: NHẬN BÁO GIÁ */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/20 pb-2 inline-block">
              Nhận Báo Giá
            </h3>
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-white text-sm"
                  placeholder="Email của bạn"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-[38px] w-10 flex items-center justify-center bg-[#3B82F6] text-white rounded-sm hover:bg-blue-600 shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 group-hover:translate-x-1" />
                  )}
                </button>
              </div>
              <p className="text-xs text-white/40 italic">
                Nhận tin tức về xu hướng thiết kế mới nhất.
              </p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
