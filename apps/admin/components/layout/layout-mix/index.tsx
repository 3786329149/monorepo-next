"use client";

import { motion } from "framer-motion";

import { SIDEBAR_COLLAPSED, SIDEBAR_WIDTH } from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MixLayout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useLayoutStore();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* 顶部导航 */}
      <Header />

      {/* 主体区域 */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar 动画 */}
        <motion.aside
          layout
          animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex flex-col border-r border-border bg-card h-full"
        >
          <Sidebar />
        </motion.aside>

        {/* 内容区域 */}
        <motion.main
          layout
          className="flex-1 overflow-auto p-4 bg-background"
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
