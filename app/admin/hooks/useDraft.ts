/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

/**
 * Hook để quản lý draft (bản nháp) với localStorage
 * - Tự động lưu draft khi dữ liệu thay đổi (với debounce 1 giây)
 * - Restore draft từ localStorage khi key thay đổi
 * - Xóa draft sau khi save thành công
 * - Thêm validation để prevent cross-article data mix-up
 */
export function useDraft<T extends { id?: string; slug?: string }>(
  key: string,
  data: T,
  onSetData: (newData: T) => void,
  isChanged: boolean,
) {
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isRestoringRef = useRef(false);
  const lastKeyRef = useRef(key); // Track last key to detect changes

  // Restore draft khi key thay đổi (khi chuyển item khác)
  useEffect(() => {
    if (!key || isRestoringRef.current) return;

    // Only restore if key actually changed
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    isRestoringRef.current = true;
    try {
      const savedDraft = localStorage.getItem(`draft_${key}`);
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        console.log(`✅ Restored draft for ${key}`, {
          id: parsedDraft.id,
          slug: parsedDraft.slug,
          timestamp: new Date().toISOString(),
        });
        onSetData(parsedDraft);
      }
    } catch (error) {
      console.error(`Failed to restore draft for ${key}:`, error);
      // Clear corrupted draft
      try {
        localStorage.removeItem(`draft_${key}`);
        console.log(`🗑️ Removed corrupted draft for ${key}`);
      } catch (e) {
        console.error(`Failed to clear corrupted draft:`, e);
      }
    } finally {
      isRestoringRef.current = false;
    }
  }, [key]); // Trigger whenever key changes

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
        // ⚠️ VALIDATION: Ensure we're saving draft for correct key
        if (!data.id && !data.slug) {
          console.warn(
            `⚠️ [useDraft] Skipping save: data has no id or slug for key ${key}`,
            data,
          );
          return;
        }

        localStorage.setItem(`draft_${key}`, JSON.stringify(data));
        console.log(`📝 Draft auto-saved for ${key}`, {
          id: data.id,
          slug: data.slug,
          timestamp: new Date().toISOString(),
        });
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
