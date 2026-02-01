// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Chỉ cho phép truy cập khi đã đăng nhập
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Cấu hình: Chỉ bảo vệ các route bắt đầu bằng /admin
export const config = { matcher: ["/admin/:path*"] };
