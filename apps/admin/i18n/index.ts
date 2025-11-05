"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import zhCN from "./locales/zh-CN.json";
import enUS from "./locales/en-US.json";
import jaJP from "./locales/ja-JP.json";

export const resources = {
  "zh-CN": { translation: zhCN },
  "en-US": { translation: enUS },
  "ja-JP": { translation: jaJP },
} as const;

export const defaultNS = "translation";
export const fallbackLng = "zh-CN";

export type Language = keyof typeof resources;

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng,
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
