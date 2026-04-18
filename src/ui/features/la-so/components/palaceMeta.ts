import type { CSSProperties } from "react";

export const DIA_CHI_ORDER = [
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

export const PALACE_NAME_MAP: Record<string, string> = {
  menh: "Mệnh",
  phu_mau: "Phụ Mẫu",
  phuc_duc: "Phúc Đức",
  dien_trach: "Điền Trạch",
  quan_loc: "Quan Lộc",
  no_boc: "Nô Bộc",
  thien_di: "Thiên Di",
  tat_ach: "Tật Ách",
  tai_bach: "Tài Bạch",
  tu_tuc: "Tử Tức",
  phu_the: "Phu Thê",
  huynh_de: "Huynh Đệ",
};

export const PALACE_BOARD_STYLE: Record<string, CSSProperties> = {
  "Tỵ": { gridColumn: "1", gridRow: "1" },
  "Ngọ": { gridColumn: "2", gridRow: "1" },
  "Mùi": { gridColumn: "3", gridRow: "1" },
  "Thân": { gridColumn: "4", gridRow: "1" },
  "Thìn": { gridColumn: "1", gridRow: "2" },
  "Dậu": { gridColumn: "4", gridRow: "2" },
  "Mão": { gridColumn: "1", gridRow: "3" },
  "Tuất": { gridColumn: "4", gridRow: "3" },
  "Dần": { gridColumn: "1", gridRow: "4" },
  "Sửu": { gridColumn: "2", gridRow: "4" },
  "Tý": { gridColumn: "3", gridRow: "4" },
  "Hợi": { gridColumn: "4", gridRow: "4" },
};

const DIA_CHI_HANH_MAP: Record<string, string> = {
  "Dần": "Mộc",
  "Mão": "Mộc",
  "Thìn": "Thổ",
  "Tỵ": "Hỏa",
  "Ngọ": "Hỏa",
  "Mùi": "Thổ",
  "Thân": "Kim",
  "Dậu": "Kim",
  "Tuất": "Thổ",
  "Hợi": "Thủy",
  "Tý": "Thủy",
  "Sửu": "Thổ",
};

const HANH_TONE_MAP: Record<string, { accent: string; badge: string; glow: string }> = {
  Kim: {
    accent: "text-amber-200",
    badge: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    glow: "from-amber-200/16 via-transparent to-transparent",
  },
  Mộc: {
    accent: "text-emerald-200",
    badge: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    glow: "from-emerald-300/16 via-transparent to-transparent",
  },
  Thủy: {
    accent: "text-sky-200",
    badge: "border-sky-300/20 bg-sky-300/10 text-sky-100",
    glow: "from-sky-300/16 via-transparent to-transparent",
  },
  Hỏa: {
    accent: "text-rose-200",
    badge: "border-rose-300/20 bg-rose-300/10 text-rose-100",
    glow: "from-rose-300/16 via-transparent to-transparent",
  },
  Thổ: {
    accent: "text-orange-200",
    badge: "border-orange-300/20 bg-orange-300/10 text-orange-100",
    glow: "from-orange-300/16 via-transparent to-transparent",
  },
};

export const CUC_LABEL_MAP: Record<number, string> = {
  2: "Thủy nhị cục",
  3: "Mộc tam cục",
  4: "Kim tứ cục",
  5: "Thổ ngũ cục",
  6: "Hỏa lục cục",
};

export type OverlayMode = "none" | "dai_han" | "tieu_han";

export function getDiaChiHanh(diaChi: string): string {
  return DIA_CHI_HANH_MAP[diaChi] || "Chưa rõ";
}

export function getHanhTone(hanh?: string) {
  return HANH_TONE_MAP[hanh || ""] || {
    accent: "text-white/80",
    badge: "border-white/10 bg-white/5 text-white/70",
    glow: "from-white/10 via-transparent to-transparent",
  };
}
