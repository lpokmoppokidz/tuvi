/**
 * Tử Vi Đẩu Số – Nam Tông Calculator
 * Dựa theo tài liệu docs/13-namtong/
 */
import { Solar, Lunar } from "lunar-javascript";

import { TUVI_DATA } from "@/data/constants/ui/tuvi-data";

// ─── Constants ────────────────────────────────────────────────────────────────
export const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"] as const;
export const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"] as const;

export type DiaChi = typeof CHI[number];
export type ThienCan = typeof CAN[number];
export type TrangThai = "Miếu" | "Vượng" | "Đắc" | "Bình" | "Hãm";
export type CucType = "Thuy2" | "Moc3" | "Kim4" | "Tho5" | "Hoa6";

// index chuẩn: Tý=0 ... Hợi=11
export const CHI_IDX: Record<DiaChi, number> = {
  "Tý":0,"Sửu":1,"Dần":2,"Mão":3,"Thìn":4,"Tỵ":5,
  "Ngọ":6,"Mùi":7,"Thân":8,"Dậu":9,"Tuất":10,"Hợi":11,
};
export const IDX_CHI = CHI as readonly string[];

function mod(n: number, m: number) { return ((n % m) + m) % m; }

// ─── Nạp âm ngũ hành (60 hoa giáp) ───────────────────────────────────────────
const NAP_AM: Record<string, string> = {
  "Giáp Tý":"Kim","Ất Sửu":"Kim","Bính Dần":"Hỏa","Đinh Mão":"Hỏa",
  "Mậu Thìn":"Mộc","Kỷ Tỵ":"Mộc","Canh Ngọ":"Thổ","Tân Mùi":"Thổ",
  "Nhâm Thân":"Kim","Quý Dậu":"Kim","Giáp Tuất":"Hỏa","Ất Hợi":"Hỏa",
  "Bính Tý":"Thủy","Đinh Sửu":"Thủy","Mậu Dần":"Thổ","Kỷ Mão":"Thổ",
  "Canh Thìn":"Mộc","Tân Tỵ":"Mộc","Nhâm Ngọ":"Mộc","Quý Mùi":"Mộc",
  "Giáp Thân":"Thủy","Ất Dậu":"Thủy","Bính Tuất":"Thổ","Đinh Hợi":"Thổ",
  "Mậu Tý":"Hỏa","Kỷ Sửu":"Hỏa","Canh Dần":"Mộc","Tân Mão":"Mộc",
  "Nhâm Thìn":"Thủy","Quý Tỵ":"Thủy","Giáp Ngọ":"Kim","Ất Mùi":"Kim",
  "Bính Thân":"Hỏa","Đinh Dậu":"Hỏa","Mậu Tuất":"Mộc","Kỷ Hợi":"Mộc",
  "Canh Tý":"Thổ","Tân Sửu":"Thổ","Nhâm Dần":"Kim","Quý Mão":"Kim",
  "Giáp Thìn":"Hỏa","Ất Tỵ":"Hỏa","Bính Ngọ":"Thủy","Đinh Mùi":"Thủy",
  "Mậu Thân":"Thổ","Kỷ Dậu":"Thổ","Canh Tuất":"Kim","Tân Hợi":"Kim",
  "Nhâm Tý":"Mộc","Quý Sửu":"Mộc","Giáp Dần":"Thủy","Ất Mão":"Thủy",
  "Bính Thìn":"Thổ","Đinh Tỵ":"Thổ","Mậu Ngọ":"Hỏa","Kỷ Mùi":"Hỏa",
  "Canh Thân":"Mộc","Tân Dậu":"Mộc","Nhâm Tuất":"Thủy","Quý Hợi":"Thủy",
};

// ─── Lập Cục theo Can năm + Chi cung Mệnh ─────────────────────────────────────
// Nhóm chi: A=Dần/Ngọ/Tuất, B=Thân/Tý/Thìn, C=Tỵ/Dậu/Sửu, D=Hợi/Mão/Mùi
// Bảng đầy đủ 10 Can × 4 nhóm Chi
function getChiGroup(chi: DiaChi): "A"|"B"|"C"|"D" {
  if (["Dần","Ngọ","Tuất"].includes(chi)) return "A";
  if (["Thân","Tý","Thìn"].includes(chi)) return "B";
  if (["Tỵ","Dậu","Sửu"].includes(chi))  return "C";
  return "D"; // Hợi, Mão, Mùi
}

const CUC_TABLE: Record<ThienCan, Record<"A"|"B"|"C"|"D", CucType>> = {
  "Giáp": { A:"Hoa6", B:"Thuy2", C:"Tho5", D:"Moc3" },
  "Ất":   { A:"Kim4", B:"Tho5",  C:"Hoa6", D:"Thuy2" },
  "Bính": { A:"Moc3", B:"Hoa6",  C:"Kim4", D:"Tho5" },
  "Đinh": { A:"Tho5", B:"Moc3",  C:"Thuy2", D:"Hoa6" },
  "Mậu":  { A:"Hoa6", B:"Thuy2", C:"Tho5", D:"Moc3" },
  "Kỷ":   { A:"Hoa6", B:"Thuy2", C:"Tho5", D:"Moc3" },
  "Canh": { A:"Kim4", B:"Tho5",  C:"Hoa6", D:"Thuy2" },
  "Tân":  { A:"Moc3", B:"Hoa6",  C:"Kim4", D:"Tho5" },
  "Nhâm": { A:"Tho5", B:"Moc3",  C:"Thuy2", D:"Hoa6" },
  "Quý":  { A:"Hoa6", B:"Moc3",  C:"Thuy2", D:"Kim4" },
};

const CUC_SO: Record<CucType, number> = {
  Thuy2:2, Moc3:3, Kim4:4, Tho5:5, Hoa6:6,
};

export const CUC_LABEL: Record<CucType, string> = {
  Thuy2:"Thủy nhị cục", Moc3:"Mộc tam cục",
  Kim4:"Kim tứ cục",    Tho5:"Thổ ngũ cục", Hoa6:"Hỏa lục cục",
};

