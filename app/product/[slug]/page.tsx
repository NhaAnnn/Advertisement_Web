/* eslint-disable @next/next/no-img-element */
// app/product/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight, ZoomIn, Truck, ShieldCheck, FileText,
  MessageCircle, Phone, Info
} from 'lucide-react';

// IMPORT DATA
import {
  PRODUCT_DETAIL,
  PRODUCT_OPTIONS,
} from '../../data/product_detail';

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(PRODUCT_DETAIL.images[0]);

  // State chỉ dùng để xem thông tin (Mô tả chất liệu/hiệu ứng), không tính tiền
  const [selectedMaterial, setSelectedMaterial] = useState(PRODUCT_OPTIONS.materials[0]);

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
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-8 relative z-10">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-muted font-bold">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-border" />
          <Link href="/services" className="hover:text-primary transition-colors">Dịch vụ</Link>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-primary">{PRODUCT_DETAIL.name}</span>
        </nav>
      </div>

      <section className="max-w-[1800px] mx-auto px-6 md:px-12 mb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* === LEFT: GALLERY (Giữ nguyên để khách xem ảnh) === */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-surface border border-border group shadow-sm">
              <img
                src={activeImage}
                alt="Main Product"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {PRODUCT_DETAIL.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-sm overflow-hidden border cursor-pointer relative transition-all
                    ${activeImage === img ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'}
                  `}
                >
                  <img src={img} className={`w-full h-full object-cover transition-opacity ${activeImage === img ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`} alt={`Thumb ${idx}`} />
                </div>
              ))}
            </div>

            {/* Policy Info (Thông tin cam kết) */}
            <div className="mt-12 pt-12 border-t border-border">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                     <div className="p-2 bg-primary/10 rounded-full text-primary"><Truck className="w-5 h-5"/></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase">Giao hàng toàn quốc</h4>
                        <p className="text-xs text-muted mt-1">Đóng gói quy chuẩn xuất khẩu</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <div className="p-2 bg-primary/10 rounded-full text-primary"><ShieldCheck className="w-5 h-5"/></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase">Chất lượng cao cấp</h4>
                        <p className="text-xs text-muted mt-1">Kiểm tra KCS từng sản phẩm</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <div className="p-2 bg-primary/10 rounded-full text-primary"><FileText className="w-5 h-5"/></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase">Thiết kế độc quyền</h4>
                        <p className="text-xs text-muted mt-1">Tư vấn giải pháp mỹ thuật</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* === RIGHT: INFO ONLY (Không đặt hàng) === */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 bg-surface/50 backdrop-blur-md p-6 md:p-8 rounded-sm border border-border shadow-xl shadow-black/5">

              {/* Product Header */}
              <div className="mb-8 pb-8 border-b border-border">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                  {PRODUCT_DETAIL.tag}
                </span>

                <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-tight">
                  {PRODUCT_DETAIL.name}
                </h1>

                <p className="text-muted text-sm leading-relaxed mb-6">
                  {PRODUCT_DETAIL.shortDesc}
                </p>

                {/* Thay giá tiền bằng trạng thái Liên hệ */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-dark text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                   <Info className="w-4 h-4" /> Liên hệ báo giá
                </div>
              </div>

              {/* PRODUCT SPECS (Thông tin chi tiết) */}
              <div className="space-y-8">

                {/* 1. View Materials (Chỉ xem, click vào để đọc mô tả) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <label className="text-xs font-bold uppercase tracking-widest text-foreground block">
                        Tùy chọn chất liệu
                     </label>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {PRODUCT_OPTIONS.materials.map((mat) => (
                      <div
                        key={mat.id}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`group relative p-4 border rounded-sm cursor-pointer transition-all
                          ${selectedMaterial.id === mat.id
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border bg-background hover:border-primary/30'}
                        `}
                      >
                         <div className="flex justify-between items-center mb-1">
                            <span className={`text-sm font-bold ${selectedMaterial.id === mat.id ? 'text-primary' : 'text-foreground'}`}>
                              {mat.name}
                            </span>
                         </div>
                         <p className="text-[11px] text-muted leading-relaxed">
                           {mat.desc}
                         </p>
                      </div>
                    ))}
                  </div>
                </div>

                 {/* 2. Technical Details (Thông số kỹ thuật dạng List) */}
                 <div className="space-y-4 pt-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground block">
                       Thông số tiêu chuẩn
                    </label>
                    <ul className="space-y-2 text-sm text-muted">
                       <li className="flex justify-between py-2 border-b border-border border-dashed">
                          <span>Kích thước:</span>
                          <span className="font-medium text-foreground">Tùy chỉnh theo yêu cầu</span>
                       </li>
                       <li className="flex justify-between py-2 border-b border-border border-dashed">
                          <span>Kỹ thuật in:</span>
                          <span className="font-medium text-foreground">Offset / Kỹ thuật số</span>
                       </li>
                       <li className="flex justify-between py-2 border-b border-border border-dashed">
                          <span>Gia công:</span>
                          <span className="font-medium text-foreground">Cán màng, Ép kim, Bế nổi</span>
                       </li>
                       <li className="flex justify-between py-2 border-b border-border border-dashed">
                          <span>Đóng gói:</span>
                          <span className="font-medium text-foreground">Tiêu chuẩn xuất khẩu</span>
                       </li>
                    </ul>
                 </div>

                {/* 3. Contact CTA (Thay cho nút Mua hàng) */}
                <div className="pt-8 mt-4 border-t border-border">
                  <div className="bg-primary/5 p-6 rounded-sm border border-primary/10 text-center">
                     <h4 className="text-foreground font-serif text-lg mb-2">Bạn quan tâm sản phẩm này?</h4>
                     <p className="text-xs text-muted mb-6">Liên hệ ngay với đội ngũ ArtPrint để nhận tư vấn chi tiết và bảng báo giá tốt nhất.</p>

                     <div className="flex flex-col gap-3">
                        <button className="w-full py-3 bg-primary text-white font-bold uppercase tracking-widest rounded-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                           <MessageCircle className="w-4 h-4" /> Chat Zalo Tư Vấn
                        </button>
                        <button className="w-full py-3 bg-white border border-border text-foreground font-bold uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                           <Phone className="w-4 h-4" /> Gọi Hotline
                        </button>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}