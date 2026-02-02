/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react"; // ❌ Bỏ useEffect thừa
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
import {
  CATALOG_INFO,
  MENU_TREE,
  MARQUEE_TEXT,
  CategoryNode,
} from "../data/services_content";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Hàm lấy tất cả ID con cháu (Để chọn cha hiện con)
const getAllCategoryIds = (node: CategoryNode): string[] => {
  let ids = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      ids = [...ids, ...getAllCategoryIds(child)];
    });
  }
  return ids;
};

// Hàm tìm node trong cây menu theo ID
const findNodeById = (
  nodes: CategoryNode[],
  id: string,
): CategoryNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export default function ServicesPage({
  initialData = [],
}: {
  initialData?: any[];
}) {
  const typedMenuTree = MENU_TREE as CategoryNode[];

  // --- 1. STATE CHỈ LƯU CÁI CẦN THIẾT ---
  const [activeNodeId, setActiveNodeId] = useState<string>(typedMenuTree[0].id);
  const [expandedIds, setExpandedIds] = useState<string[]>([
    typedMenuTree[0].id,
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // --- 2. TỰ ĐỘNG TÍNH TOÁN DỮ LIỆU (CORE LOGIC) ---
  const { currentArticles, activeTitle } = useMemo(() => {
    // Tìm node hiện tại
    const currentNode =
      findNodeById(typedMenuTree, activeNodeId) || typedMenuTree[0];

    // Lấy danh sách ID hợp lệ (Chính nó + Con cháu)
    const validCategoryIds = getAllCategoryIds(currentNode);

    // Lọc bài viết
    const filtered = initialData.filter((p) =>
      validCategoryIds.includes(p.category),
    );

    return {
      currentArticles: filtered,
      activeTitle: currentNode.name,
    };
  }, [activeNodeId, initialData]);

  // --- 3. XỬ LÝ CLICK ĐƠN GIẢN ---
  const handleNodeClick = (node: CategoryNode) => {
    // Logic Accordion (Đóng/Mở menu)
    if (node.children) {
      setExpandedIds((prev) =>
        prev.includes(node.id)
          ? prev.filter((id) => id !== node.id)
          : [...prev, node.id],
      );
    }

    // Chỉ cần set ID, useMemo ở trên sẽ tự lo phần lọc dữ liệu
    setActiveNodeId(node.id);
    setSearchQuery("");

    // Scroll nhẹ trên mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      document
        .getElementById("content-area")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --- 4. LỌC TÌM KIẾM ---
  const displayArticles = useMemo(() => {
    if (!searchQuery) return currentArticles;
    const query = searchQuery.toLowerCase();
    return currentArticles.filter(
      (p: any) =>
        p.name?.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query),
    );
  }, [currentArticles, searchQuery]);

  // --- PHẦN RENDER ---
  const RecursiveMenuItem = ({ node }: { node: CategoryNode }) => {
    const isExpanded = expandedIds.includes(node.id);
    const isActive = activeNodeId === node.id;

    let itemClass = `flex justify-between cursor-pointer py-3 px-5 hover:text-primary transition-colors ${isActive ? "text-primary font-bold" : ""}`;
    if (node.level === 1)
      itemClass +=
        " font-black border-b bg-surface/40 uppercase tracking-wider text-sm";
    if (node.level === 2) itemClass += " pl-9 font-bold text-sm";
    if (node.level === 3)
      itemClass +=
        " pl-14 text-xs font-medium text-muted border-l-2 border-transparent ml-5 hover:border-primary";
    if (isActive && node.level === 3)
      itemClass += " !border-primary bg-primary/5";

    return (
      <div className="w-full select-none">
        <div
          className={itemClass}
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(node);
          }}
        >
          <span className="truncate">{node.name}</span>
          {node.children && (
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          )}
        </div>
        <AnimatePresence>
          {isExpanded && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children.map((c) => (
                <RecursiveMenuItem key={c.id} node={c} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col pt-20">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <section className="relative h-[35vh] min-h-[350px] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1974')] bg-cover bg-center fixed-bg"></div>
        <div className="absolute inset-0 bg-background/90 backdrop-blur-[3px]"></div>
        <div className="relative z-10 text-center px-6">
          <div className="inline-block py-1.5 px-5 border border-primary/30 bg-primary/5 backdrop-blur-md rounded-full text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6 shadow-sm">
            Services Catalog
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            {CATALOG_INFO.title}
          </h1>
          <p className="text-muted max-w-xl mx-auto font-light">
            {CATALOG_INFO.desc}
          </p>
        </div>
      </section>

      <div className="bg-primary py-3.5 overflow-hidden flex whitespace-nowrap border-y border-primary-dark/10 relative shadow-lg z-20">
        <div className="animate-marquee flex gap-20 text-white font-bold text-xs uppercase tracking-[0.2em] items-center">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((text, i) => (
            <span key={i} className="flex items-center gap-20">
              {text}{" "}
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
            </span>
          ))}
        </div>
      </div>

      <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 flex-grow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-3 lg:sticky lg:top-32 space-y-8">
            <div className="bg-background/80 backdrop-blur-xl rounded-sm border border-border overflow-hidden shadow-sm">
              <div className="p-6 bg-gradient-to-r from-surface to-surface/60 border-b border-border/50 flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold">Danh Mục</h3>
                <MoreHorizontal className="text-muted/50 w-4 h-4 cursor-pointer hover:text-primary" />
              </div>
              <div className="flex flex-col">
                {typedMenuTree.map((node) => (
                  <RecursiveMenuItem key={node.id} node={node} />
                ))}
              </div>
            </div>
            <div className="p-8 rounded-sm bg-surface-dark border border-border text-center hidden lg:block shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-colors"></div>
              <Headphones className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
              <h4 className="font-serif text-xl text-white mb-2 relative z-10">
                Tư Vấn Miễn Phí
              </h4>
              <Link
                href="/contact"
                className="block w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all relative z-10 mt-4 shadow-lg text-center"
              >
                Gửi Yêu Cầu
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-9" id="content-area">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-border pb-6 gap-6">
              <div>
                <h2 className="text-3xl font-serif mb-2">
                  {searchQuery ? (
                    <span>
                      Kết quả:{" "}
                      <span className="text-primary italic">{searchQuery}</span>
                    </span>
                  ) : (
                    activeTitle
                  )}
                </h2>
                <p className="text-xs text-muted font-medium uppercase tracking-widest">
                  <span className="text-primary">{displayArticles.length}</span>{" "}
                  dự án / dịch vụ
                </p>
              </div>
              <div className="relative w-full md:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-4 h-4 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-full py-3 pl-12 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                  placeholder="Tìm kiếm dịch vụ..."
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {displayArticles.length > 0 ? (
                  <motion.div
                    key={activeTitle + searchQuery}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-10"
                  >
                    {displayArticles.map((article: any, idx: number) => (
                      <motion.div
                        variants={cardVariants}
                        key={article.id || idx}
                      >
                        <Link
                          href={`/services/${article.slug || "#"}`}
                          className="group relative bg-background border border-border rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col md:flex-row h-full"
                        >
                          <div className="md:w-2/5 relative overflow-hidden aspect-video md:aspect-auto bg-gray-100">
                            {article.coverImage ? (
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                  backgroundImage: `url('${article.coverImage}')`,
                                }}
                              ></div>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic">
                                Chưa có ảnh bìa
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                          </div>
                          <div className="md:w-3/5 p-8 flex flex-col justify-between">
                            <div>
                              <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors leading-tight">
                                {article.name || article.title}
                              </h3>
                              <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3">
                                {article.excerpt}
                              </p>
                              <ul className="mb-6 space-y-2">
                                {article.features &&
                                article.features.length > 0 ? (
                                  article.features.map(
                                    (feat: string, i: number) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-3 text-xs font-medium text-foreground/80"
                                      >
                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                                        {feat}
                                      </li>
                                    ),
                                  )
                                ) : (
                                  <li className="flex items-start gap-3 text-xs font-medium text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                                    Tư vấn & Thiết kế miễn phí
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1 w-fit group-hover:border-primary transition-all">
                              Xem chi tiết{" "}
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    className="flex flex-col items-center justify-center h-80 bg-surface/30 border border-border rounded-sm border-dashed text-muted"
                  >
                    <Search className="w-10 h-10 text-muted/30 mb-4" />
                    <p className="font-medium">
                      {initialData && initialData.length === 0
                        ? "Chưa có dữ liệu từ Database."
                        : "Không tìm thấy bài viết nào trong mục này."}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mt-4 text-primary text-xs font-bold uppercase hover:underline"
                      >
                        Xóa tìm kiếm
                      </button>
                    )}
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