// ─── An Mệnh cung & Thân cung (Nam Tông chuẩn) ────────────────────────────────
// Dần = index 2 trên CHI array
// Tháng giêng khởi tại Dần, đếm thuận
// Từ cung tháng: Mệnh = đếm NGHỊCH theo giờ; Thân = đếm THUẬN theo giờ
function getMenhThanCung(thangAm: number, gioChiIdx: number): { menhIdx: number; thanIdx: number } {
  const menhBase = mod(2 + thangAm - 1, 12); // Dần + tháng - 1 (thuận)
  const menhIdx  = mod(menhBase - gioChiIdx, 12); // nghịch theo giờ
  const thanIdx  = mod(menhBase + gioChiIdx, 12); // thuận theo giờ
  return { menhIdx, thanIdx };
}

// ─── 12 cung chức danh từ Mệnh (thuận chiều) ─────────────────────────────────
const CUNG_KEYS = [
  "menh","phu_mau","phuc_duc","dien_trach","quan_loc","no_boc",
  "thien_di","tat_ach","tai_bach","tu_tuc","phu_the","huynh_de",
] as const;
export type CungKey = typeof CUNG_KEYS[number];

export const CUNG_TEN: Record<CungKey, string> = {
  menh:"Mệnh", phu_mau:"Phụ Mẫu", phuc_duc:"Phúc Đức", dien_trach:"Điền Trạch",
  quan_loc:"Quan Lộc", no_boc:"Nô Bộc", thien_di:"Thiên Di", tat_ach:"Tật Ách",
  tai_bach:"Tài Bạch", tu_tuc:"Tử Tức", phu_the:"Phu Thê", huynh_de:"Huynh Đệ",
};

// ─── Vị trí Tử Vi (chuẩn Nam Tông) ──────────────────────────────────────────
function findTuViPosition(ngayAm: number, cucSo: number): number {
  let N = ngayAm;
  while (N % cucSo !== 0 || N / cucSo > 12) N++;
  const step = N / cucSo;
  return mod(2 + step - 1, 12); // Dần=2 là gốc
}

// ─── 14 Chính tinh ────────────────────────────────────────────────────────────
function an14ChinhTinh(tuViIdx: number): Record<string, number> {
  const pf = (offset: number) => mod(tuViIdx - offset, 12);
  const thiPhuIdx = mod(tuViIdx + 8, 12); // công thức đối xứng qua trục Dần-Thân (theo tuvi.vn)
  const tf = (offset: number) => mod(thiPhuIdx + offset, 12);

  return {
    "Tử Vi":     tuViIdx,
    "Thiên Cơ":  pf(1),
    "Thái Dương": pf(3),
    "Vũ Khúc":   pf(4),
    "Thiên Đồng": pf(5),
    "Liêm Trinh": pf(8),
    "Thiên Phủ":  thiPhuIdx,
    "Thái Âm":   tf(1),
    "Tham Lang":  tf(2),
    "Cự Môn":    tf(3),
    "Thiên Tướng": tf(4),
    "Thiên Lương": tf(5),
    "Thất Sát":  tf(6),
    "Phá Quân":  tf(10),
  };
}

// ─── Bảng trạng thái 14 chính tinh (theo chuẩn Nam Tông – Tử Vi Chính Biện) ──
// Index cột theo CHI: Tý=0,Sửu=1,...,Hợi=11
const BRIGHTNESS_TABLE: Record<string, TrangThai[]> = {
  //              Tý    Sửu   Dần   Mão   Thìn  Tỵ    Ngọ   Mùi   Thân  Dậu   Tuất  Hợi
  "Tử Vi":      ["Đắc","Bình","Miếu","Bình","Miếu","Bình","Đắc","Bình","Miếu","Bình","Miếu","Bình"],
  "Thiên Cơ":   ["Đắc","Hãm","Miếu","Vượng","Đắc","Hãm","Hãm","Đắc","Bình","Vượng","Miếu","Đắc"],
  "Thái Dương":  ["Hãm","Hãm","Vượng","Miếu","Đắc","Đắc","Miếu","Đắc","Bình","Bình","Hãm","Hãm"],
  "Vũ Khúc":    ["Miếu","Đắc","Hãm","Bình","Miếu","Đắc","Hãm","Bình","Miếu","Vượng","Hãm","Bình"],
  "Thiên Đồng":  ["Vượng","Hãm","Bình","Đắc","Hãm","Hãm","Miếu","Vượng","Bình","Đắc","Bình","Miếu"],
  "Liêm Trinh":  ["Bình","Đắc","Hãm","Bình","Miếu","Bình","Bình","Đắc","Hãm","Bình","Miếu","Bình"],
  "Thiên Phủ":   ["Miếu","Vượng","Bình","Bình","Đắc","Miếu","Bình","Bình","Miếu","Vượng","Đắc","Bình"],
  "Thái Âm":    ["Miếu","Vượng","Hãm","Đắc","Hãm","Hãm","Hãm","Hãm","Đắc","Miếu","Vượng","Vượng"],
  "Tham Lang":   ["Bình","Miếu","Vượng","Hãm","Bình","Miếu","Hãm","Miếu","Vượng","Hãm","Bình","Bình"],
  "Cự Môn":     ["Hãm","Bình","Hãm","Miếu","Bình","Hãm","Hãm","Bình","Miếu","Đắc","Bình","Hãm"],
  "Thiên Tướng": ["Miếu","Bình","Đắc","Bình","Miếu","Bình","Miếu","Bình","Đắc","Bình","Miếu","Bình"],
  "Thiên Lương": ["Đắc","Vượng","Miếu","Đắc","Bình","Hãm","Vượng","Bình","Hãm","Đắc","Bình","Miếu"],
  "Thất Sát":   ["Hãm","Bình","Miếu","Hãm","Hãm","Miếu","Hãm","Hãm","Miếu","Hãm","Hãm","Miếu"],
  "Phá Quân":   ["Hãm","Miếu","Miếu","Hãm","Hãm","Miếu","Hãm","Miếu","Miếu","Hãm","Hãm","Miếu"],
};

