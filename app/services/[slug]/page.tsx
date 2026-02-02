import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/prisma"; // Import Prisma
import ServiceClient from "./service_page"; // Import giao diện vừa tạo

// SEO: Tạo Title và Description động cho từng bài viết
// Khi chia sẻ link lên Zalo/FB, người ta sẽ thấy ảnh và tiêu đề đúng.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // Next.js 15 yêu cầu await params
  const service = await prisma.serviceContent.findUnique({
    where: { slug: slug },
  });

  if (!service) return { title: "Không tìm thấy dịch vụ" };

  return {
    title: `${service.name} | Hoàng Thảo Anh`,
    description: service.excerpt || `Dịch vụ ${service.name} chuyên nghiệp...`,
  };
}

// SERVER COMPONENT CHÍNH
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Lấy chi tiết bài viết trực tiếp từ DB
  const serviceDetail = await prisma.serviceContent.findUnique({
    where: { slug: slug },
  });

  // Nếu không thấy -> Trả về trang 404 chuẩn của Next.js
  if (!serviceDetail) {
    notFound();
  }

  // 2. Lấy bài viết liên quan (Loại trừ bài hiện tại)
  // (Dùng take: 4 để lấy 4 bài)
  const relatedRaw = await prisma.serviceContent.findMany({
    where: {
      slug: { not: slug }, // Khác bài hiện tại
    },
    take: 4,
    orderBy: { createdAt: "desc" }, // Lấy bài mới nhất hoặc random tùy logic
    select: {
      name: true,
      slug: true,
      coverImage: true,
    },
  });

  // Chuẩn hóa dữ liệu related
  const relatedServices = relatedRaw.map((item) => ({
    name: item.name,
    slug: item.slug,
    image: item.coverImage,
  }));

  // 3. Truyền hết xuống Client để hiển thị
  return (
    <ServiceClient
      serviceDetail={serviceDetail}
      relatedServices={relatedServices}
    />
  );
}
