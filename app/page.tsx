// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, ArrowUpRight, BookOpen, Megaphone, ChevronLeft, ChevronRight, Star, Quote, LayoutGrid } from 'lucide-react';

// IMPORT DATA
import {
  HERO_DATA,
  SERVICES_HOME,
  SHOWCASE_ITEMS,
  PROCESS_HOME,
  PORTFOLIO_HOME
} from './data/home_content';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden min-h-screen">

      {/* Background FX (Giữ lại để tạo không khí) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-30 mix-blend-overlay"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none z-0 animate-pulse"></div>

      {/* --- HERO --- */}
      <section className="min-h-screen relative flex items-center pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7 relative z-20">
            <div className="absolute -left-6 -top-24 text-[12rem] md:text-[18rem] font-serif opacity-[0.02] select-none pointer-events-none font-bold text-sand">01</div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-bold">Est. {HERO_DATA.est}</span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] leading-[0.9] tracking-tight text-sand mb-10 drop-shadow-2xl">
              <span className="block font-medium">{HERO_DATA.title.line1}</span>
              <span className="block italic font-light text-primary ml-4 md:ml-16">{HERO_DATA.title.line2}</span>
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-sand-dim to-transparent relative z-10">{HERO_DATA.title.line3}</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-10 md:items-end pl-2 md:pl-4 max-w-3xl">
              <p className="text-sand-dim font-light text-lg md:text-xl leading-relaxed max-w-lg border-l-2 border-primary/30 pl-6" dangerouslySetInnerHTML={{__html: HERO_DATA.desc.replace('điểm chạm cảm xúc', '<strong class="text-sand font-medium">điểm chạm cảm xúc</strong>')}}></p>
              <Link href="#services" className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-700 text-white shadow-lg shadow-primary/20 hover:scale-110 transition-all duration-500 group relative overflow-hidden shrink-0">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <ArrowDown className="w-8 h-8 group-hover:translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative mt-16 lg:mt-0 h-[50vh] lg:h-[75vh] w-full flex items-center justify-center lg:justify-end perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-sand/5 rounded-full animate-spin-slow border-dashed"></div>
            <div className="relative w-4/5 h-full z-10 overflow-hidden rounded-sm transition-all duration-700 ease-out shadow-2xl shadow-black/50 border border-white/5 group hover:-translate-y-2">
              <div className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[1.5s]" style={{backgroundImage: `url('${HERO_DATA.mainImage}')`}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="absolute bottom-16 -left-0 lg:-left-16 z-20 w-56 md:w-72 aspect-square bg-noir-light p-3 shadow-2xl border border-sand/10 rotate-6 hover:rotate-0 transition-transform duration-500 animate-float">
              <div className="w-full h-full relative overflow-hidden bg-cover bg-center contrast-110" style={{backgroundImage: `url('${HERO_DATA.floatingImage}')`}}>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-t border-white/10">
                  <span className="block text-[10px] uppercase tracking-widest text-primary mb-1 font-bold">Technique Focus</span>
                  <span className="block font-serif italic text-xl text-white">3D Embossing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 px-6 md:px-12 relative overflow-hidden bg-noir-light/30">
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3 block flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary block"></span> Dịch vụ cốt lõi
              </span>
              <h2 className="text-sand font-serif text-5xl md:text-7xl font-medium">Tuyệt Tác <span className="italic text-primary">In Ấn</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Item */}
            <div className="lg:col-span-5 group cursor-pointer relative h-[600px] lg:h-auto">
              <Link href={SERVICES_HOME[0].link} className="block w-full h-full relative overflow-hidden rounded-sm bg-noir border border-sand/10 transition-all duration-500 hover:border-primary/40">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-110" style={{backgroundImage: `url('${SERVICES_HOME[0].image}')`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent"></div>
                <div className="absolute top-8 left-8 z-20">
                  <span className="inline-block px-4 py-1 border border-white/20 backdrop-blur-md bg-black/30 text-xs font-bold uppercase tracking-widest text-white rounded-full">{SERVICES_HOME[0].tag}</span>
                </div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                   <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight group-hover:text-primary transition-colors">{SERVICES_HOME[0].title}</h3>
                   <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white border-b border-primary pb-1 hover:text-primary transition-colors w-fit">
                      Xem chi tiết <ArrowRight className="w-5 h-5"/>
                   </div>
                </div>
              </Link>
            </div>

            {/* Other Items */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <Link href={SERVICES_HOME[1].link} className="group cursor-pointer relative h-[350px]">
                <div className="w-full h-full relative overflow-hidden rounded-sm bg-noir border border-sand/10 transition-all duration-500 hover:border-primary/40">
                   <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-90 transition-opacity duration-700 scale-100 group-hover:scale-105" style={{backgroundImage: `url('${SERVICES_HOME[1].image}')`}}></div>
                   <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/40 to-transparent"></div>
                   <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center z-10 items-start max-w-xl">
                      <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{SERVICES_HOME[1].title}</h3>
                      <p className="text-sand-dim text-base mb-6 leading-relaxed">{SERVICES_HOME[1].desc}</p>
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                         <ArrowUpRight className="w-5 h-5" />
                      </div>
                   </div>
                </div>
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[300px]">
                 {SERVICES_HOME.slice(2).map((service, idx) => (
                    <Link href={service.link} key={idx} className="group cursor-pointer relative h-full">
                       <div className="w-full h-full relative overflow-hidden rounded-sm bg-noir border border-sand/10 transition-all duration-500 hover:border-primary/40">
                          <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-80 transition-opacity duration-700 scale-100 group-hover:scale-110" style={{backgroundImage: `url('${service.image}')`}}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent"></div>
                          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                             <h3 className="text-2xl font-serif text-white mb-2">{service.title}</h3>
                             <p className="text-sm text-sand-dim mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{service.desc}</p>
                             <span className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/30 pb-1 inline-block">Khám phá</span>
                          </div>
                          <div className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 text-white/70 group-hover:bg-primary group-hover:text-white transition-all">
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

      {/* --- SHOWCASE --- */}
      <section id="showcase" className="py-24 bg-noir relative overflow-hidden border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2 block flex items-center gap-2">
                 <span className="w-8 h-[2px] bg-primary block"></span> Tiêu điểm tháng
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-sand">Banner <span className="italic text-primary">Standee</span></h2>
            </div>
            <div className="flex gap-4 hidden md:flex">
               <button className="w-14 h-14 rounded-full border border-sand/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-sand"><ChevronLeft className="w-6 h-6"/></button>
               <button className="w-14 h-14 rounded-full border border-sand/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-sand"><ChevronRight className="w-6 h-6"/></button>
            </div>
          </div>

          <div className="relative w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 -mx-6 px-6 md:px-0 md:mx-0 scrollbar-hide select-none">
               {SHOWCASE_ITEMS.map((item, idx) => (
                  <Link href={item.link} key={idx} className="snap-center shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] h-[600px] relative group rounded-sm overflow-hidden border border-sand/10 hover:border-primary/50 transition-all duration-500 shadow-2xl">
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{backgroundImage: `url('${item.image}')`}}></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                     <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-2 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">{item.tag}</span>
                     </div>
                     <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                         <h3 className="text-3xl font-serif text-white mb-3 leading-tight">{item.title} <br/> <span className="text-primary italic">{item.sub}</span></h3>
                         <p className="text-sand-dim text-base mb-6 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">{item.desc}</p>
                     </div>
                  </Link>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS --- */}
      <section id="process" className="py-24 md:py-32 bg-sand text-noir relative">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
             <div className="lg:sticky lg:top-32 self-start">
                <span className="inline-block py-1 px-3 border border-primary text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-full">Quy Trình Thủ Công</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-8 text-noir font-medium">Nghệ thuật <br/> của sự <span className="italic text-primary">tỉ mỉ.</span></h2>
                <p className="text-metal text-xl font-normal leading-relaxed max-w-md mb-12">
                   Mỗi sản phẩm in ấn là một hành trình độc bản. Chúng tôi trân trọng từng chi tiết nhỏ nhất.
                </p>
                <Link href="/contact" className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest font-bold px-8 py-4 bg-noir text-sand hover:bg-primary hover:text-white transition-all rounded-sm">
                   Khám phá Studio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
             <div className="flex flex-col gap-24 pt-12 lg:pt-0 border-l-2 border-noir/10 pl-8 md:pl-16 relative">
                {PROCESS_HOME.map((step, idx) => (
                   <div key={idx} className="relative group">
                      <span className={`absolute -left-[3.25rem] md:-left-[5.25rem] top-2 w-4 h-4 rounded-full outline outline-4 outline-sand z-10 shadow-lg ${idx === 0 ? 'bg-primary' : 'bg-noir group-hover:bg-primary transition-colors'}`}></span>
                      <div className="flex flex-col gap-6 items-start">
                         <div className="flex items-baseline gap-6 w-full border-b border-noir/10 pb-6">
                            <span className="text-7xl font-serif font-bold text-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" style={{WebkitTextStroke: '2px #0a0a0a'}}>{step.id}</span>
                            <h3 className="text-3xl font-bold uppercase tracking-wide group-hover:text-primary transition-colors">{step.title}</h3>
                         </div>
                         <p className="text-metal font-medium text-lg leading-relaxed">{step.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO --- */}
      <section id="portfolio" className="py-32 px-6 md:px-12 bg-noir relative">
         <div className="max-w-[1800px] mx-auto">
            <div className="text-center mb-24 relative z-10">
               <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Gallery</span>
               <h2 className="text-5xl md:text-8xl font-serif text-sand uppercase tracking-tight">
                  Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 font-medium">Works</span>
               </h2>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
               {PORTFOLIO_HOME.map((item, idx) => (
                  <div key={idx} className="group break-inside-avoid relative overflow-hidden rounded-sm cursor-pointer shadow-lg hover:shadow-primary/20 transition-all duration-500">
                     {item.type === 'image' && (
                        <div className="relative overflow-hidden aspect-[3/4]">
                           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{backgroundImage: `url('${item.image}')`}}></div>
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 border-2 border-white/5 m-2">
                              <div className="text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                 <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">{item.category}</p>
                                 <h4 className="text-3xl font-serif text-white">{item.title}</h4>
                              </div>
                           </div>
                        </div>
                     )}
                     {item.type === 'quote' && (
                        <div className="pt-12">
                           <div className="p-10 border border-sand/10 bg-gradient-to-br from-noir-light to-black text-center group-hover:border-primary/50 transition-colors shadow-2xl relative">
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                              <Quote className="w-12 h-12 text-primary mb-6 mx-auto" />
                              <p className="text-sand text-xl font-serif italic leading-relaxed">{item.text}</p>
                              <div className="mt-8 flex flex-col items-center">
                                 <span className="font-bold text-white text-sm uppercase tracking-widest">{item.author}</span>
                              </div>
                           </div>
                        </div>
                     )}
                     {item.type === 'card' && (
                        <div className="relative overflow-hidden aspect-[4/5]">
                           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all" style={{backgroundImage: `url('${item.image}')`}}></div>
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                           <div className="absolute bottom-0 left-0 p-8 w-full">
                              <div className="border-t border-sand/20 pt-6 flex justify-between items-end">
                                 <div>
                                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                                    <h4 className="text-3xl font-serif text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                     {item.type === 'cta' && (
                        <Link href="/services" className="p-8 bg-primary text-white flex flex-col justify-center items-center text-center aspect-square hover:bg-white hover:text-primary transition-colors duration-500">
                           <LayoutGrid className="w-12 h-12 mb-4" />
                           <h4 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{item.title}</h4>
                           <span className="inline-block px-8 py-3 border-2 border-white group-hover:border-primary text-xs uppercase tracking-widest font-bold transition-all">Toàn bộ dự án</span>
                        </Link>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden flex items-center justify-center bg-noir-light border-t border-sand/5">
         <div className="relative z-10 text-center max-w-5xl">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 animate-pulse">Sẵn sàng để tạo tác</p>
            <h2 className="text-5xl md:text-8xl font-serif text-sand mb-12 leading-[1.1] font-medium drop-shadow-lg">
               Biến ý tưởng thành <br/>
               <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">kiệt tác chạm được.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link href="/contact" className="h-16 px-12 flex items-center justify-center bg-sand text-noir font-black text-sm uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all duration-300 rounded-sm">
                  Liên hệ tư vấn
               </Link>
            </div>
         </div>
      </section>
    </main>
  );
}