function getBrightness(starName: string, chiIdx: number): TrangThai {
  return BRIGHTNESS_TABLE[starName]?.[chiIdx] ?? "Bình";
}

// ─── Tứ Hóa (gán vào sao theo Can năm) ───────────────────────────────────────
const TU_HOA_TABLE: Record<ThienCan, { loc: string; quyen: string; khoa: string; ky: string }> = {
  "Giáp": { loc:"Liêm Trinh", quyen:"Phá Quân",   khoa:"Vũ Khúc",    ky:"Thái Dương" },
  "Ất":   { loc:"Thiên Cơ",  quyen:"Thiên Lương", khoa:"Tử Vi",      ky:"Thái Âm"   },
  "Bính": { loc:"Thiên Đồng",quyen:"Thiên Cơ",    khoa:"Văn Xương",  ky:"Liêm Trinh"},
  "Đinh": { loc:"Thái Âm",   quyen:"Thiên Đồng",  khoa:"Thiên Cơ",   ky:"Cự Môn"    },
  "Mậu":  { loc:"Tham Lang", quyen:"Thái Âm",     khoa:"Hữu Bật",    ky:"Thiên Cơ"  },
  "Kỷ":   { loc:"Vũ Khúc",   quyen:"Tham Lang",   khoa:"Thiên Lương", ky:"Văn Khúc" },
  "Canh": { loc:"Thái Dương",quyen:"Vũ Khúc",     khoa:"Thái Âm",    ky:"Thiên Đồng"},
  "Tân":  { loc:"Cự Môn",    quyen:"Thái Dương",  khoa:"Văn Xương",  ky:"Văn Khúc"  },
  "Nhâm": { loc:"Thiên Lương",quyen:"Tử Vi",      khoa:"Tả Phụ",     ky:"Vũ Khúc"   },
  "Quý":  { loc:"Phá Quân",  quyen:"Cự Môn",      khoa:"Thái Âm",    ky:"Tham Lang" },
};

// ─── Phụ tinh theo Can năm ────────────────────────────────────────────────────
const LOC_TON_IDX: Record<ThienCan, number> = {
  "Giáp":2,"Ất":3,"Bính":5,"Đinh":6,"Mậu":5,"Kỷ":6,
  "Canh":8,"Tân":9,"Nhâm":11,"Quý":0,
};

const KHOI_VIET: Record<ThienCan, [number, number]> = {
  "Giáp":[1,7],"Mậu":[1,7],
  "Ất":[0,8],"Kỷ":[0,8],
  "Bính":[11,9],"Đinh":[11,9],
  "Canh":[6,2],"Tân":[6,2],
  "Nhâm":[3,5],"Quý":[3,5],
};

const THIEN_QUAN_IDX: Record<ThienCan, number> = {
  "Giáp":7,"Ất":8,"Bính":9,"Đinh":11,"Mậu":1,
  "Kỷ":0,"Canh":2,"Tân":3,"Nhâm":5,"Quý":6,
};
const THIEN_PHUC_IDX: Record<ThienCan, number> = {
  "Giáp":9,"Ất":11,"Bính":0,"Đinh":2,"Mậu":3,
  "Kỷ":5,"Canh":6,"Tân":8,"Nhâm":9,"Quý":10,
};

// Văn Xương & Văn Khúc (theo Can năm - chuẩn tuvi.vn)
const VAN_XUONG_IDX: Record<ThienCan, number> = {
  "Giáp":10,"Ất":9,"Bính":8,"Đinh":7,"Mậu":6,
  "Kỷ":5,"Canh":4,"Tân":3,"Nhâm":2,"Quý":11,
};
const VAN_KHUC_IDX: Record<ThienCan, number> = {
  "Giáp":4,"Ất":5,"Bính":6,"Đinh":7,"Mậu":8,
  "Kỷ":9,"Canh":10,"Tân":11,"Nhâm":0,"Quý":3,
};

// Hỏa Tinh & Linh Tinh (theo Chi năm - chuẩn tuvi.vn)
const HOA_TINH_IDX: Record<DiaChi, number> = {
  "Tý":9,"Sửu":10,"Dần":2,"Mão":3,"Thìn":9,"Tỵ":10,
  "Ngọ":9,"Mùi":4,"Thân":9,"Dậu":10,"Tuất":2,"Hợi":3,
};
const LINH_TINH_IDX: Record<DiaChi, number> = {
  "Tý":3,"Sửu":9,"Dần":10,"Mão":10,"Thìn":3,"Tỵ":9,
  "Ngọ":3,"Mùi":3,"Thân":3,"Dậu":9,"Tuất":10,"Hợi":10,
};

// ─── Phụ tinh theo Chi năm ────────────────────────────────────────────────────
const THIEN_MA_IDX: Record<DiaChi, number> = {
  "Dần":8,"Ngọ":8,"Tuất":8, "Thân":2,"Tý":2,"Thìn":2,
  "Tỵ":11,"Dậu":11,"Sửu":11, "Hợi":5,"Mão":5,"Mùi":5,
};

const HONG_LOAN_IDX: Record<DiaChi, number> = {
  "Tý":3,"Sửu":2,"Dần":1,"Mão":0,"Thìn":11,"Tỵ":10,
  "Ngọ":9,"Mùi":8,"Thân":7,"Dậu":6,"Tuất":5,"Hợi":4,
};

const LONG_TRI_IDX: Record<DiaChi, number> = {
  "Tý":4,"Sửu":5,"Dần":6,"Mão":7,"Thìn":8,"Tỵ":9,
  "Ngọ":10,"Mùi":11,"Thân":0,"Dậu":1,"Tuất":2,"Hợi":3,
};

const KIEP_SAT_IDX: Record<DiaChi, number> = {
  "Dần":11,"Ngọ":11,"Tuất":11, "Thân":5,"Tý":5,"Thìn":5,
  "Tỵ":2,"Dậu":2,"Sửu":2,     "Hợi":8,"Mão":8,"Mùi":8,
};

