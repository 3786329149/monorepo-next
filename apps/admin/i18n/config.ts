export const locales = ["en", "zh", "jp"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
