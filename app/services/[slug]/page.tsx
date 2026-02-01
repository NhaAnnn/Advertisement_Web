/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  ArrowRight,
  Loader2,
  SearchX,
} from "lucide-react";

// Định nghĩa kiểu dữ liệu trả về từ API
interface ServiceType {
  id: string;
  name: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: any[]; // JSON từ DB
  specs: any[]; // JSON từ DB
  faq: any[]; // JSON từ DB
  gallery?: string[]; // Có thể chưa có trong DB, xử lý optional
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  // 1. Lấy slug từ URL
  const { slug } = use(params);

  // 2. Khai báo State
  const [serviceDetail, setServiceDetail] = useState<ServiceType | null>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 3. Gọi API lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // A. Gọi API lấy chi tiết bài viết hiện tại
        const resDetail = await fetch(`/api/services?slug=${slug}`);
        const detailData = await resDetail.json();

        if (!detailData) {
          setIsError(true);
          return; // Dừng nếu không tìm thấy
        }
        setServiceDetail(detailData);

        // B. Gọi API lấy danh sách tất cả để làm "Bài viết liên quan"
        // (Lấy nhẹ: chỉ cần tên, ảnh, slug)
        const resAll = await fetch("/api/services");
        const allData = await resAll.json();

        if (Array.isArray(allData)) {
          // Lọc bỏ bài hiện tại và lấy ngẫu nhiên 4 bài
          const related = allData
            .filter((item: any) => item.slug !== slug)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((item: any) => ({
              name: item.name,
              slug: item.slug,
              image: item.coverImage || item.image, // Fallback tên trường
            }));
          setRelatedServices(related);
        }
      } catch (error) {
        console.error("Lỗi tải trang chi tiết:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  // --- TRƯỜNG HỢP: ĐANG TẢI ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted text-sm uppercase tracking-widest">
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  // --- TRƯỜNG HỢP: KHÔNG TÌM THẤY BÀI VIẾT (404) ---
  if (isError || !serviceDetail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6 pt-20">
        <SearchX className="w-20 h-20 text-muted/30" />
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Không tìm thấy bài viết
          </h1>
          <p className="text-muted">
            Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
        <Link
          href="/services"
          className="px-6 py-3 bg-primary text-white rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-primary-dark transition-all"
        >
          Quay về danh sách dịch vụ
        </Link>
      </div>
    );
  }

  // Ép kiểu an toàn cho các trường JSON
  const contentSections = Array.isArray(serviceDetail.content)
    ? serviceDetail.content
    : [];
  const specs = Array.isArray(serviceDetail.specs) ? serviceDetail.specs : [];
  const faq = Array.isArray(serviceDetail.faq) ? serviceDetail.faq : [];
  // Nếu DB chưa có gallery, dùng mảng rỗng
  const gallery = Array.isArray(serviceDetail.gallery)
    ? serviceDetail.gallery
    : [];

  return (
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
          {/* === LEFT COLUMN: CONTENT (8 Cột) === */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm mb-4">
                {serviceDetail.category || "Dịch vụ"}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-6">
                {serviceDetail.name}
              </h1>
              <p className="text-lg text-muted font-light leading-relaxed border-l-4 border-primary pl-6 italic">
                {serviceDetail.excerpt}
              </p>
            </div>

            {/* Cover Image */}
            <div className="aspect-video w-full overflow-hidden rounded-sm mb-10 shadow-lg bg-surface border border-border">
              <img
                src={serviceDetail.coverImage || "/logo-blue.png"}
                alt={serviceDetail.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Main Content Sections (Render từ JSON DB) */}
            <div className="prose prose-lg max-w-none text-foreground/80">
              {contentSections.length > 0 ? (
                contentSections.map((section: any, idx: number) => (
                  <div key={idx} className="mb-10">
                    <h3 className="text-2xl font-serif text-foreground mb-4">
                      {section.title}
                    </h3>
                    {/* Xử lý nội dung: có thể là string hoặc mảng string */}
                    <div className="mb-6 leading-relaxed text-base whitespace-pre-line">
                      {Array.isArray(section.content)
                        ? section.content.map((p: string, i: number) => (
                            <p key={i} className="mb-2">
                              {p}
                            </p>
                          ))
                        : section.content}
                    </div>
                    {section.image && (
                      <div className="rounded-sm overflow-hidden my-6 shadow-sm aspect-video relative">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted italic">
                  Nội dung chi tiết đang được cập nhật...
                </p>
              )}
            </div>

            {/* Tech Specs Table */}
            {specs.length > 0 && (
              <div className="bg-surface border border-border rounded-sm p-8 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-foreground">
                    Thông Số Kỹ Thuật
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {specs.map((spec: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between py-3 border-b border-border border-dashed"
                    >
                      <span className="text-sm text-muted font-medium">
                        {spec.label}
                      </span>
                      <span className="text-sm text-foreground font-bold">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Grid */}
            {gallery.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-foreground">
                    Dự Án Đã Thực Hiện
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-sm overflow-hidden group relative cursor-pointer bg-surface"
                    >
                      <img
                        src={img}
                        alt={`Project ${idx}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-foreground">
                    Câu Hỏi Thường Gặp
                  </h3>
                </div>
                <div className="space-y-4">
                  {faq.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-surface/50 border border-border p-5 rounded-sm"
                    >
                      <h4 className="font-bold text-foreground mb-2 flex items-start gap-2">
                        <span className="text-primary">Q.</span> {item.q}
                      </h4>
                      <p className="text-sm text-muted pl-6">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* === RIGHT COLUMN: SIDEBAR (4 Cột - Sticky) === */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
              {/* 1. CTA Card */}
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
                  <button className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Phone className="w-4 h-4" /> 0909 xxx xxx
                  </button>
                  <button className="w-full py-3 bg-primary text-white font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg">
                    <MessageCircle className="w-4 h-4" /> Chat Zalo
                  </button>
                </div>
                {/* ... (Các lợi ích thêm - Giữ nguyên) */}
              </div>

              {/* 2. Related Services (Dữ liệu động) */}
              <div className="bg-surface border border-border p-6 rounded-sm">
                <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6 border-b border-border pb-2">
                  Có thể bạn quan tâm
                </h4>
                {relatedServices.length > 0 ? (
                  <div className="space-y-4">
                    {relatedServices.map((item, idx) => (
                      <Link
                        href={`/services/${item.slug}`}
                        key={idx}
                        className="flex gap-4 group"
                      >
                        <div className="w-16 h-16 shrink-0 overflow-hidden rounded-sm bg-gray-200">
                          <img
                            src={item.image || "/logo-blue.png"}
                            alt={item.name}
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
                ) : (
                  <p className="text-xs text-muted">
                    Đang cập nhật thêm dịch vụ...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
