/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET: Công khai
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

// POST: BẢO MẬT
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Cút ngay hacker! 😡" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, id, ...data } = body;

    // 🔍 VALIDATION: Ensure slug exists and is valid
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      console.error("❌ Invalid slug:", slug, "Body:", JSON.stringify(body));
      return NextResponse.json(
        { error: "Invalid slug - cannot update without slug" },
        { status: 400 },
      );
    }

    console.log("📝 [POST /api/services] Received:", {
      slug,
      id,
      name: data.name,
      category: data.category,
      galleryCount: data.gallery?.length,
      timestamp: new Date().toISOString(),
    });

    // Verify that slug+id match to prevent cross-article updates
    const existing = await prisma.serviceContent.findUnique({
      where: { slug },
    });

    if (existing && id && existing.id !== id) {
      console.error(
        "❌ CRITICAL: ID mismatch! Slug:",
        slug,
        "Existing ID:",
        existing.id,
        "Sent ID:",
        id,
      );
      return NextResponse.json(
        {
          error:
            "Data corruption detected: ID does not match slug. Please refresh and try again.",
        },
        { status: 409 },
      );
    }

    const updated = await prisma.serviceContent.upsert({
      where: { slug },
      update: { ...data },
      create: { slug, ...data },
    });

    console.log("✅ [POST /api/services] Updated:", {
      id: updated.id,
      slug: updated.slug,
      name: updated.name,
    });

    revalidatePath("/services/" + slug);
    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ [POST /api/services] Error:", error);
    return NextResponse.json(
      { error: "Lỗi lưu dữ liệu", details: String(error) },
      { status: 500 },
    );
  }
}

// DELETE: BẢO MẬT (Xóa)
export async function DELETE(req: Request) {
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
    revalidatePath("/services/" + slug);
    revalidatePath("/services");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
