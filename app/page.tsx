/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../prisma/prisma";
import HomePage from "./home_page";

export const dynamic = "force-dynamic";

// Hàm lấy dữ liệu trực tiếp từ Database
async function getHomeData() {
  const [hero, services, showcase, process, portfolio] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { key: "home_hero" } }),
    prisma.siteConfig.findUnique({ where: { key: "home_services" } }),
    prisma.siteConfig.findUnique({ where: { key: "home_showcase" } }),
    prisma.siteConfig.findUnique({ where: { key: "home_process" } }),
    prisma.siteConfig.findUnique({ where: { key: "home_portfolio" } }),
  ]);

  return {
    hero: hero?.value || null,
    services: (Array.isArray(services?.value) ? services?.value : []) as any[],
    showcase: (Array.isArray(showcase?.value) ? showcase?.value : []) as any[],
    process: (Array.isArray(process?.value) ? process?.value : []) as any[],
    portfolio: (Array.isArray(portfolio?.value)
      ? portfolio?.value
      : []) as any[],
  };
}

export default async function Page() {
  // Lấy dữ liệu mới nhất từ Server
  const data = await getHomeData();

  // Truyền dữ liệu xuống cho Client (HomePage) hiển thị
  return <HomePage initialData={data} />;
}
