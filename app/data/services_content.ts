// app/data/services_content.ts

export const CATALOG_INFO = {
  title: "Bảng Giá Dịch Vụ",
  highlight: "In Ấn & Quảng Cáo",
  desc: "Chuyên in ấn khổ lớn, thi công bảng hiệu, hộp đèn và các giải pháp quảng cáo ngoài trời toàn diện.",
};

export interface ServiceArticle {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

export interface CategoryNode {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  children?: CategoryNode[];
  articleData?: ServiceArticle;
}

// Hàm tạo slug chuẩn
const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/\//g, "")
    .replace(/,/g, "")
    .replace(/đ/g, "d")
    .replace(/--/g, "-");

export const MENU_TREE: CategoryNode[] = [
  // =========================================================
  // 1. NHÓM IN ẤN (3 Cấp)
  // =========================================================
  {
    id: "in-an",
    name: "In Ấn",
    level: 1,
    children: [
      // --- In Hiflex ---
      {
        id: "in-hiflex",
        name: "In Hiflex",
        level: 2,
        children: [
          {
            id: "in-billboard",
            name: "In billloard",
            level: 3,
            articleData: {
              title: "In Bạt Hiflex Khổ Lớn Cho Pano & Billboard",
              slug: toSlug("In billloard"),
              excerpt:
                "Giải pháp in ấn cho quảng cáo tấm lớn ngoài trời (OOH). Sử dụng bạt Hiflex dày 3.8zem chịu lực gió tốt, mực dầu kháng UV giúp hình ảnh bền màu lên đến 2 năm dưới nắng mưa.",
              image:
                "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1000",
            },
          },
          {
            id: "in-hop-den",
            name: "In hộp đèn",
            level: 3,
            articleData: {
              title: "In Bạt Hiflex Xuyên Sáng Làm Hộp Đèn",
              slug: toSlug("In hop den"),
              excerpt:
                "Công nghệ in 'Double Strike' (in đậm 2 lần) trên chất liệu bạt xuyên sáng cao cấp. Đảm bảo hộp đèn rực rỡ, màu đen sâu và không bị bệt màu khi lên đèn vào ban đêm.",
              image:
                "https://images.unsplash.com/photo-1567425143376-749e79872584?q=80&w=1000",
            },
          },
          {
            id: "in-backdrop",
            name: "In backdrop",
            level: 3,
            articleData: {
              title: "In Backdrop Sự Kiện - Sân Khấu - Đám Cưới",
              slug: toSlug("In backdrop"),
              excerpt:
                "In phông nền backdrop khổ lớn liền mạch, chất liệu bạt xám cản sáng giúp không bị lộ khung xương phía sau. In nhanh lấy liền, hỗ trợ thiết kế và thi công trọn gói.",
              image:
                "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000",
            },
          },
          {
            id: "in-bang-ron",
            name: "In băng rôn",
            level: 3,
            articleData: {
              title: "In Băng Rôn Cổ Động, Khuyến Mãi, Khai Trương",
              slug: toSlug("In bang ron"),
              excerpt:
                "Dịch vụ in băng rôn ngang/dọc giá rẻ số lượng lớn. Gia công đóng khoen, xỏ cây, dán biên đầy đủ. Thích hợp cho các chiến dịch quảng cáo ngắn hạn.",
              image:
                "https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?q=80&w=1000",
            },
          },
          {
            id: "in-pano",
            name: "In pano",
            level: 3,
            articleData: {
              title: "In Pano Ốp Tường Khổ Lớn",
              slug: toSlug("In pano"),
              excerpt:
                "Chuyên in và thi công các tấm pano ốp tường tòa nhà. Kỹ thuật nối bạt tần số cao đảm bảo thẩm mỹ, không lộ mối nối cho các kích thước siêu lớn.",
              image:
                "https://images.unsplash.com/photo-1558448777-626a44522737?q=80&w=1000",
            },
          },
        ],
      },
      // --- In Decal-PP ---
      {
        id: "in-decal-pp",
        name: "In Decal-PP",
        level: 2,
        children: [
          {
            id: "in-decal-luoi",
            name: "In decal lưới dán kính",
            level: 3,
            articleData: {
              title: "In Decal Lưới Dán Kính (Nhìn Một Chiều)",
              slug: toSlug("In decal luoi dan kinh"),
              excerpt:
                "Giải pháp dán kính thông minh: Bên ngoài hiển thị quảng cáo sắc nét, bên trong nhìn ra thoáng đãng. Vừa trang trí, vừa cản nắng hiệu quả cho văn phòng, xe bus.",
              image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
            },
          },
          {
            id: "in-poster",
            name: "In poster",
            level: 3,
            articleData: {
              title: "In Poster Quảng Cáo Trong Nhà & Ngoài Trời",
              slug: toSlug("In poster"),
              excerpt:
                "In poster dán tường hoặc lồng khung kính. Chất liệu PP hoặc Decal cán màng bảo vệ giúp hình ảnh sắc nét, chống thấm nước và bay màu.",
              image:
                "https://images.unsplash.com/photo-1572911166660-f463327d4cdd?q=80&w=1000",
            },
          },
          {
            id: "in-posm",
            name: "In POSM",
            level: 3,
            articleData: {
              title: "Sản Xuất Vật Phẩm POSM Trưng Bày",
              slug: toSlug("In POSM"),
              excerpt:
                "Thiết kế và in ấn trọn bộ vật phẩm tại điểm bán (Point of Sales Material): Wobbler, Hanger, Shelf Talker, Cờ dây... giúp thu hút khách hàng ngay tại kệ hàng.",
              image:
                "https://images.unsplash.com/photo-1622676059530-9b37803a0889?q=80&w=1000",
            },
          },
          {
            id: "in-pp-standee",
            name: "In PP Standee",
            level: 3,
            articleData: {
              title: "In PP Gắn Standee Chữ X & Standee Cuốn",
              slug: toSlug("In PP Standee"),
              excerpt:
                "Combo in ấn và cung cấp chân standee. Chất liệu PP (Paper Plastic) cho độ mịn cao, hình ảnh trung thực. Gia công đóng khoen hoặc chừa biên chuẩn kích thước.",
              image:
                "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000",
            },
          },
          {
            id: "in-pp-format",
            name: "In PP cán format",
            level: 3,
            articleData: {
              title: "In PP Bồi Formex (Format) Tạo Hình",
              slug: toSlug("In PP can format"),
              excerpt:
                "Cán PP lên tấm formex 3li, 5li, 10li cứng cáp. Cắt CNC theo biên dạng để làm hashtag cầm tay, mô hình nhân vật, bảng trao giải sự kiện.",
              image:
                "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000",
            },
          },
          {
            id: "in-canvas",
            name: "In Canvas",
            level: 3,
            articleData: {
              title: "In Tranh Canvas Vải Bố Trang Trí",
              slug: toSlug("In Canvas"),
              excerpt:
                "In trên chất liệu vải bố canvas chuyên dụng, tạo hiệu ứng như tranh vẽ sơn dầu. Thích hợp làm tranh trang trí nội thất, quán cafe, văn phòng.",
              image:
                "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000",
            },
          },
          {
            id: "in-backlit",
            name: "In Backlit flim",
            level: 3,
            articleData: {
              title: "In Backlit Film Cho Hộp Đèn Siêu Mỏng",
              slug: toSlug("In Backlit flim"),
              excerpt:
                "Chất liệu film nhựa cứng cao cấp, độ xuyên sáng và dẫn sáng cực tốt. Chuyên dùng cho các hộp đèn menu siêu mỏng tại rạp chiếu phim, trung tâm thương mại.",
              image:
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
            },
          },
          {
            id: "in-silk",
            name: "In vải silk",
            level: 3,
            articleData: {
              title: "In Tranh Vải Silk Lụa Mềm Mại",
              slug: toSlug("In vai silk"),
              excerpt:
                "Vải silk có độ rũ, mềm mại và bóng nhẹ. Thích hợp in tranh thờ, câu đối, cờ phướn, dải băng đeo chéo hoa hậu.",
              image:
                "https://images.unsplash.com/photo-1578320339912-793574737d97?q=80&w=1000",
            },
          },
          {
            id: "in-hashtag",
            name: "In hashtag cầm tay",
            level: 3,
            articleData: {
              title: "Làm Hashtag Cầm Tay Chụp Hình Check-in",
              slug: toSlug("In hashtag cam tay"),
              excerpt:
                "Hashtag cầm tay vui nhộn cho đám cưới, sinh nhật, sự kiện công ty. Chất liệu PP bồi formex 5li cứng cáp, cắt máy sắc sảo, cán tay cầm chắc chắn.",
              image:
                "https://images.unsplash.com/photo-1531256379416-9f000e90aacc?q=80&w=1000",
            },
          },
        ],
      },
      // --- In Offset ---
      {
        id: "in-offset",
        name: "In Offset",
        level: 2,
        children: [
          {
            id: "in-sticker",
            name: "In Sticker, tem nhãn",
            level: 3,
            articleData: {
              title: "In Tem Nhãn, Sticker Decal Logo",
              slug: toSlug("In Sticker tem nhan"),
              excerpt:
                "In tem nhãn decal giấy, decal nhựa, decal trong. Bế demi thành phẩm, chỉ cần lột dán. In sắc nét, bền màu, thích hợp dán bao bì sản phẩm, ly trà sữa.",
              image:
                "https://images.unsplash.com/photo-1616941842754-d021c70e28e6?q=80&w=1000",
            },
          },
          {
            id: "in-menu",
            name: "In menu",
            level: 3,
            articleData: {
              title: "Thiết Kế & In Menu Nhà Hàng, Cafe",
              slug: toSlug("In menu"),
              excerpt:
                "Đa dạng quy cách: Menu bìa bồi cứng sang trọng, menu nhựa PVC chống nước tuyệt đối, menu bồi formex giá rẻ. Đóng gáy lò xo, ốc vít thẩm mỹ.",
              image:
                "https://images.unsplash.com/photo-1549488352-843258fb3616?q=80&w=1000",
            },
          },
          {
            id: "in-to-roi",
            name: "In tờ rơi",
            level: 3,
            articleData: {
              title: "In Tờ Rơi (Flyer) Offset Giá Rẻ",
              slug: toSlug("In to roi"),
              excerpt:
                "Dịch vụ in tờ rơi A4, A5 số lượng lớn bằng máy Offset công nghiệp giúp tiết kiệm chi phí tối đa. Giấy C100, C150 láng mịn, in màu 2 mặt sắc nét.",
              image:
                "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000",
            },
          },
          {
            id: "in-namecard",
            name: "In namecard",
            level: 3,
            articleData: {
              title: "In Danh Thiếp (Namecard) Chuyên Nghiệp",
              slug: toSlug("In namecard"),
              excerpt:
                "In card visit trên giấy Couche 300gsm dày dặn, cán màng mờ 2 mặt chống thấm. Ngoài ra còn có in trên giấy mỹ thuật, nhựa trong, ép kim cao cấp.",
              image:
                "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000",
            },
          },
          {
            id: "in-voucher",
            name: "In voucher",
            level: 3,
            articleData: {
              title: "In Voucher, Phiếu Quà Tặng, Thẻ Tích Điểm",
              slug: toSlug("In voucher"),
              excerpt:
                "Tăng doanh số với voucher in ấn đẹp mắt. Có thể in số nhảy, mã vạch, cấn rãnh xé tiện lợi. Giấy C300 hoặc giấy Ford (dễ đóng dấu).",
              image:
                "https://images.unsplash.com/photo-1622676059530-9b37803a0889?q=80&w=1000",
            },
          },
          {
            id: "in-thiep",
            name: "In thư mời, thiệp cưới",
            level: 3,
            articleData: {
              title: "In Thiệp Cưới & Thư Mời Sự Kiện Cao Cấp",
              slug: toSlug("In thu moi thiep cuoi"),
              excerpt:
                "Sử dụng giấy mỹ thuật nhập khẩu, kết hợp công nghệ cắt laser, ép kim, dập nổi để tạo nên những tấm thiệp sang trọng, đẳng cấp.",
              image:
                "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=1000",
            },
          },
        ],
      },
      // --- In UV ---
      {
        id: "in-uv",
        name: "In UV trên mọi chất liệu",
        level: 2,
        children: [
          {
            id: "uv-hop-den",
            name: "In hộp đèn-bảng hiệu UV",
            level: 3,
            articleData: {
              title: "In UV Hộp Đèn & Bảng Hiệu Cao Cấp",
              slug: toSlug("In hop den-bang hieu UV"),
              excerpt:
                "Công nghệ in UV sấy khô ngay lập tức cho độ bền màu 3-5 năm. Màu sắc tươi tắn, đậm đà, xuyên sáng cực tốt cho các bảng hiệu cao cấp.",
              image:
                "https://images.unsplash.com/photo-1563205764-6d9b35a7a7b3?q=80&w=1000",
            },
          },
          {
            id: "uv-blackfilm",
            name: "In UV trên Blackflim",
            level: 3,
            articleData: {
              title: "In UV Trên Chất Liệu Backlit Film",
              slug: toSlug("In UV tren Blackflim"),
              excerpt:
                "Sự kết hợp giữa chất liệu dẫn sáng tốt nhất và công nghệ in sắc nét nhất. Tạo nên các hộp đèn quảng cáo đẳng cấp, thu hút mọi ánh nhìn.",
              image:
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
            },
          },
          {
            id: "uv-pp",
            name: "In UV PP",
            level: 3,
            articleData: {
              title: "In UV Trên Chất Liệu PP",
              slug: toSlug("In UV PP"),
              excerpt:
                "Khắc phục nhược điểm bay màu của in PP mực dầu. In UV PP cho độ bền màu vượt trội, thích hợp cho các poster trưng bày dài hạn.",
              image:
                "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000",
            },
          },
          {
            id: "uv-decal",
            name: "In UV Decal",
            level: 3,
            articleData: {
              title: "In UV Trên Decal (Tem Nhãn, Dán Xe)",
              slug: toSlug("In UV Decal"),
              excerpt:
                "Mực UV bám chắc trên bề mặt decal, chống trầy xước tốt mà không cần cán màng. Thích hợp cho tem nhãn máy móc, decal dán xe hơi.",
              image:
                "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000",
            },
          },
          {
            id: "uv-bat-khong-gan",
            name: "In UV bạt không gân",
            level: 3,
            articleData: {
              title: "In UV Bạt Không Gân (Bạt 3M Hàn Quốc)",
              slug: toSlug("In UV bat khong gan"),
              excerpt:
                "Chất liệu bạt cao cấp bề mặt láng mịn, không có sớ vải. Khi in UV và lên đèn sẽ cho hình ảnh mịn màng, đẳng cấp như màn hình TV.",
              image:
                "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1000",
            },
          },
          {
            id: "uv-decal-luoi",
            name: "In Uv decal lưới",
            level: 3,
            articleData: {
              title: "In UV Decal Lưới Siêu Bền",
              slug: toSlug("In Uv decal luoi"),
              excerpt:
                "Decal lưới in UV chịu được nắng mưa tốt hơn in mực dầu. Thích hợp dán kính tòa nhà cao tầng, kính xe bus chạy ngoài trời liên tục.",
              image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
            },
          },
          {
            id: "uv-bat-3m",
            name: "In UV trên bạt 3M",
            level: 3,
            articleData: {
              title: "In UV Trên Bạt 3M Mỹ Chính Hãng",
              slug: toSlug("In UV tren bat 3M"),
              excerpt:
                "Dòng bạt cao cấp nhất hiện nay. Kết hợp mực UV cho độ bền màu cam kết 5 năm. Dùng cho các biển hiệu ngân hàng, tập đoàn lớn.",
              image:
                "https://images.unsplash.com/photo-1563205764-6d9b35a7a7b3?q=80&w=1000",
            },
          },
          {
            id: "uv-decal-3m",
            name: "In UV decal 3M",
            level: 3,
            articleData: {
              title: "In UV Trên Decal 3M",
              slug: toSlug("In UV decal 3M"),
              excerpt:
                "Decal 3M có độ bám dính cực tốt và khả năng co giãn nhiệt. In UV Decal 3M là giải pháp số 1 cho dán quảng cáo trên phương tiện giao thông.",
              image:
                "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000",
            },
          },
          {
            id: "uv-kho-lon",
            name: "In UV khổ lớn",
            level: 3,
            articleData: {
              title: "Dịch Vụ In UV Cuộn Khổ Lớn 3.2m",
              slug: toSlug("In UV kho lon"),
              excerpt:
                "Đáp ứng nhu cầu in UV kích thước lớn liền mạch không nối. Phục vụ cho các trần xuyên sáng, biển hiệu khổ lớn yêu cầu thẩm mỹ cao.",
              image:
                "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1000",
            },
          },
          {
            id: "uv-mica-inox",
            name: "In Mica-Inox-Alu",
            level: 3,
            articleData: {
              title: "In UV Phẳng Trên Mica, Inox, Alu, Kính",
              slug: toSlug("In Mica-Inox-Alu"),
              excerpt:
                "In trực tiếp lên vật liệu cứng. Công nghệ in nhiều lớp tạo hiệu ứng nổi 3D sờ thấy được. Ứng dụng làm tranh kính, bảng vinh danh, ốp lưng.",
              image:
                "https://images.unsplash.com/photo-1550534791-2677533605ab?q=80&w=1000",
            },
          },
        ],
      },
    ],
  },

  // =========================================================
  // 2. THI CÔNG - LẮP ĐẶT (2 Cấp)
  // =========================================================
  {
    id: "thi-cong",
    name: "Thi công-Lắp đặt-Gia công quảng cáo",
    level: 1,
    children: [
      {
        id: "tc-bien-hieu",
        name: "Thi công biển hiệu – Hộp đèn – Chữ nổi",
        level: 2,
        articleData: {
          title: "Thi Công Biển Hiệu, Hộp Đèn, Chữ Nổi Trọn Gói",
          slug: toSlug("Thi cong bien hieu – Hop den – Chu noi"),
          excerpt:
            "Thiết kế, sản xuất và lắp đặt trọn gói: Mặt dựng Alu, Bảng hiệu Hiflex, Chữ nổi Mica/Inox/Tole, Hộp đèn LED vẫy, Hộp đèn hút nổi.",
          image:
            "https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?q=80&w=1000",
        },
      },
      {
        id: "tc-led",
        name: "Thi công màn hình LED quảng cáo ngoài trời",
        level: 2,
        articleData: {
          title: "Lắp Đặt Màn Hình LED Quảng Cáo (Outdoor/Indoor)",
          slug: toSlug("Thi cong man hinh LED quang cao ngoai troi"),
          excerpt:
            "Cung cấp giải pháp màn hình LED P3, P4, P5, P10 hiển thị video sống động. Chống nước, độ sáng cao, quản lý nội dung từ xa dễ dàng.",
          image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000",
        },
      },
      {
        id: "tc-treo-banner",
        name: "Treo banner-phướn toàn quốc",
        level: 2,
        articleData: {
          title: "Dịch Vụ Treo Banner, Phướn Dọc Toàn Quốc",
          slug: toSlug("Treo banner-phuon toan quoc"),
          excerpt:
            "Nhận treo băng rôn, cờ phướn quảng cáo tại các tuyến đường trung tâm. Bao gồm: In ấn, Xin giấy phép, Thi công treo, Bảo trì và Tháo gỡ.",
          image:
            "https://images.unsplash.com/photo-1585324505372-5264b3c9d64a?q=80&w=1000",
        },
      },
    ],
  },

  // =========================================================
  // 3. TỔ CHỨC SỰ KIỆN (2 Cấp)
  // =========================================================
  {
    id: "to-chuc-su-kien",
    name: "Tổ chức sự kiện",
    level: 1,
    children: [
      {
        id: "sk-khai-truong",
        name: "Tổ chức lễ khai trương, khánh thành",
        level: 2,
        articleData: {
          title: "Tổ Chức Lễ Khai Trương, Khánh Thành Trọn Gói",
          slug: toSlug("To chuc le khai truong khanh thanh"),
          excerpt:
            "Lên ý tưởng kịch bản, cung cấp trang thiết bị, nhân sự, múa lân sư rồng, cắt băng khánh thành. Đảm bảo buổi lễ diễn ra long trọng và suôn sẻ.",
          image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000",
        },
      },
      {
        id: "sk-thiet-bi",
        name: "Cho thuê thiết bị sự kiện",
        level: 2,
        articleData: {
          title: "Cho Thuê Thiết Bị Âm Thanh, Ánh Sáng, Nhà Bạt",
          slug: toSlug("Cho thue thiet bi su kien"),
          excerpt:
            "Kho thiết bị sự kiện hiện đại: Hệ thống âm thanh ánh sáng, màn hình LED, nhà bạt không gian, bàn ghế banquet, thảm đỏ, cổng hơi.",
          image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000",
        },
      },
      {
        id: "sk-roadshow",
        name: "Roadshow",
        level: 2,
        articleData: {
          title: "Tổ Chức Chạy Roadshow Quảng Bá Thương Hiệu",
          slug: toSlug("Roadshow"),
          excerpt:
            "Tổ chức đoàn xe đạp, xe máy, xe ô tô trang trí hình ảnh thương hiệu chạy diễu hành trên các tuyến phố. Giải pháp gây sự chú ý mạnh mẽ.",
          image:
            "https://images.unsplash.com/photo-1533552862089-a29e84693b44?q=80&w=1000",
        },
      },
      {
        id: "sk-san-khau",
        name: "Setup Sân khấu – Gian hàng hội chợ -Tiểu cảnh",
        level: 2,
        articleData: {
          title: "Thi Công Setup Sân Khấu, Gian Hàng, Tiểu Cảnh",
          slug: toSlug("Setup San khau – Gian hang hoi cho -Tieu canh"),
          excerpt:
            "Thiết kế và dàn dựng sân khấu 3D, thi công gian hàng triển lãm (Booth), trang trí tiểu cảnh lễ tết tại văn phòng, trung tâm thương mại.",
          image:
            "https://images.unsplash.com/photo-1475721027767-f4242310f17e?q=80&w=1000",
        },
      },
      {
        id: "sk-pg-pb",
        name: "Cung cấp PG/PB",
        level: 2,
        articleData: {
          title: "Cung Cấp Nhân Sự PG/PB, Lễ Tân Sự Kiện",
          slug: toSlug("Cung cap PGPB"),
          excerpt:
            "Cho thuê PG, PB, lễ tân đón khách với ngoại hình đẹp, tác phong chuyên nghiệp. Phục vụ khai trương, hội nghị, ra mắt sản phẩm.",
          image:
            "https://images.unsplash.com/photo-1530047625168-4b29ebf32484?q=80&w=1000",
        },
      },
      {
        id: "sk-mc",
        name: "MC/Ca sỹ sự kiện",
        level: 2,
        articleData: {
          title: "Cung Cấp MC, Ca Sỹ, Nhóm Múa Chuyên Nghiệp",
          slug: toSlug("MCCa sy su kien"),
          excerpt:
            "Book lịch MC dẫn chương trình (Tiếng Việt/Anh), ca sỹ, ban nhạc, nhóm nhảy hiện đại để khuấy động không khí và giữ lửa cho sự kiện.",
          image:
            "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000",
        },
      },
    ],
  },

  // =========================================================
  // 4. XIN PHÉP QUẢNG CÁO (2 Cấp)
  // =========================================================
  {
    id: "xin-phep-qc",
    name: "Xin phép quảng cáo",
    level: 1,
    children: [
      {
        id: "xp-bang-ron",
        name: "Xin phép treo băng rôn-phướn",
        level: 2,
        articleData: {
          title: "Dịch Vụ Xin Giấy Phép Treo Băng Rôn, Phướn",
          slug: toSlug("Xin phep treo bang ron-phuon"),
          excerpt:
            "Tư vấn hồ sơ và đại diện khách hàng thực hiện thủ tục xin cấp phép treo băng rôn quảng cáo tại Sở Văn Hóa. Cam kết đúng luật, đúng hạn.",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000",
        },
      },
      {
        id: "xp-billboard",
        name: "Xin phép quảng cáo billoard-biển hiệu",
        level: 2,
        articleData: {
          title: "Xin Giấy Phép Quảng Cáo Billboard, Biển Hiệu",
          slug: toSlug("Xin phep quang cao billoard-bien hieu"),
          excerpt:
            "Hỗ trợ thủ tục xin giấy phép xây dựng và lắp đặt bảng hiệu, pano, billboard khổ lớn. Giải quyết hồ sơ khó, đảm bảo pháp lý cho công trình.",
          image:
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000",
        },
      },
    ],
  },
];

export const MARQUEE_TEXT = [
  "IN KỸ THUẬT SỐ",
  "THI CÔNG QUẢNG CÁO",
  "TỔ CHỨC SỰ KIỆN",
  "XIN PHÉP QUẢNG CÁO",
];
