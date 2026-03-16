// Cần cài đặt package: npm install lunar-javascript
import { Solar, Lunar } from "lunar-javascript";

// Bảng dữ liệu
const CAN = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];
const CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];
const CUNG = [
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
  "Tý",
  "Sửu",
];

const NAP_AM_NGU_HANH: Record<string, string> = {
  "Giáp Tý": "Kim",
  "Ất Sửu": "Kim",
  "Bính Dần": "Hỏa",
  "Đinh Mão": "Hỏa",
  "Mậu Thìn": "Mộc",
  "Kỷ Tỵ": "Mộc",
  "Canh Ngọ": "Thổ",
  "Tân Mùi": "Thổ",
  "Nhâm Thân": "Kim",
  "Quý Dậu": "Kim",
  "Giáp Tuất": "Hỏa",
  "Ất Hợi": "Hỏa",
  "Bính Tý": "Thủy",
  "Đinh Sửu": "Thủy",
  "Mậu Dần": "Thổ",
  "Kỷ Mão": "Thổ",
  "Canh Thìn": "Mộc",
  "Tân Tỵ": "Mộc",
  "Nhâm Ngọ": "Mộc",
  "Quý Mùi": "Mộc",
  "Giáp Thân": "Thủy",
  "Ất Dậu": "Thủy",
  "Bính Tuất": "Thổ",
  "Đinh Hợi": "Thổ",
  "Mậu Tý": "Hỏa",
  "Kỷ Sửu": "Hỏa",
  "Canh Dần": "Mộc",
  "Tân Mão": "Mộc",
  "Nhâm Thìn": "Thủy",
  "Quý Tỵ": "Thủy",
  "Giáp Ngọ": "Kim",
  "Ất Mùi": "Kim",
  "Bính Thân": "Hỏa",
  "Đinh Dậu": "Hỏa",
  "Mậu Tuất": "Mộc",
  "Kỷ Hợi": "Mộc",
  "Canh Tý": "Thổ",
  "Tân Sửu": "Thổ",
  "Nhâm Dần": "Kim",
  "Quý Mão": "Kim",
  "Giáp Thìn": "Hỏa",
  "Ất Tỵ": "Hỏa",
  "Bính Ngọ": "Thủy",
  "Đinh Mùi": "Thủy",
  "Mậu Thân": "Thổ",
  "Kỷ Dậu": "Thổ",
  "Canh Tuất": "Kim",
  "Tân Hợi": "Kim",
  "Nhâm Tý": "Mộc",
  "Quý Sửu": "Mộc",
  "Giáp Dần": "Thủy",
  "Ất Mão": "Thủy",
  "Bính Thìn": "Thổ",
  "Đinh Tỵ": "Thổ",
  "Mậu Ngọ": "Hỏa",
  "Kỷ Mùi": "Hỏa",
  "Canh Thân": "Mộc",
  "Tân Dậu": "Mộc",
  "Nhâm Tuất": "Thủy",
  "Quý Hợi": "Thủy",
};

const SO_CUC_MAP: Record<string, number> = {
  Thủy: 2,
  Mộc: 3,
  Kim: 4,
  Thổ: 5,
  Hỏa: 6,
};

// Kình Dương & Đà La (theo Can index 1-10)
const KINH_DUONG_DALA: Record<number, { kDuong: number; daLa: number }> = {
  1: { kDuong: 3, daLa: 2 }, // Giáp: Kình→Mão, Đà→Sửu
  2: { kDuong: 2, daLa: 0 }, // Ất
  3: { kDuong: 4, daLa: 2 }, // Bính
  4: { kDuong: 5, daLa: 3 }, // Đinh
  5: { kDuong: 4, daLa: 2 }, // Mậu
  6: { kDuong: 5, daLa: 3 }, // Kỷ
  7: { kDuong: 7, daLa: 5 }, // Canh
  8: { kDuong: 8, daLa: 6 }, // Tân
  9: { kDuong: 0, daLa: 8 }, // Nhâm
  10: { kDuong: 2, daLa: 11 }, // Quý
};

// Lộc Tồn (theo Can năm)
const LOC_TON_MAP: Record<number, number> = {
  1: 0,
  2: 1,
  3: 3,
  4: 4,
  5: 3,
  6: 4,
  7: 6,
  8: 7,
  9: 9,
  10: 10,
};

// Tứ Hóa
const TU_HOA_MAP: Record<
  number,
  { loc: number; quan: number; khoa: number; ky: number }
> = {
  1: { loc: 6, quan: 12, khoa: 2, ky: 4 }, // Giáp
  2: { loc: 2, quan: 5, khoa: 0, ky: 10 }, // Ất
  3: { loc: 5, quan: 2, khoa: 1, ky: 6 }, // Bính
  4: { loc: 10, quan: 5, khoa: 2, ky: 3 }, // Đinh
  5: { loc: 8, quan: 10, khoa: 11, ky: 2 }, // Mậu
  6: { loc: 2, quan: 8, khoa: 5, ky: 1 }, // Kỷ
  7: { loc: 4, quan: 2, khoa: 10, ky: 5 }, // Canh
  8: { loc: 3, quan: 4, khoa: 1, ky: 10 }, // Tân
  9: { loc: 5, quan: 0, khoa: 11, ky: 2 }, // Nhâm
  10: { loc: 12, quan: 3, khoa: 10, ky: 8 }, // Quý
};

// Hỏa Tinh & Linh Tinh theo Chi năm (chiIdx theo CHI array)
const HOA_LINH_MAP: Record<number, { hoa: number; linh: number }> = {
  2: { hoa: 0, linh: 8 }, // Dần -> Hỏa tại Dần(0), Linh tại Tuất(8)
  6: { hoa: 7, linh: 1 }, // Ngọ -> Hỏa tại Dậu(7), Linh tại Mão(1)
  10: { hoa: 0, linh: 8 }, // Tuất -> Hỏa tại Dần(0), Linh tại Tuất(8)
  8: { hoa: 7, linh: 1 }, // Thân -> Hỏa tại Dậu(7), Linh tại Mão(1)
  0: { hoa: 7, linh: 1 }, // Tý -> Hỏa tại Dậu(7), Linh tại Mão(1)
  4: { hoa: 7, linh: 1 }, // Thìn -> Hỏa tại Dậu(7), Linh tại Mão(1)
  5: { hoa: 10, linh: 7 }, // Tỵ -> Hỏa tại Tý(10), Linh tại Dậu(7)
  9: { hoa: 10, linh: 7 }, // Dậu -> Hỏa tại Tý(10), Linh tại Dậu(7)
  1: { hoa: 10, linh: 7 }, // Sửu -> Hỏa tại Tý(10), Linh tại Dậu(7)
  11: { hoa: 1, linh: 10 }, // Hợi -> Hỏa tại Mão(1), Linh tại Tý(10)
  3: { hoa: 1, linh: 10 }, // Mão -> Hỏa tại Mão(1), Linh tại Tý(10)
  7: { hoa: 1, linh: 10 }, // Mùi -> Hỏa tại Mão(1), Linh tại Tý(10)
};

