"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    // Mỗi khi chuyển trang, cuộn lên đầu
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
