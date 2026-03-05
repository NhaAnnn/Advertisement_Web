"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useDraft } from "@/app/admin/hooks/useDraft";

import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Layers,
  MapPin,
  MessageCircle,
  Facebook,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

export function FooterTabContent() {
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

  // Draft management
  const { clearDraft } = useDraft(
    "footer_data",
    footerData,
    setFooterData,
    isChanged,
  );

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Kiểm tra draft trước - nếu có draft, skip fetch
        try {
          const savedDraft = localStorage.getItem("draft_footer_data");
          if (savedDraft) {
            const parsedDraft = JSON.parse(savedDraft);
            console.log("✅ Restored draft for footer_data from localStorage");
            setFooterData(parsedDraft);
            setIsChanged(true);
            setLoading(false);
            return; // Skip API call nếu có draft
          }
        } catch (error) {
          console.error("Failed to restore draft:", error);
        }

        const response = await fetch("/api/config?key=footer_data", {
          headers: {
            "Cache-Control": "public, max-age=3600", // Cache 1 giờ
          },
        });
        const data = await response.json();

        const newData = {
          mission: "",
          address: "",
          hotline: "",
          facebook: "",
          zalo: "",
          ...(data || {}),
          emails: data?.emails || [""],
          categories: data?.categories || [""],
        };

        setFooterData(newData);
      } catch (error) {
        console.error("Lỗi tải Footer data:", error);
        // Fallback to default structure
        setFooterData({
          mission: "",
          address: "",
          hotline: "",
          emails: [""],
          categories: [""],
          facebook: "",
          zalo: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Reload dữ liệu chân trang từ database
  const reloadFooterData = async () => {
    try {
      const response = await fetch("/api/config?key=footer_data", {
        headers: {
          "Cache-Control": "no-cache", // Skip cache khi reload
        },
      });
      const data = await response.json();

      const newData = {
        mission: "",
        address: "",
        hotline: "",
        facebook: "",
        zalo: "",
        ...(data || {}),
        emails: data?.emails || [""],
        categories: data?.categories || [""],
      };

      setFooterData(newData);
      console.log("✅ Reloaded footer data from database");
    } catch (error) {
      console.error("Lỗi reload dữ liệu footer:", error);
      alert("❌ Lỗi khi tải lại dữ liệu");
    }
  };

  const saveFooter = async () => {
    setSaving(true);
    try {
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({ key: "footer_data", value: footerData }),
      });
      alert("✨ Chân trang đã lưu thành công!");
      clearDraft(); // Xóa draft sau khi save thành công
      setIsChanged(false);
    } catch (e) {
      alert("❌ Lỗi khi lưu dữ liệu!");
      console.error(e);
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
            Quản lý thông tin chung, liên hệ và mạng xã hội.
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
                  reloadFooterData(); // Reload từ database
                }
              }}
              className="px-4 py-3 rounded-xl text-sm font-bold transition-all flex gap-2 items-center bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 whitespace-nowrap shadow-sm"
              title="Hủy thay đổi chưa lưu"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden md:inline">Hủy Thay Đổi</span>
            </button>
          )}
          <button
            onClick={saveFooter}
            disabled={saving || !isChanged}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex gap-2 items-center shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap ${
              isChanged
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-[#16579e] text-white hover:bg-blue-800"
            } ${saving ? "animate-pulse" : ""}`}
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? "ĐANG LƯU..." : isChanged ? "LƯU THAY ĐỔI" : "ĐÃ LƯU"}
          </button>
        </div>
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
