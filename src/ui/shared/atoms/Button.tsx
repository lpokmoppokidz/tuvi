import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "ghost" | "danger";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "gold",
  loading = false,
  icon,
  disabled,
  className = "",
  ...props
}) => {
  const base =
    "flex items-center justify-center gap-3 rounded-3xl font-display text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-30 !border-none";

  const variants = {
    gold:  "py-5 px-8 bg-celestial-gold/10 text-celestial-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:bg-celestial-gold/20",
    ghost: "py-4 px-6 bg-white/5 text-white/60 hover:bg-white/10",
    danger:"py-4 px-6 bg-red-500/10 text-red-400 hover:bg-red-500/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...(props as any)}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
    </motion.button>
  );
};
