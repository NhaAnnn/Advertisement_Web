/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const max_results = parseInt(searchParams.get("max_results") || "60");

  try {
    let resources = [];

    if (!query.trim()) {
      // Dùng Admin API để lấy tất cả ảnh - Tốc độ nhanh và ổn định nhất
      const response = await cloudinary.api.resources({
        resource_type: "image",
        type: "upload",
        max_results: max_results,
      });
      resources = response.resources;
    } else {
      // Dùng Search API khi có từ khóa (Lưu ý: Phải bật Search API trong Cloudinary Settings)
      const result = await cloudinary.search
        .expression(`resource_type:image AND ${query}*`)
        .max_results(max_results)
        .sort_by("created_at", "desc")
        .execute();
      resources = result.resources;
    }

    // Chuẩn hóa dữ liệu trả về để Component frontend đọc được
    const assets = resources.map((item: any) => ({
      public_id: item.public_id,
      url: item.secure_url, // Dùng https để tránh lỗi bảo mật
      filename: item.filename || item.public_id.split("/").pop(),
    }));

    return NextResponse.json({ success: true, assets });
  } catch (error: any) {
    console.error("Cloudinary API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Không thể kết nối với Cloudinary. Hãy kiểm tra lại API Key/Secret.",
      },
      { status: 500 },
    );
  }
}
