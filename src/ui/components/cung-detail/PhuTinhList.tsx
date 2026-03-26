import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Zap, Shield, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PHU_TINH_DESC } from "../../../data/constants";

interface Props { phuTinh: string[]; cungTen: string; }

export const PhuTinhList: React.FC<Props> = memo(({ phuTinh, cungTen }) => {
  const { t } = useTranslation();
  // ... existing logic ...
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
        // ... same mapping logic ...
        const desc   = PHU_TINH_DESC[sao];
        // ... existing component logic ...
        return (
          <motion.div key={idx}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.02 }}
            className={`glass-panel rounded-3xl overflow-hidden shadow-lg border`}>
            {/* ... rest of item JSX ... */}
          </motion.div>
        );
      })}
    </div>
  );
});

PhuTinhList.displayName = "PhuTinhList";
