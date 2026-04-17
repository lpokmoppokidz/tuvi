// src/ui/components/ngay-mai/ScoreGrid.tsx
import React from "react";
import { Coins, Stethoscope, Heart, Briefcase, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ScoreItem { label: string; score: number; icon: LucideIcon; key: string; }

interface Props {
  diemTai: number; diemSuc: number; diemTinh: number; diemSu: number;
  onToggle: (key: string) => void;
}

const scoreColor = (s: number) => s >= 80 ? "text-green-400" : s >= 60 ? "text-crystal-gold" : s >= 40 ? "text-orange-400" : "text-red-400";
const scoreBarColor = (s: number) => s >= 80 ? "bg-green-400" : s >= 60 ? "bg-yellow-400" : s >= 40 ? "bg-orange-400" : "bg-red-400";

export const ScoreGrid: React.FC<Props> = ({ diemTai, diemSuc, diemTinh, diemSu, onToggle }) => {
  const { t } = useTranslation();

  const items: ScoreItem[] = [
    { label: t("ngay_mai.score_wealth"),  score: diemTai,  icon: Coins,       key: "tai" },
    { label: t("ngay_mai.score_health"),  score: diemSuc,  icon: Stethoscope, key: "suc" },
    { label: t("ngay_mai.score_love"),    score: diemTinh, icon: Heart,       key: "tinh" },
    { label: t("ngay_mai.score_career"),  score: diemSu,   icon: Briefcase,   key: "su" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.key} onClick={() => onToggle(item.key)}
          className="glass-panel gold-border p-6 flex flex-col items-center cursor-pointer rounded-3xl active:scale-95 transition-transform duration-100">
          <item.icon size={20} className={`${scoreColor(item.score)} mb-4 opacity-70`} strokeWidth={1.5} />
          <p className="text-[9px] font-display opacity-40 uppercase tracking-[0.2em] mb-2">{item.label}</p>
          <p className={`text-2xl font-display ${scoreColor(item.score)} tracking-tighter`}>{item.score}%</p>
          <div className="w-full mt-3 h-0.5 rounded-full bg-white/5 overflow-hidden">
            <div className={`h-full rounded-full ${scoreBarColor(item.score)} opacity-50 transition-all duration-700`}
              style={{ width: `${item.score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};
