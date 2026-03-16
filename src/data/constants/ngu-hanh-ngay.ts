export const NGU_HANH_ORDER = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];

export function tinhTuongSinh(hanh1: string, hanh2: string): "sinh" | "khac" | "hoa" {
  const i1 = NGU_HANH_ORDER.indexOf(hanh1);
  const i2 = NGU_HANH_ORDER.indexOf(hanh2);
  if (i1 === -1 || i2 === -1) return "hoa";
  if ((i1 + 1) % 5 === i2 || (i2 + 1) % 5 === i1) return "sinh";
  if ((i1 + 2) % 5 === i2 || (i2 + 2) % 5 === i1) return "khac";
  return "hoa";
}

export const NGU_HANH_NGAY: Record<
  string,
  {
    mau: string;
    huong: string;
    gio_tot: string[];
    linh_vuc_tot: string[];
    linh_vuc_tranh: string[];
    bien_co_co_the: string[];
  }
> = {
  Mộc: {
    mau: "Xanh lá, Xanh dương",
    huong: "Đông",
    gio_tot: ["03h–05h (Dần)", "05h–07h (Mão)", "11h–13h (Ngọ)"],
    linh_vuc_tot: [
      "Giáo dục, học tập",
      "Ký kết hợp đồng dài hạn",
      "Trồng trọt, đầu tư bền vững",
      "Giao tiếp và kết nối mạng lưới",
    ],
    linh_vuc_tranh: ["Kiện tụng, tranh chấp", "Phá dỡ, tháo dỡ công trình"],
    bien_co_co_the: ["Căng thẳng, dễ cáu gắt", "Vấn đề về gan, mắt"],
  },
  Hỏa: {
    mau: "Đỏ, Cam, Hồng",
    huong: "Nam",
    gio_tot: ["09h–11h (Tỵ)", "11h–13h (Ngọ)", "13h–15h (Mùi)"],
    linh_vuc_tot: [
      "Trình bày, thuyết phục",
      "Ra mắt sản phẩm mới",
      "Hoạt động xã hội, giao lưu",
      "Sáng tạo, nghệ thuật",
    ],
    linh_vuc_tranh: ["Đầu tư tài chính lớn", "Quyết định quan trọng vội vàng"],
    bien_co_co_the: ["Nóng giận, xung đột khẩu", "Vấn đề tim mạch, huyết áp"],
  },
  Thổ: {
    mau: "Vàng, Nâu, Be",
    huong: "Trung tâm, Tây Nam",
    gio_tot: ["07h–09h (Thìn)", "13h–15h (Mùi)", "19h–21h (Tuất)"],
    linh_vuc_tot: [
      "Bất động sản, mua bán nhà đất",
      "Tích lũy, tiết kiệm",
      "Củng cố mối quan hệ gia đình",
      "Khởi công xây dựng",
    ],
    linh_vuc_tranh: ["Đầu tư mạo hiểm", "Thay đổi đột ngột"],
    bien_co_co_the: ["Tiêu hóa kém, đầy bụng", "Mệt mỏi không rõ nguyên nhân"],
  },
  Kim: {
    mau: "Trắng, Bạc, Vàng kim",
    huong: "Tây",
    gio_tot: ["15h–17h (Thân)", "17h–19h (Dậu)", "21h–23h (Hợi)"],
    linh_vuc_tot: [
      "Ký hợp đồng, pháp lý",
      "Thu tiền, đòi nợ",
      "Công nghệ, kỹ thuật",
      "Cắt tóc, làm đẹp",
    ],
    linh_vuc_tranh: ["Khởi nghiệp mới", "Hoạt động cần sự mềm dẻo"],
    bien_co_co_the: ["Hô hấp, phổi dễ nhạy cảm", "Da liễu, dị ứng"],
  },
  Thủy: {
    mau: "Đen, Xanh navy, Tím",
    huong: "Bắc",
    gio_tot: ["23h–01h (Tý)", "01h–03h (Sửu)", "17h–19h (Dậu)"],
    linh_vuc_tot: [
      "Giao thương, buôn bán",
      "Du lịch, xuất ngoại",
      "Học hỏi, nghiên cứu",
      "Đàm phán, thương lượng",
    ],
    linh_vuc_tranh: ["Xây dựng, khởi công", "Đám cưới, lễ lạt lớn"],
    bien_co_co_the: [
      "Thận, tiết niệu dễ có vấn đề",
      "Lo lắng, bất an tinh thần",
    ],
  },
};

