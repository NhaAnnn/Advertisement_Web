// FILE: app/services/page.tsx

export const revalidate = 3600;

import { prisma } from "../../prisma/prisma";
import ServicesPageClient from "./services_page";

export default async function ServicesPage() {
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

  return <ServicesPageClient initialData={services || []} />;
}
