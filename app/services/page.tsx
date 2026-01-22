/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Headphones,
  MoreHorizontal,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// IMPORT DATA
import {
  CATALOG_INFO,
  MENU_TREE,
  MARQUEE_TEXT,
  CategoryNode,
} from "../data/services_content";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ServicesPage() {
  const [expandedIds, setExpandedIds] = useState<string[]>([MENU_TREE[0].id]);
  const [currentArticles, setCurrentArticles] = useState<any[]>([]); // Danh sách bài viết của mục đang chọn
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTitle, setActiveTitle] = useState<string>(MENU_TREE[0].name);
  const [activeNodeId, setActiveNodeId] = useState<string>(MENU_TREE[0].id);

  // --- HÀM LẤY BÀI VIẾT TỪ 1 NODE (ĐỆ QUY) ---
  const getAllArticlesFromNode = (node: CategoryNode): any[] => {
    let articles: any[] = [];
    if (node.articleData) {
      articles.push({ ...node.articleData, id: node.id });
    }
    if (node.children) {
      node.children.forEach((child) => {
        articles = [...articles, ...getAllArticlesFromNode(child)];
      });
    }
    return articles;
  };

  // --- 1. TẠO DANH SÁCH TOÀN BỘ BÀI VIẾT (GLOBAL LIST) ---
  // Dùng useMemo để chỉ tính toán 1 lần khi mount, không tính lại mỗi khi render
  const allGlobalArticles = useMemo(() => {
    let all: any[] = [];
    MENU_TREE.forEach((rootNode) => {
      all = [...all, ...getAllArticlesFromNode(rootNode)];
    });
    return all;
  }, []);

  // Init Data: Mặc định hiển thị mục đầu tiên
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentArticles(getAllArticlesFromNode(MENU_TREE[0]));
  }, []);

  // --- HANDLE CLICK MENU ---
  const handleNodeClick = (node: CategoryNode) => {
    // 1. Logic mở/đóng menu con
    if (node.children) {
      setExpandedIds((prev) =>
        prev.includes(node.id)
          ? prev.filter((id) => id !== node.id)
          : [...prev, node.id],
      );
    }

    // 2. Cập nhật nội dung hiển thị
    const articles = getAllArticlesFromNode(node);
    setCurrentArticles(articles);
    setActiveTitle(node.name);
    setActiveNodeId(node.id);

    // 3. Reset tìm kiếm khi chuyển danh mục để tránh nhầm lẫn
    setSearchQuery("");

    // 4. Scroll mobile
    if (window.innerWidth < 1024) {
      document
        .getElementById("content-area")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --- 2. LOGIC FILTER THÔNG MINH (QUAN TRỌNG) ---
  const displayArticles = useMemo(() => {
    // Nếu ĐANG TÌM KIẾM -> Tìm trong TOÀN BỘ hệ thống (Global Search)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      return allGlobalArticles.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query),
      );
    }
    // Nếu KHÔNG tìm kiếm -> Hiển thị danh sách của mục đang chọn
    return currentArticles;
  }, [currentArticles, searchQuery, allGlobalArticles]);

  // --- MENU COMPONENT ---
  const RecursiveMenuItem = ({ node }: { node: CategoryNode }) => {
    const isExpanded = expandedIds.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isActive = activeNodeId === node.id;

    const getLevelStyle = (level: number) => {
      switch (level) {
        case 1:
          return `py-4 px-5 font-black uppercase tracking-wider text-sm border-b border-border bg-surface/40 hover:bg-surface`;
        case 2:
          return `py-3 px-5 pl-9 font-bold text-sm hover:text-primary transition-colors`;
        case 3:
          return `py-2.5 px-5 pl-14 text-xs font-medium text-muted hover:text-primary transition-colors border-l-2 border-transparent ml-5`;
        default:
          return "";
      }
    };

    return (
      <div className="w-full select-none">
        <div
          className={`flex items-center justify-between cursor-pointer group transition-all duration-300
            ${getLevelStyle(node.level)}
            ${isActive && node.level !== 1 ? "text-primary" : "text-foreground"}
            ${isActive && node.level === 3 ? "!border-primary bg-primary/5" : ""}
          `}
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(node);
          }}
        >
          <span className="flex-1 truncate">{node.name}</span>
          {hasChildren && (
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 text-muted/50 group-hover:text-primary ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children!.map((child) => (
                <RecursiveMenuItem key={child.id} node={child} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[35vh] min-h-[350px] flex items-center justify-center overflow-hidden border-b border-border pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1974')] bg-cover bg-center fixed-bg"></div>
        <div className="absolute inset-0 bg-background/90 backdrop-blur-[3px]"></div>

        <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1.5 px-5 border border-primary/30 bg-primary/5 backdrop-blur-md rounded-full text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6 shadow-sm"
          >
            Services Catalog
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-foreground mb-6 tracking-tight">
            {CATALOG_INFO.title}
          </h1>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            {CATALOG_INFO.desc}
          </p>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="bg-primary py-3.5 overflow-hidden flex whitespace-nowrap border-y border-primary-dark/10 relative shadow-lg z-20">
        <div className="animate-marquee flex gap-20 text-white font-bold text-xs uppercase tracking-[0.2em] items-center">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT].map(
            (text, i) => (
              <span key={i} className="flex items-center gap-20">
                {text}{" "}
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              </span>
            ),
          )}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 flex-grow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 space-y-8">
            <div className="bg-background/80 backdrop-blur-xl rounded-sm border border-border overflow-hidden shadow-sm ring-1 ring-black/5">
              <div className="p-6 bg-gradient-to-r from-surface to-surface/60 border-b border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-bold text-foreground tracking-tight">
                    Danh Mục
                  </h3>
                  <MoreHorizontal className="text-muted/50 w-4 h-4 hover:text-primary transition-colors cursor-pointer" />
                </div>
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/40 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                {MENU_TREE.map((node) => (
                  <RecursiveMenuItem key={node.id} node={node} />
                ))}
              </div>
            </div>

            {/* Banner */}
            <div className="p-8 rounded-sm bg-surface-dark border border-border text-center hidden lg:block shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-colors"></div>
              <Headphones className="w-10 h-10 text-primary mx-auto mb-4 block relative z-10" />
              <h4 className="font-serif text-xl text-white mb-2 relative z-10">
                Tư Vấn Miễn Phí
              </h4>
              <p className="text-xs text-white/60 mb-6 relative z-10 font-light">
                Liên hệ ngay để nhận báo giá chi tiết cho dự án của bạn.
              </p>
              <button className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all relative z-10 shadow-lg transform active:scale-95">
                Gửi Yêu Cầu
              </button>
            </div>
          </aside>

          {/* CONTENT AREA */}
          <div className="lg:col-span-9" id="content-area">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-border pb-6 gap-6">
              <div>
                <h2 className="text-3xl font-serif text-foreground mb-2">
                  {/* Hiển thị tiêu đề động: Tên danh mục hoặc Kết quả tìm kiếm */}
                  {searchQuery ? (
                    <span className="flex items-center gap-2">
                      Kết quả tìm kiếm:{" "}
                      <span className="text-primary italic">{searchQuery}</span>
                    </span>
                  ) : (
                    activeTitle
                  )}
                </h2>
                <p className="text-xs text-muted font-medium uppercase tracking-widest">
                  <span className="text-primary">{displayArticles.length}</span>{" "}
                  giải pháp phù hợp
                </p>
              </div>
              <div className="relative w-full md:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-4 h-4 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-full py-3 pl-12 pr-10 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-muted/50 focus:bg-background shadow-sm"
                  placeholder="Tìm kiếm dịch vụ..."
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* LIST BÀI VIẾT */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {displayArticles.length > 0 ? (
                  <motion.div
                    // Đổi key để trigger animation khi search hoặc đổi danh mục
                    key={activeTitle + searchQuery}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-10"
                  >
                    {displayArticles.map((article, idx) => (
                      <motion.div variants={cardVariants} key={idx}>
                        <Link
                          href={`/services/${article.slug || "#"}`}
                          className="group block relative bg-background border border-border rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                          <div className="flex flex-col md:flex-row h-full">
                            {/* Image Side */}
                            <div className="md:w-2/5 relative overflow-hidden aspect-video md:aspect-auto">
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                  backgroundImage: `url('${article.image}')`,
                                }}
                              ></div>
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>

                            {/* Content Side */}
                            <div className="md:w-3/5 p-8 flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3">
                                  {article.excerpt}
                                </p>

                                {/* Features List (Tự động tạo feature từ excerpt nếu không có) */}
                                <ul className="mb-6 space-y-2">
                                  <li className="flex items-start gap-3 text-xs font-medium text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    Tư vấn thiết kế miễn phí
                                  </li>
                                  <li className="flex items-start gap-3 text-xs font-medium text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    Thi công trọn gói, đúng tiến độ
                                  </li>
                                </ul>
                              </div>

                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1 w-fit group-hover:border-primary transition-all">
                                Xem chi tiết{" "}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-80 bg-surface/30 border border-border rounded-sm border-dashed"
                  >
                    <Search className="w-10 h-10 text-muted/30 mb-4" />
                    <p className="text-muted font-medium">
                      Không tìm thấy dịch vụ nào phù hợp với từ khóa
                      {searchQuery}.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-primary text-xs font-bold uppercase hover:underline"
                    >
                      Xóa bộ lọc tìm kiếm
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