export function phanTichSaoNgay(
  chinhTinh: string[],
  phuTinh: string[],
  tuHoa: string[],
): { may: string[]; can_than: string[] } {
  const may: string[] = [];
  const can_than: string[] = [];

  // Chính tinh
  const SAO_MAY: Record<string, string> = {
    "Tử Vi":
      "Quyền lực và địa vị được nâng cao, dễ thành công trong các quyết định lớn",
    "Thái Dương": "Ngày năng lượng cao, mọi giao tiếp xã hội đều thuận lợi",
    "Thiên Phủ": "Tài lộc ổn định, tốt cho tích lũy và đầu tư bền vững",
    "Thiên Lương": "Ngày phúc lộc, được người lớn tuổi và bề trên giúp đỡ",
    "Thiên Đồng": "Bình yên, an nhàn, các mối quan hệ hài hòa",
    "Thiên Cơ": "Trí tuệ minh mẫn, giải quyết vấn đề nhanh và hiệu quả",
    "Vũ Khúc": "Tốt cho công việc tài chính, ký kết và kinh doanh",
    "Thiên Tướng": "Được tín nhiệm và ủy thác, công việc suôn sẻ",
  };
  const SAO_CAN: Record<string, string> = {
    "Thất Sát": "Dễ gặp xung đột, tranh chấp — cần kiềm chế cảm xúc",
    "Phá Quân": "Dễ phá vỡ các kế hoạch đã định — tránh thay đổi lớn hôm nay",
    "Liêm Trinh": "Cẩn thận pháp lý và các mối quan hệ phức tạp",
    "Cự Môn": "Tránh tranh luận và ký kết, dễ gặp hiểu lầm",
    "Tham Lang": "Cảnh giác cám dỗ và quyết định bốc đồng",
  };

  for (const s of chinhTinh) {
    if (SAO_MAY[s]) may.push(SAO_MAY[s]);
    if (SAO_CAN[s]) can_than.push(SAO_CAN[s]);
  }

  // Phụ tinh
  const PHU_MAY: Record<string, string> = {
    "Tả Phụ": "Có quý nhân hỗ trợ, dễ nhận được sự giúp đỡ bất ngờ",
    "Hữu Bật": "Người tin cậy bên cạnh, công việc nhóm thuận lợi",
    "Văn Xương": "Tốt cho học tập, thi cử, viết lách và hợp đồng văn bản",
    "Văn Khúc": "Sáng tạo nghệ thuật đỉnh cao, cảm hứng dồi dào",
    "Thiên Khôi": "Gặp quý nhân cấp cao, cơ hội thăng tiến bất ngờ",
    "Thiên Việt": "Được người ảnh hưởng giúp đỡ, mở ra cơ hội mới",
    "Lộc Tồn": "Tài sản được bảo toàn, không mất mát tài chính",
  };
  const PHU_CAN: Record<string, string> = {
    "Kình Dương": "Tránh va chạm, xung đột và các hoạt động mạo hiểm",
    "Đà La": "Mọi việc có thể bị trì hoãn — cần kiên nhẫn",
    "Hỏa Tinh": "Cẩn thận tai nạn, hỏa hoạn và quyết định nóng vội",
    "Linh Tinh": "Đề phòng sự cố bất ngờ không lường trước được",
    "Thiên Không": "Tránh đầu tư lớn — công sức dễ không được đền đáp",
    "Địa Kiếp": "Cảnh giác bị lừa đảo và mất mát tài sản",
  };

  for (const s of phuTinh) {
    if (PHU_MAY[s]) may.push(PHU_MAY[s]);
    if (PHU_CAN[s]) can_than.push(PHU_CAN[s]);
  }

  // Tứ Hóa
  if (tuHoa.includes("Hóa Lộc"))
    may.push("Hóa Lộc chiếu — tài lộc đặc biệt thuận lợi hôm nay");
  if (tuHoa.includes("Hóa Quyền"))
    may.push("Hóa Quyền chiếu — uy tín và quyền lực tăng cao");
  if (tuHoa.includes("Hóa Khoa"))
    may.push("Hóa Khoa chiếu — danh tiếng và học vấn được nâng cao");
  if (tuHoa.includes("Hóa Kỵ"))
    can_than.push("Hóa Kỵ chiếu — cẩn trọng mọi hoạt động, dễ gặp trở ngại");

  return { may, can_than };
}

export function tinhDiem(
  tuongSinh: string,
  may: string[],
  can_than: string[],
  linhVuc: "tai" | "suc" | "tinh" | "su",
): number {
  let base = 60;

  if (tuongSinh.includes("sinh")) base += 20;
  else if (tuongSinh.includes("khac")) base -= 15;

  base += may.length * 5;
  base -= can_than.length * 4;

  // Điều chỉnh theo lĩnh vực
  const bonus: Record<string, Record<string, number>> = {
    tai: { sinh: 10, khac: -10, hoa: 0 },
    suc: { sinh: 5, khac: -5, hoa: 5 },
    tinh: { sinh: 8, khac: -8, hoa: 3 },
    su: { sinh: 8, khac: -12, hoa: 2 },
  };

  const key = tuongSinh.includes("sinh")
    ? "sinh"
    : tuongSinh.includes("khac")
      ? "khac"
      : "hoa";
  base += bonus[linhVuc]?.[key] || 0;

  return Math.max(20, Math.min(98, base));
}

export function getDateStr(date: Date): string {
  return `${date.getDate()} THÁNG ${String(date.getMonth() + 1).padStart(2, "0")} • ${date.getFullYear()}`;
}
