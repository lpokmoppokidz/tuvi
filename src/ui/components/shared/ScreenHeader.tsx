// src/ui/components/shared/ScreenHeader.tsx
import React from "react";
import { Sparkles } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
}

export const ScreenHeader: React.FC<Props> = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-display text-gradient-gold tracking-widest uppercase">
      {title}
    </h2>
    {subtitle && (
      <div className="flex items-center justify-center gap-2 mt-2">
        <Sparkles size={12} className="text-celestial-gold opacity-50" />
        <p className="text-[10px] font-display text-white/30 tracking-[0.4em] uppercase">
          {subtitle}
        </p>
        <Sparkles size={12} className="text-celestial-gold opacity-50" />
      </div>
    )}
  </div>
);
