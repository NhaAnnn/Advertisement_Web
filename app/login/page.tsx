"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 1. Thêm state quản lý ẩn/hiện
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("❌ Sai tài khoản hoặc mật khẩu!");
      setLoading(false);
    } else {
      router.push("/admin/settings");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-50 text-[#16579e] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-sm text-gray-500">Đăng nhập để quản lý hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg outline-none focus:border-[#16579e] focus:ring-1 ring-[#16579e] transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          {/* Password Input (Có nút con mắt) */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <input
                // 2. Chuyển đổi type giữa 'text' và 'password'
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg outline-none focus:border-[#16579e] focus:ring-1 ring-[#16579e] transition-all pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              {/* 3. Nút bấm ẩn/hiện */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#16579e] text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-6 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Đăng Nhập"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
