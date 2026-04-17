import React from "react";
import type { CungDisplay } from "@/domain/model/types";

export const CungCard = ({
  cung,
  onClick,
  className = "",
}: {
  cung: CungDisplay;
  onClick: () => void;
  className?: string;
}) => (
  <div
    onClick={onClick}
    className={`glass-panel p-2.5 rounded-2xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer !border-none shadow-xl ${
      cung.isMenh
        ? "celestial-glow ring-1 ring-celestial-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        : "hover:bg-white/5"
    } ${className} flex flex-col h-full min-h-[110px]`}
  >
    {/* Decorative Shimmer */}
    <div className="shimmer absolute inset-0 pointer-events-none opacity-10" />

    <div className="flex justify-between items-start mb-1 relative z-10">
      <span
        className={`text-[8px] font-display tracking-[0.2em] uppercase ${
          cung.isMenh ? "text-gradient-gold" : "text-white/40"
        }`}
      >
        {cung.canChi}
      </span>
      {cung.isMenh && (
        <div className="w-1.5 h-1.5 rounded-full bg-celestial-gold shadow-[0_0_8px_#d4af37] animate-pulse" />
      )}
    </div>

    <div className="flex flex-col items-center justify-center flex-1 py-1 relative z-10">
      <h4
        className={`text-[10px] font-display tracking-[0.15em] text-center leading-tight ${
          cung.isMenh ? "text-gradient-gold font-bold" : "text-star-white/90"
        }`}
      >
        {cung.ten}
      </h4>
    </div>

    {/* Stars Section */}
    <div className="flex flex-col gap-1 mt-auto relative z-10">
      {/* Chính Tinh */}
      {(cung.chinhTinh ?? []).length > 0 && (
        <div className="flex flex-wrap justify-center gap-1">
          {cung.chinhTinh.map((star, idx) => (
            <span
              key={idx}
              className={`text-[9px] font-display leading-tight truncate ${
                cung.isMenh ? "text-star-white" : "text-star-white/70"
              }`}
            >
              {star}
            </span>
          ))}
        </div>
      )}

      {/* Tứ Hóa */}
      {(cung.tuHoa ?? []).length > 0 && (
        <div className="flex flex-wrap justify-center gap-1">
          {cung.tuHoa.map((star, idx) => (
            <span
              key={idx}
              className="text-[7px] font-black text-celestial-gold uppercase tracking-tighter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"
            >
              {star}
            </span>
          ))}
        </div>
      )}

      {/* Phụ Tinh */}
      <div className="flex flex-wrap justify-center gap-0.5 opacity-30">
        {(cung.phuTinh ?? []).slice(0, 2).map((star, idx) => (
          <span
            key={idx}
            className="text-white/60 text-[6px] truncate max-w-full"
          >
            • {star}
          </span>
        ))}
      </div>
    </div>

    {/* Subtle Star Sparkle for Menh */}
    {cung.isMenh && (
      <div className="absolute -bottom-1 -right-1 opacity-10">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
            fill="currentColor"
            className="text-celestial-gold"
          />
        </svg>
      </div>
    )}
  </div>
);