// Mapping chữ Hán -> tiếng Việt
const CAN_HAN: Record<string, string> = {
  '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
  '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý'
};

const CHI_HAN: Record<string, string> = {
  '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão',
  '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
  '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
};

function parseGanZhi(ganZhiStr: string): { can: string; chi: string } {
  if (!ganZhiStr || ganZhiStr.length < 2) {
    return { can: 'Giáp', chi: 'Tý' };
  }

  // 1. Check chữ Hán trước (vì lunar-javascript thường trả về Hán tự)
  const CAN_HAN: Record<string, string> = {
    '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
    '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý'
  };
  const CHI_HAN: Record<string, string> = {
    '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão',
    '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
    '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
  };

  const canHan = CAN_HAN[ganZhiStr[0]];
  const chiHan = CHI_HAN[ganZhiStr[1]];
  if (canHan && chiHan) {
    return { can: canHan, chi: chiHan };
  }

  // 2. Fallback sang tiếng Việt
  for (const c of CAN) {
    if (ganZhiStr.startsWith(c)) {
      return {
        can: c,
        chi: ganZhiStr.slice(c.length).trim()
      };
    }
  }

  console.warn('Không parse được GanZhi:', ganZhiStr);
  return { can: 'Giáp', chi: 'Tý' };
}

