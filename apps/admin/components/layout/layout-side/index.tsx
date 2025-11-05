"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function LayoutSide({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* 侧边栏部分 */}
      <Sidebar />

      {/* Sidebar 菜单 */}

      {/* 主体部分 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <Header />
        {/* <div
          className="border-b border-border flex items-center px-4"
          style={{ height: HEADER_HEIGHT }}
        >
          <Header />
        </div> */}

        {/* 内容区 */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
