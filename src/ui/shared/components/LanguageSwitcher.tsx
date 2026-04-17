// src/ui/components/shared/LanguageSwitcher.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { LANGUAGES, type Language } from "@/i18n/config";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const current = i18n.language as Language;
  const next: Language = current === "vi" ? "en" : "vi";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => i18n.changeLanguage(next)}
      className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[10px] font-display uppercase tracking-widest text-celestial-gold/80 hover:text-celestial-gold transition-colors !border-none"
      aria-label="Switch language"
    >
      <span>{LANGUAGES[next]?.flag}</span>
      <span>{LANGUAGES[next]?.label}</span>
    </motion.button>
  );
};
