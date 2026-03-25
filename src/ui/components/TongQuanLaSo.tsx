// src/ui/components/TongQuanLaSo.tsx
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TuViData } from "../../domain/model/types";
import { SectionAccordion } from "./tong-quan/SectionAccordion";
import { useSections } from "./tong-quan/useSections";

interface Props { tuViData: TuViData; }

export const TongQuanLaSo: React.FC<Props> = ({ tuViData }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>("ban_sac");
  const sections = useSections(tuViData, t);

  const toggle = (key: string) => setExpanded(prev => prev === key ? null : key);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 px-1 mb-4">
        <Sparkles size={16} className="text-celestial-gold opacity-60" />
        <h3 className="text-xs font-display text-white/40 uppercase tracking-[0.3em]">
          {t("tong_quan.header")}
        </h3>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[9px] font-display text-white/20 uppercase tracking-widest">
          {tuViData.thong_tin_co_ban.can_chi_nam}
        </span>
      </div>

      {sections.map((section) => (
        <SectionAccordion
          key={section.key}
          sectionKey={section.key}
          icon={section.icon}
          color={section.color}
          bg={section.bg}
          title={section.title}
          sub={section.sub}
          items={section.items}
          isOpen={expanded === section.key}
          onToggle={toggle}
        />
      ))}
    </div>
  );
};
