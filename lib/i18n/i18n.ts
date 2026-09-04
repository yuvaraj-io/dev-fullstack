"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS } from "./translations";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES } from "./languages";

const resources: Record<string, { translation: Record<string, unknown> }> = {};
Object.keys(TRANSLATIONS).forEach((lang) => {
  resources[lang] = {
    translation: TRANSLATIONS[lang] as Record<string, unknown>,
  };
});

if (!i18n.isInitialized) {
  let initialLanguage = DEFAULT_LANGUAGE;
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      initialLanguage = saved;
    }
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
