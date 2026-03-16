"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useDraft } from "@/app/admin/hooks/useDraft";

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
  X,
  HelpCircle,
} from "lucide-react";

// Import MENU_TREE
import { MENU_TREE, CategoryNode } from "../../../data/services_content";

import { CategorySelect } from "@/app/components/UI/category_select";
import { CloudinaryBrowser } from "./cloudinary_browser";
import Image from "next/image";

export function ServicesTabContent() {
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
  const [hasDraft, setHasDraft] = useState(false);
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [browserCallback, setBrowserCallback] = useState<
    ((url: string) => void) | null
  >(null);

  // 🔑 DERIVED STATE: Nếu selected không có ID thì đang tạo mới (robust hơn so với state boolean)
  const isCreatingMode = selected && !selected.id;

  // Draft management
  const { clearDraft } = useDraft(
    selected?.id ? `service_${selected.id}` : "service_new",
    selected,
    setSelected,
    isChanged,
  );

  // Reload dữ liệu dịch vụ từ database
  const reloadServiceData = async () => {
    if (!selected?.id) return;
    try {
      const res = await fetch("/api/services", {
        headers: {
          "Cache-Control": "no-cache", // Skip cache khi reload
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const found = data.find((item) => item.id === selected.id);
        if (found) {
          const normalizedData = {
            ...found,
            content: found.content || [],
            gallery: found.gallery || [],
            features: found.features || [],
            specs: found.specs || [],
            faq: found.faq || [],
          };
          setSelected(normalizedData);
          console.log("✅ Reloaded service data from database");
        }
      }
    } catch (error) {
      console.error("Lỗi reload dữ liệu service:", error);
      alert("❌ Lỗi khi tải lại dữ liệu");
    }
  };

  // Cleanup draft khi selected id thay đổi (khi bài mới được lưu có id)
  useEffect(() => {
    if (selected?.id && isCreating === false) {
      // Xóa draft_service_new khi bài mới đã có id
      try {
        localStorage.removeItem("draft_service_new");
        console.log("🗑️ Cleaned up old draft (service_new)");
      } catch (error) {
        console.error("Failed to cleanup old draft:", error);
      }
    }
  }, [selected?.id, isCreating]);

  // Reset isCreating khi bài mới được lưu và nhận ID
  useEffect(() => {
    if (isCreating && selected?.id) {
      console.log(
        "🔄 Resetting isCreating to false because new service got ID",
      );
      setIsCreating(false);
    }
  }, [selected?.id]);

  // Check hasDraft khi selected thay đổi
  useEffect(() => {
    const draftKey = selected?.id ? `service_${selected.id}` : "service_new";
    const hasDraftNow = localStorage.getItem(draftKey) !== null;
    setHasDraft(hasDraftNow);
  }, [selected?.id, isCreating]);

  // 1. Tải toàn bộ danh sách
  const fetchList = useCallback(async () => {
    setIsInitialLoading(true);
    try {
      const res = await fetch("/api/services", {
        headers: {
          "Cache-Control": "public, max-age=60", // Cache 1 phút (short due to updates)
        },
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
      console.error("Lỗi tải services:", e);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Reset toàn bộ state về mặc định
  const resetToDefault = useCallback(() => {
    clearDraft();
    setSelected(null);
    setIsCreating(false);
    setIsChanged(false);
    setHasDraft(false);
    console.log("🔄 Reset to default state");
  }, [clearDraft]);

  // 2. Chọn bài viết từ RAM (+ restore draft nếu có)
  const selectService = (id: string) => {
    // ⚠️ SAFEGUARD: Check localStorage directly vì state có thể không sync trên Netlify
    const hasDraftNew = localStorage.getItem("draft_service_new") !== null;

    console.warn("🔍 selectService called:", {
      id,
      hasDraftNew,
      isCreatingMode,
      isChanged,
      selectedId: selected?.id,
    });

    // Nếu có draft bài mới chưa lưu, confirm trước
    if (hasDraftNew) {
      console.warn("⚠️ Found unsaved new article draft - showing confirm");
      if (
        !confirm(
          "⚠️ Bạn đang tạo bài viết mới. Hủy bài mới và chuyển sang bài khác?",
        )
      ) {
        console.log("❌ User cancelled - staying on new article");
        return;
      }
      // User confirmed - clear draft
      console.log("✅ User confirmed - clearing draft_service_new");
      try {
        localStorage.removeItem("draft_service_new");
      } catch (e) {
        console.error("Failed to clear draft_service_new:", e);
      }
      resetToDefault();
    }

    const found = list.find((item) => item.id === id);
    if (found) {
      // Kiểm tra xem có draft trước đó không
      try {
        const draftKey = `draft_service_${id}`;
        const savedDraft = localStorage.getItem(draftKey);
        if (savedDraft) {
          const parsedDraft = JSON.parse(savedDraft);
          console.log(`✅ Restored draft for service ${id}`);
          setSelected(parsedDraft);
          setIsChanged(true); // Mark có thay đổi vì lấy từ draft
          return;
        }
      } catch (error) {
        console.error("Failed to restore draft:", error);
      }

      // Nếu không có draft, dùng data từ list
      setSelected(JSON.parse(JSON.stringify(found)));
      setIsChanged(false);
      setIsCreating(false); // Đảm bảo reset creating mode
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

  const del = async () => {
    if (!confirm("⚠️ Xóa bài viết này? Hành động không thể hoàn tác!")) return;
    setLoading(true);
    try {
      await fetch(`/api/services?slug=${selected.slug}`, { method: "DELETE" });
      alert("🗑️ Đã xóa thành công!");
      setList((prev) => prev.filter((item) => item.id !== selected.id));
      resetToDefault(); // Reset toàn bộ state
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

  const extractPublicIdFromUrl = (url: string): string => {
    try {
      // URL mẫu: https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg
      const parts = url.split("/upload/");
      if (parts.length < 2) return "";

      // Lấy phần sau /upload/, ví dụ: "v1312461204/folder/sample.jpg"
      let publicIdWithExt = parts[1];

      // Nếu có phần version (bắt đầu bằng 'v' và theo sau là số), hãy bỏ nó đi
      if (publicIdWithExt.match(/^v\d+\//)) {
        publicIdWithExt = publicIdWithExt.substring(
          publicIdWithExt.indexOf("/") + 1,
        );
      }

      // Bỏ phần mở rộng file (.jpg, .png, .webp...)
      return publicIdWithExt.replace(/\.[^/.]+$/, "");
    } catch (e) {
      console.error("Lỗi trích xuất PublicId:", e);
      return "";
    }
  };

  // Delete image từ Cloudinary khi user confirm
  const deleteImageFromCloudinary = async (imageUrl: string) => {
    const publicId = extractPublicIdFromUrl(imageUrl);
    if (!publicId) {
      console.error("❌ Could not extract publicId from URL:", imageUrl);
      alert("❌ Lỗi: Không thể trích xuất ID ảnh từ URL");
      return false;
    }

    setDeletingImages((prev) => new Set([...prev, imageUrl]));

    try {
      console.log("🗑️ Deleting image with publicId:", publicId);
      const res = await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      const data = await res.json();
      console.log("📡 Delete response:", data);

      if (!res.ok) {
        console.error(
          "❌ API returned error:",
          res.status,
          data.error || data.details,
        );
        alert(`❌ Lỗi: ${data.error || data.details || "Không thể xóa ảnh"}`);
        return false;
      }

      if (data.success) {
        console.log("✅ Image deleted from Cloudinary:", publicId);
        return true;
      } else {
        console.error("❌ Failed to delete image:", data);
        alert(`❌ Lỗi: ${data.error || "Không thể xóa ảnh từ server"}`);
        return false;
      }
    } catch (error) {
      console.error("❌ Error deleting image:", error);
      alert(
        `❌ Lỗi kết nối: ${error instanceof Error ? error.message : String(error)}`,
      );
      return false;
    } finally {
      setDeletingImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(imageUrl);
        return newSet;
      });
    }
  };

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

  const save = async () => {
    if (!selected.name || !selected.slug) return alert("Cần nhập tên và slug!");
    setSaving(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });

      if (res.ok) {
        const savedData = await res.json();
        alert("✅ Đã lưu thành công!");

        // Clear draft sau khi save thành công
        clearDraft();
        setIsChanged(false);
        setHasDraft(false);

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

        // ✅ Cập nhật selected để đồng bộ với dữ liệu vừa lưu
        const normalized = {
          ...savedData,
          content: savedData.content || [],
          gallery: savedData.gallery || [],
          features: savedData.features || [],
          specs: savedData.specs || [],
          faq: savedData.faq || [],
        };
        setSelected(normalized);

        router.refresh();

        if (isCreating) {
          setIsCreating(false);
          // selected đã được update ở trên, không cần gán lại
        }
      } else {
        alert("Lỗi khi lưu (Có thể trùng Slug)");
      }
    } catch (e) {
      alert("Lỗi kết nối");
    } finally {
      setSaving(false);
    }
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
      {/* LOADING OVERLAY KHI XÓA */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-in fade-in scale-in duration-300">
            <Loader2 className="w-12 h-12 animate-spin text-red-500" />
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                Đang xóa bài viết...
              </h2>
              <p className="text-sm text-gray-500">
                Vui lòng chờ, hành động này không thể hoàn tác
              </p>
            </div>
          </div>
        </div>
      )}

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
                  selected?.id === service.id && !isCreatingMode
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
                  {isCreatingMode ? "Chế độ tạo mới" : "Chế độ chỉnh sửa"}
                  {!isCreatingMode && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono text-[10px]">
                      ID: {selected.id}
                    </span>
                  )}
                  {saving && (
                    <span className="ml-2 flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-[10px]">Đang lưu...</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Tiêu đề: Sử dụng truncate để tự thêm dấu "..." khi hết không gian */}
                  <h2 className="text-xl md:text-2xl font-black text-gray-800 truncate">
                    {isCreatingMode ? "📝 Bài Viết Mới" : selected.name}
                  </h2>

                  {/* Cảnh báo thay đổi: Thêm shrink-0 để biểu tượng cảnh báo không bị biến dạng */}
                  {isChanged && !saving && (
                    <span className="shrink-0 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded animate-pulse flex items-center gap-1">
                      <span className="hidden sm:inline">Chưa lưu</span> ⚠️
                    </span>
                  )}
                </div>
              </div>

              {/* Cột phải: Nhóm nút bấm - Thêm shrink-0 để không bao giờ bị tiêu đề ép nhỏ lại */}
              <div className="flex gap-2 md:gap-3 shrink-0">
                {!isCreatingMode && (
                  <button
                    onClick={del}
                    disabled={saving || loading}
                    className="bg-white border border-red-200 text-red-600 px-3 md:px-4 py-2.5 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Xóa bài viết"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span className="hidden md:inline">
                      {loading ? "Đang xóa..." : "Xóa"}
                    </span>
                  </button>
                )}

                {isChanged && (
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Hủy tất cả thay đổi? Dữ liệu sẽ được trả lại như ban đầu.",
                        )
                      ) {
                        if (isCreatingMode) {
                          // Nếu đang tạo bài mới, thoát về null
                          resetToDefault();
                        } else {
                          // Nếu đang chỉnh sửa bài cũ, reload từ database
                          clearDraft();
                          setIsChanged(false);
                          setHasDraft(false);
                          reloadServiceData();
                        }
                      }
                    }}
                    className="bg-white border border-gray-200 text-gray-700 px-3 md:px-4 py-2.5 rounded-xl font-bold hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm"
                    title="Hủy thay đổi chưa lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden md:inline">Hủy Thay Đổi</span>
                  </button>
                )}

                <button
                  onClick={save}
                  disabled={!isChanged && !isCreatingMode}
                  className={`flex items-center gap-2 px-5 md:px-8 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                    isChanged || isCreatingMode
                      ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg"
                      : "bg-[#16579e] text-white hover:bg-blue-800"
                  } ${saving ? "animate-pulse" : ""}`}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>
                    {saving
                      ? "Đang lưu..."
                      : isCreatingMode
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
                          Đường dẫn (Slug)
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
                        className="w-full border border-gray-300 p-3 rounded-xl h-72 focus:ring-2 ring-blue-200 outline-none resize-none text-sm"
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
                            className="border border-gray-200 p-3 rounded-xl h-64 text-sm focus:ring-2 ring-blue-200 outline-none leading-relaxed bg-white"
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
                          <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white h-64 relative group/img overflow-hidden">
                            {s.image ? (
                              <Image
                                src={s.image}
                                className={`w-full h-full object-contain p-2 ${deletingImages.has(s.image) ? "opacity-50" : ""}`}
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
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                              {s.image && (
                                <button
                                  onClick={() => {
                                    if (confirm("Xóa ảnh này?")) {
                                      updateSection(i, "image", "");
                                    }
                                  }}
                                  className="absolute top-2 right-2 text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-bold shadow-lg flex items-center gap-1"
                                  title="Xóa ảnh minh họa"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                              <CldUploadButton
                                uploadPreset="hoanganhthao-upload"
                                onSuccess={(r: any) =>
                                  updateSection(i, "image", r.info.secure_url)
                                }
                                className="text-xs bg-white hover:bg-gray-100 px-4 py-2 rounded-lg font-bold shadow-lg"
                              >
                                {s.image ? "Thay Đổi" : "Tải Ảnh Lên"}
                              </CldUploadButton>
                              <button
                                onClick={() =>
                                  openCloudinaryBrowser((url: string) =>
                                    updateSection(i, "image", url),
                                  )
                                }
                                className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-1"
                                title="Browse ảnh từ Cloudinary"
                              >
                                <Search className="w-3 h-3" />
                                Browse
                              </button>
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
                        Ảnh Minh Họa
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          openCloudinaryBrowser((url: string) => {
                            const newGallery = [
                              ...(selected.gallery || []),
                              url,
                            ];
                            updateField("gallery", newGallery);
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 flex items-center gap-2 transition-colors"
                        title="Browse ảnh từ Cloudinary"
                      >
                        <Search className="w-3 h-3" />
                        Browse
                      </button>
                      <CldUploadButton
                        uploadPreset="hoanganhthao-upload"
                        options={{ multiple: true }}
                        onSuccess={(r: any) => {
                          const newGallery = [
                            ...(selected.gallery || []),
                            r.info.secure_url,
                          ];
                          updateField("gallery", newGallery);
                        }}
                        className="bg-blue-50 text-[#16579e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-2 transition-colors"
                      >
                        + Thêm ảnh
                      </CldUploadButton>
                    </div>
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
                            className={`w-full h-full object-cover hover:scale-110 transition-transform duration-500 ${deletingImages.has(img) ? "opacity-50" : ""}`}
                            width={300}
                            height={300}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          {/* Delete & Browse button */}
                          {img && (
                            <>
                              <button
                                onClick={() => {
                                  if (confirm("Xóa ảnh này?")) {
                                    removeGalleryImage(i);
                                  }
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                                title="Xóa ảnh này"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  openCloudinaryBrowser((url: string) => {
                                    const g = [...selected.gallery];
                                    g[i] = url;
                                    updateField("gallery", g);
                                  })
                                }
                                className="absolute top-2 right-12 p-1.5 bg-blue-500 text-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 z-10"
                                title="Browse ảnh từ Cloudinary"
                              >
                                <Search className="w-4 h-4" />
                              </button>
                            </>
                          )}
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
                          className={`w-full h-full object-cover ${deletingImages.has(selected.coverImage) ? "opacity-50" : ""}`}
                          width={600}
                          height={360}
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-800">
                          Trống
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {selected.coverImage && (
                          <button
                            onClick={() => {
                              if (confirm("Xóa ảnh đại diện?")) {
                                updateField("coverImage", "");
                              }
                            }}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm flex items-center gap-1"
                            title="Xóa ảnh đại diện"
                          >
                            <Trash2 className="w-3 h-3" />
                            Xóa
                          </button>
                        )}
                        <CldUploadButton
                          uploadPreset="hoanganhthao-upload"
                          onSuccess={(r: any) =>
                            updateField("coverImage", r.info.secure_url)
                          }
                          className="text-xs bg-white hover:bg-gray-100 px-3 py-1.5 rounded-lg font-bold shadow-sm"
                        >
                          {selected.coverImage ? "Đổi" : "Tải Lên"}
                        </CldUploadButton>
                        <button
                          onClick={() =>
                            openCloudinaryBrowser((url: string) =>
                              updateField("coverImage", url),
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
              Hãy chọn từ danh sách bên trái hoặc bấm
              <b className="text-green-600">Soạn Bài Mới</b>
            </p>
          </div>
        )}
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
