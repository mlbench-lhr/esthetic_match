import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";

// Configure language detector to use cookies
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false, // react already escapes
    },
    detection: {
      order: ["cookie", "navigator"], // detect first from cookie, then browser
      caches: ["cookie"], // save preference in cookies
      cookieMinutes: 10080, // cookie expiry = 7 days
      cookieDomain: typeof window !== "undefined" ? window.location.hostname : "",
    },
  });

export default i18n;
