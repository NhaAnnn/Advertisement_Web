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

    // Simulate gradual progress
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 85) {
          return prev + Math.random() * 20;
        }
        return prev;
      });
    }, 400);
  };

  // Detect link clicks BEFORE page loads
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
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
    if (navigationStartedRef.current && isVisible) {
      // Page has loaded, complete the progress
      if (intervalRef.current) clearInterval(intervalRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(100);

      // Fade out
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
        navigationStartedRef.current = false;
      }, 400);
    }
  }, [pathname, isVisible]);

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
