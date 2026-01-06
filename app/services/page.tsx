/* eslint-disable @next/next/no-img-element */
// app/services/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, ChevronDown, Headphones, PlusCircle, MoreHorizontal, X, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORT DATA
import {
  CATALOG_INFO,
  CATEGORIES,
  ALL_PRODUCTS,
  MARQUEE_TEXT
} from '../data/services_content';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('office');
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProducts = useMemo(() => {
    const allProductsFlat = Object.values(ALL_PRODUCTS).flat();

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return allProductsFlat.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query)
      );
    }

    let currentList = ALL_PRODUCTS[activeCategory] || [];

    if (activeSubItem) {
      const keyword = activeSubItem.split('(')[0].trim().toLowerCase();
      currentList = currentList.filter(p =>
        p.name.toLowerCase().includes(keyword)
      );
    }

    return currentList;
  }, [activeCategory, activeSubItem, searchQuery]);

  // Handlers
  const handleCategoryClick = (id: string) => {
    if (activeCategory !== id) {
        setActiveCategory(id);
        setActiveSubItem(null);
        setSearchQuery('');
    }
  };

  const handleSubItemClick = (item: string) => {
    setActiveSubItem(activeSubItem === item ? null : item);
    setSearchQuery('');
  };

  return (
    <main className="relative min-h-screen bg-noir text-sand flex flex-col">

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
         <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      {/* --- HERO SECTION --- */}
      {/* Thêm pt-32 để tránh bị Header che mất */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden border-b border-white/5 pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=1974')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-noir/90 backdrop-blur-[2px]"></div>

        <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block py-1 px-4 border border-primary/30 bg-primary/10 backdrop-blur-md rounded-full text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            Catalog {CATALOG_INFO.year}
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-sand mb-6 tracking-tight">
            {CATALOG_INFO.title} <span className="italic text-transparent bg-clip-text bg-gold-gradient">{CATALOG_INFO.highlight}</span>
          </h1>
          <p className="text-sand-dim text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {CATALOG_INFO.desc}
          </p>
        </div>
      </section>

      {/* --- MARQUEE (Đặt ở đây để nó nằm dưới Hero, không chèn lên trên) --- */}
      <div className="bg-primary py-3 overflow-hidden flex whitespace-nowrap border-y border-white/10 relative shadow-lg z-20">
        <div className="animate-marquee flex gap-16 text-black font-bold text-xs uppercase tracking-[0.2em] items-center">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT].map((text, i) => (
            <span key={i} className="flex items-center gap-16">
              {text} <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            </span>
          ))}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-20 flex-grow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* SIDEBAR */}
            <aside className="lg:col-span-3 lg:sticky lg:top-32 space-y-8">
              {/* Menu */}
              <div className="bg-noir-light/80 backdrop-blur-md rounded-sm border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-serif text-lg text-sand">Phân Loại</h3>
                  <MoreHorizontal className="text-sand-dim w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full flex items-center justify-between p-4 transition-all border-l-2 hover:bg-white/[0.02]
                          ${activeCategory === cat.id && !searchQuery ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-sand-dim hover:text-sand'}
                        `}
                      >
                        <span className="font-bold text-xs uppercase tracking-[0.15em] text-left">{cat.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeCategory === cat.id ? 'rotate-180 text-primary' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {activeCategory === cat.id && !searchQuery && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden bg-black/40"
                           >
                              <div className="py-2">
                                {cat.items.map((item, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleSubItemClick(item)}
                                    className={`w-full text-left px-8 py-2.5 text-sm transition-colors flex items-center justify-between group
                                      ${activeSubItem === item ? 'text-white font-bold bg-white/5' : 'text-sand-dim hover:text-white hover:bg-white/5'}
                                    `}
                                  >
                                    {item}
                                    <span className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${activeSubItem === item ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
                                  </button>
                                ))}
                              </div>
                           </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Banner */}
              <div className="p-8 rounded-sm bg-gradient-to-br from-[#1c1917] to-black border border-white/10 text-center relative overflow-hidden group hover:border-primary/50 transition-colors duration-500 hidden lg:block">
                <Headphones className="w-10 h-10 text-primary mx-auto mb-4 block" />
                <h4 className="font-serif text-xl text-sand mb-2">Cần Tư Vấn?</h4>
                <p className="text-xs text-sand-dim mb-6 leading-relaxed">Đội ngũ ArtPrint sẵn sàng hỗ trợ bạn.</p>
                <button className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all shadow-lg">
                  Chat Zalo Ngay
                </button>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-9">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-serif text-sand hidden md:block">
                    {searchQuery ? 'Kết quả tìm kiếm' : 'Danh mục'}
                  </h2>
                  <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                  <p className="text-sm text-sand-dim">
                    <span className="text-primary font-bold mr-1">{filteredProducts.length}</span>
                    sản phẩm
                  </p>
                </div>

                <div className="relative w-full md:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-dim w-4 h-4 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if(e.target.value) setActiveSubItem(null);
                    }}
                    className="w-full bg-noir-light border border-white/10 rounded-sm py-2.5 pl-12 pr-10 text-sand text-sm focus:border-primary/50 focus:outline-none transition-all placeholder:text-sand-dim/40 focus:bg-noir"
                    placeholder="Tìm kiếm sản phẩm..."
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-dim hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className="min-h-[400px]">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map((product, idx) => (
                      <Link
                        href={`/product/${product.slug}`}
                        key={product.slug || idx}
                        className="group relative bg-noir-light border border-white/5 hover:border-primary/50 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col hover:-translate-y-1 h-full"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-black">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-60"></div>

                          {product.tag && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 bg-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                {product.tag}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-1 relative">
                          <div className="absolute top-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500"></div>

                          <h4 className="font-serif text-xl text-sand mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-sand-dim/80 font-light leading-relaxed mb-6 line-clamp-2">
                            {product.desc}
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-sand-dim uppercase tracking-wider">Giá từ</span>
                              <span className="text-base font-bold text-sand group-hover:text-primary-glow transition-colors">
                                {product.price} <span className="text-[10px] font-normal text-sand-dim">{product.unit}</span>
                              </span>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-sand-dim group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                               <PlusCircle className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 bg-noir-light/50 border border-white/5 rounded-sm border-dashed">
                    <Search className="w-10 h-10 text-sand-dim/30 mb-3" />
                    <p className="text-sand-dim">Không tìm thấy sản phẩm phù hợp.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveSubItem(null); }}
                      className="mt-4 text-primary text-xs font-bold uppercase hover:underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                )}
              </div>
            </div>
        </div>
      </section>
    </main>
  );
}