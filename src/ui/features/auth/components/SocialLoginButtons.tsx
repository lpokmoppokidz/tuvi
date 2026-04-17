// src/ui/components/shared/SocialLoginButtons.tsx
import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const GOOGLE_ICON = "https://lh3.googleusercontent.com/aida-public/AB6AXuBrZ8-sapNaDjgdR_d5j5Vv4YOLwzigDumDqJyVh21lDYKMTdzOwM8I_4MwpyttrL_rW394kUSI9v4PvIBTGiTfAZ8s68VOswvVb7QtLif4rdsSWrBX43fmwr7G4ExgRhSrE8_gqsd8t8uN8U5mZLKaSNiC3nLpLnl3Ad4kT-Emn36nZfZ8bzDQHt6rybEK61mhmANLcmU9B1WC6cekUGASCebllmvslfzGzyLwCa_QCSGgsQ6P3XOIQAGiz0zxS98aAzW0OejjCp0";

interface Props {
  onGoogle?: () => void;
  onFacebook?: () => void;
}

export const SocialLoginButtons: React.FC<Props> = ({ onGoogle, onFacebook }) => {
  const { t } = useTranslation();
  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-grow h-[1px] bg-white/5" />
        <span className="text-[9px] font-display uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">
          {t("auth.or_continue")}
        </span>
        <div className="flex-grow h-[1px] bg-white/5" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onGoogle}
          className="flex items-center justify-center gap-3 glass-panel bg-white/5 py-4 rounded-2xl !border-none hover:bg-white/10 transition-all"
        >
          <img src={GOOGLE_ICON} alt="Google" className="w-5 h-5" />
          <span className="text-xs font-display tracking-widest text-white/60">Google</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onFacebook}
          className="flex items-center justify-center gap-3 glass-panel bg-white/5 py-4 rounded-2xl !border-none hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-xs font-display tracking-widest text-white/60">Facebook</span>
        </motion.button>
      </div>
    </>
  );
};
