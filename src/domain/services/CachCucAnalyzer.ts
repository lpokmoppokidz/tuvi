import type { NamTongCung, NamTongLaSo, NamTongStar } from "../model/types";

export interface CachCucDef {
  id: string;
  name: string;
  tier: "QUY" | "BINH" | "HUNG"; // HUNG equivalent to TIAN
  description: string;
  check: (cung: NamTongCung, allCungs: NamTongCung[], laSo: NamTongLaSo) => boolean;
}

// Helper: lấy các cung tam hợp, xung chiếu
export function getAspectPalaceIndices(index: number): number[] {
  return [
    index, // Chính cung
    (index + 4) % 12, // Tam hợp 1
    (index + 8) % 12, // Tam hợp 2
    (index + 6) % 12, // Xung chiếu
  ];
}

// Lấy tất cả các sao chiếu về cung (bao gồm chính nó)
export function getStarsInAspects(cungIndex: number, allCungs: NamTongCung[]): NamTongStar[] {
  const aspectIndices = getAspectPalaceIndices(cungIndex);
  const stars: NamTongStar[] = [];
  
  for (const idx of aspectIndices) {
    const p = allCungs.find((c) => c.index === idx);
    if (p && p.stars) {
      stars.push(...p.stars);
    }
  }
  return stars;
}

// Kiểm tra sao có mặt trong các cung chiếu không
function hasStar(stars: NamTongStar[], name: string): boolean {
  return stars.some((s) => s.name === name);
}

// Kiểm tra sao có mặt tại cung cụ thể không
function hasStarAt(cung: NamTongCung, name: string): boolean {
  return cung.stars.some((s) => s.name === name);
}

function hasStarWithMinBrightness(stars: NamTongStar[], name: string, minLevel: number): boolean {
  const BRIGHTNESS_LEVEL: Record<string, number> = {
    "Miếu": 5, "Vượng": 4, "Đắc": 3, "Bình": 2, "Hãm": 1
  };
  const star = stars.find((s) => s.name === name);
  if (!star) return false;
  return (BRIGHTNESS_LEVEL[star.brightness || "Bình"] || 2) >= minLevel;
}

export const CACH_CUC_DB: CachCucDef[] = [
  {
    id: "quan_than_khanh_hoi",
    name: "Quần thần khánh hội",
    tier: "QUY",
    description: "Phú quý hiển hách, có tài lãnh đạo xuất chúng.",
    check: (cung, allCungs) => {
      const aspects = getStarsInAspects(cung.index, allCungs);
      const hasTuVi = hasStar(aspects, "Tử Vi");
      const hasKhoiViet = hasStar(aspects, "Thiên Khôi") || hasStar(aspects, "Thiên Việt");
      const hasTaHuu = hasStar(aspects, "Tả Phụ") || hasStar(aspects, "Hữu Bật");
      const hasKhoaQuyenLoc = hasStar(aspects, "Hóa Khoa") || hasStar(aspects, "Hóa Quyền") || hasStar(aspects, "Hóa Lộc");
      
      return hasTuVi && hasKhoiViet && hasTaHuu && hasKhoaQuyenLoc;
    }
  },
  {
    id: "nhat_nguyet_tinh_minh",
    name: "Nhật Nguyệt tịnh minh",
    tier: "QUY",
    description: "Sáng suốt, hiển quý, cuộc đời gặp nhiều may mắn.",
    check: (cung, allCungs) => {
      const aspects = getStarsInAspects(cung.index, allCungs);
      return hasStarWithMinBrightness(aspects, "Thái Dương", 5) && // Miếu
             hasStarWithMinBrightness(aspects, "Thái Âm", 5);
    }
  },
  {
    id: "cu_co_dong_cung",
    name: "Cự Cơ đồng cung",
    tier: "QUY",
    description: "Mưu lược xuất chúng, tài trí hơn người.",
    check: (cung) => {
      return hasStarAt(cung, "Cự Môn") && hasStarAt(cung, "Thiên Cơ");
    }
  },
  {
    id: "tu_phu_trieu_vien",
    name: "Tử Phủ triều viên",
    tier: "QUY",
    description: "Quyền lực, lãnh đạo, danh vọng rực rỡ.",
    check: (cung, allCungs) => {
      if (!cung.isMenh) return false;
      const aspects = getStarsInAspects(cung.index, allCungs);
      return hasStar(aspects, "Tử Vi") && hasStar(aspects, "Thiên Phủ") && 
             (!hasStarAt(cung, "Tử Vi") && !hasStarAt(cung, "Thiên Phủ")); // Chiếu về Mệnh
    }
  },
  {
    id: "loc_phung_luong_sat",
    name: "Lộc phùng lưỡng sát",
    tier: "HUNG",
    description: "Tán tài, dễ dính líu pháp luật hoặc tranh chấp tài sản.",
    check: (cung, allCungs) => {
      const aspects = getStarsInAspects(cung.index, allCungs);
      return hasStar(aspects, "Lộc Tồn") && hasStar(aspects, "Địa Không") && hasStar(aspects, "Địa Kiếp");
    }
  },
  {
    id: "ma_dau_dai_kiem",
    name: "Mã đầu đái kiếm",
    tier: "HUNG",
    description: "Dễ dính tai nạn bạo lực, hung hiểm.",
    check: (cung) => {
      return (cung.diaChi === "Dần" || cung.diaChi === "Thân") &&
             hasStarAt(cung, "Thất Sát") && hasStarAt(cung, "Kình Dương");
    }
  },
  {
    id: "liem_trinh_that_sat",
    name: "Liêm Trinh thất sát",
    tier: "HUNG",
    description: "Sát phạt, khắc bạch, gian nan vất vả.",
    check: (cung) => {
      return hasStarAt(cung, "Liêm Trinh") && hasStarAt(cung, "Thất Sát");
    }
  }
];

export interface MatchedCachCuc {
  cungIndex: number;
  cungName: string;
  cachCuc: CachCucDef;
}

export function analyzeCachCuc(laSo: NamTongLaSo): MatchedCachCuc[] {
  const results: MatchedCachCuc[] = [];
  
  for (const cung of laSo.cungs) {
    for (const def of CACH_CUC_DB) {
      if (def.check(cung, laSo.cungs, laSo)) {
        results.push({
          cungIndex: cung.index,
          cungName: cung.chucDanh || cung.diaChi,
          cachCuc: def,
        });
      }
    }
  }
  
  // Lọc trùng lặp do chiếu lẫn nhau (ví dụ: cung A chiếu cung B thì B cũng chiếu A,
  // dẫn đến cùng 1 cách cục xuất hiện nhiều lần nếu dựa trên sao chiếu).
  // Tuy nhiên, cách cục thường xét tại "Mệnh" hoặc cung chức danh đang luận giải.
  // Ở đây chúng ta chỉ trả về các cách cục tại Mệnh hoặc các cách cục có giá trị.
  
  return results;
}
