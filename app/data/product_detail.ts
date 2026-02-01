// app/data/product_detail.ts

export interface ServiceDetailType {
  id: string;
  name: string;
  category: string;
  coverImage: string;
  excerpt: string;
  contentSections: { title: string; content: string[]; image?: string }[];
  specs: { label: string; value: string }[];
  gallery: string[];
  faq: { q: string; a: string }[];
}

// Hàm tạo slug (KHỚP HOÀN TOÀN VỚI MENU)
const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/\//g, "")
    .replace(/,/g, "")
    .replace(/đ/g, "d")
    .replace(/--/g, "-")
    .replace(/"/g, ""); // Xử lý thêm dấu ngoặc kép nếu có

// Nội dung mặc định (Fallback)
const DEFAULT_CONTENT = {
  contentSections: [
    {
      title: "Dịch vụ chuyên nghiệp",
      content: [
        "Chúng tôi cung cấp giải pháp toàn diện từ tư vấn, thiết kế đến thi công hoàn thiện. Cam kết mang lại sản phẩm chất lượng cao nhất với chi phí tối ưu cho doanh nghiệp của bạn.",
        "Liên hệ ngay với chúng tôi qua Hotline hoặc Zalo để được tư vấn chi tiết về quy cách và báo giá chính xác nhất cho hạng mục này.",
      ],
    },
  ],
  specs: [{ label: "Liên hệ", value: "Hotline/Zalo" }],
  faq: [{ q: "Thời gian thực hiện?", a: "Tùy thuộc vào khối lượng đơn hàng." }],
};

// --- KHO DỮ LIỆU CHI TIẾT (FULL 100% MENU) ---
const SERVICE_DB: Record<string, ServiceDetailType> = {
  // // =========================================================
  // // 1. NHÓM IN HIFLEX
  // // =========================================================
  // [toSlug("In billloard")]: {
  //   id: "in-billboard",
  //   name: "In Billboard & Pano Quảng Cáo Tấm Lớn",
  //   category: "In Ấn Ngoài Trời",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200",
  //   excerpt:
  //     "Giải pháp in ấn chuyên dụng cho các bảng quảng cáo khổng lồ ngoài trời (OOH). Bạt Hiflex siêu dày, mực dầu kháng UV công nghệ Nhật Bản, thách thức mọi điều kiện thời tiết khắc nghiệt.",
  //   contentSections: [
  //     {
  //       title: "Tại sao Billboard lại quan trọng với thương hiệu?",
  //       content: [
  //         "Billboard (Biển quảng cáo tầm cao) là 'vũ khí hạng nặng' trong các chiến dịch Branding. Với kích thước khổng lồ và vị trí đắc địa, nó ép buộc người đi đường phải chú ý. Tuy nhiên, một tấm biển in nhòe, màu sắc nhợt nhạt sẽ phản tác dụng, làm giảm giá trị thương hiệu.",
  //         "Chúng tôi sử dụng máy in phun kỹ thuật số khổ lớn 3.2m đầu phun Seiko (Nhật Bản), đảm bảo bản in mịn màng, độ phủ màu đồng đều tuyệt đối. Màu đỏ rực rỡ, màu đen sâu thẳm - giúp thông điệp của bạn nổi bật giữa bầu trời.",
  //       ],
  //       image:
  //         "https://images.unsplash.com/photo-1598520106230-071a209b7343?q=80&w=1000",
  //     },
  //     {
  //       title: "Kỹ thuật xử lý bạt khổ lớn chuyên nghiệp",
  //       content: [
  //         "Với các tấm Pano lên đến hàng trăm mét vuông, việc ghép nối bạt là không thể tránh khỏi. Sự khác biệt nằm ở kỹ thuật.",
  //         "Chúng tôi sử dụng công nghệ hàn bạt tần số cao, tạo ra các mối nối siêu bền, phẳng phiu và gần như vô hình khi nhìn từ khoảng cách trên 5m. Bạt sử dụng là loại Hiflex Đế Xám (Grey back) dày 3.8zem giúp cản ánh sáng mặt trời xuyên qua, giữ hình ảnh luôn sắc nét, không bị lộ khung sắt phía sau khi nắng chiếu ngược.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "Hiflex Đế Xám 3.8zem (Cản sáng)" },
  //     { label: "Mực in", value: "Solvent Outdoor (Kháng nước, kháng UV)" },
  //     { label: "Độ bền màu", value: "Cam kết 12 - 24 tháng ngoài trời" },
  //     { label: "Gia công", value: "Biên lỗ, đóng khoen, xỏ cây, nối bạt" },
  //   ],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1558448777-626a44522737?q=80&w=1000",
  //   ],
  //   faq: [
  //     {
  //       q: "Khổ in lớn nhất là bao nhiêu?",
  //       a: "Khổ in liền mạch là 3.2m chiều ngang. Lớn hơn sẽ dùng kỹ thuật nối bạt chuyên dụng.",
  //     },
  //     {
  //       q: "Có hỗ trợ thi công treo lắp không?",
  //       a: "Có. Chúng tôi có đội ngũ thi công chuyên nghiệp, trang bị đầy đủ bảo hộ, xe cẩu để thi công các vị trí cao, khó.",
  //     },
  //   ],
  // },
  // [toSlug("In hop den")]: {
  //   id: "in-hop-den",
  //   name: "In Bạt Hộp Đèn Xuyên Sáng (Công Nghệ Double Strike)",
  //   category: "In Ấn Quảng Cáo",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1567425143376-749e79872584?q=80&w=1200",
  //   excerpt:
  //     "Đánh thức thương hiệu vào ban đêm với công nghệ in xuyên sáng kép. Đảm bảo hộp đèn rực rỡ, màu đen sâu thẳm và không bị bệt màu hay nhợt nhạt khi lên đèn.",
  //   contentSections: [
  //     {
  //       title: "Vấn đề của các hộp đèn kém chất lượng",
  //       content: [
  //         "Bạn đã bao giờ thấy những hộp đèn ban ngày thì đẹp, nhưng ban đêm bật đèn lên thì màu sắc bị 'bay' mất, trở nên trắng bệt và thiếu sức sống? Đó là do kỹ thuật in thông thường không đủ mật độ mực để cản ánh sáng đèn LED cực mạnh từ bên trong.",
  //         "Giải pháp của chúng tôi: Công nghệ in Double Strike (Phun mực 2 lần). Chúng tôi tăng mật độ mực lên 200% tại các vùng tối, đảm bảo độ tương phản cực cao. Màu đen sẽ đen tuyền, màu đỏ sẽ rực lửa ngay cả khi đèn sáng hết công suất.",
  //       ],
  //       image:
  //         "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "Hiflex xuyên sáng loại 1 / Bạt không gân" },
  //     { label: "Chế độ in", value: "In đậm (Double Density)" },
  //     { label: "Độ xuyên sáng", value: "90% - Ánh sáng tỏa đều mịn" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In backdrop")]: {
  //   id: "in-backdrop",
  //   name: "In Backdrop Sự Kiện - Sân Khấu - Hội Nghị",
  //   category: "Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200",
  //   excerpt:
  //     "Dịch vụ in phông nền backdrop thần tốc, lấy ngay trong ngày. Bạt dày phẳng phiu, in sắc nét, hỗ trợ thiết kế và thi công khung sắt trọn gói tại địa điểm tổ chức.",
  //   contentSections: [
  //     {
  //       title: "Tốc độ là yếu tố sống còn",
  //       content: [
  //         "Trong tổ chức sự kiện, deadline là bất di bất dịch. Hiểu được điều đó, xưởng in của chúng tôi hoạt động 24/7 để đáp ứng các đơn hàng backdrop gấp.",
  //         "Chỉ cần gửi file, chúng tôi có thể in xong và giao hàng trong vòng 2-4 tiếng. Đối với các sự kiện lớn, chúng tôi có đội ngũ thi công bắn khung sắt, căng bạt phẳng lì, không nếp gấp, đảm bảo hình ảnh check-in đẹp nhất cho khách mời.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Vật liệu", value: "Hiflex đế xám (Chống lộ khung xương)" },
  //     { label: "Thi công", value: "Bắn khung sắt vuông 25mm mạ kẽm" },
  //     { label: "Thời gian", value: "In lấy liền - Thi công 24/7" },
  //   ],
  //   gallery: [],
  //   faq: [
  //     {
  //       q: "Giá in backdrop bao nhiêu?",
  //       a: "Giá in từ 30.000đ/m2. Nếu bao gồm thi công khung sắt, giá trọn gói từ 180.000đ/m2 tùy kích thước.",
  //     },
  //   ],
  // },
  // [toSlug("In bang ron")]: {
  //   id: "in-bang-ron",
  //   name: "In Băng Rôn Cổ Động, Khuyến Mãi",
  //   category: "Quảng Cáo",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?q=80&w=1200",
  //   excerpt:
  //     "Giải pháp quảng cáo đường phố hiệu quả nhất với chi phí thấp nhất. In băng rôn số lượng lớn, giá rẻ, hỗ trợ gia công hoàn thiện.",
  //   contentSections: [
  //     {
  //       title: "Quảng cáo giá rẻ - Hiệu quả cao",
  //       content: [
  //         "Băng rôn là cách nhanh nhất để thông báo khai trương, giảm giá đến cư dân địa phương. Chúng tôi in trên bạt Hiflex 3.2zem dẻo dai, mực in tươi sáng chịu được nắng mưa.",
  //         "Nhận in số lượng lớn cho các chuỗi cửa hàng, ngân hàng, siêu thị điện máy với mức giá ưu đãi tận xưởng.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Kích thước phổ biến", value: "0.8x2.4m, 1x5m, 1x8m" },
  //     { label: "Gia công", value: "Dán biên, xỏ cây, đóng khoen" },
  //     { label: "Giá thành", value: "Cạnh tranh nhất thị trường" },
  //   ],
  //   gallery: [],
  //   faq: [
  //     {
  //       q: "Có treo băng rôn trọn gói không?",
  //       a: "Có, xem thêm ở mục Dịch vụ Treo Băng Rôn của chúng tôi.",
  //     },
  //   ],
  // },
  // [toSlug("In pano")]: {
  //   id: "in-pano",
  //   name: "In Pano Ốp Tường Khổ Lớn",
  //   category: "In Ấn Ngoài Trời",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1558448777-626a44522737?q=80&w=1200",
  //   excerpt:
  //     "Chuyên in ấn và thay bạt cho các khung Pano ốp tường tòa nhà. Kỹ thuật in và thi công trên cao chuyên nghiệp, đảm bảo an toàn và thẩm mỹ.",
  //   contentSections: [
  //     {
  //       title: "Giải pháp cho mặt tiền lớn",
  //       content: [
  //         "Pano ốp tường tận dụng khoảng trống bên hông các tòa nhà cao tầng. Chúng tôi sử dụng bạt Hiflex loại dày nhất để chịu được sức gió trên cao. Đội ngũ thi công chuyên nghiệp đảm bảo căng bạt phẳng đẹp trên độ cao lớn.",
  //         "Mực in sử dụng là loại mực dầu cao cấp, đảm bảo không bị bay màu nhanh chóng dưới ánh nắng trực tiếp của mặt trời.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Độ dày bạt", value: "3.8zem - 4.2zem" },
  //     { label: "Bảo hành màu", value: "1 - 2 năm" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // // =========================================================
  // // 2. NHÓM IN DECAL - PP
  // // =========================================================
  // [toSlug("In decal luoi dan kinh")]: {
  //   id: "decal-luoi",
  //   name: "In Decal Lưới Dán Kính (Vision Film)",
  //   category: "In Decal",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
  //   excerpt:
  //     "Giải pháp dán kính '2 trong 1' thông minh: Mặt ngoài hiển thị quảng cáo sắc nét, mặt trong nhìn ra đường thoáng đãng như đeo kính râm. Cản nhiệt, chống chói hiệu quả.",
  //   contentSections: [
  //     {
  //       title: "Công nghệ lỗ thoáng khí độc đáo",
  //       content: [
  //         "Decal lưới có bề mặt chứa hàng ngàn lỗ nhỏ li ti. Cấu trúc này tạo ra hiệu ứng thị giác đặc biệt: Người bên ngoài nhìn vào sẽ thấy hình ảnh quảng cáo liền mạch, trong khi người bên trong nhìn ra lại thấy thoáng đãng, không bị che khuất tầm nhìn.",
  //         "Ngoài tác dụng quảng cáo, lớp decal này còn hoạt động như một tấm rèm che nắng, giúp giảm nhiệt độ trong văn phòng và cắt tia UV gây hại. Đây là lựa chọn số 1 cho các Showroom mặt tiền kính, tòa nhà văn phòng và dán quảng cáo trên kính xe bus.",
  //       ],
  //       image:
  //         "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000",
  //     },
  //   ],
  //   specs: [
  //     { label: "Loại Decal", value: "Decal lưới đế đen (Black back)" },
  //     { label: "Độ bền", value: "12 - 18 tháng ngoài trời" },
  //     { label: "Ứng dụng", value: "Dán kính tòa nhà, cửa ra vào, kính xe hơi" },
  //   ],
  //   gallery: [],
  //   faq: [
  //     {
  //       q: "Buổi tối bên ngoài có thấy bên trong không?",
  //       a: "Có. Theo nguyên lý ánh sáng, hiệu ứng 'nhìn một chiều' chỉ hoạt động khi bên ngoài sáng hơn bên trong. Buổi tối nếu trong nhà bật đèn, hiệu ứng sẽ bị đảo ngược.",
  //     },
  //   ],
  // },
  // [toSlug("In poster")]: {
  //   id: "in-poster",
  //   name: "In Poster Quảng Cáo Sắc Nét",
  //   category: "In KTS",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1572911166660-f463327d4cdd?q=80&w=1200",
  //   excerpt:
  //     "In poster dán tường, lồng khung kính trên chất liệu PP hoặc Decal. Độ phân giải 1440dpi cho hình ảnh mịn màng như ảnh chụp.",
  //   contentSections: [
  //     {
  //       title: "Hình ảnh trung thực",
  //       content: [
  //         "Một tấm poster đẹp có sức mạnh bằng ngàn lời nói. Chúng tôi sử dụng máy in đầu phun DX5 siêu mịn, tái tạo chi tiết hình ảnh chân thực. Poster được cán màng bảo vệ (Bóng/Mờ) giúp chống thấm nước, chống bay màu và tăng độ sang trọng cho ấn phẩm.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "PP có keo / Decal sữa" },
  //     { label: "Gia công", value: "Cán màng Bóng/Mờ, Cắt sát hình" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In POSM")]: {
  //   id: "in-posm",
  //   name: "Sản Xuất Vật Phẩm POSM Trưng Bày",
  //   category: "Marketing",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1622676059530-9b37803a0889?q=80&w=1200",
  //   excerpt:
  //     "Wobbler, Hanger, Shelf Talker, Dangler... Thiết kế sáng tạo, bế hình độc đáo giúp sản phẩm nổi bật ngay tại kệ hàng.",
  //   contentSections: [
  //     {
  //       title: "Nổi bật tại điểm bán",
  //       content: [
  //         "Trong siêu thị, sản phẩm của bạn chỉ có 3 giây để gây chú ý. POSM là 'người bán hàng thầm lặng'. Chúng tôi sản xuất POSM trên nhựa PVC, giấy bồi hoặc Formex với các hình dáng bế theo thiết kế sáng tạo, giúp thương hiệu bạn tỏa sáng giữa rừng đối thủ.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Sản phẩm", value: "Wobbler lò xo, Hanger dây nhựa..." },
  //     { label: "Chất liệu", value: "Giấy C300, Nhựa, Formex" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In PP Standee")]: {
  //   id: "pp-standee",
  //   name: "In PP Poster & Cung Cấp Standee Trưng Bày",
  //   category: "POSM & Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200",
  //   excerpt:
  //     "Sử dụng chất liệu PP (Paper Plastic) cho độ mịn và sắc nét cao nhất trong in khổ lớn. Combo in ấn và cung cấp chân standee chữ X, cuốn nhôm giá tốt.",
  //   contentSections: [
  //     {
  //       title: "Tại sao nên chọn in PP cho Standee?",
  //       content: [
  //         "So với bạt Hiflex giá rẻ có sớ vải thô, PP là vật liệu cao cấp hơn hẳn với bề mặt láng mịn như giấy ảnh. Điều này giúp tái tạo hình ảnh sản phẩm, text nhỏ cực kỳ sắc nét và trung thực.",
  //         "Sau khi in, PP được cán một lớp màng bảo vệ (Màng bóng tạo độ rực rỡ hoặc Màng mờ tạo sự sang trọng, không bị chói đèn). Chúng tôi gia công đóng khoen ô rê (cho standee X) hoặc chừa biên (cho standee cuốn) chuẩn kích thước, giúp việc lắp đặt dễ dàng, tấm in căng phẳng đẹp mắt.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "PP không keo (Paper Plastic)" },
  //     { label: "Kích thước X", value: "60x160cm, 80x180cm" },
  //     { label: "Kích thước Cuốn", value: "60x160cm, 80x200cm" },
  //     { label: "Gia công", value: "Cán màng, Đóng khoen / Chừa biên" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In PP can format")]: {
  //   id: "pp-format",
  //   name: "In PP Bồi Formex (Format) Tạo Hình",
  //   category: "Gia Công Quảng Cáo",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
  //   excerpt:
  //     "Kỹ thuật cán PP lên tấm formex cứng cáp, sau đó cắt CNC theo biên dạng bất kỳ. Tạo ra các mô hình nhân vật, hashtag cầm tay, bảng trao giải ấn tượng.",
  //   contentSections: [
  //     {
  //       title: "Biến hình ảnh 2D thành mô hình 3D",
  //       content: [
  //         "PP bồi Formex là giải pháp tuyệt vời để tạo ra các vật phẩm quảng cáo dựng đứng (Standee mô hình). Formex là tấm nhựa xốp nhẹ nhưng cứng cáp, không thấm nước.",
  //         "Quy trình của chúng tôi: In PP sắc nét -> Cán lên tấm Formex (độ dày 2mm - 10mm) -> Chạy qua máy cắt CNC để cắt theo đường viền phức tạp của hình ảnh -> Gắn chân chống xếp gọn. Sản phẩm cuối cùng vừa nhẹ, bền, vừa sinh động, thu hút sự chú ý hơn hẳn các poster phẳng thông thường.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Độ dày Formex", value: "2mm, 3mm, 5mm (phổ biến), 10mm" },
  //     { label: "Gia công", value: "Cắt CNC / Laser theo file thiết kế" },
  //     { label: "Phụ kiện", value: "Chân chống sắt / Giấy xếp gọn" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In Canvas")]: {
  //   id: "in-canvas",
  //   name: "In Tranh Canvas Vải Bố Nghệ Thuật",
  //   category: "Trang Trí",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200",
  //   excerpt:
  //     "In trên vải bố canvas chuyên dụng, mực thấm vào sớ vải tạo hiệu ứng nghệ thuật như tranh vẽ sơn dầu. Bền màu, sang trọng, thích hợp trang trí nội thất.",
  //   contentSections: [
  //     {
  //       title: "Mang nghệ thuật vào không gian",
  //       content: [
  //         "Tranh canvas in mực dầu hoặc mực UV có độ bền cao, kháng nước, dễ dàng lau chùi. Thích hợp trang trí phòng khách, quán cafe, văn phòng. Chúng tôi nhận in và căng khung gỗ hoàn thiện, sẵn sàng treo.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Mực in", value: "Mực dầu / Mực UV Mỹ" },
  //     { label: "Khung tranh", value: "Khung gỗ thông / Composite" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In Backlit flim")]: {
  //   id: "in-backlit",
  //   name: "In Backlit Film Hộp Đèn Siêu Mỏng",
  //   category: "Hộp Đèn",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
  //   excerpt:
  //     "Chất liệu film nhựa cứng cao cấp, độ xuyên sáng và dẫn sáng cực tốt. Chuyên dùng cho các hộp đèn menu siêu mỏng, tranh điện tại rạp phim.",
  //   contentSections: [
  //     {
  //       title: "Đẳng cấp hình ảnh",
  //       content: [
  //         "Backlit Film cho chất lượng hình ảnh sắc nét và độ tương phản cao nhất trong các vật liệu xuyên sáng. Khi lên đèn, hình ảnh có độ sâu và rực rỡ, tạo cảm giác sang trọng.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "Film nhựa PET cứng" },
  //     { label: "Gia công", value: "Cán màng ngược / Cán keo mặt trước" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In vai silk")]: {
  //   id: "in-silk",
  //   name: "In Tranh Vải Silk Lụa Cao Cấp",
  //   category: "In Vải",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1578320339912-793574737d97?q=80&w=1200",
  //   excerpt:
  //     "Vải silk có độ rũ, mềm mại, bóng nhẹ. Thích hợp in tranh thờ, câu đối, cờ phướn, dải băng đeo chéo hoa hậu.",
  //   contentSections: [
  //     {
  //       title: "Vẻ đẹp truyền thống",
  //       content: [
  //         "Khác với canvas thô mộc, vải silk mang lại cảm giác mềm mại, sang trọng. Sản phẩm in ra có độ bóng nhẹ, màu sắc tươi sáng, rất phù hợp cho các ấn phẩm mang tính trang trọng hoặc tâm linh như tranh Phật, cờ lưu niệm, băng rôn cổ vũ.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Khổ in", value: "0.9m, 1.27m, 1.5m" },
  //     { label: "Ứng dụng", value: "Tranh liễn, Cờ lưu niệm, Băng đeo" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In hashtag cam tay")]: {
  //   id: "in-hashtag",
  //   name: "Làm Hashtag Cầm Tay Chụp Hình",
  //   category: "Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1531256379416-9f000e90aacc?q=80&w=1200",
  //   excerpt:
  //     "Phụ kiện chụp ảnh sự kiện vui nhộn. Hashtag cắt CNC hình dáng độc đáo, cán tay cầm chắc chắn, nội dung bắt trend.",
  //   contentSections: [
  //     {
  //       title: "Khuấy động không khí",
  //       content: [
  //         "Những chiếc bảng cầm tay (Hashtag) giúp bức ảnh check-in thêm sinh động và lan tỏa thông điệp sự kiện trên mạng xã hội. Chúng tôi hỗ trợ thiết kế theo yêu cầu, cắt hình dáng bất kỳ, từ đám cưới đến hội nghị chuyên nghiệp.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "PP bồi Formex 5mm" },
  //     { label: "Tay cầm", value: "Cán liền hoặc Cán rời" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // // =========================================================
  // // 3. NHÓM IN OFFSET
  // // =========================================================
  // [toSlug("In Sticker tem nhan")]: {
  //   id: "in-sticker",
  //   name: "In Tem Nhãn, Sticker Decal",
  //   category: "Nhãn Mác",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1616941842754-d021c70e28e6?q=80&w=1200",
  //   excerpt:
  //     "In tem nhãn decal giấy, decal nhựa, decal trong. Bế demi thành phẩm, chỉ cần lột dán. Sắc nét, bền màu, nâng tầm sản phẩm.",
  //   contentSections: [
  //     {
  //       title: "Chi tiết nhỏ - Giá trị lớn",
  //       content: [
  //         "Tem nhãn đẹp giúp sản phẩm nổi bật trên kệ hàng. Chúng tôi cung cấp đa dạng chất liệu: Decal giấy (giá rẻ), Decal nhựa (chống nước), Decal bạc (sang trọng). Công nghệ bế demi chính xác giúp việc dán nhãn nhanh chóng và chuyên nghiệp.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Chất liệu", value: "Decal Giấy / Nhựa / Trong / Bạc" },
  //     { label: "Gia công", value: "Cán màng, Bế demi, Ép kim" },
  //   ],
  //   gallery: [],
  //   faq: [
  //     {
  //       q: "Số lượng ít có in không?",
  //       a: "Có, chúng tôi nhận in số lượng ít (từ 100 cái) bằng máy KTS chất lượng cao.",
  //     },
  //   ],
  // },
  // [toSlug("In menu")]: {
  //   id: "in-menu",
  //   name: "Thiết Kế & In Menu Nhà Hàng, Cafe",
  //   category: "Ấn Phẩm F&B",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1549488352-843258fb3616?q=80&w=1200",
  //   excerpt:
  //     "Menu bìa bồi cứng, menu nhựa chống nước, menu bồi formex. Thiết kế đẹp mắt, gia công đóng gáy lò xo, ốc vít bền bỉ.",
  //   contentSections: [
  //     {
  //       title: "Thực đơn hấp dẫn",
  //       content: [
  //         "Một cuốn menu đẹp kích thích vị giác thực khách ngay từ cái nhìn đầu tiên. Chúng tôi tư vấn giải pháp in menu phù hợp với phong cách quán, đảm bảo độ bền cao trong môi trường nhà hàng (dầu mỡ, nước).",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Loại Menu", value: "Cuốn / Tờ rời / Bảng A3" },
  //     { label: "Chất liệu", value: "Giấy bồi, Nhựa PVC 4 lớp" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In to roi")]: {
  //   id: "in-to-roi",
  //   name: "In Tờ Rơi (Flyer) Offset Giá Rẻ",
  //   category: "Ấn Phẩm Quảng Cáo",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1200",
  //   excerpt:
  //     "In tờ rơi A4, A5 số lượng lớn bằng máy Offset công nghiệp giúp tiết kiệm chi phí tối đa. Giấy C100, C150 láng mịn, in màu sắc nét.",
  //   contentSections: [
  //     {
  //       title: "Tiếp cận khách hàng đại chúng",
  //       content: [
  //         "Với công nghệ in ghép bài offset, bạn có thể in số lượng lớn (1000, 2000 tờ) với chi phí cực thấp. Màu sắc chuẩn, hình ảnh rõ nét giúp truyền tải thông điệp khuyến mãi một cách chuyên nghiệp.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Kích thước", value: "A4, A5, A6" },
  //     { label: "Giấy in", value: "C100, C150 (Phổ biến)" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In namecard")]: {
  //   id: "in-namecard",
  //   name: "In Danh Thiếp (Namecard) Chuyên Nghiệp",
  //   category: "Ấn Phẩm Văn Phòng",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200",
  //   excerpt:
  //     "In card visit trên giấy Couche 300gsm dày dặn, cán màng mờ 2 mặt. Ngoài ra còn có in trên giấy mỹ thuật, nhựa trong, ép kim cao cấp.",
  //   contentSections: [
  //     {
  //       title: "Trao uy tín - Nhận niềm tin",
  //       content: [
  //         "Tấm danh thiếp là khởi đầu của mọi mối quan hệ kinh doanh. Chúng tôi cam kết in đúng màu, cắt chuẩn kích thước 90x55mm. Hỗ trợ in nhanh KTS cho các đơn hàng gấp lấy trong ngày.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Kích thước", value: "90 x 55 mm" },
  //     { label: "Giấy chuẩn", value: "Couche 300gsm" },
  //     { label: "Gia công", value: "Cán màng mờ 2 mặt" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In voucher")]: {
  //   id: "in-voucher",
  //   name: "In Voucher, Phiếu Quà Tặng",
  //   category: "Ấn Phẩm Quảng Cáo",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1622676059530-9b37803a0889?q=80&w=1200",
  //   excerpt:
  //     "Voucher in ấn đẹp mắt giúp tăng doanh số. Hỗ trợ in số nhảy, mã vạch, cấn rãnh xé tiện lợi. Giấy C300 hoặc giấy Ford.",
  //   contentSections: [
  //     {
  //       title: "Công cụ thúc đẩy bán hàng",
  //       content: [
  //         "Voucher là cách tuyệt vời để giữ chân khách hàng cũ. Chúng tôi cung cấp dịch vụ in voucher với nhiều tùy chọn gia công: Cấn đường xé (để xé cuống), đóng số nhảy (quản lý số lượng), ép kim tăng giá trị.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Kích thước", value: "7x18cm, 10x20cm" },
  //     { label: "Giấy in", value: "C300, Ford 250, Mỹ thuật" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In thu moi thiep cuoi")]: {
  //   id: "in-thiep",
  //   name: "In Thiệp Cưới & Thư Mời",
  //   category: "Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=1200",
  //   excerpt:
  //     "Thiết kế thiệp mời cao cấp. Sử dụng giấy mỹ thuật nhập khẩu, kết hợp công nghệ cắt laser, ép kim, dập nổi tinh xảo.",
  //   contentSections: [
  //     {
  //       title: "Lời mời trân trọng nhất",
  //       content: [
  //         "Mỗi tấm thiệp là một tác phẩm nghệ thuật. Chúng tôi có hàng trăm mẫu giấy mỹ thuật và khuôn mẫu độc đáo. Dù là thiệp cưới lãng mạn hay thư mời doanh nghiệp trang trọng, chúng tôi đều đáp ứng hoàn hảo.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Giấy in", value: "Giấy Mỹ thuật có vân" },
  //     { label: "Gia công", value: "Ép kim, Dập nổi, Cắt Laser" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // // =========================================================
  // // 4. NHÓM IN UV (Cao cấp)
  // // =========================================================
  // [toSlug("In hop den-bang hieu UV")]: {
  //   id: "uv-hop-den",
  //   name: "In UV Hộp Đèn & Bảng Hiệu Cao Cấp",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1563205764-6d9b35a7a7b3?q=80&w=1200",
  //   excerpt:
  //     "Công nghệ in UV sấy khô ngay lập tức cho độ bền màu 3-5 năm. Màu sắc tươi tắn, đậm đà, xuyên sáng cực tốt cho các bảng hiệu cao cấp.",
  //   contentSections: [
  //     {
  //       title: "Đỉnh cao công nghệ in",
  //       content: [
  //         "In UV sử dụng mực in phun trực tiếp và làm khô bằng đèn UV LED. Mực tạo thành lớp màng dẻo bám chặt lên vật liệu, cho màu sắc rực rỡ và độ bền vượt trội so với mực dầu truyền thống.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Độ bền màu", value: "3 - 5 năm ngoài trời" },
  //     { label: "Vật liệu", value: "Bạt 3M, Bạt không gân, Mica" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV tren Blackflim")]: {
  //   id: "uv-blackfilm",
  //   name: "In UV Trên Backlit Film",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
  //   excerpt:
  //     "In UV 2 lớp mực (Double Strike) trên Backlit Film tạo nên hình ảnh có chiều sâu, độ tương phản cực cao khi lên đèn.",
  //   contentSections: [
  //     {
  //       title: "Chuẩn mực hộp đèn siêu mỏng",
  //       content: [
  //         "Đây là giải pháp in ấn cao cấp nhất cho các hộp đèn tại sân bay, trung tâm thương mại, cửa hàng mỹ phẩm. Hình ảnh sắc nét đến từng chi tiết nhỏ.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Chế độ in", value: "In 2 lớp (Day & Night)" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV PP")]: {
  //   id: "uv-pp",
  //   name: "In UV Trên Chất Liệu PP",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200",
  //   excerpt:
  //     "Khắc phục nhược điểm bay màu của in PP mực dầu. In UV PP cho độ bền màu trên 3 năm, thích hợp poster trưng bày dài hạn.",
  //   contentSections: [
  //     {
  //       title: "Bền bỉ và Sắc nét",
  //       content: [
  //         "Mực UV bám chắc trên bề mặt PP, chống trầy xước và kháng nước tuyệt đối. Màu sắc in UV cũng tươi tắn và trung thực hơn so với in mực dầu thông thường.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Độ bền", value: "3 năm trong nhà" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV Decal")]: {
  //   id: "uv-decal",
  //   name: "In UV Trên Decal (Tem, Dán Xe)",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
  //   excerpt:
  //     "Mực UV bám chắc trên bề mặt decal, tạo độ nổi nhẹ 3D. Chống trầy xước tốt mà không cần cán màng.",
  //   contentSections: [
  //     {
  //       title: "Tem nhãn cao cấp",
  //       content: [
  //         "Decal in UV có khả năng chống chịu hóa chất, xăng dầu tốt hơn hẳn decal thường. Thích hợp làm tem nhãn máy móc, tem mũ bảo hiểm hoặc decal dán xe hơi.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Loại Decal", value: "Trong, Sữa, 3M, 7 màu" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV bat khong gan")]: {
  //   id: "uv-bat-khong-gan",
  //   name: "In UV Bạt Không Gân Cao Cấp",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200",
  //   excerpt:
  //     "Bạt không gân bề mặt láng mịn, không có sớ vải. Khi in UV và lên đèn sẽ cho hình ảnh mịn màng, đẳng cấp như màn hình TV.",
  //   contentSections: [
  //     {
  //       title: "Lựa chọn của thương hiệu lớn",
  //       content: [
  //         "Các ngân hàng, chuỗi cửa hàng lớn đều chuyển sang dùng bạt không gân in UV cho bảng hiệu. Sản phẩm không bị lộ vân bạt, màu sắc đồng nhất và sang trọng.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Khổ in", value: "3.2m liền mạch" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In Uv decal luoi")]: {
  //   id: "uv-decal-luoi",
  //   name: "In UV Decal Lưới Siêu Bền",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
  //   excerpt:
  //     "Decal lưới in UV bền màu gấp 3 lần in mực dầu. Chịu được nắng gắt trực tiếp, thích hợp dán kính tòa nhà cao tầng.",
  //   contentSections: [
  //     {
  //       title: "Giải pháp cho kính hướng Tây",
  //       content: [
  //         "Với các vị trí kính chịu nắng hướng Tây gay gắt, decal lưới in mực dầu dễ bị bay màu. In UV là giải pháp thay thế hoàn hảo với độ bền màu vượt trội.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Độ bền", value: "2 - 3 năm ngoài trời" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV tren bat 3M")]: {
  //   id: "uv-bat-3m",
  //   name: "In UV Trên Bạt 3M Mỹ",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1563205764-6d9b35a7a7b3?q=80&w=1200",
  //   excerpt:
  //     "Sự kết hợp hoàn hảo giữa công nghệ in UV và chất liệu bạt 3M danh tiếng. Cam kết bảo hành độ bền màu lên đến 5 năm.",
  //   contentSections: [
  //     {
  //       title: "Tiêu chuẩn toàn cầu",
  //       content: [
  //         "Bạt 3M (xuất xứ Mỹ/Hàn Quốc) có khả năng khuếch tán ánh sáng cực tốt, giúp hộp đèn sáng đều. Kết hợp mực UV dẻo, đây là dòng sản phẩm cao cấp nhất trong in ấn quảng cáo.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Bảo hành", value: "5 năm (Chính hãng)" },
  //     { label: "Xuất xứ", value: "USA / Korea" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV decal 3M")]: {
  //   id: "uv-decal-3m",
  //   name: "In UV Trên Decal 3M",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
  //   excerpt:
  //     "Decal 3M có độ bám dính cực tốt và khả năng co giãn nhiệt. In UV Decal 3M là giải pháp số 1 cho dán quảng cáo xe hơi, máy bay.",
  //   contentSections: [
  //     {
  //       title: "Bám dính trên mọi địa hình",
  //       content: [
  //         "Decal 3M có thể dán trên bề mặt cong, lồi lõm, đinh tán mà không bị bong tróc. Mực UV dẻo co giãn theo decal, không bị nứt vỡ khi thi công.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Ứng dụng", value: "Wrap đổi màu xe" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In UV kho lon")]: {
  //   id: "uv-kho-lon",
  //   name: "Dịch Vụ In UV Cuộn Khổ Lớn",
  //   category: "In UV",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200",
  //   excerpt:
  //     "Máy in UV cuộn khổ 3.2m đáp ứng nhu cầu in kích thước lớn liền mạch cho các hộp đèn, trần xuyên sáng.",
  //   contentSections: [
  //     {
  //       title: "Không giới hạn kích thước",
  //       content: [
  //         "Giải quyết bài toán in liền mạch không nối cho các bảng hiệu khổ lớn, mang lại vẻ đẹp thẩm mỹ hoàn hảo.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Khổ in", value: "3.2m liền mạch" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("In Mica-Inox-Alu")]: {
  //   id: "uv-phang",
  //   name: "In UV Phẳng Trên Mica, Inox, Alu",
  //   category: "In UV Phẳng",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1550534791-2677533605ab?q=80&w=1200",
  //   excerpt:
  //     "In trực tiếp lên vật liệu cứng. Công nghệ in nhiều lớp tạo hiệu ứng nổi 3D. Ứng dụng làm tranh kính, bảng vinh danh, ốp lưng.",
  //   contentSections: [
  //     {
  //       title: "In trên mọi chất liệu phẳng",
  //       content: [
  //         "Máy in UV phẳng bàn 1.3x2.5m có thể in trên: Gạch men, Gỗ, Kính cường lực, Kim loại... Mực in bám chết vào vật liệu, chịu được hóa chất tẩy rửa.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Độ dày vật liệu", value: "Tối đa 10cm" },
  //     { label: "Hiệu ứng", value: "In nổi 3D, In bóng" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // // =========================================================
  // // 5. THI CÔNG - LẮP ĐẶT
  // // =========================================================
  // [toSlug("Thi cong bien hieu – Hop den – Chu noi")]: {
  //   id: "tc-bien-hieu",
  //   name: "Thi Công Biển Hiệu & Chữ Nổi",
  //   category: "Thi Công",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?q=80&w=1200",
  //   excerpt:
  //     "Thiết kế và thi công trọn gói: Mặt dựng Alu, Bảng hiệu Hiflex, Chữ nổi Mica/Inox, Hộp đèn LED vẫy. Bảo hành kết cấu dài hạn.",
  //   contentSections: [
  //     {
  //       title: "Quy trình trọn gói A-Z",
  //       content: [
  //         "1. Khảo sát đo đạc thực tế.",
  //         "2. Lên bản vẽ 3D.",
  //         "3. Gia công tại xưởng (CNC/Laser).",
  //         "4. Lắp đặt hoàn thiện.",
  //         "5. Bảo trì định kỳ.",
  //         "Cam kết vật liệu chính hãng.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Khung xương", value: "Sắt mạ kẽm chống rỉ" },
  //     { label: "Bảo hành", value: "12 - 24 tháng" },
  //   ],
  //   gallery: [],
  //   faq: [{ q: "Thời gian thi công?", a: "Trung bình 3-5 ngày." }],
  // },
  // [toSlug("Thi cong man hinh LED quang cao ngoai troi")]: {
  //   id: "man-hinh-led",
  //   name: "Lắp Đặt Màn Hình LED Quảng Cáo",
  //   category: "Công Nghệ",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
  //   excerpt:
  //     "Màn hình LED P3, P4, P5, P10 hiển thị video sống động, độ sáng cao, chống nước tuyệt đối. Quản lý nội dung từ xa.",
  //   contentSections: [
  //     {
  //       title: "Quảng cáo sống động",
  //       content: [
  //         "Màn hình LED thay thế bảng hiệu tĩnh. Khả năng hiển thị Video, chạy chữ, hiệu ứng động giúp truyền tải thông điệp hấp dẫn gấp nhiều lần.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Module LED", value: "Outdoor P3, P4, P5" },
  //     { label: "Chống nước", value: "IP65" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("Treo banner-phuon toan quoc")]: {
  //   id: "treo-banner",
  //   name: "Dịch Vụ Treo Băng Rôn & Phướn",
  //   category: "Quảng Cáo",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1585324505372-5264b3c9d64a?q=80&w=1200",
  //   excerpt:
  //     "Nhận treo phướn dọc, băng rôn ngang tại các tuyến đường. Bao gồm: In ấn, Xin giấy phép, Thi công treo, Bảo trì và Tháo gỡ.",
  //   contentSections: [
  //     {
  //       title: "Phủ sóng thương hiệu",
  //       content: [
  //         "Chúng tôi lo trọn gói từ khâu xin phép đến thi công, đảm bảo đúng quy định pháp luật. Báo cáo hình ảnh nghiệm thu đầy đủ.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Thời gian treo", value: "7 - 14 ngày" },
  //     { label: "Dịch vụ", value: "Trọn gói (Xin phép + Treo)" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // // =========================================================
  // // 6. TỔ CHỨC SỰ KIỆN
  // // =========================================================
  // [toSlug("To chuc le khai truong khanh thanh")]: {
  //   id: "khai-truong",
  //   name: "Tổ Chức Lễ Khai Trương Trọn Gói",
  //   category: "Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
  //   excerpt:
  //     "Lên kịch bản, cung cấp âm thanh ánh sáng, múa lân sư rồng, cắt băng khánh thành, tiệc teabreak.",
  //   contentSections: [
  //     {
  //       title: "Khởi đầu hồng phát",
  //       content: [
  //         "Chúng tôi cung cấp giải pháp tổ chức chuyên nghiệp, kịch bản sáng tạo, trang thiết bị mới đẹp để buổi lễ diễn ra long trọng, suôn sẻ.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Hạng mục", value: "Sân khấu, Âm thanh, Lân sư rồng" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("Cho thue thiet bi su kien")]: {
  //   id: "thiet-bi-sk",
  //   name: "Cho Thuê Thiết Bị Sự Kiện",
  //   category: "Thiết Bị",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
  //   excerpt:
  //     "Kho thiết bị hiện đại: Loa đài, đèn sân khấu, màn hình LED, nhà bạt không gian, bàn ghế sự kiện. Cho thuê lẻ hoặc trọn gói.",
  //   contentSections: [
  //     {
  //       title: "Thiết bị chất lượng cao",
  //       content: [
  //         "Cam kết thiết bị mới, hoạt động ổn định. Có kỹ thuật viên trực suốt chương trình để đảm bảo không xảy ra sự cố.",
  //       ],
  //     },
  //   ],
  //   specs: [
  //     { label: "Âm thanh", value: "Loa Array, Loa Full" },
  //     { label: "Ánh sáng", value: "Par LED, Moving Head" },
  //   ],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("Roadshow")]: {
  //   id: "roadshow",
  //   name: "Tổ Chức Chạy Roadshow",
  //   category: "Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1533552862089-a29e84693b44?q=80&w=1200",
  //   excerpt:
  //     "Đoàn xe đạp, xe máy, xe ô tô trang trí hình ảnh thương hiệu chạy diễu hành. Giải pháp gây sự chú ý mạnh mẽ trên đường phố.",
  //   contentSections: [
  //     {
  //       title: "Náo nhiệt đường phố",
  //       content: [
  //         "Chúng tôi lo trọn gói: Xin phép lộ trình, trang trí xe, đồng phục PG/PB, điều phối đoàn xe chạy an toàn và hiệu quả.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Phương tiện", value: "Xe đạp, Xe máy, Xe Jeep" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("Setup San khau – Gian hang hoi cho -Tieu canh")]: {
  //   id: "san-khau",
  //   name: "Thi Công Sân Khấu, Gian Hàng, Tiểu Cảnh",
  //   category: "Thi Công Sự Kiện",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1475721027767-f4242310f17e?q=80&w=1200",
  //   excerpt:
  //     "Thiết kế và dàn dựng sân khấu 3D, thi công gian hàng triển lãm (Booth), trang trí tiểu cảnh lễ tết chuyên nghiệp.",
  //   contentSections: [
  //     {
  //       title: "Biến ý tưởng thành hiện thực",
  //       content: [
  //         "Đội ngũ thi công lành nghề, sử dụng vật liệu đa dạng (Gỗ, Sắt, Formex, Mút xốp) để tạo nên những không gian sự kiện độc đáo, đúng thiết kế.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Sàn sân khấu", value: "Ván ép, Thảm, Hiflex" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("Cung cap PGPB")]: {
  //   id: "pg-pb",
  //   name: "Cung Cấp Nhân Sự PG/PB, Lễ Tân",
  //   category: "Nhân Sự",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1530047625168-4b29ebf32484?q=80&w=1200",
  //   excerpt:
  //     "Cho thuê PG, PB, lễ tân đón khách với ngoại hình đẹp, tác phong chuyên nghiệp phục vụ khai trương, hội nghị.",
  //   contentSections: [
  //     {
  //       title: "Hình ảnh đại diện thương hiệu",
  //       content: [
  //         "Nhân sự được tuyển chọn kỹ lưỡng về ngoại hình và kỹ năng giao tiếp. Đảm bảo mang lại hình ảnh chuyên nghiệp và thân thiện cho sự kiện.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Trang phục", value: "Áo dài, Váy sự kiện" }],
  //   gallery: [],
  //   faq: [],
  // },
  // [toSlug("MCCa sy su kien")]: {
  //   id: "mc-casy",
  //   name: "Cung Cấp MC, Ca Sỹ, Nhóm Nhảy",
  //   category: "Nhân Sự",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1200",
  //   excerpt:
  //     "Book lịch MC dẫn chương trình, ca sỹ, ban nhạc, nhóm nhảy hiện đại để khuấy động không khí sự kiện.",
  //   contentSections: [
  //     {
  //       title: "Linh hồn của sự kiện",
  //       content: [
  //         "MC chuyên nghiệp biết cách dẫn dắt câu chuyện. Các tiết mục văn nghệ đặc sắc sẽ giữ chân khách hàng ở lại lâu hơn.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "MC", value: "Tiếng Việt / Song ngữ" }],
  //   gallery: [],
  //   faq: [],
  // },
  // // =========================================================
  // // 7. XIN PHÉP QUẢNG CÁO
  // // =========================================================
  // [toSlug("Xin phep treo bang ron-phuon")]: {
  //   id: "xp-bang-ron",
  //   name: "Dịch Vụ Xin Giấy Phép Treo Băng Rôn",
  //   category: "Pháp Lý",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200",
  //   excerpt:
  //     "Tư vấn hồ sơ và đại diện khách hàng xin cấp phép treo băng rôn tại Sở Văn Hóa. Cam kết đúng luật, đúng hạn.",
  //   contentSections: [
  //     {
  //       title: "An tâm pháp lý",
  //       content: [
  //         "Thủ tục hành chính thường phức tạp. Chúng tôi sẽ thay bạn chuẩn bị hồ sơ, nộp và nhận kết quả, đảm bảo chiến dịch quảng cáo diễn ra suôn sẻ.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Thời gian xử lý", value: "5 - 7 ngày" }],
  //   gallery: [],
  //   faq: [
  //     { q: "Tự treo có sao không?", a: "Sẽ bị tháo gỡ và phạt hành chính." },
  //   ],
  // },
  // [toSlug("Xin phep quang cao billoard-bien hieu")]: {
  //   id: "xp-billboard",
  //   name: "Xin Giấy Phép Bảng Hiệu & Billboard",
  //   category: "Pháp Lý",
  //   coverImage:
  //     "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200",
  //   excerpt:
  //     "Hỗ trợ xin giấy phép xây dựng và lắp đặt bảng hiệu, pano, billboard khổ lớn. Giải quyết hồ sơ khó.",
  //   contentSections: [
  //     {
  //       title: "Đúng quy hoạch",
  //       content: [
  //         "Chúng tôi tư vấn thiết kế đúng luật ngay từ đầu (kích thước, vị trí, nội dung) để việc xin phép dễ dàng hơn, tránh sai phạm về sau.",
  //       ],
  //     },
  //   ],
  //   specs: [{ label: "Hồ sơ", value: "Bản vẽ, Giấy tờ đất, ĐKKD" }],
  //   gallery: [],
  //   faq: [],
  // },
};

// Hàm lấy dữ liệu (Thông minh - Có Fallback)
export const getServiceDetail = (slug: string): ServiceDetailType => {
  if (SERVICE_DB[slug]) return SERVICE_DB[slug];

  const formatName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: slug,
    name: `Dịch Vụ ${formatName}`,
    category: "Dịch Vụ Chuyên Nghiệp",
    coverImage:
      "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200",
    excerpt: `Chúng tôi cung cấp dịch vụ ${formatName} uy tín, chất lượng cao với chi phí tối ưu nhất. Liên hệ ngay để được tư vấn chi tiết.`,
    contentSections: DEFAULT_CONTENT.contentSections,
    specs: DEFAULT_CONTENT.specs,
    gallery: [],
    faq: DEFAULT_CONTENT.faq,
  };
};
