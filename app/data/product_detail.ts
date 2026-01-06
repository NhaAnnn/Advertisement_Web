// app/data/product-detail.ts

export const PRODUCT_DETAIL = {
  id: "card-premium",
  name: "Danh Thiếp Cao Cấp",
  tag: "Best Seller",
  basePrice: 250000, // Giá gốc 1 hộp
  unit: "hộp (100 cái)",
  shortDesc: "In offset chất lượng cao, giấy mỹ thuật nhập khẩu, gia công tinh xảo.",
  fullDesc: [
    "Danh thiếp (Name card) không chỉ là tờ giấy ghi thông tin liên lạc, nó là đại sứ thương hiệu đầu tiên gửi gắm đến khách hàng. Tại ArtPrint, chúng tôi nâng tầm danh thiếp thành một tác phẩm nghệ thuật.",
    "Sản phẩm <strong>Danh thiếp Cao cấp</strong> sử dụng dòng giấy Mỹ thuật nhập khẩu (Conqueror, Econo, Koehler) với định lượng từ 250gsm đến 350gsm, mang lại cảm giác cầm nắm chắc chắn và sang trọng. Công nghệ in Offset 4 màu đảm bảo độ sắc nét tuyệt đối."
  ],
  specs: [
    { label: "Kích thước chuẩn", value: "90x55mm hoặc 88x53mm." },
    { label: "Chất liệu", value: "Giấy Mỹ thuật, Giấy Kraft Nhật, Giấy nhựa trong suốt." },
    { label: "Gia công", value: "Cán màng mờ/bóng, bo góc, ép kim vàng/bạc/đồng." }
  ],
  images: [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", // Ảnh chính
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=1000&auto=format&fit=crop",
  ]
};

export const PRODUCT_OPTIONS = {
  materials: [
    { id: "couche", name: "Couche 300gsm", desc: "Láng mịn, bắt mực tốt", priceAdd: 0 },
    { id: "art", name: "Giấy Mỹ thuật", desc: "Sần nhẹ, sang trọng (+120k/hộp)", priceAdd: 120000 },
  ],
  effects: [
    { id: "none", name: "Cơ bản", priceAdd: 0 },
    { id: "foil", name: "Ép kim Logo", priceAdd: 50000 },
    { id: "uv", name: "Phủ UV", priceAdd: 30000 },
  ]
};

export const PRICING_TABLE = [
  { qty: "2 Hộp", price: "140.000", total: "280.000", time: "Lấy ngay", highlight: true },
  { qty: "5 Hộp", price: "90.000", total: "450.000", time: "2-3 ngày", highlight: false },
  { qty: "10 Hộp", price: "65.000", total: "650.000", time: "2-3 ngày", highlight: false },
  { qty: "20 Hộp", price: "45.000", total: "900.000", time: "3-4 ngày", highlight: false },
];

export const REVIEWS = [
  { name: "Hoàng Minh", role: "CEO, TechStart", rating: 5, content: "Chất lượng in ấn tuyệt vời. Màu sắc lên giấy mỹ thuật rất chuẩn, ép kim sắc nét không bị lem.", avatar: "H" },
  { name: "Linh Đan", role: "Marketing Manager", rating: 5, content: "Dịch vụ tư vấn rất nhiệt tình. Mình in số lượng ít nhưng vẫn được hỗ trợ thiết kế tận tâm.", avatar: "L" },
  { name: "Trần Quốc", role: "Designer", rating: 4.5, content: "Giấy đẹp, cầm rất thích tay. Giá có hơi cao so với mặt bằng chung một chút nhưng chất lượng thì hoàn toàn xứng đáng.", avatar: "T" },
];

export const WORKFLOW = [
  { icon: "cart", title: "1. Đặt hàng", desc: "Chọn quy cách, số lượng và đặt hàng trực tiếp trên website." },
  { icon: "upload", title: "2. Gửi File / Thiết kế", desc: "Upload file in ấn hoặc làm việc với designer để chốt mẫu." },
  { icon: "print", title: "3. Tiến hành in", desc: "Duyệt mẫu test màu (nếu cần) và tiến hành sản xuất hàng loạt." },
  { icon: "truck", title: "4. Giao hàng", desc: "Kiểm tra chất lượng KCS, đóng gói cẩn thận và giao tận nơi." },
];