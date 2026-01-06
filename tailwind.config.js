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
        // CŨ: "noir": "#09090b",
        // MỚI: Nền chính sáng hơn một chút (Zinc-900)
        noir: "#18181b",

        // CŨ: "noir-light": "#18181b",
        // MỚI: Nền phụ sáng hơn nữa để tạo tương phản (Zinc-800)
        "noir-light": "#27272a",

        primary: "#f59e0b",
        primary_glow: "#fbbf24",
        // Giữ nguyên màu chữ sáng
        sand: "#fafafa",
        "sand-dim": "#a1a1aa",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "cursive"],
      },
      backgroundImage: {
        noise:
          "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
        "gold-gradient": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        marquee: "translateX 20s linear infinite",
      },
      keyframes: {
        translateX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
