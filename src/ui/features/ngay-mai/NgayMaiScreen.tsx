// src/ui/screens/NgayMaiScreen.tsx
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NGU_HANH_NGAY, getDateStr, phanTichSaoNgay, tinhDiem } from "@/data/constants/ngu-hanh-ngay";
import type { NamTongLaSo as TuViData } from "@/domain/model/types";
import { CautionCard } from "@/ui/features/ngay-mai/components/CautionCard";
import { HeroCard } from "@/ui/features/ngay-mai/components/HeroCard";
import { LuckySignsCard } from "@/ui/features/ngay-mai/components/LuckySignsCard";
import { OverviewCard } from "@/ui/features/ngay-mai/components/OverviewCard";
import { ScoreGrid } from "@/ui/features/ngay-mai/components/ScoreGrid";
import { TimeDirectionGrid } from "@/ui/features/ngay-mai/components/TimeDirectionGrid";
import { ScreenHeader } from "@/ui/shared/components/ScreenHeader";

interface NgayMaiScreenProps {
  isDark: boolean;
  tuViData?: TuViData | null;
}

export const NgayMaiScreen = ({ tuViData }: NgayMaiScreenProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => setExpanded((prev) => (prev === key ? null : key));

  const duDoan      = useMemo(() => (tuViData as any)?.du_doan_ngay_mai, [tuViData]);
  const tieuHan     = useMemo(() => (tuViData as any)?.van_han?.tieu_han_hien_tai, [tuViData]);
  const menhCuc     = useMemo(() => tuViData?.banMenhHanh || "Moc", [tuViData]);
  const canChiNgay  = useMemo(() => duDoan?.can_chi_ngay || "Nham Than", [duDoan]);
  const nguHanhNgay = useMemo(() => duDoan?.ngu_hanh_ngay || "Kim", [duDoan]);
  const tuongSinh   = useMemo(() => duDoan?.tuong_sinh_khac_voi_menh || "trung hoa", [duDoan]);
  const diemMayMam  = useMemo(() => duDoan?.diem_may_man ?? 5, [duDoan]);

  const { nhandanLabel, nhandanColor } = useMemo(() => {
    const good = diemMayMam >= 7;
    const bad  = diemMayMam <= 3;
    return {
      nhandanLabel: good ? t("ngay_mai.lucky_day") : bad ? t("ngay_mai.caution_day") : t("ngay_mai.normal_day"),
      nhandanColor: good ? "text-crystal-gold" : bad ? "text-red-400" : "text-text-secondary",
    };
  }, [diemMayMam, t]);

  const { may, can_than } = useMemo(() => phanTichSaoNgay(
    tieuHan?.chinh_tinh || [],
    tieuHan?.phu_tinh   || [],
    tieuHan?.tu_hoa     || [],
  ), [tieuHan]);

  const hanhNgayInfo = useMemo(() => NGU_HANH_NGAY[nguHanhNgay] || NGU_HANH_NGAY["Moc"], [nguHanhNgay]);

  const { diemTai, diemSuc, diemTinh, diemSu } = useMemo(() => ({
    diemTai:  tinhDiem(tuongSinh, may, can_than, "tai"),
    diemSuc:  tinhDiem(tuongSinh, may, can_than, "suc"),
    diemTinh: tinhDiem(tuongSinh, may, can_than, "tinh"),
    diemSu:   tinhDiem(tuongSinh, may, can_than, "su"),
  }), [tuongSinh, may, can_than]);

  const dateStr = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getDateStr(tomorrow);
  }, []);

  const overviewText = useMemo(() => {
    if (!tuViData) return t("ngay_mai.overview_empty");
    const base = tuongSinh.includes("sinh")
      ? t("ngay_mai.overview_harmonious", { element: menhCuc })
      : tuongSinh.includes("khac")
        ? t("ngay_mai.overview_conflicting", { element: menhCuc })
        : t("ngay_mai.overview_neutral", { element: menhCuc });
    const highlight = may.length > 0 ? " " + t("ngay_mai.overview_highlight", { text: may[0].toLowerCase() }) : "";
    const note = can_than.length > 0 ? " " + t("ngay_mai.overview_note", { text: can_than[0].toLowerCase() }) : "";
    return `${t("ngay_mai.day_label")} ${canChiNgay} ${t("ngay_mai.element_label")} ${nguHanhNgay}, ${base}${highlight}${note}`;
  }, [tuViData, tuongSinh, menhCuc, may, can_than, canChiNgay, nguHanhNgay, t]);

  const direction = duDoan?.huong_xuat_hanh || hanhNgayInfo.huong;
  const colors    = Array.isArray(duDoan?.mau_sac_ho_tro)
    ? duDoan.mau_sac_ho_tro.join(", ")
    : hanhNgayInfo.mau;

  return (
    <div className="p-6 pb-40 space-y-8 relative z-10">
      <ScreenHeader title={t("ngay_mai.title")} subtitle={t("ngay_mai.subtitle")} />

      <HeroCard
        canChiNgay={canChiNgay} dateStr={dateStr}
        nhandanLabel={nhandanLabel} nhandanColor={nhandanColor}
        nguHanhNgay={nguHanhNgay} menhCuc={menhCuc}
        tuongSinh={tuongSinh} hasData={!!tuViData}
      />

      <ScoreGrid
        diemTai={diemTai} diemSuc={diemSuc}
        diemTinh={diemTinh} diemSu={diemSu}
        onToggle={toggle}
      />

      <LuckySignsCard
        may={may}
        activitiesTodo={hanhNgayInfo.linh_vuc_tot}
        expanded={expanded === "may"}
        onToggle={() => toggle("may")}
      />

      <CautionCard
        canThan={can_than}
        activitiesToAvoid={hanhNgayInfo.linh_vuc_tranh}
        symptomsToWatch={hanhNgayInfo.bien_co_co_the}
        expanded={expanded === "can"}
        onToggle={() => toggle("can")}
      />

      <TimeDirectionGrid
        luckyHours={hanhNgayInfo.gio_tot}
        direction={direction}
        colors={colors}
        expandedGio={expanded === "gio"}
        expandedHuong={expanded === "huong"}
        onToggleGio={() => toggle("gio")}
        onToggleHuong={() => toggle("huong")}
      />

      <OverviewCard text={overviewText} />
    </div>
  );
};
