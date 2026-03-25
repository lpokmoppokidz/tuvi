import React from "react";

interface LabelProps {
  children: React.ReactNode;
  variant?: "gold" | "muted" | "white";
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ children, variant = "gold", className = "" }) => {
  const variants = {
    gold:  "text-celestial-gold/60",
    muted: "text-white/30",
    white: "text-star-white/80",
  };

  return (
    <span className={`text-[9px] font-display uppercase tracking-[0.4em] ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