const HOA_CAI_IDX: Record<DiaChi, number> = {
  "Dần":4,"Ngọ":4,"Tuất":4,   "Thân":10,"Tý":10,"Thìn":10,
  "Tỵ":7,"Dậu":7,"Sửu":7,     "Hợi":1,"Mão":1,"Mùi":1,
};

// ─── Vòng Thái Tuế (12 sao, khởi tại chi năm, thuận) ──────────────────────────
const THAI_TUE_VONG = TUVI_DATA.categories.ba_vong_36.subgroups[1].stars;

// ─── Vòng Lộc Tồn (12 sao, khởi tại Lộc Tồn, thuận) ──────────────────────────
const LOC_TON_VONG = TUVI_DATA.categories.ba_vong_36.subgroups[0].stars;

// ─── Vòng Tràng Sinh (12 sao) ─────────────────────────────────────────────────
const TRANG_SINH_VONG = TUVI_DATA.categories.ba_vong_36.subgroups[2].stars;

const TRANG_SINH_START: Record<CucType, number> = {
  Thuy2:8, Moc3:11, Kim4:5, Tho5:8, Hoa6:2,
};

// ─── An sao theo tháng sinh ───────────────────────────────────────────────────
function getThienHinh(thang: number): number { return mod(9 + thang - 1, 12); }
function getThienDieu(thang: number): number { return mod(0 - thang + 1, 12); }
function getGiaiThan(thang: number): number  { return mod(8 + thang - 1, 12); }
function getThienY(thang: number): number    { return mod(1 + thang - 1, 12); }
function getThaiFu(thang: number): number    { return mod(5 + thang - 1, 12); }
function getPhongCao(thang: number): number  { return mod(10 - thang + 1, 12); }
function getNguyetDuc(thang: number): number { return mod(2 + thang - 1, 12); }
function getTaPhu(thang: number): number     { return mod(4 + thang - 1, 12); }
function getHuuBat(thang: number): number    { return mod(10 - thang + 1, 12); }

// ─── An sao theo giờ sinh ─────────────────────────────────────────────────────
function getVanXuong(gioIdx: number): number { return mod(10 - gioIdx, 12); }
function getVanKhuc(gioIdx: number): number  { return mod(4 + gioIdx, 12); }
function getDiaKhong(gioIdx: number): number { return mod(11 - gioIdx, 12); }
function getDiaKiep(gioIdx: number): number  { return mod(11 + gioIdx, 12); }

// ─── An sao theo ngày sinh ────────────────────────────────────────────────────
function getTamThai(ngay: number): number { return mod(2 + ngay - 1, 12); }
function getBatToa(ngay: number): number  { return mod(10 - ngay + 1, 12); }
function getAnQuang(ngay: number): number { return mod(0 + ngay - 1, 12); }
function getThienQuy(ngay: number): number { return mod(6 - ngay + 1, 12); }

// ─── Tuần Không ──────────────────────────────────────────────────────────────
function getTuanKhong(canNgayIdx: number, chiNgayIdx: number): [number, number] {
  // Tìm ngày Giáp đầu tuần: chiGiap = chiNgayIdx - canNgayIdx
  const chiGiapIdx = mod(chiNgayIdx - canNgayIdx, 12);
  // 2 cung cuối tuần (sau 10 can) là Tuần Không
  const tuan1 = mod(chiGiapIdx + 10, 12);
  const tuan2 = mod(chiGiapIdx + 11, 12);
  return [tuan1, tuan2];
}

// ─── Triệt Lộ ────────────────────────────────────────────────────────────────
const TRIET_LO_TABLE: Record<ThienCan, [number, number]> = {
  "Giáp":[8,9],"Kỷ":[8,9],
  "Ất":[6,7],"Canh":[6,7],
  "Bính":[4,5],"Tân":[4,5],
  "Đinh":[2,3],"Nhâm":[2,3],
  "Mậu":[0,1],"Quý":[0,1],
};

// ─── Giờ sinh → chi index ────────────────────────────────────────────────────
function getGioChiIdx(gio: number, phut: number): number {
  const h = gio + phut / 60;
  if (h >= 23 || h < 1)  return 0;  // Tý
  if (h < 3)  return 1;  // Sửu
  if (h < 5)  return 2;  // Dần
  if (h < 7)  return 3;  // Mão
  if (h < 9)  return 4;  // Thìn
  if (h < 11) return 5;  // Tỵ
  if (h < 13) return 6;  // Ngọ
  if (h < 15) return 7;  // Mùi
  if (h < 17) return 8;  // Thân
  if (h < 19) return 9;  // Dậu
  if (h < 21) return 10; // Tuất
  return 11;              // Hợi
}

// ─── Parse ngày linh hoạt ────────────────────────────────────────────────────
function parseDate(s: string): [number, number, number] {
  const p = s.split(/[\/\-]/).map(Number);
  if (p[0] > 1000) return [p[2], p[1], p[0]];
  return [p[0], p[1], p[2]];
}

function parseCanChi(gz: string): { can: ThienCan; chi: DiaChi; canIdx: number; chiIdx: number } {
  const CAN_HAN: Record<string, ThienCan> = {
    '甲':'Giáp','乙':'Ất','丙':'Bính','丁':'Đinh','戊':'Mậu',
    '己':'Kỷ','庚':'Canh','辛':'Tân','壬':'Nhâm','癸':'Quý'
  };
  const CHI_HAN: Record<string, DiaChi> = {
    '子':'Tý','丑':'Sửu','寅':'Dần','卯':'Mão','辰':'Thìn','巳':'Tỵ',
    '午':'Ngọ','未':'Mùi','申':'Thân','酉':'Dậu','戌':'Tuất','亥':'Hợi'
  };
  if (CAN_HAN[gz[0]] && CHI_HAN[gz[1]]) {
    const can = CAN_HAN[gz[0]]; const chi = CHI_HAN[gz[1]];
    return { can, chi, canIdx: CAN.indexOf(can), chiIdx: CHI_IDX[chi] };
  }
  for (const c of CAN) {
    if (gz.startsWith(c)) {
      const can = c as ThienCan;
      const chiStr = gz.slice(c.length).trim() as DiaChi;
      return { can, chi: chiStr, canIdx: CAN.indexOf(c), chiIdx: CHI_IDX[chiStr] ?? 0 };
    }
  }
  return { can: "Giáp", chi: "Tý", canIdx: 0, chiIdx: 0 };
}

