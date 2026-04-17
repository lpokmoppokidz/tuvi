import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Button } from "@/ui/shared/atoms/Button";
import { Input } from "@/ui/shared/atoms/Input";
import { SocialLoginButtons } from "@/ui/features/auth/components/SocialLoginButtons";

interface LoginScreenProps {
  onNavigateRegister?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigateRegister, onLoginSuccess }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up auth service
    setTimeout(() => { setLoading(false); onLoginSuccess?.(); }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-on-primary-fixed-variant opacity-10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-secondary-container opacity-10 blur-[100px] rounded-full" />
        {/* Stars */}
        <div className="star-field absolute top-20 left-[15%]" />
        <div className="star-field absolute top-40 right-[20%]" />
        <div className="star-field absolute bottom-[30%] left-[10%]" />
        <div className="star-field absolute top-[60%] right-[15%]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex flex-col items-center pt-16 pb-10 px-4 text-center">
        <Sparkles size={36} className="text-celestial-gold mb-4" />
        <h1 className="font-display text-3xl tracking-[0.2em] text-gradient-gold uppercase">
          {t("auth.app_name")}
        </h1>
        <p className="text-[10px] font-display tracking-[0.15em] uppercase text-white/40 mt-2">
          {t("auth.tagline")}
        </p>
      </header>

      {/* Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel w-full max-w-[420px] rounded-[2rem] p-8 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl tracking-widest text-star-white uppercase">
              {t("auth.login_title")}
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-celestial-gold to-transparent mx-auto mt-3 opacity-50" />
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              type="email"
              label={t("auth.email")}
              placeholder="email@example.com"
              icon={<Mail size={18} />}
              autoComplete="email"
              required
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em]">
                  {t("auth.password")}
                </label>
                <button
                  type="button"
                  className="text-[9px] font-display text-mystic-violet/80 hover:text-mystic-violet uppercase tracking-widest transition-colors"
                >
                  {t("auth.forgot_password")}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full glass-panel bg-white/5 rounded-2xl py-5 pl-14 pr-14 text-star-white font-display text-xs tracking-widest placeholder:text-white/10 outline-none !border-none shadow-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? t("auth.hide_password") : t("auth.show_password")}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              loading={loading}
              className="w-full mt-2"
            >
              {t("auth.login_btn")}
            </Button>
          </form>

          {/* Divider + Social */}
          <SocialLoginButtons />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/30">
              {t("auth.no_account")}{" "}
              <button
                type="button"
                onClick={onNavigateRegister}
                className="text-mystic-violet font-display tracking-widest hover:text-primary transition-colors ml-1"
              >
                {t("auth.register_link")}
              </button>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
