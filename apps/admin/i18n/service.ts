"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME } from "#/constants";
import { defaultLocale, locales } from "./config";

export async function getUserLocale(): Promise<string> {
  const locale = (await cookies()).get(COOKIE_NAME)?.value as
    | string
    | undefined;
  if (locale && locales.includes(locale as any)) return locale;
  return defaultLocale;
}
