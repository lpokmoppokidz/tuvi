// src/ui/components/ngay-mai/TimeDirectionGrid.tsx
import React from "react";
import { Clock, Compass, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { CrystalCard } from "@/ui/shared/components/CrystalCard";

interface Props {
  luckyHours: string[];
  direction: string;
  colors: string;
  expandedGio: boolean;
  expandedHuong: boolean;
  onToggleGio: () => void;
  onToggleHuong: () => void;
}

export const TimeDirectionGrid: React.FC<Props> = ({
  luckyHours, direction, colors,
  expandedGio, expandedHuong, onToggleGio, onToggleHuong,
}) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-4">
      <CrystalCard className="overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between" onClick={onToggleGio}>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <p className="text-xs font-black text-text">{t("ngay_mai.lucky_hours")}</p>
          </div>
          {expandedGio
            ? <ChevronUp size={14} className="text-text-secondary" />
            : <ChevronDown size={14} className="text-text-secondary" />}
        </button>
        <AnimatePresence>
          {expandedGio && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-3 space-y-1">
                {luckyHours.map((g, i) => (
                  <p key={i} className="text-xs text-text-secondary">✦ {g}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CrystalCard>

      <CrystalCard className="overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between" onClick={onToggleHuong}>
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-primary" />
            <p className="text-xs font-black text-text">{t("ngay_mai.direction_color")}</p>
          </div>
          {expandedHuong
            ? <ChevronUp size={14} className="text-text-secondary" />
            : <ChevronDown size={14} className="text-text-secondary" />}
        </button>
        <AnimatePresence>
          {expandedHuong && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-primary/10 pt-3 space-y-2">
                <div>
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                    {t("ngay_mai.direction_label")}
                  </p>
                  <p className="text-xs text-text-secondary font-bold">{direction}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                    {t("ngay_mai.color_label")}
                  </p>
                  <p className="text-xs text-text-secondary font-bold">{colors}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CrystalCard>
    </div>
  );
};
