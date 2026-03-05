"use client";

import { useState } from "react";

import { Grid, Layers, Monitor, RefreshCcw, LogOut } from "lucide-react";

// Import MENU_TREE

import { signOut } from "next-auth/react";
import { HomeTabContent } from "./components/home_tab";
import { ServicesTabContent } from "./components/services_tab";
import { FooterTabContent } from "./components/footer_tab";

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
