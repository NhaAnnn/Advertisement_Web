/* eslint-disable @typescript-eslint/no-explicit-any */
// app/data/services-content.ts

export const CATALOG_INFO = {
  title: "Bộ Sưu Tập",
  highlight: "Dịch Vụ In Ấn",
  desc: "Khám phá hệ sinh thái sản phẩm in ấn toàn diện. Từ bộ nhận diện văn phòng đến giải pháp bao bì và quảng cáo sáng tạo.",
  year: "2024"
};

export const CATEGORIES = [
  {
    id: "office", // ID này phải khớp với key trong ALL_PRODUCTS
    name: "Văn Phòng & Thương Hiệu",
    items: ["Danh thiếp (Namecard)", "Phong bì thư (Envelope)", "Kẹp file & Folder", "Giấy tiêu đề (Letterhead)"]
  },
  {
    id: "ads",
    name: "Ấn Phẩm Quảng Cáo",
    items: ["Brochure", "Flyer", "Poster", "Standee"]
  },
  {
    id: "packaging",
    name: "Bao Bì & Hộp Giấy",
    items: ["Hộp cứng", "Hộp mềm", "Túi giấy"]
  },
  // Thêm các category khác nếu cần...
];

export const MARQUEE_TEXT = [
  "Tư vấn 1:1", "Báo giá nhanh", "In test miễn phí", "Giao hàng toàn quốc", "Bảo hành màu sắc"
];

// --- DỮ LIỆU SẢN PHẨM (GỘP CHUNG) ---
export const ALL_PRODUCTS: Record<string, any[]> = {
  // 1. Dữ liệu cho Văn phòng (office)
  office: [
    {
      slug: "card-premium",
      name: "Danh Thiếp Cao Cấp",
      desc: "In trên giấy mỹ thuật nhập khẩu, ép kim logo sang trọng.",
      price: "250.000₫",
      unit: "/ hộp",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000",
      tag: "Best Seller"
    },
    {
      slug: "envelope-standard",
      name: "Phong Bì Thư",
      desc: "Đồng bộ nhận diện thương hiệu, keo dán nắp tự động.",
      price: "1.200₫",
      unit: "/ cái",
      image: "https://images.unsplash.com/photo-1596276228330-1925b6a7d77b?q=80&w=1000",
    },
    {
      slug: "folder-pro",
      name: "Kẹp File (Folder)",
      desc: "Folder đựng tài liệu chuyên nghiệp, có tay gấp danh thiếp.",
      price: "6.500₫",
      unit: "/ cái",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000",
    },
    {
      slug: "letterhead",
      name: "Giấy Tiêu Đề",
      desc: "Giấy Ford mịn, in offset sắc nét, chuẩn màu thương hiệu.",
      price: "850₫",
      unit: "/ tờ",
      image: "https://images.unsplash.com/photo-1585848261304-4639e6a0a036?q=80&w=1000",
    },
  ],

  // 2. Dữ liệu cho Quảng cáo (ads)
  ads: [
    {
      slug: "brochure-gap-3",
      name: "Brochure Gấp 3",
      desc: "Thiết kế nhỏ gọn, chứa đựng nhiều thông tin sản phẩm.",
      price: "1.500₫",
      unit: "/ tờ",
      image: "https://images.unsplash.com/photo-1629904853716-f00435b47803?q=80&w=800",
      tag: "Popular"
    },
    {
      slug: "standee-cuon",
      name: "Standee Cuốn Nhôm",
      desc: "Chân cuốn nhôm cao cấp, bạt PP không cong mép.",
      price: "350.000₫",
      unit: "/ cái",
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=1000",
    },
    {
      slug: "catalogue-a4",
      name: "Catalogue A4",
      desc: "Cuốn giới thiệu hồ sơ năng lực, đóng kim giữa hoặc keo gáy.",
      price: "15.000₫",
      unit: "/ cuốn",
      image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1000",
    },
  ],

  // 3. Dữ liệu cho Bao bì (packaging)
  packaging: [
    {
      slug: "hop-cung-nam-cham",
      name: "Hộp Cứng Nam Châm",
      desc: "Hộp quà tặng cao cấp, bồi giấy mỹ thuật, ép kim.",
      price: "45.000₫",
      unit: "/ hộp",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000",
      tag: "Premium"
    },
    {
      slug: "tui-giay-kraft",
      name: "Túi Giấy Kraft",
      desc: "Túi giấy bảo vệ môi trường, phong cách vintage.",
      price: "5.000₫",
      unit: "/ túi",
      image: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=1000",
    },
  ]
};