// src/ui/components/ngay-mai/CautionCard.tsx
import React from "react";
import { AlertTriangle, ChevronDown, ChevronUp, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { CrystalCard } from "@/ui/shared/components/CrystalCard";

interface Props {
  canThan: string[];
  activitiesToAvoid: string[];
  symptomsToWatch: string[];
  expanded: boolean;
  onToggle: () => void;
}

export const CautionCard: React.FC<Props> = ({
  canThan, activitiesToAvoid, symptomsToWatch, expanded, onToggle,
}) => {
  const { t } = useTranslation();
  return (
    <CrystalCard className="overflow-hidden">
      <button className="w-full p-4 flex items-center justify-between" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-400/10 flex items-center justify-center">
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-text">{t("ngay_mai.caution_title")}</p>
            <p className="text-[10px] text-text-secondary opacity-60">
              {t("ngay_mai.caution_count", { count: canThan.length })}
            </p>
          </div>
        </div>
        {expanded
          ? <ChevronUp size={18} className="text-text-secondary" />
          : <ChevronDown size={18} className="text-text-secondary" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-primary/10 pt-3">
              {canThan.length > 0
                ? canThan.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-400 text-xs mt-0.5">⚠</span>
                      <p className="text-xs text-text-secondary">{item}</p>
                    </div>
                  ))
                : <p className="text-xs text-text-secondary/60">{t("ngay_mai.caution_empty")}</p>}
              <div className="mt-3 pt-3 border-t border-primary/10">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                  {t("ngay_mai.activities_avoid")}
                </p>
                {activitiesToAvoid.map((lv, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1">
                    <Shield size={10} className="text-red-400 mt-1 shrink-0" />
                    <p className="text-xs text-text-secondary">{lv}</p>
                  </div>
                ))}
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-3 mb-2">
                  {t("ngay_mai.symptoms_watch")}
                </p>
                {symptomsToWatch.map((bc, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1">
                    <Zap size={10} className="text-orange-400 mt-1 shrink-0" />
                    <p className="text-xs text-text-secondary">{bc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CrystalCard>
  );
};
