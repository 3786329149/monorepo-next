"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME } from "#/constants";

export async function setUserLocale(locale: string) {
  (await cookies()).set(COOKIE_NAME, locale, {
    path: "/", // 所有路由生效
    maxAge: 60 * 60 * 24 * 365, // 🕐 1年有效
  });
}
