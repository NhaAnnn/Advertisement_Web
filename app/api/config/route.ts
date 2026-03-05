/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"; // 1. Import
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 2. Import config

// GET: Công khai (để hiển thị web cho khách)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const keys = searchParams.get("keys"); // keys=key1,key2,key3

  try {
    if (keys) {
      // Lấy multiple keys cùng lúc
      const keyList = keys.split(",").filter((k) => k.trim());
      const results = await prisma.siteConfig.findMany({
        where: { key: { in: keyList } },
      });
      const data: any = {};
      results.forEach((item) => {
        data[item.key] = item.value;
      });
      return NextResponse.json(data);
    } else if (key) {
      // Lấy 1 key
      const data = await prisma.siteConfig.findUnique({ where: { key } });
      return NextResponse.json(data ? data.value : null);
    }
    return NextResponse.json(null);
  } catch (error) {
    console.error("Config GET error:", error);
    return NextResponse.json({ error: "Lỗi lấy dữ liệu" }, { status: 500 });
  }
}

// POST: BẢO MẬT (Chỉ Admin mới được sửa)
export async function POST(req: Request) {
  // 3. Kiểm tra đăng nhập
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Không có quyền truy cập" },
      { status: 401 },
    );
  }

  try {
    const { key, value } = await req.json();
    const updated = await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi cập nhật config" }, { status: 500 });
  }
}
