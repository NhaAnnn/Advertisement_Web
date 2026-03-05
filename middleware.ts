// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    /*
     * Khớp tất cả các đường dẫn yêu cầu TRỪ các đường dẫn bắt đầu bằng:
     * - api (route API)
     * - _next/static (tệp tĩnh như JS, CSS)
     * - _next/image (tệp tối ưu hóa hình ảnh)
     * - favicon.ico (biểu tượng trang web)
     * - Các tệp có đuôi mở rộng (ví dụ: .svg, .png, .jpg, .js, .css)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
