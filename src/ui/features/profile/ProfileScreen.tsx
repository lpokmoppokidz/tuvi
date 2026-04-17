// src/ui/screens/ProfileScreen.tsx
import React from "react";
import { Moon, Sun, Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, type Language } from "@/i18n/config";
import type { TuViData } from "@/domain/model/types";
import { AvatarCard } from "@/ui/features/profile/components/AvatarCard";
import { ProfileSettingRow } from "@/ui/features/profile/components/ProfileSettingRow";
import { LanguageSwitcher } from "@/ui/shared/components/LanguageSwitcher";

interface ProfileScreenProps {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  tuViData?: TuViData | null;
  onClearData: () => void;
  onForceRefresh: () => Promise<void>;
}

export const ProfileScreen = ({ isDark, setIsDark, tuViData, onClearData }: ProfileScreenProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as Language;

  const handleClear = () => {
    if (window.confirm(t("profile.clear_confirm"))) onClearData();
  };

  return (
    <div className="p-6 pb-40 space-y-10 relative z-10">
      <AvatarCard tuViData={tuViData} />

      {/* Settings */}
      <div className="space-y-4">
        <p className="text-[10px] font-display text-white/20 uppercase tracking-[0.4em] px-2 mb-2">
          {t("profile.system_settings")}
        </p>

        <ProfileSettingRow
          icon={isDark ? Moon : Sun}
          iconBg="bg-celestial-gold/10"
          iconColor="text-celestial-gold"
          label={t("profile.dark_mode")}
          onClick={() => setIsDark(!isDark)}
          rightSlot={
            <div className="w-12 h-6 rounded-full bg-celestial-gold/10 relative p-1 overflow-hidden">
              <motion.div
                animate={{ x: isDark ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-celestial-gold shadow-[0_0_10px_#d4af37]"
              />
            </div>
          }
        />

        <div className="glass-panel flex items-center justify-between p-6 rounded-[2.5rem] shadow-xl !border-none">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-mystic-violet/10 flex items-center justify-center text-mystic-violet text-xl">
              {LANGUAGES[currentLang]?.flag}
            </div>
            <div>
              <span className="font-display uppercase tracking-widest text-xs text-star-white/80 block">
                {t("profile.language")}
              </span>
              <span className="text-[9px] font-display text-white/20 uppercase tracking-widest mt-1">
                {LANGUAGES[currentLang]?.label}
              </span>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        <ProfileSettingRow
          icon={Star}
          iconBg="bg-mystic-violet/10"
          iconColor="text-mystic-violet"
          label={t("profile.premium")}
          sublabel={t("profile.premium_sub")}
        />
      </div>

      {tuViData && (
        <div className="space-y-4">
          <p className="text-[10px] font-display text-white/20 uppercase tracking-[0.4em] px-2 mb-2">
            {t("profile.data_management")}
          </p>
          <ProfileSettingRow
            icon={Trash2}
            iconBg="bg-red-500/10"
            iconColor="text-red-400/60"
            label={t("profile.clear_chart")}
            sublabel={t("profile.clear_chart_sub")}
            onClick={handleClear}
            danger
          />
        </div>
      )}

      <button className="w-full py-5 rounded-[2rem] glass-panel bg-red-500/5 text-red-400/40 font-display tracking-[0.4em] uppercase text-[10px] hover:bg-red-500/10 transition-all shadow-xl !border-none">
        {t("profile.end_session")}
      </button>
    </div>
  );
};
