import React, { memo } from "react";
import { motion } from "motion/react";
import { CungDisplay } from "../../../domain/model/types";
import { staggerItem } from "../../utils/motion-config";

interface Props {
  cung: CungDisplay;
  index: number;
  onClick: () => void;
}

export const CungGridItem: React.FC<Props> = memo(({ cung, index, onClick }) => (
  <motion.div
    {...staggerItem(index)}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    style={{ willChange: 'transform' }}
    className="aspect-[4/5] transform-gpu"
  >
    <div className={`glass-panel p-2.5 rounded-2xl h-full flex flex-col justify-between cursor-pointer transition-all duration-500 relative overflow-hidden group !border-none ${
      cung.isMenh
        ? "celestial-glow bg-celestial-gold/5 ring-1 ring-celestial-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        : "hover:bg-white/5 shadow-xl"
    }`}>
      <div className="shimmer absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-30 will-change-opacity" />

      <div className="flex justify-between items-start relative z-10">
        <span className={`text-[9px] font-display tracking-widest uppercase ${
          cung.isMenh ? "text-gradient-gold" : "text-white/40"
        }`}>{cung.ten}</span>
        <span className="text-[7px] font-display text-white/20 uppercase tracking-tighter">
          {cung.canChi}
        </span>
      </div>

      <div className="flex flex-col gap-1 relative z-10 py-1">
        {(cung.chinhTinh ?? []).slice(0, 2).map((s, i) => (
          <span key={i} className={`text-[10px] font-display leading-tight truncate ${
            cung.isMenh ? "text-star-white" : "text-star-white/70"
          }`}>{s}</span>
        ))}
        {(cung.tuHoa ?? []).map((h, i) => (
          <span key={i} className="text-[7px] font-black text-celestial-gold uppercase tracking-tighter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
            {h}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-0.5 mt-auto opacity-30 group-hover:opacity-60 transition-opacity relative z-10 overflow-hidden h-3">
        {(cung.phuTinh ?? []).slice(0, 3).map((s, i) => (
          <span key={i} className="text-[6px] text-white/60 truncate max-w-full">• {s}</span>
        ))}
      </div>
    </div>
  </motion.div>
));

CungGridItem.displayName = "CungGridItem";
