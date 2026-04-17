// src/ui/components/ngay-mai/HeroCard.tsx
import React from "react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  canChiNgay: string;
  dateStr: string;
  nhandanLabel: string;
  nhandanColor: string;
  nguHanhNgay: string;
  menhCuc: string;
  tuongSinh: string;
  hasData: boolean;
}

export const HeroCard: React.FC<Props> = ({
  canChiNgay, dateStr, nhandanLabel, nhandanColor,
  nguHanhNgay, menhCuc, tuongSinh, hasData,
}) => {
  const { t } = useTranslation();
  return (
    <div className="glass-panel gold-border p-10 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] rounded-[3rem] celestial-glow">
      <div className="absolute inset-0 bg-gradient-to-b from-celestial-gold/5 to-transparent pointer-events-none" />

      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center bg-cosmic-navy/80 backdrop-blur-md z-20 rounded-[3rem] p-8">
          <div className="text-center">
            <Sparkles size={32} className="mx-auto mb-4 text-celestial-gold animate-pulse" />
            <p className="text-xs text-white/40 font-display tracking-widest leading-relaxed">
              {t("ngay_mai.no_data_prompt")}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full border border-celestial-gold/20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] font-display text-celestial-gold/60 mb-1 tracking-widest">
              {t("ngay_mai.can_chi_label")}
            </p>
            <p className="text-xl font-display text-gradient-gold">{canChiNgay.toUpperCase()}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="text-[10px] font-display tracking-[0.4em] uppercase text-white/40">{dateStr}</p>
          <div className="glass-panel gold-border px-6 py-2.5 rounded-full">
            <span className={`text-[10px] font-display tracking-[0.2em] uppercase ${nhandanColor}`}>
              ★ {nhandanLabel} ★
            </span>
          </div>
          {hasData && (
            <p className="text-[9px] text-white/30 font-display tracking-widest uppercase">
              {nguHanhNgay} • {menhCuc} — {tuongSinh}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
