// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Cấu hình: Chỉ chạy middleware trên các route bắt đầu bằng /admin
export const config = { matcher: ["/admin/:path*"] };