// ─── Kiểu dữ liệu output ──────────────────────────────────────────────────────
export interface NamTongStar {
  name: string;
  type: "chinh_tinh" | "phu_tinh" | "sao_luu";
  brightness?: TrangThai;
  tuHoa?: "Hóa Lộc" | "Hóa Quyền" | "Hóa Khoa" | "Hóa Kỵ";
  isTuanKhong?: boolean;
  isTrIetLo?: boolean;
}

export interface NamTongCung {
  index: number;       // 0-11 (CHI index: Tý=0)
  diaChi: DiaChi;
  hanhCung: string;
  chucDanh: string;
  cungKey: CungKey;
  isMenh: boolean;
  isThan: boolean;
  isTuanKhong: boolean;
  isTrIetLo: boolean;
  stars: NamTongStar[];
}

export interface NamTongLaSo {
  // Thông tin
  hoTen: string;
  gioiTinh: string;
  duongLich: string;
  amLich: string;
  gioSinh: string;
  gioChi: DiaChi;
  canChiNam: string;
  canNam: ThienCan;
  chiNam: DiaChi;
  amDuong: "Dương" | "Âm";
  banMenhHanh: string;
  cuc: CucType;
  cucSo: number;
  // Địa bàn
  cungs: NamTongCung[];         // array 12 phần tử index theo CHI (Tý=0)
  menhCungIndex: number;         // CHI index
  thanCungIndex: number;
  // Tuần/Triệt
  tuanKhong: [number, number];
  trietLo: [number, number];
  // Vận Hạn
  luuSao?: { name: string; cung: string; dia_chi: string; offset: number }[];
  van_han?: any; // Compatibility for UI
}

