// src/ui/components/form/PasswordStrengthInput.tsx
import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  autoComplete?: string;
  required?: boolean;
}

const STRENGTH_COLORS = ["bg-white/10", "bg-red-400", "bg-orange-400", "bg-celestial-gold", "bg-green-400"];

export const PasswordStrengthInput: React.FC<Props> = ({
  value, onChange, label, autoComplete = "new-password", required,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const strength = Math.min(4, [
    value.length >= 8,
    /[A-Z]/.test(value),
    /[0-9]/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ].filter(Boolean).length);

  return (
    <div className="space-y-2">
      <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2 block">
        {label ?? t("auth.password")}
      </label>
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
          <Lock size={18} />
        </span>
        <input
          type={show ? "text" : "password"}
          placeholder="••••••••"
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full glass-panel bg-white/5 rounded-2xl py-5 pl-14 pr-14 text-star-white font-display text-xs tracking-widest placeholder:text-white/10 outline-none !border-none shadow-xl"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
          aria-label={show ? t("auth.hide_password") : t("auth.show_password")}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {/* Strength bar */}
      <div className="flex gap-2 px-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 w-full rounded-full transition-all duration-300 ${
              i <= strength ? STRENGTH_COLORS[strength] : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
