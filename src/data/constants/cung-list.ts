export interface CungStar {
  name: string;
  type: string;
}

export interface CungDisplay {
  ten: string;
  canChi: string;
  color: string;
  description: string;
  isMenh?: boolean;
  stars: CungStar[];
  chinhTinh: string[];
  phuTinh: string[];
  tuHoa: string[];
}

export const DIA_CHI_ORDER = [
  "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi",
  "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu",
];

export const POSITION_MAP: Record<string, string> = {
  menh: "MỆNH",
  phu_mau: "Phụ Mẫu",
  phuc_duc: "Phúc Đức",
  dien_trach: "Điền Trạch",
  quan_loc: "Quan Lộc",
  no_boc: "Nô Bộc",
  thien_di: "Thiên Di",
  tat_ach: "Tật Ách",
  tai_bach: "Tài Bạch",
  tu_tuc: "Tử Tức",
  huynh_de: "Huynh Đệ",
  phu_the: "Phu Thê",
};

export const TRAD_CUNG_LIST: CungDisplay[] = [
  { ten: "Phu Thê", canChi: "Tỵ", color: "purple", description: "Tình duyên, hôn nhân.", stars: [{ name: "Tham Lang (H)", type: "purple" }, { name: "Liêm Trinh (H)", type: "red" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Huynh Đệ", canChi: "Ngọ", color: "purple", description: "Anh chị em.", stars: [{ name: "Cự Môn (V)", type: "blue" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "MỆNH", canChi: "Mùi", color: "gold", description: "Bản mệnh chủ quản.", isMenh: true, stars: [{ name: "Thiên Tướng (Đ)", type: "purple" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Phụ Mẫu", canChi: "Thân", color: "purple", description: "Cha mẹ.", stars: [{ name: "Thiên Đồng (M)", type: "green" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Phúc Đức", canChi: "Dậu", color: "purple", description: "Phúc đức tổ tiên.", stars: [{ name: "Thất Sát (H)", type: "purple" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Điền Trạch", canChi: "Tuất", color: "purple", description: "Nhà cửa đất đai.", stars: [{ name: "Thái Dương (H)", type: "orange" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Quan Lộc", canChi: "Hợi", color: "purple", description: "Sự nghiệp công danh.", stars: [], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Nô Bộc", canChi: "Tý", color: "purple", description: "Bạn bè đồng nghiệp.", stars: [{ name: "Thiên Cơ (Đ)", type: "green" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Thiên Di", canChi: "Sửu", color: "purple", description: "Đi lại bên ngoài.", stars: [{ name: "Phá Quân (V)", type: "blue" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Tật Ách", canChi: "Dần", color: "purple", description: "Sức khỏe bệnh tật.", stars: [], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Tài Bạch", canChi: "Mão", color: "purple", description: "Tiền bạc tài chính.", stars: [{ name: "Thiên Phủ (B)", type: "orange" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
  { ten: "Tử Tức", canChi: "Thìn", color: "purple", description: "Con cái hậu duệ.", stars: [{ name: "Thái Âm (H)", type: "orange" }], chinhTinh: [], phuTinh: [], tuHoa: [] },
];
