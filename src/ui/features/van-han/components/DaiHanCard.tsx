// src/ui/components/van-han/DaiHanCard.tsx
import React from "react";
import { ArrowRight, Compass, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CHINH_TINH_DESC } from "@/data/constants";
import type { DaiHanInfo } from "@/domain/model/types";

interface Props {
  daiHanHT: DaiHanInfo;
  daiHanNext: DaiHanInfo;
}

export const DaiHanCard: React.FC<Props> = ({ daiHanHT, daiHanNext }) => {
  const { t } = useTranslation();
  const tr = (key: string, defaultValue: string, options?: Record<string, unknown>) =>
    t(key, { defaultValue, ...(options || {}) });
  const notableStars = daiHanHT.chinh_tinh.slice(0, 2);

  return (
    <div className="space-y-4">
      {/* ── Current cycle ── */}
      <div className="glass-panel p-6 rounded-[2rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold shrink-0">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[9px] font-display text-white/30 uppercase tracking-widest mb-0.5">
              {t("van_han.current_phase")}
            </p>
            <h3 className="text-lg font-display text-gradient-gold">
              {t("van_han.age_range", { from: daiHanHT.tuoi_bat_dau, to: daiHanHT.tuoi_ket_thuc })}
            </h3>
          </div>
        </div>

        {/* Current + Next palaces */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[9px] font-display text-white/40 uppercase tracking-widest mb-2">
              {tr("van_han.current_palace", "Cung hien tai")}
            </p>
            <p className="text-base font-display text-star-white">{daiHanHT.ten_cung}</p>
            <p className="text-[11px] text-white/45 mt-1.5">
              {daiHanHT.dia_chi} · {daiHanHT.hanh_cung}
            </p>
            <p className="text-xs text-white/55 mt-3 leading-relaxed line-clamp-3">{daiHanHT.nhan_xet}</p>
          </div>

          <div className="p-4 rounded-2xl bg-celestial-gold/5 border border-celestial-gold/10">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[9px] font-display text-celestial-gold/70 uppercase tracking-widest">
                {tr("van_han.next_cycle", "Chu ky ke tiep")}
              </p>
              <ArrowRight size={14} className="text-celestial-gold/50 shrink-0 mt-0.5" />
            </div>
            <p className="text-base font-display text-star-white">{daiHanNext.ten_cung}</p>
            <p className="text-[11px] text-white/45 mt-1.5">
              {t("van_han.age_range", { from: daiHanNext.tuoi_bat_dau, to: daiHanNext.tuoi_ket_thuc })}
            </p>
            <p className="text-xs text-white/55 mt-3 leading-relaxed line-clamp-3">{daiHanNext.nhan_xet}</p>
          </div>
        </div>

        {/* Ruling stars */}
        <div className="p-4 rounded-2xl bg-white/5">
          <p className="text-[9px] font-display text-celestial-gold/50 uppercase mb-3 tracking-widest">
            {t("van_han.ruling_stars")}
          </p>
          <div className="flex flex-wrap gap-2">
            {daiHanHT.chinh_tinh.map((s, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full bg-mystic-violet/10 border border-mystic-violet/15 text-mystic-violet text-[10px] font-display tracking-widest uppercase"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Direction + Score ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-5 rounded-[1.75rem] glass-panel border border-green-500/10 bg-green-500/5">
          <Compass className="text-green-400/60 mb-3" size={18} />
          <p className="text-[9px] font-display text-green-400/60 uppercase mb-2 tracking-widest">
            {tr("van_han.direction_label", "Chieu van hanh")}
          </p>
          <p className="text-sm font-display text-white/70">
            {daiHanHT.huong === "thuan"
              ? tr("van_han.direction_forward", "Thuận hành")
              : tr("van_han.direction_backward", "Nghịch hành")}
          </p>
        </div>
        <div className="p-5 rounded-[1.75rem] glass-panel bg-white/5">
          <Star className="text-celestial-gold/60 mb-3" size={18} />
          <p className="text-[9px] font-display text-celestial-gold/60 uppercase mb-2 tracking-widest">
            {tr("van_han.layer_score", "Diem tang han")}
          </p>
          <p className="text-sm font-display text-white/70">
            {daiHanHT.score}{" "}
            <span className="text-white/30 text-xs">{tr("van_han.score_unit", "điểm")}</span>
          </p>
        </div>
      </div>

      {/* ── Detailed analysis ── */}
      {notableStars.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-[9px] font-display text-white/30 uppercase tracking-widest px-1">
            {t("van_han.detailed_analysis")}
          </h4>
          {notableStars.map((s, i) => (
            <div key={i} className="text-sm text-white/60 leading-relaxed glass-panel p-5 rounded-[1.75rem] font-light">
              <p className="text-[10px] font-display text-celestial-gold/50 uppercase tracking-widest mb-2">{s}</p>
              <p>{(CHINH_TINH_DESC[s] as any)?.y_nghia || t("van_han.updating")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
