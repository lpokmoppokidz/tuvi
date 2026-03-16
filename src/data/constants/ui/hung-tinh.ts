export const HUNG_TINH_LIST = [
  "Kình Dương", "Đà La", "Hỏa Tinh", "Linh Tinh",
  "Thiên Không", "Địa Kiếp", "Thiên La", "Địa Võng",
  "Kiếp Sát", "Phá Toái", "Thiên Hình", "Bạch Hổ",
  "Tang Môn", "Điếu Khách", "Bệnh Phù", "Tử Phù",
  "Tuế Phá", "Quan Phù", "Đại Hao", "Phục Binh",
  "Phi Liêm", "Thiên Khốc", "Thiên Hư", "Cô Thần",
  "Quả Tú", "Lưu Hà", "Thiên Riêu", "Quan Phủ",
] as const;

export type HungTinh = typeof HUNG_TINH_LIST[number];

export const isHungTinh = (tinh: string): boolean =>
  HUNG_TINH_LIST.includes(tinh as HungTinh);
