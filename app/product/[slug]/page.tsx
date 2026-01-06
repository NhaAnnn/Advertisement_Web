// app/product/[slug]/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronRight, ZoomIn, PlayCircle, CheckCircle, Minus, Plus, ShoppingCart,
  Headset, Star, ShoppingCart as CartIcon, Upload, Printer, Truck
} from 'lucide-react';

// IMPORT DATA
import {
  PRODUCT_DETAIL,
  PRODUCT_OPTIONS,
  PRICING_TABLE,
  WORKFLOW,
  REVIEWS
} from '../../data/product_detail';

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(PRODUCT_DETAIL.images[0]);
  const [quantity, setQuantity] = useState(5);
  const [selectedMaterial, setSelectedMaterial] = useState(PRODUCT_OPTIONS.materials[0]);
  const [selectedEffect, setSelectedEffect] = useState(PRODUCT_OPTIONS.effects[0]);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1) setQuantity(newQty);
  };

  const totalPrice = useMemo(() => {
    const unitPrice = PRODUCT_DETAIL.basePrice + selectedMaterial.priceAdd + selectedEffect.priceAdd;
    return unitPrice * quantity;
  }, [quantity, selectedMaterial, selectedEffect]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <main className="relative overflow-x-hidden min-h-screen pt-28 pb-20">

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-30 mix-blend-overlay"></div>

      {/* Breadcrumb */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-8">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-sand-dim font-bold">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <Link href="/services" className="hover:text-primary transition-colors">Dịch vụ</Link>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-primary">{PRODUCT_DETAIL.name}</span>
        </nav>
      </div>

      <section className="max-w-[1800px] mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* GALLERY */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-noir-light border border-white/10 group">
              <img src={activeImage} alt="Main Product" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                <ZoomIn className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {PRODUCT_DETAIL.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-sm overflow-hidden border cursor-pointer relative transition-all ${activeImage === img ? 'border-primary' : 'border-white/10 hover:border-white/40'}`}
                >
                  <img src={img} className={`w-full h-full object-cover transition-opacity ${activeImage === img ? 'opacity-80' : 'opacity-60 hover:opacity-100'}`} alt={`Thumb ${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* INFO & CONFIG */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-28 bg-[#1a1a1a]/60 backdrop-blur-md p-6 md:p-8 rounded-sm border border-white/10">
              <div className="mb-8 pb-8 border-b border-white/10">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">{PRODUCT_DETAIL.tag}</span>
                <h1 className="text-3xl md:text-4xl font-serif text-sand mb-2">{PRODUCT_DETAIL.name}</h1>
                <p className="text-sand-dim text-sm mb-6">{PRODUCT_DETAIL.shortDesc}</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-primary font-serif">{formatCurrency(PRODUCT_DETAIL.basePrice)}</span>
                  <span className="text-sm text-sand-dim pb-1">/ {PRODUCT_DETAIL.unit}</span>
                </div>
              </div>

              {/* CONFIG FORM */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-sand block">Chất liệu giấy</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PRODUCT_OPTIONS.materials.map((mat) => (
                      <div key={mat.id} className="relative">
                        <input type="radio" name="material" id={`mat_${mat.id}`} className="peer sr-only" checked={selectedMaterial.id === mat.id} onChange={() => setSelectedMaterial(mat)} />
                        <label htmlFor={`mat_${mat.id}`} className="block w-full p-3 border border-white/10 rounded-sm cursor-pointer hover:border-white/30 transition-all bg-white/[0.02] peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-sand">
                          <span className="text-sm font-bold block mb-1">{mat.name}</span>
                          <span className="text-[10px] text-sand-dim block">{mat.desc}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-white/10 rounded-sm bg-white/[0.02]">
                      <button onClick={() => handleQuantityChange(-1)} className="w-10 h-10 flex items-center justify-center text-sand hover:bg-white/10"><Minus className="w-4 h-4" /></button>
                      <input type="text" className="w-12 bg-transparent border-none text-center text-sand font-bold focus:ring-0 p-0" value={quantity} readOnly />
                      <button onClick={() => handleQuantityChange(1)} className="w-10 h-10 flex items-center justify-center text-sand hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="text-xs text-sand-dim">= {quantity * 100} danh thiếp</span>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sand">
                    <span className="text-sm font-medium">Tạm tính:</span>
                    <span className="text-xl font-serif font-bold animate-pulse">{formatCurrency(totalPrice)}</span>
                  </div>
                  <button className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                     <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}