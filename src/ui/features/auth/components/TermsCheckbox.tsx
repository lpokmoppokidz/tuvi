// src/ui/components/form/TermsCheckbox.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
}

export const TermsCheckbox: React.FC<Props> = ({ checked, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-3 px-1 pt-1">
      <input
        id="terms"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 rounded border-white/20 bg-white/5 text-mystic-violet focus:ring-mystic-violet focus:ring-offset-0"
      />
      <label htmlFor="terms" className="text-xs text-white/40 leading-relaxed font-display tracking-wide">
        {t("auth.terms_prefix")}{" "}
        <button type="button" className="text-mystic-violet hover:underline transition-all">
          {t("auth.terms_link")}
        </button>{" "}
        {t("auth.terms_and")}{" "}
        <button type="button" className="text-mystic-violet hover:underline transition-all">
          {t("auth.privacy_link")}
        </button>
      </label>
    </div>
  );
};
