'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, ArrowUpRight, BookOpen, Megaphone, ChevronLeft, ChevronRight, Quote, LayoutGrid } from 'lucide-react';

// IMPORT DATA
import {
  HERO_DATA,
  SERVICES_HOME,
  SHOWCASE_ITEMS,
  PROCESS_HOME,
  PORTFOLIO_HOME
} from './data/home_content';

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // 1. NHÂN ĐÔI DANH SÁCH ĐỂ TẠO HIỆU ỨNG VÒNG LẶP VÔ TẬN
  const LOOP_ITEMS = [...SHOWCASE_ITEMS, ...SHOWCASE_ITEMS];

  // 2. LOGIC CUỘN LIÊN TỤC (Request Animation Frame)
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;

        // Nếu không Pause thì mới cuộn
        if (!isPaused) {
          // Tốc độ cuộn: 1px mỗi khung hình (Tăng số này nếu muốn nhanh hơn)
          container.scrollLeft += 1;
        }

        // 3. LOGIC RESET TÀNG HÌNH
        // Nếu đã cuộn qua một nửa độ dài (tức là hết danh sách gốc) -> Reset về 0 ngay lập tức
        // scrollWidth / 2 chính là độ dài của danh sách gốc (vì ta đã nhân đôi)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Bắt đầu vòng lặp
    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Hàm xử lý nút bấm thủ công (Vẫn giữ lại để người dùng tự tua nhanh)
  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative overflow-x-hidden min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">

      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-[0.03]"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0 animate-pulse"></div>

      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <section className="min-h-screen relative flex items-center pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">

          {/* Left Content */}
          <div className="lg:col-span-7 relative z-20">
            <div className="absolute -left-6 -top-24 text-[12rem] md:text-[18rem] font-serif opacity-[0.04] select-none pointer-events-none font-bold text-foreground">01</div>

            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-bold">Est. {HERO_DATA.est}</span>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] leading-[0.9] tracking-tight text-foreground mb-10 drop-shadow-sm">
              <span className="block font-medium">{HERO_DATA.title.line1}</span>
              <span className="block italic font-light text-primary ml-4 md:ml-16">{HERO_DATA.title.line2}</span>
              <span className="block font-bold text-transparent bg-clip-text bg-brand-gradient relative z-10 pb-2">
                {HERO_DATA.title.line3}
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-10 md:items-end pl-2 md:pl-4 max-w-3xl">
              <p className="text-muted font-light text-lg md:text-xl leading-relaxed max-w-lg border-l-2 border-primary/30 pl-6"
                 dangerouslySetInnerHTML={{__html: HERO_DATA.desc.replace('điểm chạm cảm xúc', '<strong class="text-foreground font-medium">điểm chạm cảm xúc</strong>')}}>
              </p>

              <Link href="#services" className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl shadow-primary/20 hover:scale-110 transition-all duration-500 group relative overflow-hidden shrink-0">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <ArrowDown className="w-8 h-8 group-hover:translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative mt-16 lg:mt-0 h-[50vh] lg:h-[75vh] w-full flex items-center justify-center lg:justify-end perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-border rounded-full animate-spin-slow border-dashed opacity-50"></div>

            <div className="relative w-4/5 h-full z-10 overflow-hidden rounded-sm transition-all duration-700 ease-out shadow-2xl shadow-primary/10 border border-white group hover:-translate-y-2">
              <div className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[1.5s]" style={{backgroundImage: `url('${HERO_DATA.mainImage}')`}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            <div className="absolute bottom-16 -left-0 lg:-left-16 z-20 w-56 md:w-72 aspect-square bg-surface p-3 shadow-2xl border border-border rotate-6 hover:rotate-0 transition-transform duration-500 animate-float">
              <div className="w-full h-full relative overflow-hidden bg-cover bg-center contrast-110" style={{backgroundImage: `url('${HERO_DATA.floatingImage}')`}}>
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-surface-dark/90 backdrop-blur-md p-4 border-t border-white/10">
                  <span className="block text-[10px] uppercase tracking-widest text-primary-light mb-1 font-bold">Technique Focus</span>
                  <span className="block font-serif italic text-xl text-white">3D Embossing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SERVICES
          Background: Surface (Xám nhạt)
      ========================================= */}
      <section id="services" className="py-32 px-6 md:px-12 relative overflow-hidden bg-surface">
        <div className="max-w-[1800px] mx-auto relative z-10">

          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 border-b border-border pb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3 block flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary block"></span> Dịch vụ cốt lõi
              </span>
              <h2 className="text-foreground font-serif text-5xl md:text-7xl font-medium">
                Tuyệt Tác <span className="italic text-primary">In Ấn</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Feature Item */}
            <div className="lg:col-span-5 group cursor-pointer relative h-[600px] lg:h-auto">
              <Link href={SERVICES_HOME[0].link} className="block w-full h-full relative overflow-hidden rounded-sm bg-background border border-border transition-all duration-500 hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <div className="absolute inset-0 bg-cover bg-center opacity-95 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-110" style={{backgroundImage: `url('${SERVICES_HOME[0].image}')`}}></div>

                {/* FIX: Dùng from-black/80 để chữ trắng nổi bật trên mọi nền */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                <div className="absolute top-8 left-8 z-20">
                  <span className="inline-block px-4 py-1 border border-white/20 backdrop-blur-md bg-black/40 text-xs font-bold uppercase tracking-widest text-white rounded-full">
                    {SERVICES_HOME[0].tag}
                  </span>
                </div>

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                   <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight group-hover:text-primary-light transition-colors">
                     {SERVICES_HOME[0].title}
                   </h3>
                   <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white border-b border-primary pb-1 hover:text-primary-light transition-colors w-fit">
                     Xem chi tiết <ArrowRight className="w-5 h-5"/>
                   </div>
                </div>
              </Link>
            </div>

            {/* Other Items */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <Link href={SERVICES_HOME[1].link} className="group cursor-pointer relative h-[350px]">
                <div className="w-full h-full relative overflow-hidden rounded-sm bg-background border border-border transition-all duration-500 hover:border-primary hover:shadow-lg">
                   <div className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-105" style={{backgroundImage: `url('${SERVICES_HOME[1].image}')`}}></div>

                   {/* FIX: Gradient đen ngang */}
                   <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>

                   <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center z-10 items-start max-w-xl">
                      <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                        {SERVICES_HOME[1].title}
                      </h3>
                      <p className="text-white/80 text-base mb-6 leading-relaxed">{SERVICES_HOME[1].desc}</p>

                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                         <ArrowUpRight className="w-5 h-5" />
                      </div>
                   </div>
                </div>
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[300px]">
                 {SERVICES_HOME.slice(2).map((service, idx) => (
                    <Link href={service.link} key={idx} className="group cursor-pointer relative h-full">
                       <div className="w-full h-full relative overflow-hidden rounded-sm bg-background border border-border transition-all duration-500 hover:border-primary hover:shadow-lg">
                          <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-110" style={{backgroundImage: `url('${service.image}')`}}></div>

                          {/* FIX: Gradient đen dọc */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                             <h3 className="text-2xl font-serif text-white mb-2">{service.title}</h3>
                             <p className="text-sm text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                               {service.desc}
                             </p>
                             <span className="text-xs font-bold text-primary-light uppercase tracking-widest border-b border-primary/30 pb-1 inline-block">
                               Khám phá
                             </span>
                          </div>

                          <div className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 text-white/80 group-hover:bg-primary group-hover:text-white transition-all">
                             {idx === 0 ? <BookOpen className="w-5 h-5"/> : <Megaphone className="w-5 h-5"/>}
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: SHOWCASE (CONTINUOUS LOOP)
          Background: Surface Dark (Màu tối sang trọng)
      ========================================= */}
      <section id="showcase" className="py-24 bg-surface-dark relative overflow-hidden text-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2  flex items-center gap-2">
                 <span className="w-8 h-[2px] bg-primary block"></span> Tiêu điểm tháng
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-white">
                Banner <span className="italic text-primary">Standee</span>
              </h2>
            </div>

            {/* Navigation Buttons */}
            {/* <div className="gap-4 hidden md:flex">
               <button
                 onClick={() => handleManualScroll('left')}
                 className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white active:scale-95 "
               >
                 <ChevronLeft className="w-6 h-6"/>
               </button>
               <button
                 onClick={() => handleManualScroll('right')}
                 className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white active:scale-95 "
               >
                 <ChevronRight className="w-6 h-6"/>
               </button>
            </div> */}
          </div>

          <div className="relative w-full">
            {/* 4. REMOVE SNAP CLASSES: Bỏ snap-x và snap-mandatory để cuộn mượt mà */}
            <div
              ref={scrollContainerRef}
              // Khi hover thì Pause autoplay
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex overflow-x-auto gap-8 pb-12 -mx-6 px-6 md:px-0 md:mx-0 scrollbar-hide select-none"
            >
               {/* 5. RENDER LOOP_ITEMS (Danh sách nhân đôi) */}
               {LOOP_ITEMS.map((item, idx) => (
                  <Link href={item.link} key={idx} className="shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] h-[600px] relative group rounded-sm overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl">
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{backgroundImage: `url('${item.image}')`}}></div>

                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                     <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-2 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">{item.tag}</span>
                     </div>

                     <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                         <h3 className="text-3xl font-serif text-white mb-3 leading-tight">
                           {item.title} <br/> <span className="text-primary-light italic">{item.sub}</span>
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
          SECTION 4: PROCESS (Interactive Cards)
          Background: Background (Trắng)
      ========================================= */}
      <section id="process" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">

             {/* LEFT: Sticky Header */}
             <div className="lg:col-span-5 lg:sticky lg:top-32 self-start h-fit">
                <span className="inline-block py-1 px-3 border border-primary text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-full">
                  Quy Trình Thủ Công
                </span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-8 text-foreground font-medium">
                  Nghệ thuật <br/> của sự <span className="italic text-primary">tỉ mỉ.</span>
                </h2>
                <p className="text-muted text-xl font-normal leading-relaxed max-w-md mb-12">
                   Chúng tôi không chỉ in ấn. Chúng tôi tư vấn giải pháp vật liệu để tối ưu hóa ngân sách và thẩm mỹ cho thương hiệu của bạn.
                </p>
                <Link href="/contact" className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest font-bold px-8 py-4 bg-foreground text-background hover:bg-primary hover:text-white transition-all rounded-sm shadow-xl">
                   Bắt đầu dự án <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

             {/* RIGHT: Interactive Steps List */}
             <div className="lg:col-span-7 flex flex-col gap-8 pt-12 lg:pt-0 relative">
                {PROCESS_HOME.map((step, idx) => (
                   <div key={idx} className="group relative p-8 border border-border bg-surface/50 hover:bg-background hover:border-primary/30 rounded-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden cursor-default">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                         <div className="relative">
                            <span className="text-7xl md:text-8xl font-serif font-bold text-transparent opacity-20 group-hover:opacity-0 transition-opacity duration-300"
                                  style={{ WebkitTextStroke: '1px currentColor', color: 'var(--foreground)' }}>
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
                            <p className="text-muted font-medium text-lg leading-relaxed group-hover:text-foreground transition-colors duration-300">
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
          SECTION 5: PORTFOLIO
          Background: Surface
      ========================================= */}
      <section id="portfolio" className="py-32 px-6 md:px-12 bg-surface relative">
         <div className="max-w-[1800px] mx-auto">
            <div className="text-center mb-24 relative z-10">
               <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Gallery</span>
               <h2 className="text-5xl md:text-8xl font-serif text-foreground uppercase tracking-tight">
                  Selected <span className="text-transparent bg-clip-text bg-brand-gradient font-medium">Works</span>
               </h2>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {PORTFOLIO_HOME.map((item, idx) => (
                  <div key={idx} className="group break-inside-avoid relative overflow-hidden rounded-sm cursor-pointer shadow-lg hover:shadow-primary/20 transition-all duration-500 bg-background">
                     {/* Image Card */}
                     {item.type === 'image' && (
                        <div className="relative overflow-hidden aspect-[3/4]">
                           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{backgroundImage: `url('${item.image}')`}}></div>
                           <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 border-2 border-white/10 m-2">
                              <div className="text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                 <p className="text-primary-light font-bold text-xs uppercase tracking-[0.2em] mb-3">{item.category}</p>
                                 <h4 className="text-3xl font-serif text-white">{item.title}</h4>
                              </div>
                           </div>
                        </div>
                     )}
                     {/* Quote Card */}
                     {item.type === 'quote' && (
                        <div className="pt-0">
                           <div className="p-10 border border-white/5 bg-surface-dark text-center group-hover:border-primary/50 transition-colors relative h-full flex flex-col justify-center">
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                              <Quote className="w-12 h-12 text-primary mb-6 mx-auto" />
                              <p className="text-white text-xl font-serif italic leading-relaxed mb-8">{item.text}</p>
                              <div className="mt-auto flex flex-col items-center">
                                 <span className="font-bold text-muted text-sm uppercase tracking-widest">— {item.author}</span>
                              </div>
                           </div>
                        </div>
                     )}
                     {/* Standard Card */}
                     {item.type === 'card' && (
                        <div className="relative overflow-hidden aspect-[4/5]">
                           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0" style={{backgroundImage: `url('${item.image}')`}}></div>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                           <div className="absolute bottom-0 left-0 p-8 w-full">
                              <div className="border-t border-white/20 pt-6 flex justify-between items-end">
                                 <div>
                                    <span className="text-primary-light text-[10px] font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                                    <h4 className="text-3xl font-serif text-white group-hover:text-primary-light transition-colors">{item.title}</h4>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                     {/* CTA Card */}
                     {item.type === 'cta' && (
                        <Link href="/services" className="p-8 bg-primary text-white flex flex-col justify-center items-center text-center aspect-square hover:bg-surface-dark transition-colors duration-500 h-full w-full">
                           <LayoutGrid className="w-12 h-12 mb-4" />
                           <h4 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{item.title}</h4>
                           <span className="inline-block px-8 py-3 border-2 border-white group-hover:border-primary text-xs uppercase tracking-widest font-bold transition-all">
                             Toàn bộ dự án
                           </span>
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
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 animate-pulse">Sẵn sàng để tạo tác</p>
            <h2 className="text-5xl md:text-8xl font-serif text-foreground mb-12 leading-[1.1] font-medium drop-shadow-sm">
               Biến ý tưởng thành <br/>
               <span className="italic text-transparent bg-clip-text bg-brand-gradient">kiệt tác chạm được.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link href="/contact" className="h-16 px-12 flex items-center justify-center bg-foreground text-background font-black text-sm uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300 rounded-sm shadow-xl">
                  Liên hệ tư vấn
               </Link>
            </div>
         </div>
      </section>

    </main>
  );
}