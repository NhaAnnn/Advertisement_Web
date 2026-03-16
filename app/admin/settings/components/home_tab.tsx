"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useDraft } from "@/app/admin/hooks/useDraft";
import { CloudinaryBrowser } from "./cloudinary_browser";

import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Layers,
  Monitor,
  MapPin,
  Search,
} from "lucide-react";

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
export function HomeTabContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [homeConfig, setHomeConfig] = useState<any>(DEFAULT_CONFIG);

  const [isChanged, setIsChanged] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());
  const [mediaLibraryCallback, setMediaLibraryCallback] = useState<
    ((url: string) => void) | null
  >(null);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [browserCallback, setBrowserCallback] = useState<
    ((url: string) => void) | null
  >(null);

  // REFS ĐỂ SCROLL
  const showcaseListRef = useRef<HTMLDivElement>(null);
  const processListRef = useRef<HTMLDivElement>(null);
  const portfolioListRef = useRef<HTMLDivElement>(null);

  // Draft management
  const { clearDraft } = useDraft(
    "home_config",
    homeConfig,
    setHomeConfig,
    isChanged,
  );

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Kiểm tra draft trước - nếu có draft, skip fetch
        try {
          const savedDraft = localStorage.getItem("draft_home_config");
          if (savedDraft) {
            const parsedDraft = JSON.parse(savedDraft);
            console.log("✅ Restored draft for home_config from localStorage");
            setHomeConfig(parsedDraft);
            setIsChanged(true);
            setHasDraft(true);
            setLoading(false);
            return; // Skip API call nếu có draft
          }
        } catch (error) {
          console.error("Failed to restore draft:", error);
        }

        // 1 request duy nhất - lấy tất cả keys cùng lúc
        const keysToFetch = [
          "home_hero",
          "home_services",
          "home_showcase",
          "home_process",
          "home_portfolio",
        ];

        const response = await fetch(
          `/api/config?keys=${keysToFetch.join(",")}`,
          {
            headers: {
              "Cache-Control": "public, max-age=3600", // Cache 1 giờ
            },
          },
        );
        const data = await response.json();

        const newConfig = {
          hero: { ...DEFAULT_CONFIG.hero, ...(data.home_hero || {}) },
          services:
            Array.isArray(data.home_services) && data.home_services.length > 0
              ? data.home_services
              : DEFAULT_CONFIG.services,
          showcase: Array.isArray(data.home_showcase) ? data.home_showcase : [],
          process: Array.isArray(data.home_process) ? data.home_process : [],
          portfolio: Array.isArray(data.home_portfolio)
            ? data.home_portfolio
            : [],
        };

        setHomeConfig(newConfig);
      } catch (error) {
        console.error("Lỗi tải dữ liệu Home:", error);
        // Fallback to DEFAULT_CONFIG
        setHomeConfig(DEFAULT_CONFIG);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // Load Cloudinary Media Library Widget
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://media-library.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Hàm mở Cloudinary Browser (không cần login)
  const openCloudinaryBrowser = (callback: (url: string) => void) => {
    setBrowserCallback(() => callback);
    setIsBrowserOpen(true);
  };

  const handleBrowserSelect = (url: string) => {
    if (browserCallback) {
      browserCallback(url);
    }
  };

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
      alert("✨ Giao diện Trang Chủ đã lưu thành công!");

      // 🔥 XÓA DRAFT NGAY LẬP TỨC
      try {
        localStorage.removeItem("draft_home_config");
        console.log("🗑️ Draft cleared: draft_home_config");
      } catch (error) {
        console.error("Failed to remove draft:", error);
      }

      clearDraft(); // Xóa draft sau khi save thành công
      setIsChanged(false);
      setHasDraft(false);

      // 📥 RELOAD DỮ LIỆU TỪ DATABASE ĐỂ ĐỒng BỘ
      await reloadHomeData();
      router.refresh();
    } catch (e) {
      alert("❌ Lỗi khi lưu dữ liệu!");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Reload dữ liệu gốc từ database
  const reloadHomeData = async () => {
    try {
      const keysToFetch = [
        "home_hero",
        "home_services",
        "home_showcase",
        "home_process",
        "home_portfolio",
      ];

      const response = await fetch(
        `/api/config?keys=${keysToFetch.join(",")}`,
        {
          headers: {
            "Cache-Control": "no-cache", // Skip cache khi reload
          },
        },
      );
      const data = await response.json();

      const newConfig = {
        hero: { ...DEFAULT_CONFIG.hero, ...(data.home_hero || {}) },
        services:
          Array.isArray(data.home_services) && data.home_services.length > 0
            ? data.home_services
            : DEFAULT_CONFIG.services,
        showcase: Array.isArray(data.home_showcase) ? data.home_showcase : [],
        process: Array.isArray(data.home_process) ? data.home_process : [],
        portfolio: Array.isArray(data.home_portfolio)
          ? data.home_portfolio
          : [],
      };

      setHomeConfig(newConfig);
      console.log("✅ Reloaded home data from database");
    } catch (error) {
      console.error("Lỗi reload dữ liệu Home:", error);
      alert("❌ Lỗi khi tải lại dữ liệu");
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

  // Helper: Extract Cloudinary publicId từ URL
  // const extractPublicIdFromUrl = (url: string): string => {
  //   try {
  //     // Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/public_id.ext
  //     const match = url.match(
  //       /\/upload\/(?:v\d+\/)?([^/?]+)(?:\.[^/?]+)?(?:\?|$)/,
  //     );
  //     const publicId = match ? match[1] : "";
  //     console.log("🔍 Extracted publicId:", publicId, "from URL:", url);
  //     return publicId;
  //   } catch (e) {
  //     console.error("Error extracting publicId:", e);
  //     return "";
  //   }
  // };

  // Delete image từ Cloudinary khi user confirm
  // const deleteImageFromCloudinary = async (imageUrl: string) => {
  //   const publicId = extractPublicIdFromUrl(imageUrl);
  //   if (!publicId) {
  //     console.error("❌ Could not extract publicId from URL:", imageUrl);
  //     alert("❌ Lỗi: Không thể trích xuất ID ảnh từ URL");
  //     return false;
  //   }

  //   setDeletingImages((prev) => new Set([...prev, imageUrl]));

  //   try {
  //     console.log("🗑️ Deleting image with publicId:", publicId);
  //     const res = await fetch("/api/delete-image", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ publicId }),
  //     });

  //     const data = await res.json();
  //     console.log("📡 Delete response:", data);

  //     if (!res.ok) {
  //       console.error(
  //         "❌ API returned error:",
  //         res.status,
  //         data.error || data.details,
  //       );
  //       alert(`❌ Lỗi: ${data.error || data.details || "Không thể xóa ảnh"}`);
  //       return false;
  //     }

  //     if (data.success) {
  //       console.log("✅ Image deleted from Cloudinary:", publicId);
  //       return true;
  //     } else {
  //       console.error("❌ Failed to delete image:", data);
  //       alert(`❌ Lỗi: ${data.error || "Không thể xóa ảnh từ server"}`);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("❌ Error deleting image:", error);
  //     alert(
  //       `❌ Lỗi kết nối: ${error instanceof Error ? error.message : String(error)}`,
  //     );
  //     return false;
  //   } finally {
  //     setDeletingImages((prev) => {
  //       const newSet = new Set(prev);
  //       newSet.delete(imageUrl);
  //       return newSet;
  //     });
  //   }
  // };

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

            {isChanged && !saving && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded animate-pulse">
                ⚠️ Chưa lưu
              </span>
            )}
            {saving && (
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded animate-pulse flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Đang lưu...
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Thay đổi nội dung hiển thị cho khách hàng.
          </p>
        </div>
        <div className="flex gap-3">
          {isChanged && (
            <button
              onClick={() => {
                if (
                  confirm(
                    "Hủy tất cả thay đổi? Dữ liệu sẽ được trả lại như ban đầu.",
                  )
                ) {
                  clearDraft();
                  setIsChanged(false);
                  setHasDraft(false);
                  reloadHomeData(); // Reload từ database
                }
              }}
              className="px-4 py-3 rounded-xl text-sm font-bold transition-all flex gap-2 items-center bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 whitespace-nowrap"
              title="Hủy thay đổi chưa lưu"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Hủy Thay Đổi</span>
            </button>
          )}
          <button
            onClick={saveHomeConfig}
            disabled={saving || !isChanged}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex gap-2 items-center disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap ${
              isChanged
                ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg"
                : "bg-[#16579e] text-white hover:bg-blue-800"
            } ${saving ? "animate-pulse" : ""}`}
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? "ĐANG LƯU..." : isChanged ? "LƯU THAY ĐỔI" : "Đã Lưu"}
          </button>
        </div>
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
              <div className="aspect-video w-full bg-gray-300 rounded-lg mb-3 overflow-hidden relative shadow-inner group/img">
                {homeConfig.hero.mainImage ? (
                  <Image
                    src={homeConfig.hero.mainImage}
                    alt="Ảnh Nền"
                    className={`w-full h-full object-cover ${deletingImages.has(homeConfig.hero.mainImage) ? "opacity-50" : ""}`}
                    fill
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs italic">
                    Chưa có ảnh
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col sm:flex-row items-center justify-center gap-2 p-2">
                  {homeConfig.hero.mainImage && (
                    <button
                      onClick={() => {
                        if (confirm("Xóa ảnh?")) {
                          updateHero({
                            ...homeConfig.hero,
                            mainImage: "",
                          });
                        }
                      }}
                      className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm flex items-center gap-1 whitespace-nowrap"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-3 h-3" />
                      Xóa
                    </button>
                  )}
                  <CldUploadButton
                    uploadPreset="hoanganhthao-upload"
                    onSuccess={(r: any) =>
                      updateHero({
                        ...homeConfig.hero,
                        mainImage: r.info.secure_url,
                      })
                    }
                    className="text-xs bg-white hover:bg-gray-100 px-3 py-1.5 rounded-lg font-bold shadow-sm"
                  >
                    {homeConfig.hero.mainImage ? "Thay Đổi" : "Tải Lên"}
                  </CldUploadButton>
                  <button
                    onClick={() =>
                      openCloudinaryBrowser((url: string) =>
                        updateHero({
                          ...homeConfig.hero,
                          mainImage: url,
                        }),
                      )
                    }
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm flex items-center gap-1"
                    title="Browse ảnh từ Cloudinary"
                  >
                    <Search className="w-3 h-3" />
                    Browse
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 text-center">
              <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                2. Ảnh Nổi (3D)
              </span>
              <div className="aspect-video w-full bg-gray-300 rounded-lg mb-3 overflow-hidden relative shadow-inner group/img">
                {homeConfig.hero.floatingImage ? (
                  <Image
                    src={homeConfig.hero.floatingImage}
                    alt="Ảnh Nổi (3D)"
                    className={`w-full h-full object-contain p-2 ${deletingImages.has(homeConfig.hero.floatingImage) ? "opacity-50" : ""}`}
                    fill
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs italic">
                    Chưa có ảnh
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col sm:flex-row items-center justify-center gap-2 p-2">
                  {homeConfig.hero.floatingImage && (
                    <button
                      onClick={() => {
                        if (confirm("Xóa ảnh?")) {
                          updateHero({
                            ...homeConfig.hero,
                            floatingImage: "",
                          });
                        }
                      }}
                      className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm flex items-center gap-1 whitespace-nowrap"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-3 h-3" />
                      Xóa
                    </button>
                  )}
                  <CldUploadButton
                    uploadPreset="hoanganhthao-upload"
                    onSuccess={(r: any) =>
                      updateHero({
                        ...homeConfig.hero,
                        floatingImage: r.info.secure_url,
                      })
                    }
                    className="text-xs bg-white hover:bg-gray-100 px-3 py-1.5 rounded-lg font-bold shadow-sm"
                  >
                    {homeConfig.hero.floatingImage ? "Thay Đổi" : "Tải Lên"}
                  </CldUploadButton>
                  <button
                    onClick={() =>
                      openCloudinaryBrowser((url: string) =>
                        updateHero({
                          ...homeConfig.hero,
                          floatingImage: url,
                        }),
                      )
                    }
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm flex items-center gap-1"
                    title="Browse ảnh từ Cloudinary"
                  >
                    <Search className="w-3 h-3" />
                    Browse
                  </button>
                </div>
              </div>
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
                        className={`w-full h-full object-cover transition-transform group-hover/img:scale-110 ${deletingImages.has(item.image) ? "opacity-50" : ""}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-800 font-bold">
                        NO IMG
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                      {item.image && (
                        <button
                          onClick={() => {
                            if (confirm("Xóa ảnh?")) {
                              updateHomeItem("services", idx, "image", "");
                            }
                          }}
                          className="absolute top-2 right-2 text-[12px] bg-red-500 hover:bg-red-600 text-white px-1.5 py-1 rounded font-bold shadow-sm flex items-center gap-0.5 whitespace-nowrap"
                          title="Xóa ảnh"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
                        className="text-[10px] bg-white px-3 py-1.5 rounded-full font-bold shadow-md w-full sm:w-auto"
                      >
                        ĐỔI
                      </CldUploadButton>
                      <button
                        onClick={() =>
                          openCloudinaryBrowser((url: string) =>
                            updateHomeItem("services", idx, "image", url),
                          )
                        }
                        className="text-[10px] bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1 w-full sm:w-auto justify-center"
                        title="Browse ảnh từ Cloudinary"
                      >
                        {/* <Search className="w-3 h-3" /> */}
                        Browse
                      </button>
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
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col  items-center justify-center gap-1 p-1">
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
                        className="text-[9px] bg-white px-2 py-1 rounded font-bold cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
                      >
                        ĐỔI
                      </CldUploadButton>
                      <button
                        onClick={() =>
                          openCloudinaryBrowser((url: string) =>
                            updateHomeItem("showcase", idx, "image", url),
                          )
                        }
                        className="text-[9px] bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded font-bold flex items-center gap-1"
                        title="Browse ảnh từ Cloudinary"
                      >
                        {/* <Search className="w-3 h-3" /> */}
                        <span className="hidden sm:inline">Browse</span>
                      </button>
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
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity p-1">
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
                          className="text-[10px] text-white font-bold bg-black/50 px-2 py-1 rounded whitespace-nowrap w-full sm:w-auto"
                        >
                          ĐỔI
                        </CldUploadButton>
                        <button
                          onClick={() =>
                            openCloudinaryBrowser((url: string) =>
                              updateHomeItem("portfolio", idx, "image", url),
                            )
                          }
                          className="text-[10px] text-white font-bold bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded flex items-center gap-1 w-full sm:w-auto justify-center"
                          title="Browse ảnh từ Cloudinary"
                        >
                          <Search className="w-3 h-3" />
                          Browse
                        </button>
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

      {/* Cloudinary Browser Modal */}
      <CloudinaryBrowser
        isOpen={isBrowserOpen}
        onClose={() => setIsBrowserOpen(false)}
        onSelect={handleBrowserSelect}
      />
    </div>
  );
}
