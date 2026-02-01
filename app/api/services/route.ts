/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma"; // Dùng bản singleton
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"; // Import
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import config

// GET: Công khai (Khách xem bài viết)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const service = await prisma.serviceContent.findUnique({
        where: { slug },
      });
      return NextResponse.json(service);
    } else {
      const services = await prisma.serviceContent.findMany({
        orderBy: [{ category: "asc" }, { createdAt: "desc" }],
      });
      return NextResponse.json(services);
    }
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

// POST: BẢO MẬT (Thêm/Sửa)
export async function POST(req: Request) {
  // 🔒 CHẶN NGƯỜI LẠ
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Cút ngay hacker! 😡" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, ...data } = body;

    const updated = await prisma.serviceContent.upsert({
      where: { slug },
      update: { ...data },
      create: { slug, ...data },
    });

    revalidatePath("/services");
    revalidatePath("/"); // Nếu có hiện ở trang chủ
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi lưu dữ liệu" }, { status: 500 });
  }
}

// DELETE: BẢO MẬT (Xóa)
export async function DELETE(req: Request) {
  // 🔒 CHẶN NGƯỜI LẠ
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    await prisma.serviceContent.delete({
      where: { slug },
    });
    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
