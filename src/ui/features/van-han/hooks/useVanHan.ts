import { useMemo } from "react";
import type { TuViData } from "@/domain/model/types";

export const useVanHan = (tuViData: TuViData | null) => {
  return useMemo(() => {
    const vanHan = tuViData?.van_han;
    if (!vanHan) return null;

    const {
      dai_han_hien_tai,
      dai_han_tiep_theo,
      tieu_han_hien_tai,
      nguyet_han_hien_tai,
      nhat_han_hien_tai,
      thoi_han_hien_tai,
      cuu_phi_tinh,
      canh_bao,
      danh_gia_chung,
      diem_tong,
      trung_phung,
      nam_xem,
      tuoi_hien_tai,
      nguyet_han,
    } = vanHan;

    if (
      !dai_han_hien_tai ||
      !dai_han_tiep_theo ||
      !tieu_han_hien_tai ||
      !nguyet_han_hien_tai ||
      !nhat_han_hien_tai ||
      !thoi_han_hien_tai
    ) {
      return null;
    }

    const currentLayers = [
      {
        key: "tieu_han",
        title: "Tieu han",
        value: tieu_han_hien_tai.can_chi_nam,
        detail: tieu_han_hien_tai,
      },
      {
        key: "nguyet_han",
        title: "Nguyet han",
        value: `Thang ${nguyet_han_hien_tai.thang}`,
        detail: nguyet_han_hien_tai,
      },
      {
        key: "nhat_han",
        title: "Nhat han",
        value: `Ngay ${nhat_han_hien_tai.ngay}`,
        detail: nhat_han_hien_tai,
      },
      {
        key: "thoi_han",
        title: "Thoi han",
        value: thoi_han_hien_tai.gio_chi,
        detail: thoi_han_hien_tai,
      },
    ];

    const currentStars = Array.from(
      new Set([
        ...(dai_han_hien_tai.chinh_tinh ?? []),
        ...(tieu_han_hien_tai.chinh_tinh ?? []),
        ...(nguyet_han_hien_tai.phu_tinh ?? []),
      ]),
    );

    return {
      namXem: nam_xem,
      tuoiHienTai: tuoi_hien_tai,
      daiHanHienTai: dai_han_hien_tai,
      daiHanTiepTheo: dai_han_tiep_theo,
      tieuHanHienTai: tieu_han_hien_tai,
      nguyetHanHienTai: nguyet_han_hien_tai,
      nhatHanHienTai: nhat_han_hien_tai,
      thoiHanHienTai: thoi_han_hien_tai,
      nguyetHan: nguyet_han ?? [],
      cuuPhiTinh: cuu_phi_tinh ?? [],
      canhBao: canh_bao ?? [],
      danhGiaChung: danh_gia_chung ?? "",
      diemTong: diem_tong ?? 0,
      trungPhung: trung_phung ?? false,
      currentLayers,
      currentStars,
    };
  }, [tuViData]);
};
