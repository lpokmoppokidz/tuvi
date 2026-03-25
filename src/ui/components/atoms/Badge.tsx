import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "gold" | "violet" | "red" | "green";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = "gold", className = "" }) => {
  const colors = {
    gold:   "bg-celestial-gold/10 text-celestial-gold border-celestial-gold/20",
    violet: "bg-mystic-violet/10 text-mystic-violet border-mystic-violet/20",
    red:    "bg-red-500/10 text-red-400 border-red-500/20",
    green:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-display uppercase tracking-widest border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};
