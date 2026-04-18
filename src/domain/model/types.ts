import type { ForwardRefExoticComponent } from "react";

export type NavItem = "laso" | "van_han" | "ngay_mai" | "ai_chat" | "profile";

export interface Cung {
  dia_chi: string;
  chinh_tinh: string[];
  phu_tinh: string[];
  tu_hoa: string[];
}

export interface CungDisplay {
  ten: string;
  canChi: string;
  isMenh?: boolean;
  chinhTinh: string[];
  phuTinh: string[];
  tuHoa: string[];
  description?: string;
  color?: string;
  stars?: any[];
}

export interface VanHanPeriod {
  cung: string;
  dia_chi: string;
  ten_cung: string;
  hanh_cung: string;
  chinh_tinh: string[];
  phu_tinh: string[];
  tu_hoa: string[];
  score: number;
  nhan_xet: string;
}

export interface DaiHanInfo extends VanHanPeriod {
  tuoi_bat_dau: number;
  tuoi_ket_thuc: number;
  huong: "thuan" | "nghich";
}

export interface TieuHanInfo extends VanHanPeriod {
  nam: number;
  can_chi_nam: string;
}

export interface NguyetHanInfo extends VanHanPeriod {
  thang: number;
  nhan_xet_ngan: string;
}

export interface NhatHanInfo extends VanHanPeriod {
  ngay: number;
}

export interface ThoiHanInfo extends VanHanPeriod {
  gio_index: number;
  gio_chi: string;
  khung_gio: string;
}

export interface LuuSao {
  name: string;
  cung: string;
  dia_chi: string;
  offset: number;
}

export interface VanHanData {
  nam_xem: number;
  tuoi_hien_tai: number;
  dai_han_hien_tai: DaiHanInfo;
  dai_han_tiep_theo: DaiHanInfo;
  tieu_han_hien_tai: TieuHanInfo;
  nguyet_han_hien_tai: NguyetHanInfo;
  nhat_han_hien_tai: NhatHanInfo;
  thoi_han_hien_tai: ThoiHanInfo;
  nguyet_han: NguyetHanInfo[];
  cuu_phi_tinh: LuuSao[];
  trung_phung: boolean;
  danh_gia_chung: string;
  diem_tong: number;
  canh_bao: string[];
}

export interface TuViData {
  thong_tin_co_ban: {
    ho_ten: string;
    gioi_tinh: string;
    duong_lich: string;
    am_lich: string;
    gio_sinh: string;
    gio_chi: string;
    can_chi_nam: string;
    ngu_hanh_menh_cuc: string;
    so_cuc: number;
    am_duong: string;
  };

  cung_menh_than: {
    cung_menh: {
      dia_chi: string;
      chinh_tinh: string[];
    };
    cung_than: {
      dia_chi: string;
      chinh_tinh: string[];
    };
  };

  "12_cung": {
    menh: Cung;
    phu_mau: Cung;
    phuc_duc: Cung;
    dien_trach: Cung;
    quan_loc: Cung;
    no_boc: Cung;
    thien_di: Cung;
    tat_ach: Cung;
    tai_bach: Cung;
    tu_tuc: Cung;
    huynh_de: Cung;
    phu_the: Cung;
  };

  van_han: VanHanData;

  du_doan_ngay_mai: {
    ngay: string;
    can_chi_ngay: string;
    ngu_hanh_ngay: string;
    tuong_sinh_khac_voi_menh: string;
    ket_qua_tong_quat: string;
    diem_may_man: number;
    linh_vuc_tot: string[];
    linh_vuc_can_chu_y: string[];
    gio_tot: string[];
    huong_xuat_hanh: string;
    mau_sac_ho_tro: string;
  };
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
