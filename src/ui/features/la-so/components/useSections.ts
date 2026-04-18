// src/ui/components/tong-quan/useSections.ts
import { useMemo } from "react";
import { User, Coins, Users, Activity, TrendingUp, Lightbulb } from "lucide-react";
import { CHINH_TINH_DESC, getPhuTinhMeta, isHungPhuTinh, normalizePhuTinhName } from "@/data/constants";
import type { TuViData } from "@/domain/model/types";
import type { SectionItem } from "./SectionAccordion";

const CAT_TINH_LIST = ["Tả Phụ","Hữu Bật","Văn Xương","Văn Khúc","Thiên Khôi","Thiên Việt","Lộc Tồn"];
const HUNG_TINH_LIST = ["Kình Dương","Đà La","Hỏa Tinh","Linh Tinh","Thiên Không","Địa Kiếp"];

function getMoTa(saoList: string[], field: keyof typeof CHINH_TINH_DESC[string], fallback: string): string {
  for (const sao of saoList) {
    const desc = CHINH_TINH_DESC[sao];
    if (desc && desc[field]) return desc[field] as string;
  }
  return fallback;
}

function normalizePhuTinhList(items: string[] | undefined): string[] {
  return (items ?? []).map((item) => normalizePhuTinhName(item));
}

export interface Section {
  key: string;
  icon: typeof User;
  color: string;
  bg: string;
  title: string;
  sub: string;
  items: SectionItem[];
}

