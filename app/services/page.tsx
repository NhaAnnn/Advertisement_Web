// FILE: app/services/page.tsx

// Dòng này giúp Cache dữ liệu 1 tiếng (Tăng tốc độ)
export const revalidate = 3600;

import { prisma } from "../../prisma/prisma";
import ServicesClient from "./client"; // Import file Client ở trên

export default async function ServicesPage() {
  // Lấy dữ liệu từ Database
  const services = await prisma.serviceContent.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      excerpt: true,
      coverImage: true,
      features: true,
    },
  });

  // Truyền dữ liệu xuống Client Component
  // Nếu services bị null thì truyền mảng rỗng []
  return <ServicesClient initialData={services || []} />;
}
