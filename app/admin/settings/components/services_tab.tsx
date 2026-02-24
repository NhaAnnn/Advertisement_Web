/* eslint-disable @typescript-eslint/no-explicit-any */

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
  X,
  HelpCircle,
} from "lucide-react";

// Import MENU_TREE
import { MENU_TREE, CategoryNode } from "../../../data/services_content";

import { CategorySelect } from "@/app/components/UI/category_select";
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
