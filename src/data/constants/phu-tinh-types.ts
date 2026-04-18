export type PhuTinhLoai = "cat" | "hung" | "trung";

export interface PhuTinhMeta {
  loai: PhuTinhLoai;
  mo_ta: string;
  chi_tiet: string;
  loi: string;
  bat_loi: string;
  anh_huong_cung: Record<string, string>;
}
