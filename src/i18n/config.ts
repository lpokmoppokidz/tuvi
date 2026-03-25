import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./messages/en.json";
import vi from "./messages/vi.json";

export const LANGUAGES = {
  vi: { label: "Tiếng Việt", flag: "🇻🇳" },
  en: { label: "English",    flag: "🇺🇸" },
} as const;

export type Language = keyof typeof LANGUAGES;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: "vi",
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
  });

export default i18n;