function chiIdxToCungIdx(chiIdx: number): number {
  const map = [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return map[chiIdx];
}

function getCanChiNam(namAm: number): {
  can: string;
  chi: string;
  canIdx: number;
  chiIdx: number;
} {
   const canIdx = ((namAm - 4) % 10 + 10) % 10;
   const chiIdx = ((namAm - 4) % 12 + 12) % 12;
   return {
     can: CAN[canIdx],
     chi: CHI[chiIdx],
     canIdx,
     chiIdx
   };
}

function getGioChiIdx(gio: number, phut: number): number {
  const h = gio + phut / 60;
  if (h >= 23 || h < 1) return 0;  // Tý
  if (h >= 1 && h < 3) return 1;  // Sửu
  if (h >= 3 && h < 5) return 2;  // Dần
  if (h >= 5 && h < 7) return 3;  // Mão
  if (h >= 7 && h < 9) return 4;  // Thìn
  if (h >= 9 && h < 11) return 5; // Tỵ
  if (h >= 11 && h < 13) return 6; // Ngọ
  if (h >= 13 && h < 15) return 7; // Mùi
  if (h >= 15 && h < 17) return 8; // Thân
  if (h >= 17 && h < 19) return 9; // Dậu
  if (h >= 19 && h < 21) return 10; // Tuất
  if (h >= 21 && h < 23) return 11; // Hợi
  return 0;
}

// Helper: parse ngày linh hoạt (DD/MM/YYYY hoặc YYYY-MM-DD)
function parseDateFlexible(dateStr: string): [number, number, number] {
  const parts = dateStr.split(/[\/\-]/).map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Ngày không hợp lệ: ${dateStr}`);
  }
  // Nếu năm ở đầu (YYYY-MM-DD)
  if (parts[0] > 1000) {
    return [parts[2], parts[1], parts[0]]; // [d, m, y]
  }
  // DD/MM/YYYY
  return [parts[0], parts[1], parts[2]];
}

export async function calculateTuVi(input: any): Promise<any> {
  const { ho_ten, ngay_sinh, loai_lich, gio_sinh, gioi_tinh, ngay_du_doan } =
    input;

  // Parse ngày sinh (hỗ trợ DD/MM/YYYY và YYYY-MM-DD)
  let d: number, m: number, y: number;
  try {
    [d, m, y] = parseDateFlexible(ngay_sinh);
  } catch (e: any) {
    throw new Error(`Ngày sinh không hợp lệ: ${e.message}`);
  }

   let lunar: any;
   let loaiLichNorm = '';
   let isDuong = false;
   try {
     loaiLichNorm = String(loai_lich).toLowerCase().trim();
     // Lấy token đầu tiên (ví dụ "Dương lịch" -> "dương")
     const loaiLichToken = loaiLichNorm.split(' ')[0];
     isDuong = loaiLichToken === 'duong' || loaiLichToken === 'dương' || loaiLichToken === 'solar' || loaiLichToken === 'duong_lich';
     if (isDuong) {
       const solar = Solar.fromYmd(y, m, d);
       lunar = solar.getLunar();
     } else {
       // Âm lịch: validate năm hợp lệ
       if (y < 1900 || y > 2100) {
         throw new Error('Năm âm không hợp lệ (phải từ 1900-2100)');
       }
       lunar = Lunar.fromYmd(y, m, d);
     }
   } catch (error: any) {
     throw new Error(
       `Ngày ${d}/${m}/${y} (${loai_lich}) không hợp lệ: ${error.message}`
     );
   }

   const namAm = lunar.getYear();
   const thangAm = lunar.getMonth();
   const ngayAm = lunar.getDay();

   // Debug: kiểm tra âm lịch
   console.log('=== DEBUG ÂM LỊCH ===');
   console.log('loai_lich nhận được:', loai_lich);
   console.log('loaiLichToken:', loaiLichNorm.split(' ')[0]);
   console.log('isDuong:', isDuong);
   console.log('Âm lịch sau convert:', ngayAm, '/', thangAm, '/', namAm);
   console.log('====================');

  // Can chi năm
  const {
    can: canNam,
    chi: chiNam,
    canIdx: canNamIdx,
    chiIdx: chiNamIdx,
  } = getCanChiNam(namAm);

   // Can chi ngày (getDayInGanZhi() trả về string "Giáp Tý")
   const ganZhiNgaySinh = lunar.getDayInGanZhi();
   let canNgay = '';
   let chiNgay = '';
   for (const c of CAN) {
     if (ganZhiNgaySinh.startsWith(c)) {
       canNgay = c;
       chiNgay = ganZhiNgaySinh.slice(c.length).trim();
       break;
     }
   }
   const canNgayIdx = CAN.indexOf(canNgay);

  // Giờ sinh
  const [gio, phut] = gio_sinh.split(":").map(Number);
  const gioChiIdx = getGioChiIdx(gio, phut);
  const gioChi = CHI[gioChiIdx];

  // Mệnh cục
  const keyNapAm = `${canNam} ${chiNam}`;
  const nguHanh = NAP_AM_NGU_HANH[keyNapAm] || "Mộc";
  const soCuc = SO_CUC_MAP[nguHanh];
  const amDuong = canNamIdx % 2 === 0 ? "Dương" : "Âm";

  // Chuyển chỉ số chi sang chỉ số cung
  const chiThangIdx = (thangAm + 1) % 12; // tháng âm 1 -> Dần (chiIdx=2)
  const cungThangIdx = chiIdxToCungIdx(chiThangIdx);
  // gioChiIdx đã có từ trên
  const gioChiCungIdx = chiIdxToCungIdx(gioChiIdx); // dùng cho phụ tinh

  // Cung mệnh: (cungThangIdx - gioChiIdx + 12) % 12
  const cungMenhIdx = (cungThangIdx - gioChiIdx + 12) % 12;
  const cungMenh = CUNG[cungMenhIdx];

  // Cung thân: (cungThangIdx + gioChiIdx) % 12
  const cungThanIdx = (cungThangIdx + gioChiIdx) % 12;
  const cungThan = CUNG[cungThanIdx];

  // Debug log
  console.log('=== DEBUG TỬ VI ===');
  console.log('Âm lịch:', ngayAm, '/', thangAm, '/', namAm);
  console.log('Can Chi năm:', canNam, chiNam, '| canIdx:', canNamIdx, 'chiIdx:', chiNamIdx);
  console.log('Giờ sinh:', gio_sinh, '-> gioChi:', gioChi, '| gioChiIdx:', gioChiIdx);
  console.log('chiThangIdx:', chiThangIdx, '-> cungThangIdx:', cungThangIdx, '-> CUNG:', CUNG[cungThangIdx]);
  console.log('Cung Mệnh idx:', cungMenhIdx, '->', CUNG[cungMenhIdx]);
  console.log('Cung Thân idx:', cungThanIdx, '->', CUNG[cungThanIdx]);
  console.log('===================');

   // 12 cung keys (theo chiều thuận từ Mệnh)
   const cungKeys = [
     "menh",
     "phu_mau",
     "phuc_duc",
     "dien_trach",
     "quan_loc",
     "no_boc",
     "thien_di",
     "tat_ach",
     "tai_bach",
     "tu_tuc",
     "phu_the",
     "huynh_de",
   ];

  const cungData: Record<string, any> = {};
  for (let i = 0; i < 12; i++) {
    const idx = (cungMenhIdx + i) % 12;
    cungData[cungKeys[i]] = {
      dia_chi: CUNG[idx],
      chinh_tinh: [],
      phu_tinh: [],
      tu_hoa: [],
    };
  }

  // Hàm lấy key trong cungData từ chi index (theo CUNG)
  const getKeyForChi = (chiIdx: number) => {
    return cungKeys[(chiIdx - cungMenhIdx + 12) % 12];
  };

  // Tính Tử Vi
  const idxThin = chiIdxToCungIdx(4); // Thìn (chiIdx=4) -> cung idx=2
  const du = ngayAm % soCuc;
  const idxTuVi = du === 0 ? idxThin : (idxThin + du) % 12;

  const tinhPos: Record<string, number> = {};
  tinhPos["Tử Vi"] = idxTuVi;
  tinhPos["Thiên Cơ"] = (idxTuVi - 1 + 12) % 12;
  tinhPos["Thái Dương"] = (idxTuVi - 3 + 12) % 12;
  tinhPos["Vũ Khúc"] = (idxTuVi - 4 + 12) % 12;
  tinhPos["Thiên Đồng"] = (idxTuVi - 5 + 12) % 12;
  tinhPos["Liêm Trinh"] = (idxTuVi - 8 + 12) % 12;

  // Thiên Phủ: đối xứng qua trục Dần-Thân (theo CUNG index: Dần=0, Thân=6)
  const idxThiênPhủ = (idxTuVi + 8) % 12;
  tinhPos["Thiên Phủ"] = idxThiênPhủ;
  tinhPos["Thái Âm"] = (idxThiênPhủ + 1) % 12;
  tinhPos["Tham Lang"] = (idxThiênPhủ + 2) % 12;
  tinhPos["Cự Môn"] = (idxThiênPhủ + 3) % 12;
  tinhPos["Thiên Tướng"] = (idxThiênPhủ + 4) % 12;
  tinhPos["Thiên Lương"] = (idxThiênPhủ + 5) % 12;
  tinhPos["Thất Sát"] = (idxThiênPhủ + 6) % 12;
   tinhPos["Phá Quân"] = (idxThiênPhủ + 10) % 12;

   console.log('=== CHINH TINH POS ===');
   for (const [tinh, idx] of Object.entries(tinhPos)) {
     console.log(`${tinh}: CUNG[${idx}] = ${CUNG[idx]}`);
   }

   // Thêm vào cungData
   for (const [tinh, idx] of Object.entries(tinhPos)) {
     const cungKey = getKeyForChi(idx);
     cungData[cungKey].chinh_tinh.push(tinh);
   }

   // Debug: in cungData sau khi build
   console.log('=== CUNG DATA (key -> dia_chi) ===');
   for (const key of cungKeys) {
     console.log(`${key}: ${cungData[key].dia_chi}`);
   }
   console.log('==================================');


  // ===== PHỤ TINH - CHUẨN =====

  // Lộc Tồn, Kình Dương, Đà La (theo Can năm)
  const LOC_CHI_IDX: Record<number, number> = {
    0: 2, 1: 3, 2: 5, 3: 6, 4: 5,
    5: 6, 6: 8, 7: 9, 8: 11, 9: 0,
  };
  const locChiIdx = LOC_CHI_IDX[canNamIdx];
  cungData[getKeyForChi(chiIdxToCungIdx(locChiIdx))].phu_tinh.push("Lộc Tồn");
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 1) % 12))].phu_tinh.push("Kình Dương");
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx - 1 + 12) % 12))].phu_tinh.push("Đà La");

  // Tứ Hóa (gắn vào tu_hoa của cung chứa sao)
  const TU_HOA_TINH: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
    0: { loc: "Liêm Trinh",  quyen: "Phá Quân",    khoa: "Vũ Khúc",     ky: "Thái Dương"  },
    1: { loc: "Thiên Cơ",    quyen: "Thiên Lương",  khoa: "Tử Vi",       ky: "Thái Âm"     },
    2: { loc: "Thiên Đồng",  quyen: "Thiên Cơ",     khoa: "Văn Xương",   ky: "Liêm Trinh"  },
    3: { loc: "Thái Âm",     quyen: "Thiên Đồng",   khoa: "Thiên Cơ",    ky: "Cự Môn"      },
    4: { loc: "Tham Lang",   quyen: "Thái Âm",      khoa: "Hữu Bật",     ky: "Thiên Lương" },
    5: { loc: "Vũ Khúc",     quyen: "Tham Lang",    khoa: "Thiên Lương",  ky: "Văn Khúc"   },
    6: { loc: "Thái Dương",  quyen: "Vũ Khúc",      khoa: "Thái Âm",     ky: "Thiên Đồng"  },
    7: { loc: "Cự Môn",      quyen: "Thái Dương",   khoa: "Văn Xương",   ky: "Văn Khúc"    },
    8: { loc: "Thiên Lương", quyen: "Tử Vi",        khoa: "Hữu Bật",     ky: "Vũ Khúc"     },
    9: { loc: "Phá Quân",    quyen: "Cự Môn",       khoa: "Thái Âm",     ky: "Tham Lang"   },
  };
  const tuHoa = TU_HOA_TINH[canNamIdx];
  if (tuHoa) {
    for (const key of cungKeys) {
      const ct = cungData[key].chinh_tinh as string[];
      const pt = cungData[key].phu_tinh as string[];
      if (ct.includes(tuHoa.loc))   cungData[key].tu_hoa.push("Hóa Lộc");
      if (ct.includes(tuHoa.quyen)) cungData[key].tu_hoa.push("Hóa Quyền");
      if (ct.includes(tuHoa.khoa))  cungData[key].tu_hoa.push("Hóa Khoa");
      if (ct.includes(tuHoa.ky))    cungData[key].tu_hoa.push("Hóa Kỵ");
      // Văn Xương/Khúc, Hữu Bật trong phu_tinh
      if (tuHoa.khoa === "Văn Xương" && pt.includes("Văn Xương"))  cungData[key].tu_hoa.push("Hóa Khoa");
      if (tuHoa.ky   === "Văn Khúc"  && pt.includes("Văn Khúc"))   cungData[key].tu_hoa.push("Hóa Kỵ");
      if (tuHoa.khoa === "Hữu Bật"   && pt.includes("Hữu Bật"))    cungData[key].tu_hoa.push("Hóa Khoa");
      if (tuHoa.loc  === "Văn Xương" && pt.includes("Văn Xương"))   cungData[key].tu_hoa.push("Hóa Lộc");
    }
  }

  // Văn Xương (nghịch từ Tuất theo Can)
  const VAN_XUONG_CHI: Record<number, number> = {
    0:10, 1:9, 2:8, 3:7, 4:6, 5:5, 6:4, 7:3, 8:2, 9:1
  };
  // Văn Khúc (thuận từ Thìn theo Can)
  const VAN_KHUC_CHI: Record<number, number> = {
    0:4, 1:3, 2:2, 3:1, 4:0, 5:11, 6:10, 7:9, 8:8, 9:7
  };
  cungData[getKeyForChi(chiIdxToCungIdx(VAN_XUONG_CHI[canNamIdx]))].phu_tinh.push("Văn Xương");
  cungData[getKeyForChi(chiIdxToCungIdx(VAN_KHUC_CHI[canNamIdx]))].phu_tinh.push("Văn Khúc");

  // Tả Phụ (thuận từ Thìn theo tháng âm)
  // Hữu Bật (nghịch từ Tuất theo tháng âm)
  cungData[getKeyForChi(chiIdxToCungIdx((4 + (thangAm - 1)) % 12))].phu_tinh.push("Tả Phụ");
  cungData[getKeyForChi(chiIdxToCungIdx((10 - (thangAm - 1) + 12) % 12))].phu_tinh.push("Hữu Bật");

  // Thiên Khôi & Thiên Việt (theo Can năm)
  const KHOI_CHI: Record<number, number> = {
    0:1, 1:0, 2:11, 3:11, 4:1, 5:0, 6:6, 7:6, 8:3, 9:3
  };
  const VIET_CHI: Record<number, number> = {
    0:7, 1:8, 2:9, 3:9, 4:7, 5:8, 6:2, 7:2, 8:6, 9:5
  };
  cungData[getKeyForChi(chiIdxToCungIdx(KHOI_CHI[canNamIdx]))].phu_tinh.push("Thiên Khôi");
  cungData[getKeyForChi(chiIdxToCungIdx(VIET_CHI[canNamIdx]))].phu_tinh.push("Thiên Việt");

  // Thiên Mã (theo Chi năm)
  const THIEN_MA_CHI: Record<number, number> = {
    2:8, 6:8, 10:8,  8:2, 0:2, 4:2,   5:11, 9:11, 1:11,  11:5, 3:5, 7:5
  };
  if (THIEN_MA_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(THIEN_MA_CHI[chiNamIdx]))].phu_tinh.push("Thiên Mã");

  // Hỏa Tinh & Linh Tinh (theo Chi năm)
  const HOA_TINH_CHI: Record<number, number> = {
    2:0, 6:0, 10:0,  8:6, 0:6, 4:6,   5:10, 9:7, 1:10,  11:1, 3:1, 7:1
  };
  const LINH_TINH_CHI: Record<number, number> = {
    2:8, 6:1, 10:8,  8:1, 0:1, 4:1,   5:7, 9:7, 1:7,  11:10, 3:10, 7:10
  };
  if (HOA_TINH_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(HOA_TINH_CHI[chiNamIdx]))].phu_tinh.push("Hỏa Tinh");
  if (LINH_TINH_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(LINH_TINH_CHI[chiNamIdx]))].phu_tinh.push("Linh Tinh");

  // Địa Không (nghịch từ Hợi theo giờ)
  cungData[getKeyForChi(chiIdxToCungIdx((11 - gioChiIdx + 12) % 12))].phu_tinh.push("Địa Không");
  // Địa Kiếp (thuận từ Hợi theo giờ)
  cungData[getKeyForChi(chiIdxToCungIdx((11 + gioChiIdx) % 12))].phu_tinh.push("Địa Kiếp");

  // Vòng Thái Tuế 12 sao (an tại chi năm, thuận)
  const VONG_THAI_TUE = [
    "Thái Tuế","Thiếu Dương","Tang Môn","Thiếu Âm",
    "Quan Phù","Tử Phù","Tuế Phá","Long Đức",
    "Bạch Hổ","Phúc Đức","Điếu Khách","Bệnh Phù"
  ];
  for (let i = 0; i < 12; i++) {
    cungData[getKeyForChi((chiIdxToCungIdx(chiNamIdx) + i) % 12)].phu_tinh.push(VONG_THAI_TUE[i]);
  }

  // ===== CÁC SAO CÒN THIẾU =====

  // Thiên Y (thuận từ Dậu theo tháng âm, chiIdx=9)
  cungData[getKeyForChi(chiIdxToCungIdx((9 + (thangAm - 1)) % 12))].phu_tinh.push("Thiên Y");

  // Thiên Đức (nghịch từ Dậu theo tháng âm)
  cungData[getKeyForChi(chiIdxToCungIdx((9 - (thangAm - 1) + 12) % 12))].phu_tinh.push("Thiên Đức");

  // Hồng Loan (nghịch từ Mão theo Chi năm)
  cungData[getKeyForChi(chiIdxToCungIdx((3 - chiNamIdx + 12) % 12))].phu_tinh.push("Hồng Loan");

  // Thiên Hỉ (đối cung Hồng Loan, +6)
  cungData[getKeyForChi(chiIdxToCungIdx((3 - chiNamIdx + 12 + 6) % 12))].phu_tinh.push("Thiên Hỉ");

  // Cô Thần & Quả Tú (theo Chi năm)
  const CO_THAN_CHI: Record<number, number> = {
    2:5, 3:5, 4:5,   5:8, 6:8, 7:8,   8:11, 9:11, 10:11,  11:2, 0:2, 1:2
  };
  const QUA_TU_CHI: Record<number, number> = {
    2:1, 3:1, 4:1,   5:4, 6:4, 7:4,   8:7, 9:7, 10:7,  11:10, 0:10, 1:10
  };
  if (CO_THAN_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(CO_THAN_CHI[chiNamIdx]))].phu_tinh.push("Cô Thần");
  if (QUA_TU_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(QUA_TU_CHI[chiNamIdx]))].phu_tinh.push("Quả Tú");

  // Thiên Diêu (theo Chi năm, an tại cung Đào Hoa)
  const THIEN_DIEU_CHI: Record<number, number> = {
    2:3, 6:3, 10:3,  8:9, 0:9, 4:9,   5:6, 9:6, 1:6,  11:0, 3:0, 7:0
  };
  if (THIEN_DIEU_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(THIEN_DIEU_CHI[chiNamIdx]))].phu_tinh.push("Thiên Diêu");

  // Đào Hoa (giống Thiên Diêu - cùng vị trí)
  if (THIEN_DIEU_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(THIEN_DIEU_CHI[chiNamIdx]))].phu_tinh.push("Đào Hoa");

  // Thiên La & Địa Võng (cố định tại Thìn và Tuất)
  cungData[getKeyForChi(chiIdxToCungIdx(4))].phu_tinh.push("Thiên La");
  cungData[getKeyForChi(chiIdxToCungIdx(10))].phu_tinh.push("Địa Võng");

  // Kiếp Sát (theo Chi năm)
  const KIEP_SAT_CHI: Record<number, number> = {
    2:5, 6:5, 10:5,  8:11, 0:11, 4:11,  5:2, 9:2, 1:2,  11:8, 3:8, 7:8
  };
  if (KIEP_SAT_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(KIEP_SAT_CHI[chiNamIdx]))].phu_tinh.push("Kiếp Sát");

  // Phá Toái (theo Chi năm)
  const PHA_TOAI_CHI: Record<number, number> = {
    0:9, 1:0, 2:6, 3:3, 4:3, 5:6, 6:9, 7:0, 8:3, 9:6, 10:9, 11:0
  };
  if (PHA_TOAI_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(PHA_TOAI_CHI[chiNamIdx]))].phu_tinh.push("Phá Toái");

  // Thiên Hình (thuận từ Dậu theo tháng âm)
  cungData[getKeyForChi(chiIdxToCungIdx((9 + (thangAm - 1)) % 12))].phu_tinh.push("Thiên Hình");

  // Thiên Riêu (nghịch từ Tuất theo tháng âm)
  cungData[getKeyForChi(chiIdxToCungIdx((10 - (thangAm - 1) + 12) % 12))].phu_tinh.push("Thiên Riêu");

  // Thiên Quan (theo Can năm)
  const THIEN_QUAN_CHI: Record<number, number> = {
    0:7, 1:4, 2:3, 3:8, 4:11, 5:0, 6:7, 7:4, 8:3, 9:8
  };
  cungData[getKeyForChi(chiIdxToCungIdx(THIEN_QUAN_CHI[canNamIdx]))].phu_tinh.push("Thiên Quan");

  // Thiên Phúc (theo Can năm)
  const THIEN_PHUC_CHI: Record<number, number> = {
    0:9, 1:6, 2:11, 3:2, 4:1, 5:4, 6:9, 7:6, 8:11, 9:2
  };
  cungData[getKeyForChi(chiIdxToCungIdx(THIEN_PHUC_CHI[canNamIdx]))].phu_tinh.push("Thiên Phúc");

  // Thiên Tài (theo Chi năm, giống Thiên Mã nhưng lệch 1)
  const ngayChiIdx = CHI.indexOf(chiNgay || CHI[0]);
  if (ngayChiIdx >= 0)
    cungData[getKeyForChi(chiIdxToCungIdx(ngayChiIdx))].phu_tinh.push("Thiên Tài");

  // Thiên Thọ (theo Can ngày)
  const canNgayIdxSafe = canNgayIdx >= 0 ? canNgayIdx : 0;
  const THIEN_THO_CHI: Record<number, number> = {
    0:2, 1:3, 2:5, 3:6, 4:5, 5:6, 6:8, 7:9, 8:11, 9:0
  };
  cungData[getKeyForChi(chiIdxToCungIdx(THIEN_THO_CHI[canNgayIdxSafe]))].phu_tinh.push("Thiên Thọ");

  // Lưu Hà (theo Chi năm)
  const LUU_HA_CHI: Record<number, number> = {
    0:1, 1:0, 2:11, 3:10, 4:9, 5:8, 6:7, 7:6, 8:5, 9:4, 10:3, 11:2
  };
  cungData[getKeyForChi(chiIdxToCungIdx(LUU_HA_CHI[chiNamIdx]))].phu_tinh.push("Lưu Hà");

  // Hoa Cái (theo Chi năm)
  const HOA_CAI_CHI: Record<number, number> = {
    2:10, 6:10, 10:10,  8:4,  0:4,  4:4,   5:1,  9:1,  1:1,  11:7, 3:7,  7:7
  };
  if (HOA_CAI_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(HOA_CAI_CHI[chiNamIdx]))].phu_tinh.push("Hoa Cái");

  // Thiên Giải (theo Chi tháng, nghịch từ Thân)
  cungData[getKeyForChi(chiIdxToCungIdx((8 - (thangAm - 1) + 12) % 12))].phu_tinh.push("Thiên Giải");

  // Địa Giải (theo Chi tháng, thuận từ Hợi)
  cungData[getKeyForChi(chiIdxToCungIdx((11 + (thangAm - 1)) % 12))].phu_tinh.push("Địa Giải");

  // Giải Thần (theo Chi năm)
  const GIAI_THAN_CHI: Record<number, number> = {
    2:6, 6:6, 10:6,  8:0, 0:0, 4:0,   5:9, 9:9, 1:9,  11:3, 3:3, 7:3
  };
  if (GIAI_THAN_CHI[chiNamIdx] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(GIAI_THAN_CHI[chiNamIdx]))].phu_tinh.push("Giải Thần");

  // Phong Cáo (theo Can năm, an tại vị trí nhất định)
  const PHONG_CAO_CHI: Record<number, number> = {
    0:10, 1:11, 2:0, 3:1, 4:2, 5:3, 6:4, 7:5, 8:6, 9:7
  };
  cungData[getKeyForChi(chiIdxToCungIdx(PHONG_CAO_CHI[canNamIdx]))].phu_tinh.push("Phong Cáo");

  // Tướng Quân (theo Chi năm)
  const TUONG_QUAN_CHI: Record<number, number> = {
    0:2, 1:5, 2:8, 3:11, 4:2, 5:5, 6:8, 7:11, 8:2, 9:5, 10:8, 11:11
  };
  cungData[getKeyForChi(chiIdxToCungIdx(TUONG_QUAN_CHI[chiNamIdx]))].phu_tinh.push("Tướng Quân");

  // Quốc Ấn (theo Can năm)
  const QUOC_AN_CHI: Record<number, number> = {
    0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2
  };
  cungData[getKeyForChi(chiIdxToCungIdx(QUOC_AN_CHI[canNamIdx]))].phu_tinh.push("Quốc Ấn");

  // Đường Phù (theo Chi năm)
  const DUONG_PHU_CHI: Record<number, number> = {
    0:0, 1:3, 2:6, 3:9, 4:0, 5:3, 6:6, 7:9, 8:0, 9:3, 10:6, 11:9
  };
  cungData[getKeyForChi(chiIdxToCungIdx(DUONG_PHU_CHI[chiNamIdx]))].phu_tinh.push("Đường Phù");

  // Bác Sĩ (vòng Trường Sinh - đơn giản hóa: an tại Lộc Tồn)
  cungData[getKeyForChi(chiIdxToCungIdx(locChiIdx))].phu_tinh.push("Bác Sĩ");

  // Phi Liêm (theo Chi năm)
  const PHI_LIEM_CHI: Record<number, number> = {
    0:3, 1:4, 2:5, 3:0, 4:1, 5:2, 6:9, 7:10, 8:11, 9:6, 10:7, 11:8
  };
  cungData[getKeyForChi(chiIdxToCungIdx(PHI_LIEM_CHI[chiNamIdx]))].phu_tinh.push("Phi Liêm");

  // Hỷ Thần (theo Chi năm)
  const HY_THAN_CHI: Record<number, number> = {
    0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2, 10:1, 11:0
  };
  cungData[getKeyForChi(chiIdxToCungIdx(HY_THAN_CHI[chiNamIdx]))].phu_tinh.push("Hỷ Thần");

  // Thiên Khốc & Thiên Hư (theo Chi năm)
  cungData[getKeyForChi(chiIdxToCungIdx((6 + chiNamIdx) % 12))].phu_tinh.push("Thiên Khốc");
  cungData[getKeyForChi(chiIdxToCungIdx((6 - chiNamIdx + 12) % 12))].phu_tinh.push("Thiên Hư");

  // Thiên Sứ (theo Chi tháng)
  cungData[getKeyForChi(chiIdxToCungIdx((thangAm + 1) % 12))].phu_tinh.push("Thiên Sứ");

  // Thiên Trù (theo Can năm)
  const THIEN_TRU_CHI: Record<number, number> = {
    0:9, 1:10, 2:11, 3:0, 4:1, 5:2, 6:3, 7:4, 8:5, 9:6
  };
  cungData[getKeyForChi(chiIdxToCungIdx(THIEN_TRU_CHI[canNamIdx]))].phu_tinh.push("Thiên Trù");

  // Bát Tọa (theo Chi năm)
  const BAT_TOA_CHI: Record<number, number> = {
    0:2, 1:5, 2:8, 3:11, 4:2, 5:5, 6:8, 7:11, 8:2, 9:5, 10:8, 11:11
  };
  cungData[getKeyForChi(chiIdxToCungIdx(BAT_TOA_CHI[chiNamIdx]))].phu_tinh.push("Bát Tọa");

  // Tam Thai (theo Chi tháng, thuận từ Dần)
  cungData[getKeyForChi(chiIdxToCungIdx((2 + (thangAm - 1)) % 12))].phu_tinh.push("Tam Thai");

  // Nguyệt Đức (theo tháng âm)
  const NGUYET_DUC_CHI: Record<number, number> = {
    1:2, 2:5, 3:8, 4:11, 5:2, 6:5, 7:8, 8:11, 9:2, 10:5, 11:8, 12:11
  };
  if (NGUYET_DUC_CHI[thangAm] !== undefined)
    cungData[getKeyForChi(chiIdxToCungIdx(NGUYET_DUC_CHI[thangAm]))].phu_tinh.push("Nguyệt Đức");

  // Long Trì & Phượng Các (theo Chi năm)
  const LONG_TRI_CHI: Record<number, number> = {
    0:4, 1:5, 2:6, 3:7, 4:8, 5:9, 6:10, 7:11, 8:0, 9:1, 10:2, 11:3
  };
  cungData[getKeyForChi(chiIdxToCungIdx(LONG_TRI_CHI[chiNamIdx]))].phu_tinh.push("Long Trì");
  cungData[getKeyForChi(chiIdxToCungIdx((LONG_TRI_CHI[chiNamIdx] + 6) % 12))].phu_tinh.push("Phượng Các");

  // Lực Sĩ (vòng Bác Sĩ)
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 1) % 12))].phu_tinh.push("Lực Sĩ");

  // Thanh Long (vòng Bác Sĩ)
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 4) % 12))].phu_tinh.push("Thanh Long");

  // Tiểu Hao & Đại Hao (vòng Bác Sĩ)
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 9) % 12))].phu_tinh.push("Tiểu Hao");
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 10) % 12))].phu_tinh.push("Đại Hao");

  // Phục Binh & Quan Phủ (vòng Bác Sĩ)
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 6) % 12))].phu_tinh.push("Phục Binh");
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 11) % 12))].phu_tinh.push("Quan Phủ");

  // Thiên Thương (vòng Bác Sĩ)
  cungData[getKeyForChi(chiIdxToCungIdx((locChiIdx + 8) % 12))].phu_tinh.push("Thiên Thương");

  // Ân Quang & Thiên Quý (theo Can năm)
  const AN_QUANG_CHI: Record<number, number> = {
    0:10, 1:11, 2:0, 3:1, 4:2, 5:3, 6:4, 7:5, 8:6, 9:7
  };
  const THIEN_QUY_CHI: Record<number, number> = {
    0:11, 1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:7, 9:8
  };
  cungData[getKeyForChi(chiIdxToCungIdx(AN_QUANG_CHI[canNamIdx]))].phu_tinh.push("Ân Quang");
  cungData[getKeyForChi(chiIdxToCungIdx(THIEN_QUY_CHI[canNamIdx]))].phu_tinh.push("Thiên Quý");

  // Văn Tinh (theo Can năm, giống Văn Xương nhưng lệch 1)
  cungData[getKeyForChi(chiIdxToCungIdx((VAN_XUONG_CHI[canNamIdx] + 1) % 12))].phu_tinh.push("Văn Tinh");

  // Đầu Quân (theo Chi năm)
  cungData[getKeyForChi(chiIdxToCungIdx((chiNamIdx + 2) % 12))].phu_tinh.push("Đầu Quân");

  // Tấu Thư (theo Can năm)
  const TAU_THU_CHI: Record<number, number> = {
    0:5, 1:4, 2:3, 3:2, 4:1, 5:0, 6:11, 7:10, 8:9, 9:8
  };
  cungData[getKeyForChi(chiIdxToCungIdx(TAU_THU_CHI[canNamIdx]))].phu_tinh.push("Tấu Thư");

  // Trực Phù (theo Can năm)
  const TRUC_PHU_CHI: Record<number, number> = {
    0:6, 1:7, 2:8, 3:9, 4:10, 5:11, 6:0, 7:1, 8:2, 9:3
  };
  cungData[getKeyForChi(chiIdxToCungIdx(TRUC_PHU_CHI[canNamIdx]))].phu_tinh.push("Trực Phù");

  const now = new Date();
  const solarNow = Solar.fromYmd(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
  );
  const lunarNow = solarNow.getLunar();
  const namAmHienTai = lunarNow.getYear();
  const tuoiHienTai = namAmHienTai - namAm + 1;

  const startIdxDaiHan = (cungMenhIdx + 1) % 12;
  const soThuTuDaiHan = Math.ceil(tuoiHienTai / soCuc);
  const soThuTuDaiHanMod = ((((soThuTuDaiHan - 1) % 12) + 12) % 12) + 1;
  const idxDaiHanHienTai = (startIdxDaiHan + soThuTuDaiHanMod - 1) % 12;
  const cungDaiHanHienTai = CUNG[idxDaiHanHienTai];
  const soThuTuDaiHanTiep = (soThuTuDaiHanMod % 12) + 1;
  const idxDaiHanTiep = (startIdxDaiHan + soThuTuDaiHanTiep - 1) % 12;
  const cungDaiHanTiep = CUNG[idxDaiHanTiep];

  const tuoiBatDauHienTai = (soThuTuDaiHanMod - 1) * soCuc + 1;
  const tuoiKetThucHienTai = soThuTuDaiHanMod * soCuc;
  const tuoiBatDauTiep = tuoiKetThucHienTai + 1;
  const tuoiKetThucTiep = tuoiKetThucHienTai + soCuc;

  // Tiểu hạn hiện tại
  let idxTieuHanHienTai: number;
  if (gioi_tinh.toLowerCase() === "nam") {
    idxTieuHanHienTai = (tuoiHienTai - 1) % 12;
  } else {
    idxTieuHanHienTai = (6 - (tuoiHienTai - 1) + 12 * 1000) % 12;
  }
  const cungTieuHanHienTai = CUNG[idxTieuHanHienTai];
  const canChiTieuHan = `${CAN[(namAmHienTai + idxTieuHanHienTai) % 10]} ${CHI[idxTieuHanHienTai]}`;

   // Dự đoán ngày mai (hỗ trợ DD/MM/YYYY và YYYY-MM-DD)
   let d2: number, m2: number, y2: number;
   try {
     [d2, m2, y2] = parseDateFlexible(ngay_du_doan);
   } catch (e: any) {
     throw new Error(`Ngày dự đoán không hợp lệ: ${e.message}`);
   }
   const solarTomorrow = Solar.fromYmd(y2, m2, d2);
   const lunarTomorrow = solarTomorrow.getLunar();
   const ganZhiStr = lunarTomorrow.getDayInGanZhi(); // string "Giáp Tý"
   let canNgayTom = '';
   let chiNgayTom = '';
   for (const c of CAN) {
     if (ganZhiStr.startsWith(c)) {
       canNgayTom = c;
       chiNgayTom = ganZhiStr.slice(c.length).trim();
       break;
     }
   }
   if (!canNgayTom) {
     canNgayTom = CAN[0];
     chiNgayTom = CHI[0];
     console.warn('Không parse được can chi ngày:', ganZhiStr);
   }
   const hanhCanNgay = NAP_AM_NGU_HANH[`${canNgayTom} ${chiNgayTom}`] || "Mộc";

  // Quan hệ ngũ hành
  const nguHanhOrder = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];
  const idxHanh = nguHanhOrder.indexOf(hanhCanNgay);
  const idxMenhu = nguHanhOrder.indexOf(nguHanh);
  let tuongSinh = "trung hòa";
  if ((idxHanh + 1) % 5 === idxMenhu) tuongSinh = "tương sinh (ngày sinh mệnh)";
  else if ((idxMenhu + 1) % 5 === idxHanh)
    tuongSinh = "tương sinh (mệnh sinh ngày)";
  else if ((idxHanh + 2) % 5 === idxMenhu)
    tuongSinh = "tương khắc (ngày khắc mệnh)";
  else if ((idxMenhu + 2) % 5 === idxHanh)
    tuongSinh = "tương khắc (mệnh khắc ngày)";

  let diem = 5;
  if (tuongSinh.includes("tương sinh")) diem += 3;
  if (tuongSinh.includes("tương khắc")) diem -= 3;
  diem = Math.max(0, Math.min(10, diem));

  const linhVucTot: string[] = [];
  const linhVucCanChuY: string[] = [];
  const hanhDesc: Record<string, { tot: string; chuy: string }> = {
    Mộc: { tot: "Mộc: giáo dục, sáng tạo", chuy: "Mộc: quyết định chậm" },
    Hỏa: { tot: "Hỏa: truyền thông, năng lượng", chuy: "Hỏa: dễ nóng giận" },
    Thổ: { tot: "Thổ: bất động sản, tài chính", chuy: "Thổ: bảo thủ" },
    Kim: { tot: "Kim: kim hoàn, công nghệ", chuy: "Kim: cứng nhắc" },
    Thủy: { tot: "Thủy: giao thông, thương mại", chuy: "Thủy: dễ thay đổi" },
  };
  if (hanhDesc[hanhCanNgay]) {
    linhVucTot.push(hanhDesc[hanhCanNgay].tot);
    linhVucCanChuY.push(hanhDesc[hanhCanNgay].chuy);
  }

  const gioTot: string[] = ["11h-13h (Ngọ)"];
  const huongMap: Record<string, string> = {
    Mộc: "Đông",
    Hỏa: "Nam",
    Thổ: "Trung",
    Kim: "Tây",
    Thủy: "Bắc",
  };
  const huongXuatHanh = huongMap[nguHanh] || "Trung";
  const mauMap: Record<string, string> = {
    Mộc: "Xanh lá",
    Hỏa: "Đỏ",
    Thổ: "Vàng/Nâu",
    Kim: "Trắng",
    Thủy: "Đen/Xanh nước biển",
  };
  const mauSacHoTro = mauMap[nguHanh] || "";

  // Build result
  const result: any = {
    thong_tin_co_ban: {
      ho_ten,
      gioi_tinh,
      duong_lich: `${ngay_sinh} ${gio_sinh}`,
      am_lich: `${namAm}/${thangAm}/${ngayAm} ${gio_sinh}`,
      gio_sinh,
      gio_chi: gioChi,
      can_chi_nam: `${canNam} ${chiNam}`,
      ngu_hanh_menh_cuc: nguHanh,
      so_cuc: soCuc,
      am_duong: amDuong,
    },
    cung_menh_than: {
      cung_menh: { dia_chi: cungMenh, chinh_tinh: cungData["menh"].chinh_tinh },
      cung_than: {
        dia_chi: cungThan,
        chinh_tinh: cungData[getKeyForChi(cungThanIdx)].chinh_tinh,
      },
    },
    "12_cung": {},
  };

  // Fill 12 cung
  for (const key of cungKeys) {
    result["12_cung"][key] = {
      dia_chi: cungData[key].dia_chi,
      chinh_tinh: cungData[key].chinh_tinh,
      phu_tinh: cungData[key].phu_tinh,
      tu_hoa: cungData[key].tu_hoa,
    };
  }

  // Van han
  const daiHanKey = getKeyForChi(idxDaiHanHienTai);
  const tiepKey = getKeyForChi(idxDaiHanTiep);
  const tieuHanKey = getKeyForChi(idxTieuHanHienTai);

  result.van_han = {
    dai_han_hien_tai: {
      cung: cungDaiHanHienTai,
      dia_chi: cungDaiHanHienTai,
      tuoi_bat_dau: tuoiBatDauHienTai,
      tuoi_ket_thuc: tuoiKetThucHienTai,
      chinh_tinh: cungData[daiHanKey].chinh_tinh,
      phu_tinh: cungData[daiHanKey].phu_tinh,
    },
    dai_han_tiep_theo: {
      cung: cungDaiHanTiep,
      dia_chi: cungDaiHanTiep,
      tuoi_bat_dau: tuoiBatDauTiep,
      tuoi_ket_thuc: tuoiKetThucTiep,
      chinh_tinh: cungData[tiepKey].chinh_tinh,
      phu_tinh: cungData[tiepKey].phu_tinh,
    },
    tieu_han_hien_tai: {
      nam: namAmHienTai,
      can_chi_nam: canChiTieuHan,
      cung: cungTieuHanHienTai,
      dia_chi: cungTieuHanHienTai,
      chinh_tinh: cungData[tieuHanKey].chinh_tinh,
      phu_tinh: cungData[tieuHanKey].phu_tinh,
    },
  };

  // Du doan ngay mai
  result.du_doan_ngay_mai = {
    ngay: ngay_du_doan,
    can_chi_ngay: `${canNgayTom} ${chiNgayTom}`,
    ngu_hanh_ngay: hanhCanNgay,
    tuong_sinh_khac_voi_menh: tuongSinh,
    ket_qua_tong_quat: tuongSinh.includes("tương sinh")
      ? "Ngày tốt, hợp với mệnh"
      : tuongSinh.includes("tương khắc")
        ? "Ngày khó, cần cẩn trọng"
        : "Bình thường",
    diem_may_man: diem,
    linh_vuc_tot: linhVucTot,
    linh_vuc_can_chu_y: linhVucCanChuY,
    gio_tot: gioTot,
    huong_xuat_hanh: huongXuatHanh,
    mau_sac_ho_tro: mauSacHoTro,
  };

  return result;
}
