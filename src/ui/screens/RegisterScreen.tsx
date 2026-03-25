import React, { useState } from "react";
import { Mail, User, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Input } from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";
import { PasswordStrengthInput } from "../components/form/PasswordStrengthInput";
import { TermsCheckbox }         from "../components/form/TermsCheckbox";
import { SocialLoginButtons }    from "../components/shared/SocialLoginButtons";

interface RegisterScreenProps {
  onNavigateLogin?: () => void;
  onRegisterSuccess?: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    // TODO: wire up auth service
    setTimeout(() => { setLoading(false); onRegisterSuccess?.(); }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#050510] to-[#050510]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-mystic-violet/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-celestial-gold/10 blur-[120px] rounded-full" />
        <div className="star-field absolute top-[10%] left-[15%]" />
        <div className="star-field absolute top-[25%] left-[80%]" />
        <div className="star-field absolute top-[60%] left-[45%]" />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Branding */}
        <header className="text-center mb-10">
          <Sparkles size={36} className="text-celestial-gold mx-auto mb-4" />
          <h1 className="font-display text-3xl tracking-[0.2em] text-gradient-gold uppercase mb-2">
            {t("auth.app_name")}
          </h1>
          <p className="text-[10px] font-display tracking-[0.1em] uppercase text-white/40">
            {t("auth.tagline")}
          </p>
        </header>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[480px] relative"
        >
          <div className="absolute inset-0 bg-mystic-violet/5 blur-3xl -z-10 rounded-[2rem]" />
          <section className="glass-panel rounded-[2rem] p-8 shadow-2xl">
            <h2 className="font-display text-2xl text-center text-star-white mb-8 tracking-widest uppercase">
              {t("auth.register_title")}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                type="text"
                label={t("auth.full_name")}
                placeholder={t("auth.full_name_placeholder")}
                icon={<User size={18} />}
                autoComplete="name"
                required
              />

              <Input
                type="email"
                label={t("auth.email")}
                placeholder="email@example.com"
                icon={<Mail size={18} />}
                autoComplete="email"
                required
              />

              <PasswordStrengthInput
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
                required
              />

              <Input
                type="password"
                label={t("auth.confirm_password")}
                placeholder="••••••••"
                icon={<Shield size={18} />}
                autoComplete="new-password"
                required
              />

              <TermsCheckbox checked={agreed} onChange={setAgreed} />

              <Button
                type="submit"
                variant="gold"
                loading={loading}
                disabled={!agreed}
                className="w-full mt-2"
              >
                {t("auth.register_btn")}
              </Button>

              {/* Divider + Social */}
              <SocialLoginButtons />
            </form>

            {/* Login link */}
            <div className="mt-8 text-center">
              <p className="text-xs text-white/30">
                {t("auth.have_account")}{" "}
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="text-mystic-violet font-display tracking-widest hover:text-primary transition-colors ml-1"
                >
                  {t("auth.login_link")}
                </button>
              </p>
            </div>
          </section>
        </motion.div>

        {/* Decorative footer */}
        <div className="mt-10 text-center opacity-30 pointer-events-none">
          <p className="text-[9px] font-display tracking-[0.3em] text-white/40 uppercase">
            {t("auth.footer_motto")}
          </p>
        </div>
      </main>
    </div>
  );
};
