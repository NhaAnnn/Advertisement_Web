/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //NHÓM NỀN
        background: "#ffffff", // Trắng tinh (Nền trang)
        surface: "#f8fafc", // Xám xanh rất nhạt (Nền khối/Section)
        "surface-dark": "#0f172a", // Màu tối (Dùng cho các khối đảo ngược màu)

        //NHÓM CHỮ
        foreground: "#05205f", // Xanh đen đậm (Chữ chính)
        foreground2: "#16579e", // Xanh đen nhạt hơn (Chữ phụ)
        muted: "#64748b", // Xám (Chữ phụ/Mô tả)
        on: {
          primary: "#ffffff", // Chữ trên nền Primary
          dark: "#f8fafc", // Chữ trên nền tối
        },

        //MÀU CHỦ ĐẠO
        primary: {
          DEFAULT: "#2563eb", // Blue-600 (Royal Blue)
          dark: "#1d4ed8", // Blue-700 (Hover state)
          light: "#60a5fa", // Blue-400 (Glow effect)
          10: "#eff6ff", // Blue-50 (Background tint)
        },

        //MÀU ĐIỂM NHẤN
        accent: {
          DEFAULT: "#f59e0b", // Amber-500 (Vàng Gold)
          glow: "#fbbf24", // Amber-400
        },

        //ĐƯỜNG VIỀN
        border: "#e2e8f0", // Slate-200
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "cursive"],
      },
      scale: {
        95: "0.95",
        98: "0.98",
      },
      backgroundImage: {
        noise: "url('data:image/svg+xml,...')", // (Giữ nguyên SVG cũ của bạn)
        // Gradient Xanh -> Vàng Gold (Sang trọng)
        "brand-gradient": "linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)",
        // Gradient Xanh Đậm
        "primary-gradient": "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        marquee: "translateX 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "bounce-soft": "bounce-soft 0.8s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "flip-in":
          "flip-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "bounce-in":
          "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        translateX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(37, 99, 235, 0.6)" },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "flip-in": {
          "0%": {
            opacity: "0",
            transform: "rotateY(90deg)",
          },
          "100%": {
            opacity: "1",
            transform: "rotateY(0)",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "bounce-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.3) translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
