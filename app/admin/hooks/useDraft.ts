/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export function useDraft<T extends { id?: string; slug?: string }>(
  key: string,
  data: T,
  onSetData: (newData: T) => void,
  isChanged: boolean,
) {
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isRestoringRef = useRef(false);
  const lastKeyRef = useRef(key);

  // 🛡️ CHỐNG NHẢY DỮ LIỆU: Clear timer ngay lập tức khi đổi bài
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      console.log(`🚫 Cancelled stale save for old key: ${lastKeyRef.current}`);
    }
    lastKeyRef.current = key;
  }, [key]);

  // Restore draft
  useEffect(() => {
    if (!key || isRestoringRef.current) return;

    // Logic restore giữ nguyên như của bạn...
    isRestoringRef.current = true;
    try {
      const savedDraft = localStorage.getItem(`draft_${key}`);
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        onSetData(parsedDraft);
      }
    } catch (error) {
      localStorage.removeItem(`draft_${key}`);
    } finally {
      isRestoringRef.current = false;
    }
  }, [key]);

  // Auto-save draft
  useEffect(() => {
    // Chỉ lưu nếu thực sự có thay đổi và key hiện tại khớp với data
    if (!isChanged || !key || (data.id && key !== `service_${data.id}`)) return;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(`draft_${key}`, JSON.stringify(data));
        console.log(`📝 Saved draft for ${key}`);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [key, data, isChanged]);

  const clearDraft = () => {
    localStorage.removeItem(`draft_${key}`);
  };

  return { clearDraft };
}
