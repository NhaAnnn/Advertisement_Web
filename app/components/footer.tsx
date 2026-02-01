/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Facebook, Loader2, Send } from "lucide-react";

// 1. IMPORT FONT MONTSERRAT (Để đồng bộ font chữ logo với Navbar)
import { Montserrat } from "next/font/google";
import { CONTACT_INFO } from "../data/contact_content";
import { usePathname } from "next/navigation";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const GOOGLE_FORM_CONFIG = {
  // Link này lấy từ Google Form -> Get Pre-filled link -> Copy -> Đổi đuôi /viewform thành /formResponse
  URL: "https://docs.google.com/forms/d/e/1FAIpQLSe6mYTbFhYkYRJ6am4vP7Nrc3ev4T0LPH3KdSTGeSuJ30Q-mw/formResponse",

  // Các mã entry lấy từ link Pre-filled (Xem hướng dẫn bên dưới nếu quên)
  ENTRY_IDS: {
    NAME: "entry.657724628", // Mã cho ô Họ tên
    PHONE: "entry.75967512", // Mã cho ô Số điện thoại
    EMAIL: "entry.1327365006", // Mã cho ô Email
    MESSAGE: "entry.793401319", // Mã cho ô Nội dung
  },
};

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const formRef = useRef<HTMLFormElement>(null);

  if (
    pathname &&
    (pathname.startsWith("/admin") || pathname.startsWith("/login"))
  ) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Chặn reload trang
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const googleFormData = new FormData();

    // Map dữ liệu từ form React sang các entry của Google Form
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.NAME,
      "Người dùng yêu cầu tư vấn từ Footer",
    );
    googleFormData.append(GOOGLE_FORM_CONFIG.ENTRY_IDS.PHONE, "");
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.EMAIL,
      (formData.get("user_email") as string) || "",
    );
    googleFormData.append(
      GOOGLE_FORM_CONFIG.ENTRY_IDS.MESSAGE,
      "Liên hệ để tư vấn báo giá dịch vụ.",
    );

    try {
      // Gửi request không đồng bộ (no-cors để bypass lỗi chặn của trình duyệt)
      await fetch(GOOGLE_FORM_CONFIG.URL, {
        method: "POST",
        body: googleFormData,
        mode: "no-cors",
      });

      // Thông báo thành công
      alert("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.");

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ hotline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Sử dụng bg-[#0F265C] (Xanh Navy đậm) làm nền chủ đạo giống ảnh
    <footer className="bg-surface-dark pt-16 pb-12 border-t border-white/5 relative overflow-hidden text-white">
      {/* Nền chữ chìm trang trí (Giữ nguyên hiệu ứng đẹp) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none opacity-[0.02] flex items-center">
        {/* animation-duration: 30s để chạy thật chậm */}
        <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] flex gap-20">
          <span className="text-[15vw] font-black font-serif leading-none text-white">
            HOÀNG THẢO ANH
          </span>
          {/* Lặp lại để chạy liên tục */}
          <span className="text-[15vw] font-black font-serif leading-none text-white">
            HOÀNG THẢO ANH
          </span>
          <span className="text-[15vw] font-black font-serif leading-none text-white">
            HOÀNG THẢO ANH
          </span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
          {/* ================= CỘT 1: THƯƠNG HIỆU & SỨ MỆNH ================= */}
          <div className="space-y-6">
            {/* LOGO ĐỒNG BỘ VỚI NAVBAR */}
            <Link href="/" className="flex items-center  group">
              {/* Ảnh Logo */}
              <div className="w-16 h-16 flex items-center justify-center -ml-3">
                <img
                  src="/logo-white.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Chữ Logo */}
              <div className="flex flex-col justify-center">
                <h2
                  className={`${montserrat.className} text-lg font-black text-white uppercase leading-none tracking-tight`}
                >
                  HOÀNG THẢO ANH
                </h2>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/70 font-bold mt-1">
                  Khác biệt tạo thành công
                </span>
              </div>
            </Link>

            {/* Nội dung sứ mệnh từ ảnh */}
            <div className="text-white text-justify rounded-sm text-sm font-medium leading-relaxed shadow-lg ">
              Với sứ mệnh mang đến những sản phẩm chất lượng, Hoàng Thảo Anh cam
              kết cung cấp các giải pháp in ấn toàn diện, từ ý tưởng đến thành
              phẩm, đảm bảo chuẩn chất lượng – đúng tiến độ – giá trị lâu dài.
            </div>

            {/* Mạng xã hội (Facebook, Zalo, X gạch chéo) */}
            <div className="flex gap-4 items-center mt-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61584185078976"
                aria-label="Facebook Hoàng Thảo Anh"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>

              {/* Zalo (Tự tạo nút chữ vì Zalo không có icon trong lucide) */}
              <a
                href="#s"
                aria-label="Zalo Hoàng Thảo Anh"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white font-black text-[10px] hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* ================= CỘT 2: DANH MỤC DỊCH VỤ ================= */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/20 pb-2 inline-block">
              DANH MỤC
            </h3>
            <ul className="space-y-3 text-sm text-white/70 font-medium">
              {[
                "In ấn",
                "Thi công - Lắp đặt - Gia công quảng cáo",
                "Tổ chức sự kiện",
                "Xin phép quảng cáo",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    aria-label={`Dịch vụ ${item}`}
                    className="hover:text-white hover:translate-x-1 transition-all duration-300 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CỘT 3: VĂN PHÒNG & LIÊN HỆ ================= */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/20 pb-2 inline-block">
              VĂN PHÒNG
            </h3>
            <ul className="space-y-4 text-sm text-white/70 font-medium">
              <li className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase opacity-50">
                  Địa chỉ
                </span>
                <span className="text-white rounded-sm inline-block w-fit font-bold hover:text-primary-light hover:translate-x-1 transition-all">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase opacity-50">
                  Hotline
                </span>
                <a
                  href="tel:0909979376"
                  className="text-white  rounded-sm inline-block w-fit font-bold hover:text-primary-light hover:translate-x-1 transition-all"
                >
                  {CONTACT_INFO.hotline}
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase opacity-50">
                  Email
                </span>
                <a
                  href="mailto:ctyhoangthaoanh@gmail.com"
                  className="text-white  rounded-sm inline-block w-fit font-bold hover:text-primary-light hover:translate-x-1 transition-all"
                >
                  {CONTACT_INFO.emails[0]}
                </a>
              </li>
            </ul>
          </div>

          {/* ================= CỘT 4: NHẬN BÁO GIÁ (NEWSLETTER) ================= */}
          <div>
            <h3 className=" text-white  font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/20 pb-2 inline-block">
              Nhận Báo Giá
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              ref={formRef}
            >
              <div className="relative group">
                <input
                  type="email"
                  className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm"
                  placeholder="Email của bạn"
                  name="user_email"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  aria-label="Gửi yêu cầu báo giá"
                  className="absolute right-1 top-1 h-[38px] w-10 flex items-center justify-center bg-[#3B82F6] text-white rounded-sm hover:bg-blue-600 transition-colors shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
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
