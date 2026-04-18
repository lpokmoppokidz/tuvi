import { useMemo } from "react";
import type { CungDisplay } from "@/domain/model/types";
import type { NamTongLaSo } from "@/domain/model/types";
import {
  DIA_CHI_ORDER,
  getDiaChiHanh,
  PALACE_NAME_MAP,
} from "@/ui/features/la-so/components/palaceMeta";
import { CUC_LABEL } from "@/domain/services/NamTongCalculator";

export const useCungList = (tuViData: NamTongLaSo | null): CungDisplay[] => {
  return useMemo(() => {
    if (!tuViData) {
      return DIA_CHI_ORDER.map((diaChi) => ({
        key: diaChi,
        ten: "Chưa an",
        canChi: diaChi,
        hanhCung: getDiaChiHanh(diaChi),
        isMenh: false,
        isThan: false,
        chinhTinh: [],
        phuTinh: [],
        tuHoa: [],
        description: "Nhập thông tin sinh để lập lá số Nam Tông.",
      }));
    }

    const { cungs } = tuViData;

    return DIA_CHI_ORDER.map((diaChi) => {
      const cung = cungs.find((c) => c.diaChi === diaChi);
      if (!cung) {
        return {
          key: diaChi,
          ten: "—",
          canChi: diaChi,
          hanhCung: getDiaChiHanh(diaChi),
          isMenh: false,
          isThan: false,
          chinhTinh: [],
          phuTinh: [],
          tuHoa: [],
          description: "",
          isTuanKhong: false,
          isTrIetLo: false,
        };
      }

      const chinhTinh = cung.stars
        .filter((s) => s.type === "chinh_tinh")
        .map((s) => s.name);
      const phuTinh = cung.stars
        .filter((s) => s.type === "phu_tinh")
        .map((s) => s.name);
      const tuHoa = cung.stars
        .filter((s) => s.tuHoa)
        .map((s) => s.tuHoa as string);
      const stars = cung.stars;

      return {
        key: cung.cungKey,
        ten: cung.chucDanh || PALACE_NAME_MAP[cung.cungKey] || diaChi,
        canChi: diaChi,
        hanhCung: cung.hanhCung,
        isMenh: cung.isMenh,
        isThan: cung.isThan,
        chinhTinh,
        phuTinh,
        tuHoa,
        description: cung.chucDanh,
        stars,
        isTuanKhong: cung.isTuanKhong,
        isTrIetLo: cung.isTrIetLo,
      };
    });
  }, [tuViData]);
};

// Tiện ích lấy nhãn cục
export function getCucLabel(tuViData: NamTongLaSo | null): string {
  if (!tuViData) return "";
  return CUC_LABEL[tuViData.cuc] ?? "";
}
