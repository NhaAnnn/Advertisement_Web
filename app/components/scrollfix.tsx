'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Tắt tính năng tự nhớ vị trí cũ của trình duyệt (QUAN TRỌNG NHẤT)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Ép cuộn lên đầu ngay lập tức
    window.scrollTo(0, 0);
  }, [pathname]); // Chạy lại mỗi khi đổi trang

  return null; // Component này không hiển thị gì cả, chỉ chạy logic
}