// src/ui/components/van-han/DaiHanCard.tsx
import React from "react";
import { Star, TrendingUp, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TuViData } from "../../../domain/model/types";
import { CHINH_TINH_DESC } from "../../../data/constants";

interface Props {
  daiHanHT: TuViData["van_han"]["dai_han_hien_tai"];
}

export const DaiHanCard: React.FC<Props> = ({ daiHanHT }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold">
            <Star size={24} />
          </div>
          <div>
            <p className="text-[9px] font-display text-white/30 uppercase tracking-widest mb-1">
              {t("van_han.current_phase")}
            </p>
            <h3 className="text-xl font-display text-gradient-gold">
              {t("van_han.age_range", { from: daiHanHT.tuoi_bat_dau, to: daiHanHT.tuoi_ket_thuc })}
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/5">
            <p className="text-[9px] font-display text-celestial-gold uppercase mb-3 tracking-widest opacity-60">
              {t("van_han.ruling_stars")}
            </p>
            <div className="flex flex-wrap gap-2">
              {daiHanHT.chinh_tinh.map((s, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full bg-mystic-violet/10 text-mystic-violet text-[10px] font-display tracking-widest uppercase">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-display text-white/40 uppercase tracking-widest px-1">
              {t("van_han.detailed_analysis")}
            </h4>
            {daiHanHT.chinh_tinh.map((s, i) => (
              <div key={i} className="text-sm text-white/60 leading-relaxed bg-white/5 p-6 rounded-3xl font-light">
                <p>{(CHINH_TINH_DESC[s] as any)?.y_nghia || t("van_han.updating")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-[2rem] glass-panel bg-green-500/5">
          <TrendingUp className="text-green-400/60 mb-3" size={20} />
          <p className="text-[9px] font-display text-green-400 uppercase mb-2 tracking-widest opacity-60">
            {t("van_han.opportunity")}
          </p>
          <p className="text-[11px] text-white/40 leading-relaxed">{t("van_han.opportunity_desc")}</p>
        </div>
        <div className="p-6 rounded-[2rem] glass-panel bg-red-500/5">
          <AlertCircle className="text-red-400/60 mb-3" size={20} />
          <p className="text-[9px] font-display text-red-400 uppercase mb-2 tracking-widest opacity-60">
            {t("van_han.risk")}
          </p>
          <p className="text-[11px] text-white/40 leading-relaxed">{t("van_han.risk_desc")}</p>
        </div>
      </div>
    </div>
  );
};
