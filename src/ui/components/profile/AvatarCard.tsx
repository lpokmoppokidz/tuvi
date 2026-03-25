// src/ui/components/profile/AvatarCard.tsx
import React from "react";
import { User, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { TuViData } from "../../../domain/model/types";

interface Props {
  tuViData?: TuViData | null;
}

export const AvatarCard: React.FC<Props> = ({ tuViData }) => {
  const { t } = useTranslation();

  const ho_ten   = tuViData?.thong_tin_co_ban?.ho_ten || t("profile.guest");
  const can_chi  = tuViData?.thong_tin_co_ban?.can_chi_nam || "";
  const ngu_hanh = tuViData?.thong_tin_co_ban?.ngu_hanh_menh_cuc || "";
  const am_duong = tuViData?.thong_tin_co_ban?.am_duong || "";
  const initials = ho_ten.split(" ").slice(-2).map((w: string) => w[0]).join("").toUpperCase();

  return (
    <div className="flex flex-col items-center text-center pt-8">
      <div className="relative group mb-8">
        <div className="w-40 h-40 rounded-[48px] glass-panel p-2 relative z-10 shadow-2xl">
          <div className="w-full h-full rounded-[36px] flex items-center justify-center bg-cosmic-purple/40 text-gradient-gold text-5xl font-display shadow-inner overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.2),transparent_70%)]" />
            {tuViData
              ? <span className="relative z-10 drop-shadow-2xl">{initials}</span>
              : <User size={48} className="relative z-10 opacity-30 text-celestial-gold" />}
          </div>
        </div>
        <div className="absolute inset-0 bg-celestial-gold/15 blur-3xl rounded-full -z-0 scale-75" />
        <motion.div whileTap={{ scale: 0.9 }}
          className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-celestial-gold/20 text-celestial-gold shadow-xl z-20 !border-none">
          <ShieldCheck size={22} />
        </motion.div>
      </div>

      <h2 className="text-3xl font-display tracking-widest text-gradient-gold">{ho_ten}</h2>

      {tuViData ? (
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-3">
            <Sparkles size={12} className="text-celestial-gold opacity-50" />
            <p className="text-[10px] font-display text-white/30 tracking-[0.3em] uppercase">
              {can_chi} • {ngu_hanh}
            </p>
            <Sparkles size={12} className="text-celestial-gold opacity-50" />
          </div>
          <p className="text-[9px] font-display text-celestial-gold/40 tracking-[0.4em] uppercase">{am_duong}</p>
        </div>
      ) : (
        <p className="text-[10px] font-display text-white/20 mt-4 tracking-widest uppercase">
          {t("profile.no_data")}
        </p>
      )}
    </div>
  );
};
