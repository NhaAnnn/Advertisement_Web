// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  // CHỈ bảo vệ trang admin, bỏ qua tất cả các tệp tĩnh và API
  matcher: ["/admin/:path*"],
};
