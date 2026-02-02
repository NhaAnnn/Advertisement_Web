/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  MessageCircle,
  FileText,
  HelpCircle,
  ImageIcon,
  ArrowRight,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";

interface ServiceClientProps {
  serviceDetail: any;
  relatedServices: any[];
}

export default function ServiceClient({
  serviceDetail,
  relatedServices,
}: ServiceClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  const contentSections = Array.isArray(serviceDetail.content)
    ? serviceDetail.content
    : [];
  const specs = Array.isArray(serviceDetail.specs) ? serviceDetail.specs : [];
  const faq = Array.isArray(serviceDetail.faq) ? serviceDetail.faq : [];
  const gallery = Array.isArray(serviceDetail.gallery)
    ? serviceDetail.gallery
    : [];

  // Logic cuộn lên đầu trang khi vào bài viết
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hàm khóa cuộn trang khi mở ảnh
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedImageIndex, gallery]);

  // Hàm mở ảnh từ gallery với index
  const openImageFromGallery = (img: string, idx: number) => {
    setSelectedImage(img);
    setSelectedImageIndex(idx);
  };

  // Hàm xem ảnh tiếp theo
  const handleNextImage = () => {
    if (selectedImageIndex < gallery.length - 1) {
      const nextIdx = selectedImageIndex + 1;
      setSelectedImage(gallery[nextIdx]);
      setSelectedImageIndex(nextIdx);
    }
  };

  // Hàm xem ảnh trước đó
  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      const prevIdx = selectedImageIndex - 1;
      setSelectedImage(gallery[prevIdx]);
      setSelectedImageIndex(prevIdx);
    }
  };

  return (
    <>
      <main className="relative min-h-screen bg-background text-foreground pt-28 pb-20 selection:bg-primary/20 selection:text-primary">
        {/* Background FX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        </div>

        {/* --- BREADCRUMB --- */}
        <div className="max-w-[1200px] mx-auto px-6 mb-8 relative z-10">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-muted font-bold">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <Link
              href="/services"
              className="hover:text-primary transition-colors"
            >
              Dịch vụ
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-primary truncate max-w-[300px]">
              {serviceDetail.name}
            </span>
          </nav>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* === LEFT COLUMN: CONTENT (CỘT CHÍNH) === */}
            <div className="lg:col-span-8">
              {/* 1. HEADER BÀI VIẾT */}
              <div className="mb-10">
                <span className="inline-block px-3 py-1 bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm mb-4 border border-blue-100">
                  {serviceDetail.category || "Dịch vụ"}
                </span>
                <h1 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-6 font-bold">
                  {serviceDetail.name}
                </h1>
                <div className="text-lg text-gray-600 font-light leading-relaxed border-l-4 border-primary/30 pl-6 italic bg-gray-50/50 py-4 rounded-r-lg">
                  {serviceDetail.excerpt}
                </div>
              </div>

              {/* ẢNH COVER */}
              <div
                className="aspect-video w-full overflow-hidden rounded-xl mb-12 shadow-lg border border-gray-100 group cursor-pointer bg-gray-200"
                onClick={() => setSelectedImage(serviceDetail.coverImage)}
              >
                <Image
                  src={serviceDetail.coverImage || "/logo-blue.png"}
                  alt={serviceDetail.name}
                  width={1200}
                  height={675}
                  priority
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect fill='%23f3f4f6' width='1200' height='675'/%3E%3C/svg%3E"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* 2. NỘI DUNG CHI TIẾT (Content Sections) */}
              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                {contentSections.map((section: any, idx: number) => (
                  <div key={idx} className="mb-10">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4 relative inline-block">
                      {section.title}
                      <span className="absolute -bottom-1 left-0 w-1/3 h-[2px] bg-primary/30"></span>
                    </h3>

                    <div className="mb-6 leading-relaxed text-base whitespace-pre-line text-justify">
                      {Array.isArray(section.content)
                        ? section.content.map((p: string, i: number) => (
                            <p key={i} className="mb-3">
                              {p}
                            </p>
                          ))
                        : section.content}
                    </div>

                    {section.image && (
                      <div
                        className="rounded-xl overflow-hidden my-6 shadow-md border border-gray-100 aspect-video relative group cursor-pointer bg-gray-200"
                        onClick={() => setSelectedImage(section.image)}
                      >
                        <Image
                          src={section.image}
                          alt={section.title}
                          width={1000}
                          height={562}
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 562'%3E%3Crect fill='%23f3f4f6' width='1000' height='562'/%3E%3C/svg%3E"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 3. THÔNG SỐ KỸ THUẬT */}
              {specs.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-12 shadow-sm">
                  {/* Header Đồng bộ */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                    <div className="p-1.5 bg-white rounded-md border border-gray-200 text-primary shadow-sm">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-serif">
                      Thông Số Kỹ Thuật
                    </h3>
                  </div>

                  <div className="divide-y divide-gray-100 text-sm">
                    {specs.map((spec: any, idx: number) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 group hover:bg-blue-50/30 transition-colors"
                      >
                        <div className="col-span-5 md:col-span-4 p-4 font-semibold text-gray-600 border-r border-gray-100 bg-gray-50/30 flex items-center">
                          {spec.label}
                        </div>
                        <div className="col-span-7 md:col-span-8 p-4 font-bold text-gray-800 flex items-center">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. THƯ VIỆN ẢNH */}
              {gallery.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-1.5 bg-blue-50 text-primary rounded-md border border-blue-100 shadow-sm">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-serif">
                      Dự Án Đã Thực Hiện
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => openImageFromGallery(img, idx)}
                        className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-zoom-in shadow-sm hover:shadow-md transition-all"
                      >
                        <Image
                          src={img}
                          alt={`Project ${idx}`}
                          width={400}
                          height={400}
                          quality={80}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3C/svg%3E"
                          sizes="(max-width: 768px) 50vw, 30vw"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay hiệu ứng khi hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30 hover:scale-110 transition-transform">
                            <ZoomIn className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. FAQ */}
              {faq.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-1.5 bg-blue-50 text-primary rounded-md border border-blue-100 shadow-sm">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-serif">
                      Câu Hỏi Thường Gặp
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {faq.map((item: any, idx: number) => (
                      <details
                        key={idx}
                        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-300 [&_summary::-webkit-details-marker]:hidden open:shadow-sm"
                      >
                        <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-foreground font-bold select-none bg-white group-hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-black mt-0.5 shrink-0">
                              Q
                            </span>
                            <span className="text-base leading-snug">
                              {item.q}
                            </span>
                          </div>
                          <div className="shrink-0 text-gray-400 group-open:rotate-180 group-open:text-primary transition-transform duration-300 ease-in-out">
                            <ArrowRight className="w-5 h-5 rotate-90" />
                          </div>
                        </summary>
                        <div className="px-5 pb-5 pt-0">
                          <div className="pl-9 text-base text-gray-600 leading-relaxed border-l-2 border-gray-100 ml-3 py-1">
                            {item.a}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* === RIGHT COLUMN: SIDEBAR === */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 space-y-8">
                {/* CTA Card */}
                <div className="bg-surface-dark text-white p-8 rounded-sm shadow-xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[40px] group-hover:bg-primary/40 transition-colors"></div>
                  <h3 className="text-2xl font-serif mb-2 relative z-10">
                    Nhận Báo Giá?
                  </h3>
                  <p className="text-white/70 text-sm mb-6 relative z-10 font-light">
                    Để lại thông tin hoặc liên hệ trực tiếp để được tư vấn kích
                    thước và chất liệu phù hợp nhất.
                  </p>
                  <div className="space-y-3 relative z-10">
                    <a
                      href="tel:0909979376"
                      className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Phone className="w-4 h-4" /> 0909 979 376
                    </a>
                    <a
                      href="https://zalo.me/0909979376"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-primary text-white font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat Zalo
                    </a>
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-surface border border-border p-6 rounded-sm">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6 border-b border-border pb-2">
                    Có thể bạn quan tâm
                  </h4>
                  <div className="space-y-4">
                    {relatedServices.map((item, idx) => (
                      <Link
                        href={`/services/${item.slug}`}
                        key={idx}
                        className="flex gap-4 group"
                      >
                        <div className="w-16 h-16 shrink-0 overflow-hidden rounded-sm bg-gray-200">
                          <Image
                            src={item.image || "/logo-blue.png"}
                            alt={item.name}
                            width={64}
                            height={64}
                            sizes="64px"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-1">
                            {item.name}
                          </h5>
                          <span className="text-[10px] text-muted flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Xem chi tiết <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Nút đóng */}
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-20"
            onClick={() => setSelectedImage(null)}
            aria-label="Đóng ảnh"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Nút Previous  */}
          {selectedImageIndex > 0 && (
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-20 group"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Ảnh trước"
            >
              <ArrowRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
          )}

          {/* Nút Next  */}
          {selectedImageIndex < gallery.length - 1 && (
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-20 group"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Ảnh tiếp theo"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Counter: Ảnh số mấy */}
          {gallery.length > 0 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full z-20">
              {selectedImageIndex + 1} / {gallery.length}
            </div>
          )}

          {/* Ảnh Full */}
          <div className="relative w-full h-full flex items-center justify-center max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Full Preview"
              width={1600}
              height={1200}
              quality={95}
              priority
              sizes="(max-width: 768px) 95vw, 90vw"
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