// ─── Ngũ hành cung theo địa chi ───────────────────────────────────────────────
const DIA_CHI_HANH: Record<DiaChi, string> = {
  "Tý":"Thủy","Sửu":"Thổ","Dần":"Mộc","Mão":"Mộc","Thìn":"Thổ","Tỵ":"Hỏa",
  "Ngọ":"Hỏa","Mùi":"Thổ","Thân":"Kim","Dậu":"Kim","Tuất":"Thổ","Hợi":"Thủy",
};

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function calculateNamTong(input: {
  ho_ten: string;
  ngay_sinh: string;   // DD/MM/YYYY hoặc YYYY-MM-DD
  loai_lich: string;   // "duong" | "am"
  gio_sinh: string;    // "HH:MM"
  gioi_tinh: string;   // "Nam" | "Nữ"
}): NamTongLaSo {
  const { ho_ten, ngay_sinh, loai_lich, gio_sinh, gioi_tinh } = input;

  // 1. Parse ngày → âm lịch
  const [d, m, y] = parseDate(ngay_sinh);
  const isDuong = /duong|solar|dương/i.test(loai_lich);
  let lunar: any;
  if (isDuong) {
    lunar = Solar.fromYmd(y, m, d).getLunar();
  } else {
    lunar = Lunar.fromYmd(y, m, d);
  }
  const namAm   = lunar.getYear();
  const thangAm = Math.abs(lunar.getMonth());
  const ngayAm  = lunar.getDay();

  // 2. Can Chi năm sinh
  const canChiNamRaw = lunar.getYearInGanZhi ? lunar.getYearInGanZhi() : "";
  let canNamObj = parseCanChi(canChiNamRaw);
  if (!canNamObj.can) {
    const canNamIdx = mod(namAm - 4, 10);
    const chiNamIdx = mod(namAm - 4, 12);
    canNamObj = { can: CAN[canNamIdx], chi: CHI[chiNamIdx] as DiaChi, canIdx: canNamIdx, chiIdx: chiNamIdx };
  }
  const canNam = canNamObj.can;
  const chiNam = canNamObj.chi;
  const canNamIdx = canNamObj.canIdx;
  const chiNamIdx = canNamObj.chiIdx;

  // Can Chi ngày sinh
  const canChiNgayRaw = lunar.getDayInGanZhi ? lunar.getDayInGanZhi() : "";
  const ngayObj = parseCanChi(canChiNgayRaw);
  const canNgayIdx = ngayObj.canIdx;
  const chiNgayIdx = ngayObj.chiIdx;

  // 3. Giờ sinh → chi index
  const [gio, phut] = gio_sinh.split(":").map(Number);
  const gioChiIdx = getGioChiIdx(gio, phut);
  const gioChi = CHI[gioChiIdx] as DiaChi;

  // 4. Bản mệnh (nạp âm ngũ hành)
  const banMenhHanh = NAP_AM[`${canNam} ${chiNam}`] || "Mộc";

  // 5. Âm dương
  const amDuong: "Dương" | "Âm" = canNamIdx % 2 === 0 ? "Dương" : "Âm";

  // 6. Mệnh cung & Thân cung
  const { menhIdx, thanIdx } = getMenhThanCung(thangAm, gioChiIdx);
  const menhDiaChi = CHI[menhIdx] as DiaChi;

  // 7. Lập Cục
  const chiGroup = getChiGroup(menhDiaChi);
  const cuc = CUC_TABLE[canNam]?.[chiGroup] ?? "Moc3";
  const cucSo = CUC_SO[cuc];

  // 8. An 14 chính tinh
  const tuViIdx = findTuViPosition(ngayAm, cucSo);
  const chinhTinhPos = an14ChinhTinh(tuViIdx);

  // 9. Tứ hóa
  const tuHoaMap = TU_HOA_TABLE[canNam];

  // 10. Tuần Không & Triệt Lộ
  const tuanKhong = getTuanKhong(canNgayIdx, chiNgayIdx);
  const trietLo = TRIET_LO_TABLE[canNam];

  // 11. Khởi tạo 12 cung (index theo CHI: Tý=0)
  const cungMap: NamTongCung[] = CHI.map((c, i) => ({
    index: i,
    diaChi: c as DiaChi,
    hanhCung: DIA_CHI_HANH[c as DiaChi],
    chucDanh: "",
    cungKey: "menh" as CungKey,
    isMenh: i === menhIdx,
    isThan: i === thanIdx,
    isTuanKhong: tuanKhong.includes(i),
    isTrIetLo: trietLo ? trietLo.includes(i) : false,
    stars: [],
  }));

  // 12. An 12 cung chức danh (từ Mệnh, đi thuận)
  for (let i = 0; i < 12; i++) {
    const idx = mod(menhIdx + i, 12);
    cungMap[idx].cungKey = CUNG_KEYS[i];
    cungMap[idx].chucDanh = CUNG_TEN[CUNG_KEYS[i]];
  }

  // Helper: thêm sao vào cung
  const addStar = (chiIdx: number, star: NamTongStar) => {
    if (chiIdx < 0 || chiIdx > 11) return;
    const cung = cungMap[chiIdx];

    // Áp dụng chuẩn hóa tên sao theo TUVI_DATA aliases
    const aliases = TUVI_DATA.aliases as Record<string, string>;
    if (aliases[star.name]) {
      star.name = aliases[star.name];
    }

    // Phân loại tự động theo TUVI_DATA thay vì gán tĩnh
    if ((TUVI_DATA.categories.chinh_tinh_14.stars as readonly string[]).includes(star.name)) {
      star.type = "chinh_tinh";
    } else {
      star.type = "phu_tinh";
    }

    star.isTuanKhong = cung.isTuanKhong;
    star.isTrIetLo = cung.isTrIetLo;
    cung.stars.push(star);
  };

  // 13. An 14 chính tinh + trạng thái + tứ hóa
  for (const [name, idx] of Object.entries(chinhTinhPos)) {
    const brightness = getBrightness(name, idx);
    let tuHoa: NamTongStar["tuHoa"] = undefined;
    if (tuHoaMap) {
      if (name === tuHoaMap.loc)   tuHoa = "Hóa Lộc";
      if (name === tuHoaMap.quyen) tuHoa = "Hóa Quyền";
      if (name === tuHoaMap.khoa)  tuHoa = "Hóa Khoa";
      if (name === tuHoaMap.ky)    tuHoa = "Hóa Kỵ";
    }
    addStar(idx, { name, type: "chinh_tinh", brightness, tuHoa });
  }

  // Helper phuTinh
  const addPhu = (idx: number, name: string, tuHoa?: NamTongStar["tuHoa"]) => {
    addStar(mod(idx, 12), { name, type: "phu_tinh", tuHoa });
  };

  // 14. Lộc Tồn, Kình Dương, Đà La
  const locTonIdx = LOC_TON_IDX[canNam];
  addPhu(locTonIdx, "Lộc Tồn");
  addPhu(locTonIdx + 1, "Kình Dương");
  addPhu(locTonIdx - 1, "Đà La");

  // 15. Vòng Lộc Tồn (Bác Sỹ) 12 sao
  // Trong data mới (Vòng Lộc Tồn (Bác Sỹ)), sao đầu tiên là "Bác Sỹ", bắt đầu tại cung có Lộc Tồn
  const isNamDuongLoc = (gioi_tinh.includes("Nam") && amDuong === "Dương") ||
                        (gioi_tinh.includes("Nữ")  && amDuong === "Âm");
  const locDir = isNamDuongLoc ? 1 : -1;
  for (let i = 0; i < 12; i++) { 
    addPhu(locTonIdx + locDir * i, LOC_TON_VONG[i]);
  }

  // 16. Vòng Thái Tuế 12 sao (khởi tại chi năm)
  for (let i = 0; i < 12; i++) {
    addPhu(chiNamIdx + i, THAI_TUE_VONG[i]);
  }

  // 17. Vòng Tràng Sinh 12 sao
  const tsStart = TRANG_SINH_START[cuc];
  const isNamDuong = (gioi_tinh.includes("Nam") && amDuong === "Dương") ||
                     (gioi_tinh.includes("Nữ")  && amDuong === "Âm");
  const tsDir = isNamDuong ? 1 : -1;
  for (let i = 0; i < 12; i++) {
    addPhu(tsStart + tsDir * i, TRANG_SINH_VONG[i]);
  }

  // 18. Phụ tinh theo Can năm
  const [khoiIdx, vietIdx] = KHOI_VIET[canNam] ?? [0, 0];
  addPhu(khoiIdx, "Thiên Khôi");
  addPhu(vietIdx, "Thiên Việt");
  addPhu(THIEN_QUAN_IDX[canNam], "Thiên Quan");
  addPhu(THIEN_PHUC_IDX[canNam], "Thiên Phúc");

  // Văn Xương / Văn Khúc (theo Can năm – bảng cố định theo tuvi.vn)
  addPhu(VAN_XUONG_IDX[canNam], "Văn Xương",
    tuHoaMap?.khoa === "Văn Xương" ? "Hóa Khoa" :
    tuHoaMap?.ky   === "Văn Xương" ? "Hóa Kỵ" : undefined);
  addPhu(VAN_KHUC_IDX[canNam],  "Văn Khúc",
    tuHoaMap?.ky   === "Văn Khúc"  ? "Hóa Kỵ" : undefined);

  // 19. Phụ tinh theo Chi năm
  addPhu(THIEN_MA_IDX[chiNam], "Thiên Mã");
  addPhu(HONG_LOAN_IDX[chiNam], "Hồng Loan");
  addPhu(mod(HONG_LOAN_IDX[chiNam] + 6, 12), "Thiên Hỷ");
  addPhu(LONG_TRI_IDX[chiNam], "Long Trì");
  addPhu(mod(LONG_TRI_IDX[chiNam] + 6, 12), "Phượng Các");
  addPhu(KIEP_SAT_IDX[chiNam], "Kiếp Sát");
  addPhu(HOA_CAI_IDX[chiNam], "Hoa Cái");
  
  // Hỏa Tinh & Linh Tinh (theo Chi năm - chuẩn tuvi.vn)
  addPhu(HOA_TINH_IDX[chiNam], "Hỏa Tinh");
  addPhu(LINH_TINH_IDX[chiNam], "Linh Tinh");

  // Thiên Tài: từ Mệnh đếm thuận = chiNamIdx bước
  addPhu(menhIdx + chiNamIdx, "Thiên Tài");
  // Thiên Thọ: từ Thân đếm thuận = chiNamIdx bước
  addPhu(thanIdx + chiNamIdx, "Thiên Thọ");

  // 20. Phụ tinh theo Tháng
  addPhu(getTaPhu(thangAm),   "Tả Phụ",
    tuHoaMap?.khoa === "Tả Phụ" ? "Hóa Khoa" : undefined);
  addPhu(getHuuBat(thangAm),  "Hữu Bật",
    tuHoaMap?.khoa === "Hữu Bật" ? "Hóa Khoa" : undefined);
  addPhu(getThienHinh(thangAm), "Thiên Hình");
  addPhu(getThienDieu(thangAm), "Thiên Diêu");
  addPhu(getGiaiThan(thangAm),  "Giải Thần");
  addPhu(getThienY(thangAm),    "Thiên Y");
  addPhu(getThaiFu(thangAm),    "Thai Phụ");
  addPhu(getPhongCao(thangAm),  "Phong Cáo");
  addPhu(getNguyetDuc(thangAm), "Nguyệt Đức");

  // 21. Phụ tinh theo Giờ
  addPhu(getDiaKhong(gioChiIdx), "Địa Không");
  addPhu(getDiaKiep(gioChiIdx),  "Địa Kiếp");

  // 22. Phụ tinh theo Ngày
  addPhu(getTamThai(ngayAm), "Tam Thai");
  addPhu(getBatToa(ngayAm),  "Bát Tọa");
  addPhu(getAnQuang(ngayAm), "Ân Quang");
  addPhu(getThienQuy(ngayAm), "Thiên Quý");

  // ═══════════════════════════════════════════════════════════════════════════
  // 23. Bổ sung các sao còn thiếu theo TUVI_DATA (22 sao cố định)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Thần Sát: Cát tinh và phước đức ---

  // Quý Nhân (theo Can năm – cùng vị trí Thiên Khôi)
  addPhu(khoiIdx, "Quý Nhân");

  // Thiên Giải (theo tháng, nghịch từ Thân)
  addPhu(mod(8 - (thangAm - 1), 12), "Thiên Giải");

  // Địa Giải (theo tháng, thuận từ Hợi)
  addPhu(mod(11 + (thangAm - 1), 12), "Địa Giải");

  // Thiên Trù (theo Can năm)
  const THIEN_TRU_IDX: Record<ThienCan, number> = {
    "Giáp":9,"Ất":10,"Bính":11,"Đinh":0,"Mậu":1,
    "Kỷ":2,"Canh":3,"Tân":4,"Nhâm":5,"Quý":6,
  };
  addPhu(THIEN_TRU_IDX[canNam], "Thiên Trù");

  // --- Thần Sát: Hung tinh và bàng tinh ---

  // Đào Hoa (theo Chi năm – cùng cung Đào Hoa / Mộc Dục)
  const DAO_HOA_IDX: Record<DiaChi, number> = {
    "Dần":3,"Ngọ":3,"Tuất":3, "Thân":9,"Tý":9,"Thìn":9,
    "Tỵ":6,"Dậu":6,"Sửu":6,  "Hợi":0,"Mão":0,"Mùi":0,
  };
  addPhu(DAO_HOA_IDX[chiNam], "Đào Hoa");

  // Cô Thần (theo Chi năm)
  const CO_THAN_IDX: Record<DiaChi, number> = {
    "Dần":5,"Mão":5,"Thìn":5, "Tỵ":8,"Ngọ":8,"Mùi":8,
    "Thân":11,"Dậu":11,"Tuất":11, "Hợi":2,"Tý":2,"Sửu":2,
  };
  addPhu(CO_THAN_IDX[chiNam], "Cô Thần");

  // Quả Tú (theo Chi năm)
  const QUA_TU_IDX: Record<DiaChi, number> = {
    "Dần":1,"Mão":1,"Thìn":1, "Tỵ":4,"Ngọ":4,"Mùi":4,
    "Thân":7,"Dậu":7,"Tuất":7, "Hợi":10,"Tý":10,"Sửu":10,
  };
  addPhu(QUA_TU_IDX[chiNam], "Quả Tú");

  // Lưu Hà (theo Chi năm – nghịch từ Sửu)
  const LUU_HA_IDX: Record<DiaChi, number> = {
    "Tý":1,"Sửu":0,"Dần":11,"Mão":10,"Thìn":9,"Tỵ":8,
    "Ngọ":7,"Mùi":6,"Thân":5,"Dậu":4,"Tuất":3,"Hợi":2,
  };
  addPhu(LUU_HA_IDX[chiNam], "Lưu Hà");

  // Phá Toái (theo Chi năm)
  const PHA_TOAI_IDX: Record<DiaChi, number> = {
    "Tý":9,"Sửu":0,"Dần":6,"Mão":3,"Thìn":3,"Tỵ":6,
    "Ngọ":9,"Mùi":0,"Thân":3,"Dậu":6,"Tuất":9,"Hợi":0,
  };
  addPhu(PHA_TOAI_IDX[chiNam], "Phá Toái");

  // --- Không Vong (đã xử lý ở cung flags) ---
  // Tuần, Triệt đã được gán vào cung isTuanKhong/isTrIetLo

  // --- Bổ sung hệ thống ---

  // Thiên La (cố định tại Thìn)
  addPhu(4, "Thiên La");

  // Địa Võng (cố định tại Tuất)
  addPhu(10, "Địa Võng");

  // Thiên Riêu (theo tháng, nghịch từ Tuất)
  addPhu(mod(10 - (thangAm - 1), 12), "Thiên Riêu");

  // Thiên Hư (theo Chi năm – nghịch từ Ngọ)
  addPhu(mod(6 - chiNamIdx, 12), "Thiên Hư");

  // Thiên Khốc (theo Chi năm – thuận từ Ngọ)
  addPhu(mod(6 + chiNamIdx, 12), "Thiên Khốc");

  // Hoa Cái đã được an ở phần 19 (Chi năm)

  // Quốc Ấn (theo Can năm – nghịch từ Hợi)
  const QUOC_AN_IDX: Record<ThienCan, number> = {
    "Giáp":11,"Ất":10,"Bính":9,"Đinh":8,"Mậu":7,
    "Kỷ":6,"Canh":5,"Tân":4,"Nhâm":3,"Quý":2,
  };
  addPhu(QUOC_AN_IDX[canNam], "Quốc Ấn");

  // Đường Phù (theo Chi năm)
  const DUONG_PHU_IDX: Record<DiaChi, number> = {
    "Tý":0,"Sửu":3,"Dần":6,"Mão":9,"Thìn":0,"Tỵ":3,
    "Ngọ":6,"Mùi":9,"Thân":0,"Dậu":3,"Tuất":6,"Hợi":9,
  };
  addPhu(DUONG_PHU_IDX[chiNam], "Đường Phù");

  // Văn Tinh (theo Can năm – Văn Xương + 1)
  addPhu(mod(VAN_XUONG_IDX[canNam] + 1, 12), "Văn Tinh");

  // --- Phụ tinh trung tinh còn thiếu ---

  // Thiên Không (theo Chi năm – đối xứng qua trục)
  // Công thức: Thiên Không = (chiNamIdx + 1) mod 12 (cùng vị trí Thái Tuế + 1)
  // Lưu ý: Thiên Không khác Địa Không. An theo Giờ đối xứng.
  addPhu(mod(chiNamIdx + 1, 12), "Thiên Không");

  // Thiên Thương (theo Can năm – Lộc Tồn + 8, vòng Bác Sỹ)
  addPhu(mod(locTonIdx + 8, 12), "Thiên Thương");

  // Thiên Sứ (theo tháng – thuận từ Dần)
  addPhu(mod(thangAm + 1, 12), "Thiên Sứ");

  // Thiên Đức (theo tháng – nghịch từ Dậu)
  addPhu(mod(9 - (thangAm - 1), 12), "Thiên Đức");

  // Đẩu Quân (theo tháng sinh + giờ sinh)
  // Công thức chuẩn: Đẩu Quân = (thangAm - 1 + gioChiIdx + 2) mod 12
  // Khởi tại Dần, đếm thuận theo tháng rồi theo giờ
  addPhu(mod(2 + (thangAm - 1) + gioChiIdx, 12), "Đẩu Quân");

  // ═══════════════════════════════════════════════════════════════════════════
  // 24. Lưu sao (9 sao vận hạn)
  // Tính theo năm xem hạn (hiện tại tính theo năm sinh để tham chiếu)
  // Nếu có tính năng xem hạn sẽ truyền namXem, mặc định namXem = namAm.
  // ═══════════════════════════════════════════════════════════════════════════
  const namXem = new Date().getFullYear();
  let namXemChiIdx = chiNamIdx; // Tạm dùng chi năm sinh nếu không có input năm xem
  // Logic chuẩn lưu sao theo Can/Chi năm xem hạn:
  const LUU_SAO_OFFSETS: Array<{ name: string; offset: number }> = [
    { name: "Lưu Thái Tuế", offset: 0 },
    { name: "Lưu Tang Môn", offset: 4 },
    { name: "Lưu Bạch Hổ", offset: -4 },
    { name: "Lưu Thiên Khốc", offset: 8 },
    { name: "Lưu Thiên Hư", offset: 8 },
    { name: "Lưu Lộc Tồn", offset: 2 },
    { name: "Lưu Thiên Mã", offset: 3 },
    { name: "Lưu Kình Dương", offset: 6 },
    { name: "Lưu Đà La", offset: -3 },
  ];
  const luuSaoArray = LUU_SAO_OFFSETS.map(({ name, offset }) => {
    const cungIdx = mod(chiNamIdx + offset, 12);
    
    // Add directly to the palace's stars array
    cungMap[cungIdx].stars.push({
      name,
      type: "sao_luu",
      isTuanKhong: cungMap[cungIdx].isTuanKhong,
      isTrIetLo: cungMap[cungIdx].isTrIetLo,
    });

    return {
      name,
      cung: CUNG_KEYS[mod(cungIdx - menhIdx + 12, 12)],
      dia_chi: CHI[cungIdx],
      offset,
    };
  });

  return {
    hoTen: ho_ten,
    gioiTinh: gioi_tinh,
    duongLich: `${d}/${m}/${y}`,
    amLich: `${ngayAm}/${thangAm}/${namAm}`,
    gioSinh: gio_sinh,
    gioChi,
    canChiNam: `${canNam} ${chiNam}`,
    canNam,
    chiNam,
    amDuong,
    banMenhHanh,
    cuc,
    cucSo,
    cungs: cungMap,
    menhCungIndex: menhIdx,
    thanCungIndex: thanIdx,
    tuanKhong,
    trietLo: trietLo ?? [0, 1],
    luuSao: luuSaoArray,
    van_han: {
      nam_xem: namXem,
      tuoi_hien_tai: namXem - namAm + 1,
      cuu_phi_tinh: luuSaoArray,
      dai_han_hien_tai: null,
      tieu_han_hien_tai: null,
    },
  };
}
