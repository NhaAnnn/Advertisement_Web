import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // 1. Kiểm tra quyền truy cập (Bảo mật)
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Bạn không có quyền thực hiện thao tác này" },
        { status: 401 },
      );
    }

    // 2. Lấy dữ liệu từ body
    const { publicId } = await req.json();

    if (!publicId) {
      console.error("❌ Lỗi: Thiếu publicId để xóa ảnh");
      return NextResponse.json(
        { error: "Thiếu thông tin định danh ảnh (publicId)" },
        { status: 400 },
      );
    }

    console.log(`🗑️ Đang tiến hành xóa ảnh trên Cloudinary: ${publicId}`);

    // 3. Gọi lệnh xóa từ Cloudinary
    // Thêm invalidate: true để xóa ảnh khỏi bộ nhớ đệm CDN của Cloudinary ngay lập tức
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image", // Bạn có thể đổi thành "video" hoặc "raw" nếu cần
      invalidate: true,
    });

    console.log("✅ Kết quả xóa từ Cloudinary:", result);

    // Lưu ý: result.result có thể trả về 'not_found' nếu publicId sai,
    // nhưng lệnh destroy vẫn được coi là thực thi xong.
    if (result.result === "ok") {
      return NextResponse.json({
        success: true,
        message: "Ảnh đã được xóa vĩnh viễn",
        result,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Không tìm thấy ảnh hoặc ảnh đã bị xóa trước đó",
          result,
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("❌ Lỗi nghiêm trọng khi xóa ảnh:", error);
    return NextResponse.json(
      {
        error: "Lỗi hệ thống khi kết nối Cloudinary",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
