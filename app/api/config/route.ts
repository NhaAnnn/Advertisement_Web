import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"; // 1. Import
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 2. Import config

// GET: Công khai (để hiển thị web cho khách)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json(null);

  const data = await prisma.siteConfig.findUnique({ where: { key } });
  return NextResponse.json(data ? data.value : null);
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
