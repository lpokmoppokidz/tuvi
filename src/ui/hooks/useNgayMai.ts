import { useMemo } from "react";
import { TuViData } from "../../domain/model/types";

export const useNgayMai = (tuViData: TuViData | null) => {
  return useMemo(() => {
    if (!tuViData?.du_doan_ngay_mai) return null;
    const d = tuViData.du_doan_ngay_mai;
    return {
      ngay:           d.ngay,
      canChiNgay:     d.can_chi_ngay,
      nguHanhNgay:    d.ngu_hanh_ngay,
      ketQua:         d.ket_qua_tong_quat,
      diemMayMan:     d.diem_may_man,
      linhVucTot:     d.linh_vuc_tot,
      linhVucCanChuY: d.linh_vuc_can_chu_y,
      gioTot:         d.gio_tot,
      huongXuatHanh:  d.huong_xuat_hanh,
      mauSacHoTro:    d.mau_sac_ho_tro,
    };
  }, [tuViData]);
};
