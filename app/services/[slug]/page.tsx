/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
/* eslint-disable @next/next/no-img-element */
"use client";

// 1. Thêm 'use' vào import từ 'react'
import React, { useEffect, useMemo, use } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileText,
  ArrowRight,
  HelpCircle,
  Image as ImageIcon,
} from "lucide-react";

// IMPORT DATA
import { getServiceDetail } from "../../data/product_detail";
import { MENU_TREE, CategoryNode } from "../../data/services_content";

// 2. Cập nhật kiểu dữ liệu cho params thành Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  // 3. Dùng React.use() để lấy slug từ params
  const { slug } = use(params);

  // Lấy dữ liệu chi tiết dựa trên slug đã giải nén
  const serviceDetail = getServiceDetail(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Logic lấy dịch vụ liên quan
  const allServices = useMemo(() => {
    const services: any[] = [];
    const traverse = (nodes: CategoryNode[]) => {
      nodes.forEach((node) => {
        if (node.articleData) {
          services.push({
            name: node.articleData.title,
            slug: node.articleData.slug,
            image: node.articleData.image,
          });
        }
        if (node.children) traverse(node.children);
      });
    };
    traverse(MENU_TREE);
    return services;
  }, []);

  const relatedServices = useMemo(() => {
    return allServices
      .filter((s) => s.slug !== slug) // So sánh với slug đã giải nén
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [allServices, slug]);

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
                {serviceDetail.category}
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
                src={serviceDetail.coverImage}
                alt={serviceDetail.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Main Content Sections */}
            <div className="prose prose-lg max-w-none text-foreground/80">
              {serviceDetail.contentSections.map((section, idx) => (
                <div key={idx} className="mb-10">
                  <h3 className="text-2xl font-serif text-foreground mb-4">
                    {section.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-base">
                    {section.content}
                  </p>
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
              ))}
            </div>

            {/* Tech Specs Table */}
            {serviceDetail.specs.length > 0 && (
              <div className="bg-surface border border-border rounded-sm p-8 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-foreground">
                    Thông Số Kỹ Thuật
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {serviceDetail.specs.map((spec, idx) => (
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
            {serviceDetail.gallery.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-foreground">
                    Dự Án Đã Thực Hiện
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {serviceDetail.gallery.map((img, idx) => (
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
            {serviceDetail.faq.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif text-foreground">
                    Câu Hỏi Thường Gặp
                  </h3>
                </div>
                <div className="space-y-4">
                  {serviceDetail.faq.map((item, idx) => (
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

                <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Thiết kế
                      Demo miễn phí
                    </li>
                    <li className="flex items-center gap-3 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Giao
                      hàng tận nơi
                    </li>
                    <li className="flex items-center gap-3 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Xuất hóa
                      đơn VAT
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2. Related Services */}
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
                        <img
                          src={item.image}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
