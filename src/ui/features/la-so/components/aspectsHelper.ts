// Helper functions for palace aspects (góc chiếu)

export const DIA_CHI_INDEX: Record<string, number> = {
  "Tý": 0, "Sửu": 1, "Dần": 2, "Mão": 3, "Thìn": 4, "Tỵ": 5,
  "Ngọ": 6, "Mùi": 7, "Thân": 8, "Dậu": 9, "Tuất": 10, "Hợi": 11,
};

export const INDEX_TO_DIA_CHI: Record<number, string> = {
  0: "Tý", 1: "Sửu", 2: "Dần", 3: "Mão", 4: "Thìn", 5: "Tỵ",
  6: "Ngọ", 7: "Mùi", 8: "Thân", 9: "Dậu", 10: "Tuất", 11: "Hợi",
};

// Tam hợp (3 cung cách nhau 120°)
export const TAM_HOP: Record<string, string[]> = {
  "Dần": ["Dần", "Ngọ", "Tuất"],
  "Ngọ": ["Dần", "Ngọ", "Tuất"],
  "Tuất": ["Dần", "Ngọ", "Tuất"],
  "Thân": ["Thân", "Tý", "Thìn"],
  "Tý": ["Thân", "Tý", "Thìn"],
  "Thìn": ["Thân", "Tý", "Thìn"],
  "Hợi": ["Hợi", "Mão", "Mùi"],
  "Mão": ["Hợi", "Mão", "Mùi"],
  "Mùi": ["Hợi", "Mão", "Mùi"],
  "Tỵ": ["Tỵ", "Dậu", "Sửu"],
  "Dậu": ["Tỵ", "Dậu", "Sửu"],
  "Sửu": ["Tỵ", "Dậu", "Sửu"],
};

// Nhị hợp (cặp cung hỗ trợ ngầm)
export const NHI_HOP: Record<string, string> = {
  "Tý": "Sửu", "Sửu": "Tý",
  "Dần": "Hợi", "Hợi": "Dần",
  "Mão": "Tuất", "Tuất": "Mão",
  "Thìn": "Dậu", "Dậu": "Thìn",
  "Tỵ": "Thân", "Thân": "Tỵ",
  "Ngọ": "Mùi", "Mùi": "Ngọ",
};

// Ngũ hành tương sinh/khắc
export const NGU_HANH_SINH: Record<string, string> = {
  "Thủy": "Mộc",
  "Mộc": "Hỏa",
  "Hỏa": "Thổ",
  "Thổ": "Kim",
  "Kim": "Thủy",
};

export const NGU_HANH_KHAC: Record<string, string> = {
  "Kim": "Mộc",
  "Mộc": "Thổ",
  "Thổ": "Thủy",
  "Thủy": "Hỏa",
  "Hỏa": "Kim",
};

/**
 * Tìm cung xung chiếu (đối diện 180°)
 */
export function getXungCung(diaChi: string): string {
  const idx = DIA_CHI_INDEX[diaChi];
  if (idx === undefined) return "";
  const xungIdx = (idx + 6) % 12;
  return INDEX_TO_DIA_CHI[xungIdx];
}

/**
 * Tìm 2 cung tam hợp còn lại (không tính cung hiện tại)
 */
export function getTamHopCungs(diaChi: string): string[] {
  const group = TAM_HOP[diaChi] || [];
  return group.filter((c) => c !== diaChi);
}

/**
 * Tìm cung nhị hợp
 */
export function getNhiHopCung(diaChi: string): string {
  return NHI_HOP[diaChi] || "";
}

/**
 * Kiểm tra hành A có sinh hành B không
 */
export function isSinh(hanhA: string, hanhB: string): boolean {
  return NGU_HANH_SINH[hanhA] === hanhB;
}

/**
 * Kiểm tra hành A có khắc hành B không
 */
export function isKhac(hanhA: string, hanhB: string): boolean {
  return NGU_HANH_KHAC[hanhA] === hanhB;
}

/**
 * Phân tích tương quan Ngũ hành giữa Cung và Sao
 */
export function analyzeCungSaoRelation(hanhCung: string, hanhSao: string): {
  type: "sinh" | "khac" | "binh";
  label: string;
  color: string;
} {
  if (isSinh(hanhCung, hanhSao)) {
    return {
      type: "sinh",
      label: `Cung ${hanhCung} sinh Sao ${hanhSao} → Sao được tăng lực`,
      color: "text-green-400",
    };
  }
  if (isKhac(hanhCung, hanhSao)) {
    return {
      type: "khac",
      label: `Cung ${hanhCung} khắc Sao ${hanhSao} → Sao bị giảm lực`,
      color: "text-red-400",
    };
  }
  return {
    type: "binh",
    label: `Cung ${hanhCung} và Sao ${hanhSao} bình hòa`,
    color: "text-white/40",
  };
}

/**
 * Phân tích tương quan Ngũ hành giữa Sao và Mệnh chủ
 */
export function analyzeSaoMenhRelation(hanhSao: string, hanhMenh: string): {
  type: "sinh" | "khac" | "binh";
  label: string;
  color: string;
} {
  if (isSinh(hanhSao, hanhMenh)) {
    return {
      type: "sinh",
      label: `Sao ${hanhSao} sinh Mệnh ${hanhMenh} → Cát tinh (tốt nhất)`,
      color: "text-green-400",
    };
  }
  if (isKhac(hanhSao, hanhMenh)) {
    return {
      type: "khac",
      label: `Sao ${hanhSao} khắc Mệnh ${hanhMenh} → Hung tinh (xấu nhất)`,
      color: "text-red-400",
    };
  }
  return {
    type: "binh",
    label: `Sao ${hanhSao} và Mệnh ${hanhMenh} bình hòa`,
    color: "text-white/40",
  };
}
