import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ icon, error, label, className = "", ...props }) => (
  <div className="space-y-2">
    {label && (
      <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        className={`w-full glass-panel bg-white/5 rounded-2xl py-5 ${icon ? "pl-14" : "pl-6"} pr-6 text-star-white font-display text-xs tracking-widest placeholder:text-white/10 outline-none !border-none shadow-xl ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-[10px] text-red-400 ml-2">{error}</p>}
  </div>
);
