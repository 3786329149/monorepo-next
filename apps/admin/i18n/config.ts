// 纯配置文件，不要放 "use client"

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
