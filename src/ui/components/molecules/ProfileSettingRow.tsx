// src/ui/components/molecules/ProfileSettingRow.tsx
import React from "react";
import { ChevronRight, LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  sublabel?: string;
  onClick?: () => void;
  danger?: boolean;
  rightSlot?: React.ReactNode;
}

export const ProfileSettingRow: React.FC<Props> = ({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  sublabel,
  onClick,
  danger = false,
  rightSlot,
}) => (
  <div
    className={`glass-panel flex items-center justify-between p-6 rounded-[2.5rem] shadow-xl !border-none group ${
      onClick ? "cursor-pointer" : ""
    } ${danger ? "hover:bg-red-500/5 transition-colors" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-5">
      <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <span className={`font-display uppercase tracking-widest text-xs block ${danger ? "text-red-400/60" : "text-star-white/80"}`}>
          {label}
        </span>
        {sublabel && (
          <span className={`text-[9px] font-display uppercase tracking-widest mt-1 ${danger ? "text-red-400/20" : "text-white/20"}`}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
    {rightSlot ?? (onClick && <ChevronRight size={18} className={danger ? "text-red-400/20" : "text-white/20 group-hover:text-celestial-gold/60 transition-colors"} />)}
  </div>
);
