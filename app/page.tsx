/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../prisma/prisma";
import HomePage from "./home_page";

export const dynamic = "force-dynamic";

// Hàm lấy dữ liệu trực tiếp từ Database (Tối ưu: 1 query thay vì 5)
async function getHomeData() {
  const configs = await prisma.siteConfig.findMany({
    where: {
      key: {
        in: [
          "home_hero",
          "home_services",
          "home_showcase",
          "home_process",
          "home_portfolio",
        ],
      },
    },
  });

  // Chuyển mảng thành object để dễ truy cập
  const configMap: { [key: string]: any } = {};
  configs.forEach((config) => {
    configMap[config.key] = config.value;
  });

  return {
    hero: configMap.home_hero || null,
    services: Array.isArray(configMap.home_services)
      ? configMap.home_services
      : [],
    showcase: Array.isArray(configMap.home_showcase)
      ? configMap.home_showcase
      : [],
    process: Array.isArray(configMap.home_process)
      ? configMap.home_process
      : [],
    portfolio: Array.isArray(configMap.home_portfolio)
      ? configMap.home_portfolio
      : [],
  };
}

export default async function Page() {
  // Lấy dữ liệu mới nhất từ Server
  const data = await getHomeData();

  // Truyền dữ liệu xuống cho Client (HomePage) hiển thị
  return <HomePage initialData={data} />;
}
