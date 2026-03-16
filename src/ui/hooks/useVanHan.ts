import { useMemo } from "react";
import { TuViData } from "../../domain/model/types";

export const useVanHan = (tuViData: TuViData | null) => {
  return useMemo(() => {
    if (!tuViData?.van_han) return null;
    const { dai_han_hien_tai, dai_han_tiep_theo, tieu_han_hien_tai } = tuViData.van_han;
    return {
      daiHanHienTai:  dai_han_hien_tai,
      daiHanTiepTheo: dai_han_tiep_theo,
      tieuHanHienTai: tieu_han_hien_tai,
    };
  }, [tuViData]);
};
