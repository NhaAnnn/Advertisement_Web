/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const navigationStartedRef = useRef(false);

  // Start progress bar when navigation begins
  const startProgress = () => {
    navigationStartedRef.current = true;
    setIsVisible(true);
    setProgress(10);

    // Simulate gradual progress - chạy phù hợp với thời gian load thực tế
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 95) {
          // Tăng chậm, phù hợp với thời gian load:
          // Nếu load nhanh (2s): thanh chạy ~15%, pathname change -> 100%
          // Nếu load lâu (10s): thanh chạy ~70%, pathname change -> 100%
          let increment = 2.5; // 2.5% mỗi 1 giây
          if (prev >= 70) {
            increment = 1; // Chậm hơn ở cuối
          }
          return prev + increment;
        }
        return prev;
      });
    }, 1000); // Cập nhật mỗi 1 giây
  };

  // Detect link clicks BEFORE page loads
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Tránh lặp nếu đã bắt đầu load
      if (navigationStartedRef.current) return;

      const target = (e.target as any)?.closest("a");

      // Check if it's an internal link (not external, not javascript)
      if (target && target.href && !target.target) {
        const href = target.href;
        const currentUrl = window.location.href;

        // Only show progress for internal navigation
        if (href !== currentUrl && href.startsWith(window.location.origin)) {
          startProgress();
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  // Complete progress when route actually changes (pathname updates)
  useEffect(() => {
    // Chỉ hoàn thành nếu đã bắt đầu navigation
    if (navigationStartedRef.current) {
      // Page has loaded (pathname changed), complete the progress immediately
      if (intervalRef.current) clearInterval(intervalRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(100);

      // Fade out after completion
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
        navigationStartedRef.current = false;
      }, 500);
    }
  }, [pathname]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary z-[9999] shadow-lg transition-all duration-200 ease-out"
          style={{
            width: `${Math.min(progress, 100)}%`,
            opacity: progress === 100 ? 0 : 1,
          }}
        />
      )}

      {/* Glowing blur effect behind the bar */}
      {isVisible && progress > 0 && progress < 100 && (
        <div
          className="fixed top-0 left-0 h-[12px] bg-gradient-to-r from-primary/30 via-accent/20 to-transparent blur-md z-[9998] transition-all duration-200"
          style={{
            width: `${Math.min(progress + 15, 100)}%`,
          }}
        />
      )}
    </>
  );
}
