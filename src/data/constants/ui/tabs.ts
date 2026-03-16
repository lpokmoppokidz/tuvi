import { CungDisplay } from "../../../domain/model/types";

export type TabKey = "tong_quan" | "chinh_tinh" | "phu_tinh" | "tu_hoa";

export const STATIC_TABS = [
  { key: "tong_quan",  label: "Tổng Quan" },
  { key: "chinh_tinh", label: "Chính Tinh" },
  { key: "phu_tinh",   label: "Phụ Tinh" },
  { key: "tu_hoa",     label: "Tứ Hóa" },
] as const;

export const buildCungTabs = (cung: CungDisplay) => [
  { key: "tong_quan"  as TabKey, label: "Tổng Quan" },
  { key: "chinh_tinh" as TabKey, label: `Chính Tinh${cung.chinhTinh?.length ? ` (${cung.chinhTinh.length})` : ""}` },
  { key: "phu_tinh"   as TabKey, label: `Phụ Tinh${cung.phuTinh?.length     ? ` (${cung.phuTinh.length})`   : ""}` },
  { key: "tu_hoa"     as TabKey, label: `Tứ Hóa${cung.tuHoa?.length         ? ` (${cung.tuHoa.length})`     : ""}` },
];
