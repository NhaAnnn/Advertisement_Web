/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";

import {
  Search,
  Save,
  Loader2,
  Edit3,
  ChevronRight,
  Plus,
  Trash2,
  Image as ImageIcon,
  LayoutTemplate,
  CheckCircle2,
  FileText,
  Grid,
  Layers,
  Monitor,
  RefreshCcw,
  X,
  MapPin,
  HelpCircle,
  LogOut,
  MessageCircle,
  Facebook,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

// Import MENU_TREE
import { MENU_TREE, CategoryNode } from "../../data/services_content";

import { signOut } from "next-auth/react";
import { CategorySelect } from "@/app/components/UI/category_select";
import Image from "next/image";

// --- CẤU HÌNH MẶC ĐỊNH ---
const DEFAULT_CONFIG = {
  hero: {
    title: { line1: "", line2: "", line3: "" },
    desc: "",
    mainImage: "",
    floatingImage: "",
  },
  services: [
    {
      title: "Dịch Vụ 1",
      desc: "",
      image: "",
      size: "large",
      tag: "",
      link: "",
    },
    {
      title: "Dịch Vụ 2",
      desc: "",
      image: "",
      size: "medium",
      tag: "",
      link: "",
    },
    {
      title: "Dịch Vụ 3",
      desc: "",
      image: "",
      size: "small",
      tag: "",
      link: "",
    },
    {
      title: "Dịch Vụ 4",
      desc: "",
      image: "",
      size: "small",
      tag: "",
      link: "",
    },
  ],
  showcase: [],
  process: [],
  portfolio: [],
};

// ============================================================================
// COMPONENT 1: QUẢN LÝ TAB TRANG CHỦ
// ============================================================================
function HomeTabContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [homeConfig, setHomeConfig] = useState<any>(DEFAULT_CONFIG);

  const [isChanged, setIsChanged] = useState(false);

  // REFS ĐỂ SCROLL
  const showcaseListRef = useRef<HTMLDivElement>(null);
  const processListRef = useRef<HTMLDivElement>(null);
  const portfolioListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [heroRes, servicesRes, showcaseRes, processRes, portfolioRes] =
          await Promise.all([
            fetch("/api/config?key=home_hero&t=" + Date.now()).then((r) =>
              r.json(),
            ),
            fetch("/api/config?key=home_services&t=" + Date.now()).then((r) =>
              r.json(),
            ),
            fetch("/api/config?key=home_showcase&t=" + Date.now()).then((r) =>
              r.json(),
            ),
            fetch("/api/config?key=home_process&t=" + Date.now()).then((r) =>
              r.json(),
            ),
            fetch("/api/config?key=home_portfolio&t=" + Date.now()).then((r) =>
              r.json(),
            ),
          ]);

        setHomeConfig({
          hero: { ...DEFAULT_CONFIG.hero, ...(heroRes || {}) },
          services:
            Array.isArray(servicesRes) && servicesRes.length > 0
              ? servicesRes
              : DEFAULT_CONFIG.services,
          showcase: Array.isArray(showcaseRes) ? showcaseRes : [],
          process: Array.isArray(processRes) ? processRes : [],
          portfolio: Array.isArray(portfolioRes) ? portfolioRes : [],
        });
      } catch (error) {
        console.error("Lỗi tải dữ liệu Home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const saveHomeConfig = async () => {
    setSaving(true);
    try {
      await Promise.all([
        fetch("/api/config", {
          method: "POST",
          body: JSON.stringify({ key: "home_hero", value: homeConfig.hero }),
        }),
        fetch("/api/config", {
          method: "POST",
          body: JSON.stringify({
            key: "home_services",
            value: homeConfig.services,
          }),
        }),
        fetch("/api/config", {
          method: "POST",
          body: JSON.stringify({
            key: "home_showcase",
            value: homeConfig.showcase,
          }),
        }),
        fetch("/api/config", {
          method: "POST",
          body: JSON.stringify({
            key: "home_process",
            value: homeConfig.process,
          }),
        }),
        fetch("/api/config", {
          method: "POST",
          body: JSON.stringify({
            key: "home_portfolio",
            value: homeConfig.portfolio,
          }),
        }),
      ]);
      alert("✨ Đã lưu giao diện Trang Chủ!");
      setIsChanged(false);
      router.refresh();
    } catch (e) {
      alert("❌ Lỗi khi lưu!");
    } finally {
      setSaving(false);
    }
  };

  // Helper để cập nhật state Hero và bật cờ isChanged
  const updateHero = (newHeroState: any) => {
    setHomeConfig({ ...homeConfig, hero: newHeroState });
    setIsChanged(true);
  };

  const updateHomeItem = (
    section: "services" | "showcase" | "process" | "portfolio",
    index: number,
    field: string,
    value: any,
  ) => {
    const currentList = Array.isArray(homeConfig[section])
      ? homeConfig[section]
      : [];
    const newList = [...currentList];
    if (newList[index]) {
      newList[index] = { ...newList[index], [field]: value };
      setHomeConfig({ ...homeConfig, [section]: newList });
      setIsChanged(true);
    }
  };

  // Hàm thêm mới Item
  const addItem = (section: string, newItem: any) => {
    setHomeConfig({
      ...homeConfig,
      [section]: [...homeConfig[section], newItem],
    });
    setIsChanged(true);
  };

  // Hàm xóa Item
  const removeItem = (section: string, index: number) => {
    const newList = [...homeConfig[section]];
    newList.splice(index, 1);
    setHomeConfig({ ...homeConfig, [section]: newList });
    setIsChanged(true);
  };

  const moveItem = (
    section: "process" | "portfolio",
    index: number,
    direction: "up" | "down",
  ) => {
    const list = [...homeConfig[section]];
    if (direction === "up" && index > 0) {
      [list[index], list[index - 1]] = [list[index - 1], list[index]];
    } else if (direction === "down" && index < list.length - 1) {
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
    }
    setHomeConfig({ ...homeConfig, [section]: list });
    setIsChanged(true);
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#16579e]" />
        <p className="text-gray-500 font-medium">
          Đang tải cấu hình trang chủ...
        </p>
      </div>
    );

  const safeShowcase = Array.isArray(homeConfig.showcase)
    ? homeConfig.showcase
    : [];
  const safeProcess = Array.isArray(homeConfig.process)
    ? homeConfig.process
    : [];
  const safePortfolio = Array.isArray(homeConfig.portfolio)
    ? homeConfig.portfolio
    : [];

  return (
    <div className="p-8 w-full max-w-6xl mx-auto overflow-y-auto h-full space-y-10 custom-scrollbar pb-32">
      {/* Header Action */}
      <div className="flex justify-between items-center bg-white/80 p-5 rounded-2xl shadow-sm border border-gray-200 sticky top-0 z-20 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Monitor className="w-6 h-6 text-[#16579e]" /> Chỉnh sửa Trang Chủ
            </h2>

            {isChanged && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded animate-pulse">
                ⚠️ Chưa lưu
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Thay đổi nội dung hiển thị cho khách hàng.
          </p>
        </div>
        <button
          onClick={saveHomeConfig}
          disabled={saving || !isChanged} // Mờ đi nếu chưa sửa gì
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex gap-2 items-center disabled:opacity-70 ${
            isChanged
              ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg animate-pulse"
              : "bg-[#16579e] text-white hover:bg-blue-800"
          }`}
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isChanged ? "LƯU THAY ĐỔI" : "Đã Lưu"}
        </button>
      </div>

      {/* --- 1. HERO BANNER --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            <strong>Vị trí:</strong> Phần đầu tiên to nhất khi khách vừa vào web
            (Banner chính).
          </span>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tiêu đề chính (3 dòng)
              </label>
              <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <input
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-lg font-medium focus:ring-2 ring-blue-400 outline-none"
                  value={homeConfig.hero.title?.line1 || ""}
                  onChange={(e) =>
                    updateHero({
                      ...homeConfig.hero,
                      title: {
                        ...homeConfig.hero.title,
                        line1: e.target.value,
                      },
                    })
                  }
                  placeholder="Dòng 1"
                />
                <input
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-lg font-medium focus:ring-2 ring-blue-400 outline-none"
                  value={homeConfig.hero.title?.line2 || ""}
                  onChange={(e) =>
                    updateHero({
                      ...homeConfig.hero,
                      title: {
                        ...homeConfig.hero.title,
                        line2: e.target.value,
                      },
                    })
                  }
                  placeholder="Dòng 2"
                />
                <input
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-lg font-medium focus:ring-2 ring-blue-400 outline-none"
                  value={homeConfig.hero.title?.line3 || ""}
                  onChange={(e) =>
                    updateHero({
                      ...homeConfig.hero,
                      title: {
                        ...homeConfig.hero.title,
                        line3: e.target.value,
                      },
                    })
                  }
                  placeholder="Dòng 3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Mô tả ngắn
              </label>
              <textarea
                className="w-full border border-gray-300 p-4 rounded-xl text-sm h-28 leading-relaxed focus:ring-2 ring-blue-400 outline-none resize-none shadow-inner"
                value={homeConfig.hero.desc || ""}
                onChange={(e) =>
                  updateHero({ ...homeConfig.hero, desc: e.target.value })
                }
                placeholder="Nhập đoạn văn giới thiệu..."
              />
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 text-center">
              <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                1. Ảnh Nền
              </span>
              <div className="aspect-video w-full bg-gray-300 rounded-lg mb-3 overflow-hidden relative shadow-inner">
                {homeConfig.hero.mainImage ? (
                  <Image
                    src={homeConfig.hero.mainImage}
                    alt="Ảnh Nền"
                    className="w-full h-full object-cover"
                    fill
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs italic">
                    Chưa có ảnh
                  </div>
                )}
              </div>
              <CldUploadButton
                uploadPreset="hoanganhthao-upload"
                onSuccess={(r: any) =>
                  updateHero({
                    ...homeConfig.hero,
                    mainImage: r.info.secure_url,
                  })
                }
                className="w-full bg-white border border-gray-300 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm"
              >
                📸 Chọn Ảnh Nền
              </CldUploadButton>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 text-center">
              <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                2. Ảnh Nổi (3D)
              </span>
              <div className="aspect-video w-full bg-gray-300 rounded-lg mb-3 overflow-hidden relative shadow-inner">
                {homeConfig.hero.floatingImage ? (
                  <Image
                    src={homeConfig.hero.floatingImage}
                    alt="Ảnh Nổi (3D)"
                    className="w-full h-full object-contain p-2"
                    fill
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs italic">
                    Chưa có ảnh
                  </div>
                )}
              </div>
              <CldUploadButton
                uploadPreset="hoanganhthao-upload"
                onSuccess={(r: any) =>
                  updateHero({
                    ...homeConfig.hero,
                    floatingImage: r.info.secure_url,
                  })
                }
                className="w-full bg-white border border-gray-300 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm"
              >
                📸 Chọn Ảnh Nổi
              </CldUploadButton>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. SERVICES GRID --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            <strong>Vị trí:</strong> 4 ô dịch vụ nổi bật nằm ngay bên dưới
            Banner chính.
          </span>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-8">
            {homeConfig.services?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-5 flex gap-5 bg-white hover:border-blue-300 hover:shadow-lg transition-all relative"
              >
                <div className="absolute -top-3 -left-3 bg-gray-900 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm">
                  #{idx + 1}
                </div>
                <div className="w-28 flex-shrink-0 flex flex-col gap-3">
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group/img cursor-pointer">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={`Service image ${idx + 1}`}
                        fill
                        className="w-full h-full object-cover transition-transform group-hover/img:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-800 font-bold">
                        NO IMG
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <CldUploadButton
                        uploadPreset="hoanganhthao-upload"
                        onSuccess={(r: any) =>
                          updateHomeItem(
                            "services",
                            idx,
                            "image",
                            r.info.secure_url,
                          )
                        }
                        className="text-[10px] bg-white px-3 py-1.5 rounded-full font-bold shadow-md"
                      >
                        ĐỔI
                      </CldUploadButton>
                    </div>
                  </div>
                  <div className="text-center text-[10px] font-bold text-gray-500 bg-gray-100 rounded py-1 border border-gray-200 uppercase tracking-wider">
                    {item.size}
                  </div>
                </div>
                <div className="flex-1 space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-800 uppercase">
                      Tiêu đề
                    </label>
                    <input
                      className="w-full font-bold text-base border-b-2 border-gray-100 pb-1 outline-none focus:border-blue-500 transition-colors text-gray-800"
                      value={item.title}
                      onChange={(e) =>
                        updateHomeItem("services", idx, "title", e.target.value)
                      }
                      placeholder="Tên dịch vụ..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-800 uppercase">
                      Mô tả
                    </label>
                    <textarea
                      className="w-full text-xs border border-gray-200 p-2 rounded-lg h-16 resize-none outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition-all"
                      value={item.desc}
                      onChange={(e) =>
                        updateHomeItem("services", idx, "desc", e.target.value)
                      }
                      placeholder="Mô tả ngắn gọn..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-gray-800 uppercase block mb-1">
                        Tag
                      </label>
                      <input
                        className="w-full text-xs border border-gray-200 p-2 rounded bg-gray-50 focus:bg-white focus:border-blue-400 outline-none"
                        value={item.tag || ""}
                        onChange={(e) =>
                          updateHomeItem("services", idx, "tag", e.target.value)
                        }
                        placeholder="VD: Hot..."
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-gray-800 uppercase block mb-1">
                        Link
                      </label>
                      <input
                        className="w-full text-xs border border-gray-200 p-2 rounded bg-gray-50 focus:bg-white focus:border-blue-400 outline-none font-mono text-blue-600"
                        value={item.link || ""}
                        onChange={(e) =>
                          updateHomeItem(
                            "services",
                            idx,
                            "link",
                            e.target.value,
                          )
                        }
                        placeholder="/services/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. SHOWCASE --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              <strong>Vị trí:</strong> Slide trượt ngang (Showcase).
            </span>
          </div>
          <button
            onClick={() => {
              addItem("showcase", {
                title: "",
                sub: "",
                desc: "",
                image: "",
                tag: "",
                link: "",
              });
              setTimeout(
                () =>
                  showcaseListRef.current?.lastElementChild?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  }),
                100,
              );
            }}
            className="text-xs bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" /> THÊM MỚI
          </button>
        </div>

        <div className="p-8 space-y-4">
          {safeShowcase.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl text-gray-800 bg-gray-50 flex flex-col items-center gap-2">
              <Layers className="w-10 h-10 text-gray-300" />
              <span>
                Chưa có mục nào. Hãy bấm nút <b>Thêm Mới</b>.
              </span>
            </div>
          ) : (
            <div
              ref={showcaseListRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {safeShowcase.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all bg-white items-start group relative"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex-shrink-0 relative group/img overflow-hidden shadow-inner">
                    {item.image ? (
                      <Image
                        src={item.image}
                        fill
                        className="w-full h-full object-cover transition-transform group-hover/img:scale-110"
                        alt={"Showcase image " + (idx + 1)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-800 font-bold">
                        NO IMG
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <CldUploadButton
                        uploadPreset="hoanganhthao-upload"
                        onSuccess={(r: any) =>
                          updateHomeItem(
                            "showcase",
                            idx,
                            "image",
                            r.info.secure_url,
                          )
                        }
                        className="text-[9px] bg-white px-2 py-1 rounded font-bold cursor-pointer hover:scale-105 transition-transform"
                      >
                        ĐỔI
                      </CldUploadButton>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 gap-2">
                    <div className="flex gap-2">
                      <input
                        className="w-full border-b border-gray-200 pb-1 text-sm font-bold focus:border-blue-500 outline-none"
                        value={item.title}
                        onChange={(e) =>
                          updateHomeItem(
                            "showcase",
                            idx,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="Tiêu đề chính"
                      />
                      <input
                        className="w-2/3 border-b border-gray-200 pb-1 text-xs text-gray-500 focus:border-blue-500 outline-none text-left"
                        value={item.sub}
                        onChange={(e) =>
                          updateHomeItem("showcase", idx, "sub", e.target.value)
                        }
                        placeholder="Tiêu đề phụ"
                      />
                    </div>
                    <label className="text-[10px] font-bold text-gray-800 uppercase block mb-1 mt-4">
                      Mô tả ngắn
                    </label>
                    <input
                      className="w-full bg-gray-50 border border-gray-100 p-1.5 rounded text-xs focus:bg-white focus:border-blue-300 outline-none"
                      value={item.desc}
                      onChange={(e) =>
                        updateHomeItem("showcase", idx, "desc", e.target.value)
                      }
                      placeholder="Mô tả ngắn..."
                    />
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-800 uppercase block mb-1 mt-4">
                          Tag
                        </label>
                        <input
                          className="w-full bg-gray-50 border border-gray-100 p-1.5 rounded text-[10px] focus:bg-white focus:border-blue-300 outline-none"
                          value={item.tag || ""}
                          onChange={(e) =>
                            updateHomeItem(
                              "showcase",
                              idx,
                              "tag",
                              e.target.value,
                            )
                          }
                          placeholder="#Tag"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-800 uppercase block mb-1 mt-4">
                          Link
                        </label>
                        <input
                          className="w-full bg-gray-50 border border-gray-100 p-1.5 rounded text-[10px] focus:bg-white focus:border-blue-300 outline-none font-mono text-blue-600"
                          value={item.link || ""}
                          onChange={(e) =>
                            updateHomeItem(
                              "showcase",
                              idx,
                              "link",
                              e.target.value,
                            )
                          }
                          placeholder="URL..."
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Xóa mục này?")) {
                        removeItem("showcase", idx);
                      }
                    }}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- 4. QUY TRÌNH (PROCESS) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              <strong>Vị trí:</strong> Phần Quy Trình (Steps) ở giữa trang.
            </span>
          </div>
          <button
            onClick={() => {
              addItem("process", {
                id: "0" + (safeProcess.length + 1),
                title: "",
                desc: "",
              });
              setTimeout(
                () =>
                  processListRef.current?.lastElementChild?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  }),
                100,
              );
            }}
            className="text-xs bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" /> THÊM BƯỚC
          </button>
        </div>

        <div className="p-8">
          <div
            ref={processListRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {safeProcess.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:border-[#16579e] transition-all"
              >
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      if (confirm("Xóa bước này?")) {
                        removeItem("process", idx);
                      }
                    }}
                    className="p-1 hover:bg-red-50 rounded text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-3xl font-black text-gray-200 mb-2">
                  {item.id}
                </div>
                <input
                  className="w-full font-bold text-lg border-b pb-1 outline-none mb-2"
                  value={item.title}
                  onChange={(e) =>
                    updateHomeItem("process", idx, "title", e.target.value)
                  }
                  placeholder="Tên bước..."
                />
                <textarea
                  className="w-full text-sm text-gray-600 h-20 resize-none outline-none bg-transparent"
                  value={item.desc}
                  onChange={(e) =>
                    updateHomeItem("process", idx, "desc", e.target.value)
                  }
                  placeholder="Mô tả chi tiết..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 5. PORTFOLIO --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              <strong>Vị trí:</strong> Phần Portfolio (Dự án) cuối trang.
            </span>
          </div>
          <button
            onClick={() => {
              addItem("portfolio", {
                type: "image",
                category: "",
                title: "",
                image: "",
              });
              setTimeout(
                () =>
                  portfolioListRef.current?.lastElementChild?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  }),
                100,
              );
            }}
            className="text-xs bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" /> THÊM MỤC
          </button>
        </div>

        <div className="p-8">
          <div
            ref={portfolioListRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {safePortfolio.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group flex gap-4 items-start hover:border-[#16579e] transition-colors"
              >
                <div className="absolute top-2 right-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur rounded-lg p-1 border shadow-sm">
                  {idx > 0 && (
                    <button
                      onClick={() => moveItem("portfolio", idx, "up")}
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600 font-bold text-xs"
                      title="Lên"
                    >
                      ⬆️
                    </button>
                  )}
                  {idx < safePortfolio.length - 1 && (
                    <button
                      onClick={() => moveItem("portfolio", idx, "down")}
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600 font-bold text-xs"
                      title="Xuống"
                    >
                      ⬇️
                    </button>
                  )}
                  <div className="w-[1px] h-4 bg-gray-300 mx-1 self-center"></div>
                  <button
                    onClick={() => {
                      if (confirm("Xóa mục này?")) {
                        removeItem("portfolio", idx);
                      }
                    }}
                    className="p-1.5 hover:bg-red-50 rounded text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Cột trái: Điều khiển loại & Ảnh */}
                <div className="w-32 flex-shrink-0 space-y-2">
                  <select
                    className="w-full text-xs font-bold border rounded p-1 bg-gray-50 outline-none cursor-pointer focus:border-blue-500"
                    value={item.type}
                    onChange={(e) =>
                      updateHomeItem("portfolio", idx, "type", e.target.value)
                    }
                  >
                    <option value="image">🖼️ Ảnh</option>
                    <option value="card">🃏 Card</option>
                    <option value="quote">💬 Quote</option>
                    <option value="cta">🔗 CTA</option>
                  </select>
                  {(item.type === "image" || item.type === "card") && (
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative group/img border">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={`Portfolio image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          fill
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                          NO IMG
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                        <CldUploadButton
                          uploadPreset="hoanganhthao-upload"
                          onSuccess={(r: any) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "image",
                              r.info.secure_url,
                            )
                          }
                          className="text-[10px] text-white font-bold bg-black/50 px-2 py-1 rounded"
                        >
                          ĐỔI
                        </CldUploadButton>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cột phải: Inputs */}
                <div className="flex-1 space-y-3 pt-1">
                  {(item.type === "image" || item.type === "card") && (
                    <>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold">
                          Tiêu đề
                        </label>
                        <input
                          className="w-full border-b font-bold pb-1 outline-none focus:border-blue-500"
                          value={item.title}
                          onChange={(e) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "title",
                              e.target.value,
                            )
                          }
                          placeholder="Tên dự án..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold">
                          Danh mục
                        </label>
                        <input
                          className="w-full border-b text-sm pb-1 outline-none focus:border-blue-500"
                          value={item.category}
                          onChange={(e) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "category",
                              e.target.value,
                            )
                          }
                          placeholder="VD: Branding..."
                        />
                      </div>
                    </>
                  )}
                  {item.type === "quote" && (
                    <>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold">
                          Trích dẫn
                        </label>
                        <textarea
                          className="w-full border p-2 rounded text-sm italic h-20 resize-none outline-none bg-gray-50 focus:bg-white focus:border-blue-500"
                          value={item.text}
                          onChange={(e) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "text",
                              e.target.value,
                            )
                          }
                          placeholder="Nhập câu nói..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold">
                          Tác giả
                        </label>
                        <input
                          className="w-full border-b font-bold pb-1 outline-none focus:border-blue-500"
                          value={item.author}
                          onChange={(e) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "author",
                              e.target.value,
                            )
                          }
                          placeholder="Tên người nói..."
                        />
                      </div>
                    </>
                  )}
                  {item.type === "cta" && (
                    <>
                      <div className="p-2 bg-blue-50 rounded text-center text-blue-800 font-bold text-[10px] mb-2 uppercase tracking-wider">
                        Call To Action
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold">
                          Tiêu đề
                        </label>
                        <input
                          className="w-full border-b font-bold pb-1 outline-none focus:border-blue-500"
                          value={item.title}
                          onChange={(e) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "title",
                              e.target.value,
                            )
                          }
                          placeholder="VD: Xem thêm..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold">
                          Link
                        </label>
                        <input
                          className="w-full border-b text-sm font-mono text-blue-600 pb-1 outline-none focus:border-blue-500"
                          value={item.link}
                          onChange={(e) =>
                            updateHomeItem(
                              "portfolio",
                              idx,
                              "link",
                              e.target.value,
                            )
                          }
                          placeholder="/services..."
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 2: QUẢN LÝ BÀI VIẾT DỊCH VỤ (Tối ưu hóa: Load List 1 lần)
// ============================================================================
function ServicesTabContent() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const lastSectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Trạng thái theo dõi thay đổi chưa lưu
  const [isChanged, setIsChanged] = useState(false);

  // 1. Tải toàn bộ danh sách
  const fetchList = useCallback(async () => {
    setIsInitialLoading(true);
    try {
      const res = await fetch("/api/services?t=" + Date.now(), {
        cache: "no-store",
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const normalizedData = data.map((item: any) => ({
          ...item,
          content: item.content || [],
          gallery: item.gallery || [],
          features: item.features || [],
          specs: item.specs || [],
          faq: item.faq || [],
        }));
        setList(normalizedData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // 2. Chọn bài viết từ RAM
  const selectService = (id: string) => {
    setIsCreating(false);
    setIsChanged(false); // Reset cờ thay đổi
    const found = list.find((item) => item.id === id);
    if (found) {
      setSelected(JSON.parse(JSON.stringify(found)));
    }
  };

  const flatCategories = useMemo(() => {
    const categories: { id: string; name: string; level: number }[] = [];
    const traverse = (nodes: CategoryNode[]) => {
      nodes.forEach((n) => {
        categories.push({ id: n.id, name: n.name, level: n.level });
        if (n.children) traverse(n.children);
      });
    };
    traverse(MENU_TREE);
    return categories;
  }, []);

  const createNew = () => {
    setIsCreating(true);
    setIsChanged(true);
    setSelected({
      name: "",
      slug: "",
      category: flatCategories[0]?.id || "",
      excerpt: "",
      coverImage: "",
      content: [{ title: "Giới thiệu", content: [""], image: "" }],
      gallery: [],
      features: ["Tư vấn miễn phí"],
      specs: [],
      faq: [],
    });
  };

  const updateField = (f: string, v: any) => {
    setSelected((p: any) => ({ ...p, [f]: v }));
    setIsChanged(true); // Đánh dấu đã thay đổi
  };

  const save = async () => {
    if (!selected.name || !selected.slug) return alert("Cần nhập tên và slug!");
    setLoading(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });

      if (res.ok) {
        const savedData = await res.json();
        alert("✅ Đã lưu thành công!");
        setIsChanged(false); // Tắt cờ thay đổi

        setList((prev) => {
          const index = prev.findIndex((item) => item.id === savedData.id);
          const normalized = {
            ...savedData,
            content: savedData.content || [],
            gallery: savedData.gallery || [],
            features: savedData.features || [],
            specs: savedData.specs || [],
            faq: savedData.faq || [],
          };

          if (index > -1) {
            const newList = [...prev];
            newList[index] = normalized;
            return newList;
          } else {
            return [normalized, ...prev];
          }
        });

        router.refresh(); // Refresh lại trang web chính

        if (isCreating) {
          setIsCreating(false);
          setSelected((prev: any) => ({ ...prev, id: savedData.id }));
        }
      } else {
        alert("Lỗi khi lưu (Có thể trùng Slug)");
      }
    } catch (e) {
      alert("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  };

  const del = async () => {
    if (!confirm("⚠️ Xóa bài viết này? Hành động không thể hoàn tác!")) return;
    setLoading(true);
    try {
      await fetch(`/api/services?slug=${selected.slug}`, { method: "DELETE" });
      alert("🗑️ Đã xóa thành công!");
      setList((prev) => prev.filter((item) => item.id !== selected.id));
      setSelected(null);
      setIsCreating(false);
      setIsChanged(false);
      router.refresh(); // Refresh lại trang web chính
    } catch (e) {
      alert("Lỗi khi xóa");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, "a")
      .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o")
      .replace(/[éèẻẽẹêếềểễệ]/g, "e")
      .replace(/[íìỉĩị]/g, "i")
      .replace(/[úùủũụưứừửữự]/g, "u")
      .replace(/[ýỳỷỹỵ]/g, "y")
      .replace(/[đ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s]+/g, "-");
    setSelected((p: any) => ({ ...p, name, slug }));
    setIsChanged(true);
  };

  const updateSection = (i: number, f: string, v: any) => {
    const c = [...selected.content];
    c[i] = { ...c[i], [f]: v };
    updateField("content", c);
  };

  const addSection = () => {
    updateField("content", [
      ...(selected.content || []),
      { title: "", content: [""], image: "" },
    ]);
    setTimeout(
      () =>
        lastSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      100,
    );
  };

  const removeContentSection = (index: number) => {
    const c = [...selected.content];
    c.splice(index, 1);
    updateField("content", c);
  };

  const removeGalleryImage = (index: number) => {
    const g = [...selected.gallery];
    g.splice(index, 1);
    updateField("gallery", g);
  };

  if (isInitialLoading) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-2 text-gray-500">
        <Loader2 className="animate-spin w-8 h-8 text-[#16579e]" />
        <p>Đang tải danh sách dịch vụ...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full animate-in fade-in zoom-in duration-300">
      {/* LEFT: DANH SÁCH BÀI VIẾT */}
      <div className="w-80 border-r bg-white flex flex-col h-full shadow-lg z-10">
        <div className="p-5 border-b bg-gray-50 space-y-4">
          <h3 className="font-bold text-gray-800 text-lg">Danh Sách Dịch Vụ</h3>
          <button
            onClick={createNew}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-md transition-all active:scale-95 text-sm"
          >
            <Plus className="w-5 h-5" /> Soạn Bài Mới
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 w-4 h-4 group-focus-within:text-[#16579e]" />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#16579e] focus:ring-1 focus:ring-[#16579e] transition-all bg-gray-50 focus:bg-white"
              placeholder="Tìm nhanh..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar bg-gray-50">
          {list
            .filter((s) => s.name?.toLowerCase().includes(filter.toLowerCase()))
            .map((service) => (
              <button
                key={service.id}
                onClick={() => selectService(service.id)}
                className={`w-full text-left px-4 py-4 rounded-xl text-sm flex items-center justify-between group transition-all border ${
                  selected?.id === service.id && !isCreating
                    ? "bg-white border-[#16579e] shadow-md ring-1 ring-[#16579e]"
                    : "bg-white border-transparent hover:border-gray-300 hover:shadow-sm text-gray-600"
                }`}
              >
                <div>
                  <div
                    className={`font-bold line-clamp-1 text-base ${selected?.id === service.id ? "text-[#16579e]" : "text-gray-700"}`}
                  >
                    {service.name}
                  </div>
                  <div className="text-[10px] text-gray-800 uppercase font-bold mt-1 tracking-wider bg-gray-100 px-2 py-0.5 rounded-md w-fit inline-block">
                    {service.category}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${selected?.id === service.id ? "text-[#16579e]" : "text-gray-300"}`}
                />
              </button>
            ))}
        </div>
      </div>

      {/* RIGHT: FORM CHỈNH SỬA */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-100/50 custom-scrollbar relative">
        {selected ? (
          <div className="p-10 pb-40 space-y-8 max-w-5xl mx-auto">
            {/* Toolbar Sticky */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200 sticky top-0 z-20 backdrop-blur-md gap-4">
              {/* Cột trái: Thông tin & Tiêu đề - Thêm min-w-0 để truncate hoạt động */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {isCreating ? "Chế độ tạo mới" : "Chế độ chỉnh sửa"}
                  {!isCreating && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono text-[10px]">
                      ID: {selected.id}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Tiêu đề: Sử dụng truncate để tự thêm dấu "..." khi hết không gian */}
                  <h2 className="text-xl md:text-2xl font-black text-gray-800 truncate">
                    {isCreating ? "📝 Bài Viết Mới" : selected.name}
                  </h2>

                  {/* Cảnh báo thay đổi: Thêm shrink-0 để biểu tượng cảnh báo không bị biến dạng */}
                  {isChanged && (
                    <span className="shrink-0 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded animate-pulse flex items-center gap-1">
                      <span className="hidden sm:inline">Chưa lưu</span> ⚠️
                    </span>
                  )}
                </div>
              </div>

              {/* Cột phải: Nhóm nút bấm - Thêm shrink-0 để không bao giờ bị tiêu đề ép nhỏ lại */}
              <div className="flex gap-2 md:gap-3 shrink-0">
                {!isCreating && (
                  <button
                    onClick={del}
                    className="bg-white border border-red-200 text-red-600 px-3 md:px-4 py-2.5 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2 shadow-sm"
                    title="Xóa bài viết"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden md:inline">Xóa</span>
                  </button>
                )}

                <button
                  onClick={save}
                  disabled={!isChanged && !isCreating}
                  className={`flex items-center gap-2 px-5 md:px-8 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap ${
                    isChanged || isCreating
                      ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg animate-pulse"
                      : "bg-[#16579e] text-white hover:bg-blue-800"
                  }`}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>
                    {isCreating
                      ? "Tạo Ngay"
                      : isChanged
                        ? "Lưu Thay Đổi"
                        : "Đã Lưu"}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Cột chính (2/3) */}
              <div className="col-span-2 space-y-8">
                {/* Block: Thông tin chung */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#16579e]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      Thông Tin Cơ Bản
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                        Tên Dịch Vụ <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border border-gray-300 p-3.5 rounded-xl font-bold text-lg focus:ring-2 ring-blue-200 outline-none focus:border-blue-500 transition-all"
                        value={selected.name}
                        onChange={(e) =>
                          isCreating
                            ? generateSlug(e.target.value)
                            : updateField("name", e.target.value)
                        }
                        placeholder="Nhập tên dịch vụ..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                          Đường dẫn (Slug){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-sm focus:ring-2 ring-blue-200 outline-none font-mono text-blue-600"
                          value={selected.slug}
                          onChange={(e) => updateField("slug", e.target.value)}
                          disabled={!isCreating}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                          Danh Mục
                        </label>
                        <CategorySelect
                          value={selected.category}
                          onChange={(val) => updateField("category", val)}
                          options={flatCategories}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                        Mô tả ngắn (SEO)
                      </label>
                      <textarea
                        className="w-full border border-gray-300 p-3 rounded-xl h-24 focus:ring-2 ring-blue-200 outline-none resize-none text-sm"
                        value={selected.excerpt || ""}
                        onChange={(e) => updateField("excerpt", e.target.value)}
                        placeholder="Mô tả hiển thị trên Google..."
                      />
                    </div>
                  </div>
                </div>

                {/* Block: Nội dung chi tiết */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#16579e]">
                        <LayoutTemplate className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        Nội Dung Chi Tiết
                      </h3>
                    </div>
                    <button
                      onClick={addSection}
                      className="bg-blue-50 text-[#16579e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-2 transition-colors"
                    >
                      + Thêm Đoạn Mới
                    </button>
                  </div>
                  <div className="space-y-8">
                    {selected.content?.map((s: any, i: number) => (
                      <div
                        key={i}
                        ref={
                          i === selected.content.length - 1
                            ? lastSectionRef
                            : null
                        }
                        className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative group hover:shadow-md transition-all hover:border-blue-200 hover:bg-white"
                      >
                        <div className="absolute -left-3 top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded-r-md font-bold shadow-sm">
                          #{i + 1}
                        </div>
                        {/* Nút xóa đoạn nội dung */}
                        <button
                          onClick={() => {
                            if (confirm("Xóa đoạn này?"))
                              removeContentSection(i);
                          }}
                          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <input
                          className="w-full border-b-2 border-gray-200 p-2 text-lg font-bold mb-4 focus:border-blue-500 outline-none bg-transparent placeholder-gray-400"
                          value={s.title}
                          onChange={(e) =>
                            updateSection(i, "title", e.target.value)
                          }
                          placeholder="Nhập tiêu đề đoạn (VD: Quy cách)..."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <textarea
                            className="border border-gray-200 p-3 rounded-xl h-40 text-sm focus:ring-2 ring-blue-200 outline-none leading-relaxed bg-white"
                            value={
                              Array.isArray(s.content)
                                ? s.content.join("\n")
                                : s.content
                            }
                            onChange={(e) =>
                              updateSection(
                                i,
                                "content",
                                e.target.value.split("\n"),
                              )
                            }
                            placeholder="Nhập nội dung văn bản..."
                          />
                          <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white h-40 relative group/img overflow-hidden">
                            {s.image ? (
                              <Image
                                src={s.image}
                                className="w-full h-full object-contain p-2"
                                alt={`Section image ${i + 1}`}
                                width={400}
                                height={320}
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                            ) : (
                              <div className="text-center text-gray-800">
                                <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <span className="text-xs">
                                  Chưa có ảnh minh họa
                                </span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <CldUploadButton
                                uploadPreset="hoanganhthao-upload"
                                onSuccess={(r: any) =>
                                  updateSection(i, "image", r.info.secure_url)
                                }
                                className="text-xs bg-white px-4 py-2 rounded-lg font-bold hover:bg-gray-100 shadow-lg"
                              >
                                Tải Ảnh Lên
                              </CldUploadButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- BLOCK MỚI: THƯ VIỆN ẢNH (GALLERY) --- */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#16579e]">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        Thư Viện Ảnh (Gallery)
                      </h3>
                    </div>
                    <CldUploadButton
                      uploadPreset="hoanganhthao-upload"
                      options={{ multiple: true }}
                      onSuccess={(r: any) =>
                        setSelected((p: any) => ({
                          ...p,
                          gallery: [...(p.gallery || []), r.info.secure_url],
                        }))
                      }
                      className="bg-blue-50 text-[#16579e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-2 transition-colors"
                    >
                      + Thêm ảnh
                    </CldUploadButton>
                  </div>

                  {selected.gallery?.length === 0 ? (
                    <p className="text-sm text-gray-400 italic text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      Chưa có ảnh nào. Bấm + Thêm ảnh để tải lên.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selected.gallery?.map((img: string, i: number) => (
                        <div
                          key={i}
                          className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100"
                        >
                          <Image
                            src={img}
                            alt={`Gallery image ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            width={300}
                            height={300}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          {/* Nút xóa ảnh */}
                          <button
                            onClick={() => {
                              if (confirm("Xóa ảnh này?"))
                                removeGalleryImage(i);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 z-10"
                            title="Xóa ảnh này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* --- BLOCK MỚI: THÔNG SỐ KỸ THUẬT (SPECS) - Giao diện bảng --- */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#16579e] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        Thông Số Kỹ Thuật
                      </h3>
                    </div>
                    <button
                      onClick={() =>
                        updateField("specs", [
                          ...(selected.specs || []),
                          { label: "", value: "" },
                        ])
                      }
                      className="bg-blue-50 text-[#16579e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-2 transition-colors shrink-0"
                    >
                      + Thêm dòng
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selected.specs?.length === 0 && (
                      <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        Chưa có thông số nào. Bấm Thêm dòng để tạo mới.
                      </p>
                    )}
                    {selected.specs?.map((s: any, i: number) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-2 rounded-xl border border-transparent hover:border-blue-200 transition-all"
                      >
                        {/* Số thứ tự nhỏ */}
                        <div className="col-span-1 text-[10px] font-bold text-gray-400 text-center">
                          {i + 1}.
                        </div>

                        <div className="col-span-4">
                          <input
                            className="w-full text-sm font-bold text-gray-700 bg-white border border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none shadow-sm"
                            value={s.label}
                            onChange={(e) => {
                              const ns = [...selected.specs];
                              ns[i] = { ...ns[i], label: e.target.value };
                              updateField("specs", ns);
                            }}
                            placeholder="Tên (VD: Kích thước)"
                          />
                        </div>
                        <div className="col-span-6">
                          <input
                            className="w-full text-sm text-gray-800 bg-white border border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none shadow-sm"
                            value={s.value}
                            onChange={(e) => {
                              const ns = [...selected.specs];
                              ns[i] = { ...ns[i], value: e.target.value };
                              updateField("specs", ns);
                            }}
                            placeholder="Giá trị (VD: A4, A5...)"
                          />
                        </div>

                        {/* Nút Xóa: Luôn hiện */}
                        <div className="col-span-1 flex justify-center">
                          <button
                            onClick={() => {
                              if (confirm("Xóa dòng thông số này?")) {
                                const ns = [...selected.specs];
                                ns.splice(i, 1);
                                updateField("specs", ns);
                              }
                            }}
                            className="p-2 text-red-400 bg-white border border-red-100 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all shadow-sm"
                            title="Xóa dòng này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- BLOCK MỚI: CÂU HỎI THƯỜNG GẶP (FAQ) - Giao diện Accordion --- */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#16579e]">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        Câu Hỏi Thường Gặp (FAQ)
                      </h3>
                    </div>
                    <button
                      onClick={() =>
                        updateField("faq", [
                          ...(selected.faq || []),
                          { q: "", a: "" },
                        ])
                      }
                      className="bg-blue-50 text-[#16579e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-2 transition-colors"
                    >
                      + Thêm câu hỏi
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selected.faq?.length === 0 && (
                      <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        Chưa có câu hỏi nào.
                      </p>
                    )}
                    {selected.faq?.map((item: any, i: number) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group"
                      >
                        {/* Nút Xóa FAQ: Luôn hiện */}
                        <button
                          onClick={() => {
                            if (confirm("Xóa câu hỏi này?")) {
                              const nf = [...selected.faq];
                              nf.splice(i, 1);
                              updateField("faq", nf);
                            }
                          }}
                          className="absolute top-3 right-3 p-1.5 text-red-400 bg-white border border-red-100 hover:bg-red-50 hover:text-red-600 rounded-lg shadow-sm z-10"
                          title="Xóa câu hỏi này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex gap-3 mb-3 pr-10">
                          <span className="text-sm font-black text-[#16579e] pt-2 w-6 text-center bg-white rounded h-8 leading-8 shadow-sm">
                            Q
                          </span>
                          <input
                            className="flex-1 text-sm font-bold text-gray-800 bg-white border border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none shadow-sm"
                            value={item.q}
                            onChange={(e) => {
                              const nf = [...selected.faq];
                              nf[i] = { ...nf[i], q: e.target.value };
                              updateField("faq", nf);
                            }}
                            placeholder="Nhập câu hỏi..."
                          />
                        </div>
                        <div className="flex gap-3">
                          <span className="text-sm font-black text-gray-400 pt-2 w-6 text-center bg-white rounded h-8 leading-8 shadow-sm">
                            A
                          </span>
                          <textarea
                            className="flex-1 text-sm text-gray-600 bg-white border border-gray-200 p-2 rounded-lg focus:border-blue-500 outline-none resize-none h-20 leading-relaxed shadow-sm"
                            value={item.a}
                            onChange={(e) => {
                              const nf = [...selected.faq];
                              nf[i] = { ...nf[i], a: e.target.value };
                              updateField("faq", nf);
                            }}
                            placeholder="Nhập câu trả lời..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cột phụ (1/3) */}
              <div className="space-y-8">
                {/* Block: Hình ảnh (Đã xóa Gallery, chỉ còn Cover) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#16579e]">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800">Ảnh Đại Diện</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Cover Image
                    </label>
                    <div className="aspect-video bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative group mb-3 shadow-inner">
                      {selected.coverImage ? (
                        <Image
                          alt="Cover Image"
                          src={selected.coverImage}
                          className="w-full h-full object-cover"
                          width={600}
                          height={360}
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-800">
                          Trống
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <CldUploadButton
                          uploadPreset="hoanganhthao-upload"
                          onSuccess={(r: any) =>
                            updateField("coverImage", r.info.secure_url)
                          }
                          className="text-xs bg-white px-3 py-1.5 rounded-lg font-bold shadow-sm"
                        >
                          Thay Đổi
                        </CldUploadButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block: Features */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#16579e]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800">
                      Đặc điểm nổi bật
                    </h3>
                  </div>
                  <div ref={featuresRef} className="space-y-3">
                    {selected.features?.map((f: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center group">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <input
                          className="flex-1 border-b border-gray-100 py-1 text-sm outline-none bg-transparent focus:border-blue-500 text-gray-600"
                          value={f}
                          onChange={(e) => {
                            const nf = [...selected.features];
                            nf[i] = e.target.value;
                            updateField("features", nf);
                          }}
                          placeholder="Nhập đặc điểm..."
                        />
                        <button
                          onClick={() => {
                            const nf = [...selected.features];
                            nf.splice(i, 1);
                            updateField("features", nf);
                          }}
                          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        updateField("features", [
                          ...(selected.features || []),
                          "",
                        ]);
                        setTimeout(
                          () =>
                            featuresRef.current?.lastElementChild?.scrollIntoView(
                              { behavior: "smooth", block: "center" },
                            ),
                          100,
                        );
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline mt-2 flex items-center gap-1"
                    >
                      + Thêm dòng mới
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-800 bg-white/50 backdrop-blur-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <Edit3 className="w-10 h-10 opacity-30" />
            </div>
            <p className="font-medium text-lg text-gray-500">
              Chưa chọn bài viết nào
            </p>
            <p className="text-sm">
              Hãy chọn từ danh sách bên trái hoặc bấm{" "}
              <b className="text-green-600">Soạn Bài Mới</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 3: QUẢN LÝ FOOTER (Bản Đầy Đủ)
// ============================================================================
function FooterTabContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // Khởi tạo state với cấu trúc đầy đủ
  const [footerData, setFooterData] = useState<any>({
    mission: "",
    address: "",
    hotline: "",
    emails: [""],
    categories: [""], // Danh mục dịch vụ ở cột 2
    facebook: "",
    zalo: "",
  });

  useEffect(() => {
    fetch("/api/config?key=footer_data&t=" + Date.now())
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          // Đảm bảo các mảng luôn tồn tại để không bị lỗi map
          setFooterData({
            ...data,
            emails: data.emails || [""],
            categories: data.categories || [""],
          });
        }
        setLoading(false);
      });
  }, []);

  const saveFooter = async () => {
    setSaving(true);
    try {
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({ key: "footer_data", value: footerData }),
      });
      alert("✨ Đã cập nhật thông tin Footer thành công!");
      setIsChanged(false);
    } catch (e) {
      alert("❌ Lỗi khi lưu dữ liệu!");
    } finally {
      setSaving(false);
    }
  };

  // Helper cập nhật các mảng (Emails, Categories)
  const updateArrayItem = (
    field: "emails" | "categories",
    index: number,
    value: string,
  ) => {
    const newList = [...footerData[field]];
    newList[index] = value;
    setFooterData({ ...footerData, [field]: newList });
    setIsChanged(true);
  };

  const addArrayItem = (field: "emails" | "categories") => {
    setFooterData({ ...footerData, [field]: [...footerData[field], ""] });
    setIsChanged(true);
  };

  const removeArrayItem = (field: "emails" | "categories", index: number) => {
    const newList = [...footerData[field]];
    newList.splice(index, 1);
    setFooterData({ ...footerData, [field]: newList });
    setIsChanged(true);
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#16579e]" />
        <p className="text-gray-500 font-medium">
          Đang tải cấu hình chân trang...
        </p>
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 pb-32 custom-scrollbar overflow-y-auto h-full">
      {/* HEADER ACTION */}
      <div className="flex justify-between items-center bg-white/80 p-5 rounded-2xl shadow-sm border border-gray-200 sticky top-0 z-20 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <Layers className="w-6 h-6 text-blue-600" /> Cấu hình Chân trang
            </h2>
            {isChanged && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded animate-pulse">
                ⚠️ Chưa lưu
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý thông tin chung, liên hệ và mạng xã hội.
          </p>
        </div>
        <button
          onClick={saveFooter}
          disabled={saving || !isChanged}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex gap-2 items-center shadow-md active:scale-95 ${
            isChanged
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-[#16579e] text-white opacity-80"
          }`}
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isChanged ? "LƯU THAY ĐỔI" : "ĐÃ LƯU"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CỘT 1: SỨ MỆNH (Full Width) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm group hover:border-blue-300 transition-all">
          <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-blue-500" /> Sứ mệnh & Giới thiệu
            (Cột 1)
          </label>
          <textarea
            className="w-full border border-gray-200 p-4 rounded-xl h-32 focus:ring-2 ring-blue-100 outline-none resize-none text-sm leading-relaxed"
            value={footerData.mission}
            onChange={(e) => {
              setFooterData({ ...footerData, mission: e.target.value });
              setIsChanged(true);
            }}
            placeholder="Nhập đoạn văn giới thiệu ngắn về công ty ở chân trang..."
          />
        </div>

        {/* CỘT 2: DANH MỤC DỊCH VỤ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm group hover:border-blue-300 transition-all">
          <div className="flex justify-between items-center border-b pb-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider">
              Danh mục dịch vụ (Cột 2)
            </label>
            <button
              onClick={() => addArrayItem("categories")}
              className="p-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {footerData.categories.map((cat: string, idx: number) => (
              <div
                key={idx}
                className="flex gap-2 animate-in slide-in-from-left-2"
              >
                <input
                  className="flex-1 border border-gray-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
                  value={cat}
                  onChange={(e) =>
                    updateArrayItem("categories", idx, e.target.value)
                  }
                  placeholder="Tên dịch vụ (VD: In ấn bao bì...)"
                />
                <button
                  onClick={() => removeArrayItem("categories", idx)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 3: THÔNG TIN LIÊN LẠC */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-6 shadow-sm group hover:border-blue-300 transition-all">
          <label className="block text-sm font-black text-gray-700 uppercase tracking-wider border-b pb-2">
            Thông tin liên lạc (Cột 3)
          </label>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Địa chỉ văn phòng
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500"
                  value={footerData.address}
                  onChange={(e) => {
                    setFooterData({ ...footerData, address: e.target.value });
                    setIsChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Hotline
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 font-bold text-blue-600"
                  value={footerData.hotline}
                  onChange={(e) => {
                    setFooterData({ ...footerData, hotline: e.target.value });
                    setIsChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-dashed">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Danh sách Email
                </label>
                <button
                  onClick={() => addArrayItem("emails")}
                  className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-600 hover:text-white transition-all font-bold"
                >
                  + THÊM EMAIL
                </button>
              </div>
              {footerData.emails.map((email: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      className="w-full border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500"
                      value={email}
                      onChange={(e) =>
                        updateArrayItem("emails", idx, e.target.value)
                      }
                    />
                  </div>
                  <button
                    onClick={() => removeArrayItem("emails", idx)}
                    className="text-gray-300 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MẠNG XÃ HỘI */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 space-y-6 shadow-sm group hover:border-blue-300 transition-all">
          <label className="block text-sm font-black text-gray-700 uppercase tracking-wider border-b pb-2">
            Liên kết Mạng xã hội
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Link Facebook
              </label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 font-mono"
                  value={footerData.facebook}
                  onChange={(e) => {
                    setFooterData({ ...footerData, facebook: e.target.value });
                    setIsChanged(true);
                  }}
                  placeholder="https://facebook.com/your-page"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Link Zalo (Số điện thoại hoặc Link OA)
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 font-mono"
                  value={footerData.zalo}
                  onChange={(e) => {
                    setFooterData({ ...footerData, zalo: e.target.value });
                    setIsChanged(true);
                  }}
                  placeholder="VD: 0909979376"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE: CONTAINER (Chỉ quản lý Tab)
// ============================================================================
export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
      {/* MAIN HEADER TABS */}
      <div className="flex border-b bg-white sticky top-0 z-30 shadow-sm px-8 items-center justify-between h-16">
        <div className="flex h-full gap-8">
          <button
            onClick={() => setActiveTab("home")}
            className={`h-full border-b-[3px] flex items-center gap-2 font-bold text-sm uppercase tracking-wide transition-all ${
              activeTab === "home"
                ? "border-[#16579e] text-[#16579e]"
                : "border-transparent text-gray-800 hover:text-gray-600"
            }`}
          >
            <Monitor className="w-4 h-4" /> Giao Diện Trang Chủ
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`h-full border-b-[3px] flex items-center gap-2 font-bold text-sm uppercase tracking-wide transition-all ${
              activeTab === "services"
                ? "border-[#16579e] text-[#16579e]"
                : "border-transparent text-gray-800 hover:text-gray-600"
            }`}
          >
            <Grid className="w-4 h-4" /> Quản Lý Bài Viết
          </button>
          <button
            onClick={() => setActiveTab("footer")}
            className={`h-full border-b-[3px] flex items-center gap-2 font-bold text-sm uppercase tracking-wide transition-all ${
              activeTab === "footer"
                ? "border-[#16579e] text-[#16579e]"
                : "border-transparent text-gray-800 hover:text-gray-600"
            }`}
          >
            <Layers className="w-4 h-4" /> Footer & Liên Hệ
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Nút Refresh cũ */}
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-gray-400 hover:text-[#16579e] hover:bg-blue-50 rounded-full transition-all"
            title="Tải lại"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>

          {/* Nút Đăng Xuất Mới */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="flex-1 flex overflow-hidden bg-gray-50/50 relative">
        {/* Tab Home */}
        <div
          className={`w-full h-full absolute inset-0 transition-opacity duration-300 ${activeTab === "home" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <HomeTabContent />
        </div>

        {/* Tab Services */}
        <div
          className={`w-full h-full absolute inset-0 transition-opacity duration-300 ${activeTab === "services" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <ServicesTabContent />
        </div>

        {/* Tab Footer */}
        <div
          className={`w-full h-full absolute inset-0 transition-opacity duration-300 ${activeTab === "footer" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <FooterTabContent />
        </div>
      </div>
    </div>
  );
}
