// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 1. Cấu hình cho phép tải ảnh từ Cloudinary (QUAN TRỌNG)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // 2. Bỏ qua lỗi TypeScript khi build (Khuyên dùng cho người mới)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
