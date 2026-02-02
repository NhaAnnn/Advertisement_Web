/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, Check, Folder, CornerDownRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Component chọn danh mục đẹp
export function CategorySelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { id: string; name: string; level: number }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Tìm tên của mục đang chọn để hiển thị
  const selectedOption = options.find((o) => o.id === value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Nút bấm chính */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border p-3 rounded-xl bg-white transition-all text-sm ${
          isOpen
            ? "border-[#16579e] ring-2 ring-blue-100"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <span
          className={
            selectedOption ? "text-gray-800 font-bold" : "text-gray-400"
          }
        >
          {selectedOption ? selectedOption.name : "-- Chọn danh mục --"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Danh sách xổ xuống */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50 custom-scrollbar p-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
              className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                value === opt.id
                  ? "bg-blue-50 text-[#16579e]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              // Thụt lề dựa trên cấp độ (level)
              style={{ paddingLeft: `${(opt.level - 1) * 20 + 12}px` }}
            >
              {/* Logic hiển thị Icon phân cấp */}
              {opt.level === 1 ? (
                <Folder className="w-4 h-4 text-gray-400 group-hover:text-[#16579e]" />
              ) : (
                <CornerDownRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500" />
              )}

              <span className={opt.level === 1 ? "font-bold" : "font-medium"}>
                {opt.name}
              </span>

              {/* Dấu tích nếu đang chọn */}
              {value === opt.id && <Check className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
