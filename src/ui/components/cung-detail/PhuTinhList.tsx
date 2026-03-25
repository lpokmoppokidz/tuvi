// src/ui/components/cung-detail/PhuTinhList.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Zap, Shield, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PHU_TINH_DESC } from "../../../data/constants";

interface Props { phuTinh: string[]; cungTen: string; }

export const PhuTinhList: React.FC<Props> = ({ phuTinh, cungTen }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (sao: string) => setExpanded(prev => prev === sao ? null : sao);

  if (!phuTinh || phuTinh.length === 0) {
    return (
      <p className="text-center text-white/20 font-display text-xs py-10 uppercase tracking-widest">
        {t("cung_detail.no_phu_tinh")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {phuTinh.map((sao, idx) => {
        const desc   = PHU_TINH_DESC[sao];
        const isHung = desc?.loai === "hung";
        const isTrung= desc?.loai === "trung";
        const color  = isHung ? "text-red-400"     : isTrung ? "text-yellow-400"    : "text-green-400";
        const bg     = isHung ? "bg-red-400/10"    : isTrung ? "bg-yellow-400/10"   : "bg-green-400/10";
        const border = isHung ? "border-red-400/20": isTrung ? "border-yellow-400/20": "border-green-400/20";
        const icon   = isHung ? "⚠"                : isTrung ? "◈"                   : "✦";
        const label  = isHung ? t("cung_detail.hung_tinh") : isTrung ? t("cung_detail.trung_tinh") : t("cung_detail.cat_tinh");
        const anhHuong = desc?.anh_huong_cung?.[cungTen];
        const isOpen = expanded === sao;

        return (
          <motion.div key={idx}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.02 }}
            className={`glass-panel rounded-3xl overflow-hidden shadow-lg border ${border}`}>
            <button onClick={() => toggle(sao)}
              className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-all text-left">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 ${bg} ${color}`}>
                  {icon}
                </div>
                <div>
                  <h4 className="text-sm font-display text-star-white/80 tracking-widest uppercase">{sao}</h4>
                  <p className="text-[8px] text-white/30 uppercase tracking-widest mt-0.5">
                    {label} — {desc?.mo_ta || t("cung_detail.phu_tinh_default")}
                  </p>
                </div>
              </div>
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.15 }} className="shrink-0 ml-2">
                <ChevronRight size={16} className="text-white/20" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden">
                  <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                    {desc?.chi_tiet && (
                      <div className="p-4 rounded-2xl bg-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap size={12} className="text-celestial-gold/60" />
                          <span className="text-[9px] font-display text-white/30 uppercase tracking-widest">{t("cung_detail.detail")}</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">{desc.chi_tiet}</p>
                      </div>
                    )}
                    {anhHuong && (
                      <div className={`p-4 rounded-2xl ${bg} border ${border}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Shield size={12} className="text-celestial-gold/60" />
                          <span className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-widest">
                            {t("cung_detail.phu_tinh_influence", { palace: cungTen })}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed font-medium ${color}`}>{anhHuong}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-green-400/5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <CheckCircle size={11} className="text-green-400/60" />
                          <span className="text-[8px] font-display text-green-400/50 uppercase tracking-widest">{t("cung_detail.benefit")}</span>
                        </div>
                        <p className="text-[11px] text-white/50 leading-relaxed">{desc?.loi || "—"}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-red-400/5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <XCircle size={11} className="text-red-400/60" />
                          <span className="text-[8px] font-display text-red-400/50 uppercase tracking-widest">{t("cung_detail.drawback")}</span>
                        </div>
                        <p className="text-[11px] text-white/50 leading-relaxed">{desc?.bat_loi || "—"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
