// src/ui/components/van-han/TieuHanCard.tsx
import React from "react";
import { CalendarDays, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TuViData } from "../../../domain/model/types";

interface Props {
  tieuHanHT: TuViData["van_han"]["tieu_han_hien_tai"];
  nguHanhMenhCuc: string;
}

export const TieuHanCard: React.FC<Props> = ({ tieuHanHT, nguHanhMenhCuc }) => {
  const { t } = useTranslation();
  const isTravelPalace = tieuHanHT.dia_chi === "Thân" || tieuHanHT.dia_chi === "Dần";

  return (
    <div className="space-y-6">
      <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold">
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-[9px] font-display text-white/30 uppercase tracking-widest mb-1">
              {t("van_han.yearly_destiny")}
            </p>
            <h3 className="text-xl font-display text-gradient-gold">
              {tieuHanHT.can_chi_nam} ({tieuHanHT.nam})
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
            <Zap size={16} className="text-celestial-gold opacity-60 mt-1 shrink-0" />
            <div>
              <p className="text-[10px] font-display text-white/50 uppercase tracking-widest">
                {t("van_han.yearly_highlight")}
              </p>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                {t("van_han.yearly_highlight_desc", {
                  palace: tieuHanHT.dia_chi,
                  type: isTravelPalace
                    ? t("van_han.yearly_type_travel")
                    : t("van_han.yearly_type_inner"),
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
            <ShieldCheck size={16} className="text-green-400 opacity-60 mt-1 shrink-0" />
            <div>
              <p className="text-[10px] font-display text-white/50 uppercase tracking-widest">
                {t("van_han.feng_shui_advice")}
              </p>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                {t("van_han.feng_shui_desc", { element: nguHanhMenhCuc })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-display text-white/30 uppercase tracking-[0.3em] px-2">
          {t("van_han.auspicious_stars")}
        </p>
        <div className="flex flex-wrap gap-3">
          {tieuHanHT.phu_tinh
            .filter((_, i) => i % 2 === 0)
            .map((s, i) => (
              <div key={i} className="px-5 py-4 rounded-[1.5rem] glass-panel flex items-center gap-3">
                <Sparkles size={12} className="text-celestial-gold/60" />
                <span className="text-xs font-display text-star-white/80 tracking-widest">{s}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
