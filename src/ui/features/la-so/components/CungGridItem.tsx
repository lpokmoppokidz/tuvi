import React, { memo } from "react";
import { motion } from "motion/react";
import type { CungDisplay } from "@/domain/model/types";
import { staggerItem } from "@/ui/shared/utils/motion-config";

interface Props {
  cung: CungDisplay;
  index: number;
  onClick: () => void;
}

export const CungGridItem: React.FC<Props> = memo(
  ({ cung, index, onClick }) => (
    <motion.div
      {...staggerItem(index)}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{ willChange: "transform" }}
      className="aspect-[4/5] transform-gpu"
    >
      <div
        className={`p-4 rounded-[2rem] h-full flex flex-col justify-between 
          transition-all duration-300 relative border border-white/5 group
          ${
            cung.isMenh
              ? "bg-[#1c1c2b] ring-1 ring-yellow-500/30"
              : "bg-[#0f0f1a] hover:bg-[#151525]"
          }`.trim()}
      >
        {/* ĐÃ XÓA DIV SHIMMER Ở ĐÂY ĐỂ BỎ SỌC CHÉO */}

        <div className="flex justify-between items-start relative z-10">
          <span
            className={`text-[9px] font-bold tracking-widest uppercase ${
              cung.isMenh ? "text-yellow-500" : "text-white/40"
            }`}
          >
            {cung.ten}
          </span>
          <span className="text-[7px] text-white/20 uppercase tracking-tighter">
            {cung.canChi}
          </span>
        </div>

        <div className="flex flex-col gap-1 relative z-10 py-1">
          {(cung.chinhTinh ?? []).slice(0, 2).map((s, i) => (
            <span
              key={i}
              className={`text-[10px] font-medium leading-tight truncate ${
                cung.isMenh ? "text-white" : "text-white/70"
              }`}
            >
              {s}
            </span>
          ))}
          {(cung.tuHoa ?? []).map((h, i) => (
            <span
              key={i}
              className="text-[7px] font-black text-yellow-600 uppercase tracking-tighter"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-0.5 mt-auto opacity-30 group-hover:opacity-60 transition-opacity relative z-10 overflow-hidden h-3">
          {(cung.phuTinh ?? []).slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="text-[6px] text-white/60 truncate max-w-full"
            >
              • {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  ),
);

CungGridItem.displayName = "CungGridItem";
