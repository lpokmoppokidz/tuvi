// src/ui/components/la-so/ProfileHeader.tsx
import React, { memo } from "react";
import { motion } from "motion/react";
import { User, Plus, Sparkles, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NamTongLaSo } from "@/domain/model/types";
import { slideUp, tapScale } from "@/ui/shared/utils/motion-config";

interface Props {
  tuViData: NamTongLaSo | null;
  isCalculating: boolean;
  onAdd: () => void;
}

export const ProfileHeader: React.FC<Props> = memo(({ tuViData, isCalculating, onAdd }) => {
  const { t } = useTranslation();
  return (
    <motion.div {...slideUp} className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center relative z-10 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-cosmic-purple/50 flex items-center justify-center">
              <User size={24} className="text-celestial-gold opacity-50" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-celestial-gold/20 blur-xl animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-display text-gradient-gold tracking-wider">
            {tuViData?.hoTen || t("profile_header.guest")}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles size={10} className="text-celestial-gold animate-pulse" />
            <p className="text-[9px] font-display text-white/40 tracking-[0.2em] uppercase">
              {tuViData?.canChiNam || t("profile_header.no_name")} •{" "}
              {tuViData?.banMenhHanh || t("profile_header.no_element")}
            </p>
          </div>
        </div>
      </div>
      <motion.button {...tapScale} onClick={onAdd}
        className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-celestial-gold hover:bg-white/5 transition-all !border-none">
        {isCalculating ? <Loader2 className="animate-spin" size={20} /> : <Plus size={24} />}
      </motion.button>
    </motion.div>
  );
});

ProfileHeader.displayName = "ProfileHeader";