export function useSections(tuViData: TuViData, t: (key: string, opts?: any) => string): Section[] {
  return useMemo(() => {
    const c12      = tuViData["12_cung"];
    const menh     = c12?.menh;
    const quan_loc = c12?.quan_loc;
    const tai_bach = c12?.tai_bach;
    const phu_the  = c12?.phu_the;
    const tat_ach  = c12?.tat_ach;
    const phu_mau  = c12?.phu_mau;
    const huynh_de = c12?.huynh_de;
    const vh       = tuViData.van_han;
    const cb       = tuViData.thong_tin_co_ban;

    const menhSao = menh?.chinh_tinh     || [];
    const quanSao = quan_loc?.chinh_tinh || [];
    const taiSao  = tai_bach?.chinh_tinh || [];
    const thueSao = phu_the?.chinh_tinh  || [];
    const tatSao  = tat_ach?.chinh_tinh  || [];
    const upd     = t("cung_detail.updating");

    return [
      {
        key: "ban_sac", icon: User, color: "text-purple-400", bg: "bg-purple-400/10",
        title: t("tong_quan.ban_sac_title"), sub: t("tong_quan.ban_sac_sub"),
        items: [
          { label: t("tong_quan.ban_sac_tinh_cach"), content: getMoTa(menhSao, "tinh_cach", upd) },
          { label: t("tong_quan.ban_sac_nang_luc"),  content: getMoTa(menhSao, "y_nghia", upd) },
          { label: t("tong_quan.ban_sac_chinh_tinh"), content: menhSao.length > 0 ? menhSao.join(", ") : t("tong_quan.ban_sac_no_stars") },
        ],
      },
      {
        key: "tai_su", icon: Coins, color: "text-yellow-400", bg: "bg-yellow-400/10",
        title: t("tong_quan.tai_su_title"), sub: t("tong_quan.tai_su_sub"),
        items: [
          { label: t("tong_quan.tai_su_huong_nghiep"), content: getMoTa(quanSao, "cong_danh", upd) },
          { label: t("tong_quan.tai_su_tai_chinh"),    content: getMoTa(taiSao.length > 0 ? taiSao : menhSao, "tai_chinh", upd) },
          { label: t("tong_quan.tai_su_chinh_tinh"),   content: quanSao.length > 0 ? quanSao.join(", ") : t("tong_quan.tai_su_no_stars") },
        ],
      },
      {
        key: "quan_he", icon: Users, color: "text-pink-400", bg: "bg-pink-400/10",
        title: t("tong_quan.quan_he_title"), sub: t("tong_quan.quan_he_sub"),
        items: [
          { label: t("tong_quan.quan_he_tinh_duyen"), content: getMoTa(thueSao.length > 0 ? thueSao : menhSao, "tinh_duyen", upd) },
          {
            label: t("tong_quan.quan_he_cha_me"),
            content: (phu_mau?.chinh_tinh?.length || 0) > 0
              ? t("tong_quan.quan_he_phu_mau_has", { stars: phu_mau!.chinh_tinh.join(", "), desc: getMoTa(phu_mau!.chinh_tinh, "tinh_cach", upd) })
              : t("tong_quan.quan_he_phu_mau_none"),
          },
          {
            label: t("tong_quan.quan_he_anh_em"),
            content: (huynh_de?.chinh_tinh?.length || 0) > 0
              ? t("tong_quan.quan_he_huynh_de_has", { stars: huynh_de!.chinh_tinh.join(", ") })
              : t("tong_quan.quan_he_huynh_de_none"),
          },
        ],
      },
      {
        key: "suc_khoe", icon: Activity, color: "text-red-400", bg: "bg-red-400/10",
        title: t("tong_quan.suc_khoe_title"), sub: t("tong_quan.suc_khoe_sub"),
        items: [
          { label: t("tong_quan.suc_khoe_tong_the"), content: getMoTa(tatSao.length > 0 ? tatSao : menhSao, "suc_khoe", upd) },
          {
            label: t("tong_quan.suc_khoe_luu_y"),
            content: (() => {
              const hung = [...normalizePhuTinhList(menh?.phu_tinh), ...normalizePhuTinhList(tat_ach?.phu_tinh)]
                .filter((s) => isHungPhuTinh(s) || HUNG_TINH_LIST.includes(s));
              return hung.length > 0
                ? t("tong_quan.suc_khoe_hung_tinh", { stars: hung.join(", ") })
                : t("tong_quan.suc_khoe_no_hung");
            })(),
          },
          { label: t("tong_quan.suc_khoe_cung"), content: tatSao.length > 0 ? tatSao.join(", ") : t("tong_quan.suc_khoe_no_stars") },
        ],
      },
      {
        key: "dai_van", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10",
        title: t("tong_quan.dai_van_title"), sub: t("tong_quan.dai_van_sub"),
        items: [
          {
            label: t("tong_quan.dai_van_hien_tai", { from: vh?.dai_han_hien_tai?.tuoi_bat_dau, to: vh?.dai_han_hien_tai?.tuoi_ket_thuc }),
            content: (() => {
              const dh = vh?.dai_han_hien_tai;
              if (!dh) return t("tong_quan.dai_van_no_info");
              const sao = dh.chinh_tinh || [];
              return sao.length > 0
                ? t("tong_quan.dai_van_has_stars", { palace: dh.dia_chi, stars: sao.join(", "), desc: getMoTa(sao, "y_nghia", upd) })
                : t("tong_quan.dai_van_no_stars", { palace: dh.dia_chi });
            })(),
          },
          {
            label: t("tong_quan.dai_van_tiep_theo", { from: vh?.dai_han_tiep_theo?.tuoi_bat_dau, to: vh?.dai_han_tiep_theo?.tuoi_ket_thuc }),
            content: (() => {
              const dh = vh?.dai_han_tiep_theo;
              if (!dh) return t("tong_quan.dai_van_no_info_short");
              const sao = dh.chinh_tinh || [];
              return sao.length > 0
                ? t("tong_quan.dai_van_next_has", { palace: dh.dia_chi, stars: sao.join(", "), desc: getMoTa(sao, "y_nghia", upd) })
                : t("tong_quan.dai_van_next_none", { palace: dh.dia_chi });
            })(),
          },
          {
            label: t("tong_quan.dai_van_tieu_han"),
            content: (() => {
              const th = vh?.tieu_han_hien_tai;
              if (!th) return t("tong_quan.dai_van_no_info_short");
              const sao = th.chinh_tinh || [];
              return sao.length > 0
                ? t("tong_quan.dai_van_tieu_has", { canchi: th.can_chi_nam, palace: th.dia_chi, stars: sao.join(", ") })
                : t("tong_quan.dai_van_tieu_none", { canchi: th.can_chi_nam, palace: th.dia_chi });
            })(),
          },
        ],
      },
      {
        key: "loi_khuyen", icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-400/10",
        title: t("tong_quan.loi_khuyen_title"), sub: t("tong_quan.loi_khuyen_sub"),
        items: [
          {
            label: t("tong_quan.loi_khuyen_diem_manh"),
            content: (() => {
              const cat = normalizePhuTinhList(menh?.phu_tinh)
                .filter((s) => getPhuTinhMeta(s)?.loai === "cat" || CAT_TINH_LIST.includes(s));
              return cat.length > 0
                ? t("tong_quan.loi_khuyen_cat_tinh", { stars: cat.join(", ") })
                : getMoTa(menhSao, "tinh_cach", upd);
            })(),
          },
          {
            label: t("tong_quan.loi_khuyen_diem_yeu"),
            content: getMoTa(menhSao, "tinh_cach", upd) + " — " +
              (CHINH_TINH_DESC[menhSao[0]]?.bat_loi?.[0] || t("tong_quan.loi_khuyen_default")),
          },
          {
            label: t("tong_quan.loi_khuyen_dinh_huong"),
            content: t("tong_quan.loi_khuyen_menh_desc", {
              element: cb?.ngu_hanh_menh_cuc,
              so_cuc: cb?.so_cuc,
              direction: cb?.am_duong === "Dương" ? t("tong_quan.loi_khuyen_thuan") : t("tong_quan.loi_khuyen_nghich"),
              career: getMoTa(quanSao, "cong_danh", upd).split(".")[0],
            }),
          },
        ],
      },
    ];
  }, [tuViData, t]);
}
