import { useMemo } from "react";
import { TuViData, CungDisplay } from "../../domain/model/types";
import { TRAD_CUNG_LIST, POSITION_MAP, DIA_CHI_ORDER } from "../../data/constants";

export const useCungList = (tuViData: TuViData | null): CungDisplay[] => {
  return useMemo(() => {
    if (!tuViData) return TRAD_CUNG_LIST;

    return DIA_CHI_ORDER.map((diaChi) => {
      const posKey = Object.keys(tuViData["12_cung"]).find(
        (key) => tuViData["12_cung"][key].dia_chi === diaChi
      );
      const cungData = posKey ? tuViData["12_cung"][posKey] : null;

      return {
        ten:         posKey ? POSITION_MAP[posKey] || posKey : "Vô Danh",
        canChi:      diaChi,
        isMenh:      posKey === "menh",
        chinhTinh:   cungData?.chinh_tinh ?? [],
        phuTinh:     cungData?.phu_tinh   ?? [],
        tuHoa:       cungData?.tu_hoa     ?? [],
        description: `Cung ${posKey ? POSITION_MAP[posKey] : diaChi} của bạn.`,
      };
    });
  }, [tuViData]);
};
