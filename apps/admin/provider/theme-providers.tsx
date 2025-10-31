"use client";

import { useLayoutStore } from "../store/useLayoutStore";
import { useEffect } from "react";

export default function ThemeWatcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useLayoutStore();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return <>{children}</>;
}
