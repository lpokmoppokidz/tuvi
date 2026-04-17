// src/ui/components/ngay-mai/OverviewCard.tsx
import React from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CrystalCard } from "@/ui/shared/components/CrystalCard";

interface Props { text: string; }

export const OverviewCard: React.FC<Props> = ({ text }) => {
  const { t } = useTranslation();
  return (
    <CrystalCard className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Star size={16} className="text-crystal-gold" />
        <p className="text-xs font-black text-text uppercase tracking-widest">
          {t("ngay_mai.overview_title")}
        </p>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{text}</p>
    </CrystalCard>
  );
};
