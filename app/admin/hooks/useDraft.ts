/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

/**
 * Hook để quản lý draft (bản nháp) với localStorage
 * - Tự động lưu draft khi dữ liệu thay đổi (với debounce 1 giây)
 * - Restore draft từ localStorage khi key thay đổi
 * - Xóa draft sau khi save thành công
 */
export function useDraft<T>(
  key: string,
  data: T,
  onSetData: (newData: T) => void,
  isChanged: boolean,
) {
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isRestoringRef = useRef(false);

  // Restore draft khi key thay đổi (khi chuyển item khác)
  useEffect(() => {
    if (!key || isRestoringRef.current) return;

    isRestoringRef.current = true;
    try {
      const savedDraft = localStorage.getItem(`draft_${key}`);
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        // Chỉ restore nếu draft khác với data hiện tại
        if (JSON.stringify(parsedDraft) !== JSON.stringify(data)) {
          console.log(`✅ Restored draft for ${key}`);
          onSetData(parsedDraft);
        }
      }
    } catch (error) {
      console.error(`Failed to restore draft for ${key}:`, error);
    } finally {
      isRestoringRef.current = false;
    }
  }, [key]); // Chỉ restore khi key (id) thay đổi

  // Auto-save draft với debounce (mỗi 1 giây)
  useEffect(() => {
    if (!isChanged || !key) return;

    // Clear timer cũ
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set timer mới - save vào localStorage
    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(`draft_${key}`, JSON.stringify(data));
        console.log(`📝 Draft auto-saved for ${key}`);
      } catch (error) {
        console.error(`Failed to save draft for ${key}:`, error);
      }
    }, 1000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [key, data, isChanged]);

  // Clear draft sau khi save thành công (xóa khỏi localStorage)
  const clearDraft = () => {
    try {
      localStorage.removeItem(`draft_${key}`);
      console.log(`🗑️ Draft cleared for ${key}`);
    } catch (error) {
      console.error(`Failed to clear draft for ${key}:`, error);
    }
  };

  return { clearDraft };
}
