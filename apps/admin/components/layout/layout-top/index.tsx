"use client";

import { motion } from "framer-motion";
import Header from "./Header";

export default function LayoutTop({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* 顶部导航栏 */}
      <Header />

      {/* 内容区域 */}
      <motion.main
        layout
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-1 overflow-auto bg-muted/30 p-4"
      >
        {children}
      </motion.main>
    </div>
  );
}
