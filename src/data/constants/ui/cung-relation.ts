export const TAM_HOP_MAP: Record<string, string[]> = {
  "MỆNH":       ["Quan Lộc",   "Tài Bạch"],
  "Quan Lộc":   ["MỆNH",       "Tài Bạch"],
  "Tài Bạch":   ["MỆNH",       "Quan Lộc"],
  "Phu Thê":    ["Tử Tức",     "Huynh Đệ"],
  "Tử Tức":     ["Phu Thê",    "Huynh Đệ"],
  "Huynh Đệ":   ["Phu Thê",    "Tử Tức"],
  "Điền Trạch": ["Phúc Đức",   "Phụ Mẫu"],
  "Phúc Đức":   ["Điền Trạch", "Phụ Mẫu"],
  "Phụ Mẫu":    ["Điền Trạch", "Phúc Đức"],
  "Tật Ách":    ["Thiên Di",   "Nô Bộc"],
  "Thiên Di":   ["Tật Ách",    "Nô Bộc"],
  "Nô Bộc":     ["Tật Ách",    "Thiên Di"],
};

export const DOI_CUNG_MAP: Record<string, string> = {
  "MỆNH":       "Thiên Di",    "Thiên Di":   "MỆNH",
  "Quan Lộc":   "Tật Ách",     "Tật Ách":    "Quan Lộc",
  "Tài Bạch":   "Phúc Đức",    "Phúc Đức":   "Tài Bạch",
  "Phu Thê":    "Nô Bộc",      "Nô Bộc":     "Phu Thê",
  "Tử Tức":     "Phụ Mẫu",     "Phụ Mẫu":    "Tử Tức",
  "Huynh Đệ":   "Điền Trạch",  "Điền Trạch": "Huynh Đệ",
};

export const getTamHop = (cungTen: string): string[] =>
  TAM_HOP_MAP[cungTen] ?? [];

export const getDoiCung = (cungTen: string): string =>
  DOI_CUNG_MAP[cungTen] ?? "";
