 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Search, X, Loader2, ImageIcon, Check, Upload, AlertCircle } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

export function CloudinaryBrowser({ isOpen, onClose, onSelect }: any) {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !hasLoaded) {
      fetchAssets("");
      setHasLoaded(true);
    }
  }, [isOpen, hasLoaded]);

  const fetchAssets = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("📥 Fetching Cloudinary assets with query:", query);
      const response = await fetch(
        `/api/cloudinary-assets?query=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      console.log("📤 Response:", data);
      
      if (data.success) {
        console.log("✅ Loaded", data.assets.length, "assets from Cloudinary");
        setAssets(data.assets);
        setError(null);
      } else {
        console.error("❌ API returned error:", data.error);
        setError(data.error || "Không thể tải danh sách ảnh");
        setAssets([]);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("❌ Fetch error:", errorMsg);
      setError(errorMsg);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteImageFromCloudinary = async (publicId: string) => {
    if (!confirm("Xóa ảnh này từ Cloudinary?")) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      const data = await res.json();

      if (data.success) {
        // Xóa khỏi UI assets list
        setAssets((prev) => prev.filter((a) => a.public_id !== publicId));
        setSelectedAsset(null);
        alert("✅ Ảnh đã xóa từ Cloudinary");
      } else {
        alert(`❌ Lỗi: ${data.error || "Không thể xóa ảnh từ Cloudinary"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Lỗi kết nối");
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    // Reset hasLoaded để lần sau modal mở lại sẽ tải danh sách mới
    setHasLoaded(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800 font-serif">
            Thư viện Cloudinary
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-gray-50 border-b">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchAssets(searchQuery);
            }}
            className="flex gap-2"
          >
            <div className="flex-1 relative">
              <input
                className="w-full border border-gray-300 p-2.5 rounded-xl pl-10 focus:ring-2 ring-blue-500 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên ảnh..."
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            <button
              type="submit"
              className="px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm"
            >
              Tìm
            </button>
            <CldUploadButton
              uploadPreset="hoanganhthao-upload"
              options={{ multiple: true }}
              onSuccess={() => {
                // Chỉ hiển thị thông báo, không tự động load lại
                alert("✅ Tải lên thành công. Bấm Tìm hoặc F5 để xem ảnh mới.");
              }}
              className="px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all text-sm flex items-center gap-2"
            >
              <Upload size={16} />
              Upload
            </CldUploadButton>
          </form>
        </div>

        {/* Grid Ảnh */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <Loader2 className="animate-spin text-blue-600" size={32} />
              <p className="text-sm text-gray-500">Đang tải danh sách...</p>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <AlertCircle size={48} className="text-red-400" />
              <p className="font-bold text-red-600">Lỗi tải danh sách</p>
              <p className="text-sm text-gray-600 max-w-xs">{error}</p>
              <button
                onClick={() => fetchAssets(searchQuery)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700"
              >
                Thử lại
              </button>
            </div>
          ) : assets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <ImageIcon size={64} />
              <p className="font-bold">Trống</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {assets.map((asset) => (
                <div
                  key={asset.public_id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedAsset?.public_id === asset.public_id
                      ? "border-blue-600 ring-4 ring-blue-50"
                      : "border-gray-100 hover:border-blue-300"
                  }`}
                >
                  <Image
                    src={asset.url}
                    alt="asset"
                    fill
                    className="object-cover"
                    sizes="200px" // Cực quan trọng để tải ảnh nhanh
                  />
                  {selectedAsset?.public_id === asset.public_id && (
                    <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                      <div className="bg-blue-600 text-white rounded-full p-1">
                        <Check size={20} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center gap-3">
          <div className="flex gap-2">
            {selectedAsset && (
              <button
                disabled={deleting}
                onClick={() =>
                  deleteImageFromCloudinary(selectedAsset.public_id)
                }
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold disabled:opacity-50 shadow-lg active:scale-95 transition-all text-sm flex items-center gap-2"
              >
                {deleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>🗑️ Xóa ảnh</>
                )}
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 text-sm font-bold text-gray-500"
            >
              Hủy
            </button>
            <button
              disabled={!selectedAsset}
              onClick={() => {
                onSelect(selectedAsset.url);
                handleClose();
              }}
              className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              Sử dụng ảnh này
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
