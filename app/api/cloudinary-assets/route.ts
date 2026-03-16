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

  console.log("📥 [Cloudinary] GET /api/cloudinary-assets - Query:", query, "MaxResults:", max_results);
  
  // Validate environment variables first
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  if (!cloudName) {
    console.error("❌ Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    return NextResponse.json(
      { success: false, error: "Cloud name not configured" },
      { status: 500 }
    );
  }
  if (!apiKey) {
    console.error("❌ Missing CLOUDINARY_API_KEY");
    return NextResponse.json(
      { success: false, error: "API key not configured" },
      { status: 500 }
    );
  }
  if (!apiSecret) {
    console.error("❌ Missing CLOUDINARY_API_SECRET");
    return NextResponse.json(
      { success: false, error: "API secret not configured" },
      { status: 500 }
    );
  }

  try {
    let resources = [];

    console.log("📡 Calling Cloudinary SDK...");
    
    if (!query.trim()) {
      // Dùng Admin API để lấy tất cả ảnh
      console.log("📋 Using Admin API (no search query)");
      const response = await cloudinary.api.resources({
        resource_type: "image",
        type: "upload",
        max_results: max_results,
      });
      resources = response.resources;
      console.log("✅ Admin API returned", resources.length, "resources");
    } else {
      // Dùng Search API khi có từ khóa
      console.log("🔍 Using Search API with query:", query);
      const result = await cloudinary.search
        .expression(`resource_type:image AND ${query}*`)
        .max_results(max_results)
        .sort_by("created_at", "desc")
        .execute();
      resources = result.resources;
      console.log("✅ Search API returned", resources.length, "resources");
    }

    // Chuẩn hóa dữ liệu trả về để Component frontend đọc được
    const assets = resources.map((item: any) => ({
      public_id: item.public_id,
      url: item.secure_url, // Dùng https để tránh lỗi bảo mật
      filename: item.filename || item.public_id.split("/").pop(),
    }));

    console.log("✅ Returning", assets.length, "normalized assets");
    return NextResponse.json({ success: true, assets });
  } catch (error: any) {
    console.error("❌ Cloudinary API Error:", error.message || error);
    console.error("Error details:", error);
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
