/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Megaphone,
  Quote,
} from "lucide-react";

// IMPORT DATA TĨNH (Dùng làm dữ liệu mặc định/fallback khi chưa load xong)
import {
  HERO_DATA as STATIC_HERO,
  SERVICES_HOME as STATIC_SERVICES,
  SHOWCASE_ITEMS as STATIC_SHOWCASE,
  PROCESS_HOME as STATIC_PROCESS,
  PORTFOLIO_HOME as STATIC_PORTFOLIO,
} from "./data/home_content";

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- STATES DỮ LIỆU (Khởi tạo bằng data tĩnh trước) ---
  const [heroData, setHeroData] = useState<any>(STATIC_HERO);
  const [servicesData, setServicesData] = useState<any[]>(STATIC_SERVICES);
  const [showcaseData, setShowcaseData] = useState<any[]>(STATIC_SHOWCASE);
  const [processData, setProcessData] = useState<any[]>(STATIC_PROCESS);
  const [portfolioData, setPortfolioData] = useState<any[]>(STATIC_PORTFOLIO);

  // --- 1. GỌI API LẤY DỮ LIỆU THẬT TỪ DATABASE ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, servicesRes, showcaseRes, processRes, portfolioRes] =
          await Promise.all([
            fetch("/api/config?key=home_hero"),
            fetch("/api/config?key=home_services"),
            fetch("/api/config?key=home_showcase"),
            fetch("/api/config?key=home_process"),
            fetch("/api/config?key=home_portfolio"),
          ]);

        const hero = await heroRes.json();
        const services = await servicesRes.json();
        const showcase = await showcaseRes.json();
        const process = await processRes.json();
        const portfolio = await portfolioRes.json();

        // Cập nhật State nếu có dữ liệu từ DB
        if (hero) setHeroData(hero);
        if (Array.isArray(services) && services.length > 0)
          setServicesData(services);
        if (Array.isArray(showcase) && showcase.length > 0)
          setShowcaseData(showcase);
        if (Array.isArray(process) && process.length > 0)
          setProcessData(process);
        if (Array.isArray(portfolio) && portfolio.length > 0)
          setPortfolioData(portfolio);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu trang chủ:", error);
      }
    };

    fetchData();
  }, []);

  // --- 2. LOGIC VÒNG LẶP SHOWCASE ---
  const loopItems = [...showcaseData, ...showcaseData];

  // --- 3. AUTO SCROLL ---
  useEffect(() => {
    let animationFrameId: number;
    const autoScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        if (!isPaused) {
          container.scrollLeft += 1;
        }
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, loopItems]);

  return (
    <main className="relative overflow-x-hidden min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-[0.03]"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0 animate-pulse"></div>

      {/* =========================================
          SECTION 1: HERO (DỮ LIỆU ĐỘNG)
      ========================================= */}
      <section className="min-h-screen relative flex items-center pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          {/* Left Content */}
          <div className="lg:col-span-7 relative z-20">
            <div className="absolute -left-6 -top-24 text-[12rem] md:text-[18rem] font-serif opacity-[0.04] select-none pointer-events-none font-bold text-foreground">
              HTA
            </div>

            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-bold">
                Est. {heroData.est || "2025"}
              </span>
            </div>

            <h1 className="font-serif text-foreground mb-6 drop-shadow-sm text-5xl sm:text-5xl md:text-6xl lg:text-[6.5rem] xl:text-[8rem] leading-[1.1] lg:leading-[0.9] tracking-tight">
              <span className="block font-medium">{heroData.title?.line1}</span>
              <span className="block italic font-light text-primary mt-2 sm:mt-5 ml-0 sm:ml-8 md:ml-16 leading-tight lg:leading-[1.1]">
                {heroData.title?.line2}
              </span>
              <span className="block font-bold text-transparent bg-clip-text bg-brand-gradient relative z-10 pb-2 leading-tight lg:leading-[1.1]">
                {heroData.title?.line3}
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-10 md:items-end pl-2 md:pl-4 max-w-3xl">
              <p
                className="text-gray-600 font-light text-lg md:text-xl leading-relaxed max-w-lg border-l-2 border-primary/30 pl-6"
                dangerouslySetInnerHTML={{
                  __html: (heroData.desc || "").replace(
                    "điểm chạm cảm xúc",
                    '<strong class="text-foreground font-medium">điểm chạm cảm xúc</strong>',
                  ),
                }}
              ></p>

              <Link
                href="#services"
                aria-label="Cuộn xuống phần dịch vụ"
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl shadow-primary/20 hover:scale-110 transition-all duration-500 group relative overflow-hidden shrink-0"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <ArrowDown className="w-8 h-8 group-hover:translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-0 h-[50vh] lg:h-[75vh] w-full flex items-center justify-center lg:justify-end perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-border rounded-full animate-spin-slow border-dashed opacity-50"></div>

            <div className="relative w-4/5 h-full z-10 overflow-hidden rounded-sm transition-all duration-700 ease-out shadow-2xl shadow-primary/10 border border-white group hover:-translate-y-2">
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[1.5s]"
                style={{ backgroundImage: `url('${heroData.mainImage}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            <div className="absolute bottom-16 -left-0 lg:-left-16 z-20 w-56 md:w-72 aspect-square bg-surface p-3 shadow-2xl border border-border rotate-6 hover:rotate-0 transition-transform duration-500 animate-float">
              <div
                className="w-full h-full relative overflow-hidden bg-cover bg-center contrast-110"
                style={{ backgroundImage: `url('${heroData.floatingImage}')` }}
              >
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-surface-dark/90 backdrop-blur-md p-4 border-t border-white/10">
                  <span className="block text-[10px] uppercase tracking-widest text-primary-light mb-1 font-bold">
                    Technique Focus
                  </span>
                  <span className="block font-serif italic text-xl text-white">
                    3D Embossing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SERVICES (DỮ LIỆU ĐỘNG)
      ========================================= */}
      <section
        id="services"
        className="py-32 px-6 md:px-12 relative overflow-hidden bg-surface"
      >
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 border-b border-border pb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary block"></span> Dịch vụ
                cốt lõi
              </span>
              <h2 className="text-foreground font-serif text-5xl md:text-7xl font-medium">
                Tuyệt Tác <span className="italic text-primary">In Ấn</span>
              </h2>
            </div>
          </div>

          {servicesData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Feature Item (Item đầu tiên) */}
              <div className="lg:col-span-5 group cursor-pointer relative h-[600px] lg:h-auto">
                <Link
                  href={servicesData[0].link || "/services"}
                  className="block w-full h-full relative overflow-hidden rounded-sm bg-background border border-border transition-all duration-500 hover:border-primary hover:shadow-xl hover:shadow-primary/10"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-95 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${servicesData[0].image}')`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute top-8 left-8 z-20">
                    <span className="inline-block px-4 py-1 border border-white/20 backdrop-blur-md bg-black/40 text-xs font-bold uppercase tracking-widest text-white rounded-full">
                      {servicesData[0].tag || "Best Seller"}
                    </span>
                  </div>
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight group-hover:text-primary-light transition-colors">
                      {servicesData[0].title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white border-b border-primary pb-1 hover:text-primary-light transition-colors w-fit">
                      Xem chi tiết <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Other Items */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Item thứ 2 */}
                {servicesData[1] && (
                  <Link
                    href={servicesData[1].link || "/services"}
                    className="group cursor-pointer relative h-[350px]"
                  >
                    <div className="w-full h-full relative overflow-hidden rounded-sm bg-background border border-border transition-all duration-500 hover:border-primary hover:shadow-lg">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${servicesData[1].image}')`,
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center z-10 items-start max-w-xl">
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                          {servicesData[1].title}
                        </h3>
                        <p className="text-white/80 text-base mb-6 leading-relaxed">
                          {servicesData[1].desc}
                        </p>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Các item còn lại (Từ index 2 trở đi) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[300px]">
                  {servicesData.slice(2).map((service: any, idx: number) => (
                    <Link
                      href={service.link || "/services"}
                      key={idx}
                      className="group cursor-pointer relative h-full"
                    >
                      <div className="w-full h-full relative overflow-hidden rounded-sm bg-background border border-border transition-all duration-500 hover:border-primary hover:shadow-lg">
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-110"
                          style={{ backgroundImage: `url('${service.image}')` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                          <h3 className="text-2xl font-serif text-white mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                            {service.desc}
                          </p>
                          <span className="text-xs font-bold text-primary-light uppercase tracking-widest border-b border-primary/30 pb-1 inline-block">
                            Khám phá
                          </span>
                        </div>
                        <div className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 text-white/80 group-hover:bg-primary group-hover:text-white transition-all">
                          {idx === 0 ? (
                            <BookOpen className="w-5 h-5" />
                          ) : (
                            <Megaphone className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          SECTION 3: SHOWCASE (DỮ LIỆU ĐỘNG)
      ========================================= */}
      <section
        id="showcase"
        className="py-24 bg-surface-dark relative overflow-hidden text-white"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              {/* 👇 ĐÃ SỬA: Đổi text-primary thành text-blue-400 */}
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm mb-2 flex items-center gap-2">
                {/* 👇 ĐÃ SỬA: Đổi bg-primary thành bg-blue-400 cho đồng bộ */}
                <span className="w-8 h-[2px] bg-blue-400 block"></span>
                Tiêu điểm tháng
              </span>

              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Banner {/* 👇 ĐÃ SỬA: Đổi text-primary thành text-blue-400 */}
                <span className="italic text-blue-400">Standee</span>
              </h2>
            </div>
          </div>

          <div className="relative w-full">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex overflow-x-auto gap-8 pb-12 -mx-6 px-6 md:px-0 md:mx-0 scrollbar-hide select-none"
            >
              {loopItems.map((item: any, idx: number) => (
                <Link
                  href={item.link || "/services"}
                  key={idx}
                  className="shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] h-[600px] relative group rounded-sm overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-2 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                    <h3 className="text-3xl font-serif text-white mb-3 leading-tight">
                      {item.title} <br />
                      <span className="text-primary-light italic">
                        {item.sub}
                      </span>
                    </h3>
                    <p className="text-white/70 text-base mb-6 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: PROCESS (DỮ LIỆU ĐỘNG)
      ========================================= */}
      <section
        id="process"
        className="py-24 md:py-32 bg-background relative overflow-hidden"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
            {/* LEFT: Sticky Header */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start h-fit">
              <span className="inline-block py-1 px-3 border border-primary text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-full">
                Quy Trình Thủ Công
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-8 text-foreground font-medium">
                Nghệ thuật <br /> của sự{" "}
                <span className="italic text-primary">tỉ mỉ.</span>
              </h2>
              <p className="text-gray-600 text-xl font-normal leading-relaxed max-w-md mb-12">
                Chúng tôi không chỉ in ấn. Chúng tôi tư vấn giải pháp vật liệu
                để tối ưu hóa ngân sách và thẩm mỹ cho thương hiệu của bạn.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest font-bold px-8 py-4 bg-foreground text-background hover:bg-primary hover:text-white transition-all rounded-sm shadow-xl"
              >
                Bắt đầu dự án
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* RIGHT: Interactive Steps List (DYNAMIC) */}
            <div className="lg:col-span-7 flex flex-col gap-8 pt-12 lg:pt-0 relative">
              {processData.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="group relative p-8 border border-border bg-surface/50 hover:bg-background hover:border-primary/30 rounded-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden cursor-default"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="relative">
                      <span
                        className="text-7xl md:text-8xl font-serif font-bold text-transparent opacity-20 group-hover:opacity-0 transition-opacity duration-300"
                        style={{
                          WebkitTextStroke: "1px currentColor",
                          color: "var(--foreground)",
                        }}
                      >
                        {step.id}
                      </span>
                      <span className="absolute top-0 left-0 text-7xl md:text-8xl font-serif font-bold text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        {step.id}
                      </span>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300 mb-4 flex items-center gap-4">
                        {step.title}
                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary" />
                      </h3>
                      <p className="text-gray-600 font-medium text-lg leading-relaxed group-hover:text-foreground transition-colors duration-300">
                        {step.desc}
                      </p>
                      <div className="w-0 h-[1px] bg-primary mt-6 opacity-0 group-hover:w-full group-hover:opacity-50 transition-all duration-700 delay-100"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: PORTFOLIO (MASONRY COLORFUL)
      ========================================= */}
      <section id="portfolio" className="py-24 px-4 md:px-8 bg-white relative">
        <div className="max-w-[1800px] mx-auto">
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[2px] bg-primary"></span>
              Selected Projects
              <span className="w-8 h-[2px] bg-primary"></span>
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1]">
              Bộ Sưu Tập <span className="italic text-primary">Sáng Tạo</span>
            </h2>
          </div>

          {/* --- MASONRY GRID (Thác nước) --- */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {portfolioData.map((item: any, idx: number) => (
              <div
                key={idx}
                className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                {/* --- LOẠI 1 & 3: IMAGE / CARD (Full Color) --- */}
                {(item.type === "image" || item.type === "card") && (
                  <Link href="/services" className="block relative">
                    {/* Hình ảnh (Giữ nguyên màu) */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient đen nhẹ ở dưới để làm nổi chữ trắng */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                      {/* Nội dung */}
                      <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/90 mb-3 backdrop-blur-md">
                          {item.category}
                        </span>
                        <div className="flex justify-between items-end">
                          <h3 className="text-2xl font-serif text-white leading-tight">
                            {item.title}
                          </h3>
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* --- LOẠI 2: QUOTE (Phong cách tạp chí) --- */}
                {item.type === "quote" && (
                  <div className="bg-surface-dark p-8 flex flex-col justify-center items-center text-center min-h-[350px] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Quote className="w-10 h-10 text-primary mb-6" />
                    <p className="text-xl md:text-2xl font-serif text-white leading-relaxed mb-6 relative z-10">
                      &quot;{item.text}&quot;
                    </p>
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-12 h-[1px] bg-white/20"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary-light">
                        {item.author}
                      </span>
                    </div>
                  </div>
                )}

                {/* --- LOẠI 4: CTA (Khối màu nổi bật) --- */}
                {item.type === "cta" && (
                  <Link
                    href={item.link || "/services"}
                    className=" bg-primary text-white p-10 min-h-[300px] flex flex-col justify-center items-center text-center relative overflow-hidden group/cta hover:bg-primary-dark transition-colors"
                  >
                    {/* Họa tiết nền nhẹ */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="relative z-10 transform group-hover/cta:scale-105 transition-transform duration-500">
                      <h4 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                        {item.title}
                      </h4>
                      <span className="inline-flex items-center gap-2 border-b-2 border-white pb-1 text-sm font-bold uppercase tracking-widest">
                        Xem tất cả <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden flex items-center justify-center bg-background border-t border-border">
        <div className="relative z-10 text-center max-w-5xl">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 animate-pulse">
            Sẵn sàng để tạo tác
          </p>
          <h2 className="text-5xl md:text-8xl font-serif text-foreground mb-12 leading-[1.1] font-medium drop-shadow-sm">
            Biến ý tưởng thành <br />
            <span className="italic text-transparent bg-clip-text bg-brand-gradient">
              kiệt tác chạm được.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contact"
              className="h-16 px-12 flex items-center justify-center bg-foreground text-background font-black text-sm uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300 rounded-sm shadow-xl"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
