// app/data/home-content.ts

export const HERO_DATA = {
  est: "2025",
  title: {
    line1: "Nâng Tầm",
    line2: "Giá Trị",
    line3: "Thương Hiệu",
  },
  desc: "Không chỉ là in ấn. Chúng tôi kiến tạo những điểm chạm cảm xúc, nơi kỹ thuật đỉnh cao gặp gỡ nghệ thuật sắp đặt.",
  mainImage:
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
  floatingImage:
    "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=1000&auto=format&fit=crop",
};

export const SERVICES_HOME = [
  {
    title: "Bao Bì Luxury",
    desc: "Đẳng cấp thương hiệu được định hình ngay từ cái chạm đầu tiên. Giấy mỹ thuật cao cấp, ép kim tinh xảo.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000",
    tag: "Best Seller",
    link: "/services",
    size: "large", // col-span-5
  },
  {
    title: "Bộ Nhận Diện & Danh Thiếp",
    desc: "Đồng bộ hóa hình ảnh doanh nghiệp. Danh thiếp ép nhũ, giấy tiêu đề chuẩn màu Pantone.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000",
    link: "/product/card-premium", // Link tới trang chi tiết
    size: "medium", // col-span-7 horizontal
  },
  {
    title: "Brochure & Catalog",
    desc: "Đóng gáy nghệ thuật, màu sắc sống động.",
    image:
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1000",
    link: "/services",
    size: "small",
  },
  {
    title: "Poster & Quảng Cáo",
    desc: "Thu hút mọi ánh nhìn với khổ lớn sắc nét.",
    image:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000",
    link: "/services",
    size: "small",
  },
];

export const SHOWCASE_ITEMS = [
  {
    title: "Sự Kiện",
    sub: "Toàn Diện",
    desc: "Backdrop khổ lớn, Standee check-in, Hashtag cầm tay.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000",
    tag: "Trending",
    link: "/services",
  },
  {
    title: "Standee",
    sub: "Quảng Cáo",
    desc: "Standee cuốn nhôm, chữ X, mô hình die-cut.",
    image:
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=1000",
    tag: "Best Seller",
    link: "/services",
  },
  {
    title: "Poster",
    sub: "Nghệ Thuật",
    desc: "In Fine Art trên giấy Cotton, Canvas. Độ bền màu 100 năm.",
    image:
      "https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=1000",
    tag: "Premium",
    link: "/services",
  },
  {
    title: "Bao Bì",
    sub: "Độc Bản",
    desc: "Hộp cứng cao cấp, túi giấy ép kim.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000",
    tag: "Custom",
    link: "/services",
  },
];

export const PROCESS_HOME = [
  {
    id: "01",
    title: "Tư Vấn Chất Liệu",
    desc: "Khám phá kho tàng giấy mỹ thuật từ Ý, Nhật Bản, Anh Quốc. Cảm nhận kết cấu bề mặt và chọn lựa màu sắc phù hợp.",
  },
  {
    id: "02",
    title: "Chế Tác & Mockup",
    desc: "Hiện thực hóa ý tưởng trên bản mẫu thực tế. Kiểm tra kỹ thuật in, độ phủ mực và hiệu ứng bề mặt.",
  },
  {
    id: "03",
    title: "Hoàn Thiện Tinh Xảo",
    desc: "Gia công thủ công: bồi, bế, dán, ép kim. Kiểm tra chất lượng nghiêm ngặt (QC) từng chi tiết.",
  },
];

export const PORTFOLIO_HOME = [
  {
    type: "image",
    category: "Editorial",
    title: "Tạp chí Modz",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
  },
  {
    type: "quote",
    text: "Chất lượng in ấn tuyệt vời đã nâng tầm bộ nhận diện thương hiệu của chúng tôi lên một đẳng cấp mới.",
    author: "CEO, Zen Organic",
  },
  {
    type: "image",
    category: "Packaging",
    title: "Zen Organic",
    image:
      "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=1000",
  },
  {
    type: "card",
    category: "Branding",
    title: "TechCorp Brand",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000",
  },
  { type: "cta", title: "Muốn xem nhiều hơn?", link: "/services" },
];
