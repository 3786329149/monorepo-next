"use client";

import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

import { useLayoutStore } from "#/store/useLayoutStore";

export default function LayoutMix({ children }: { children: React.ReactNode }) {
  const { collapsed } = useLayoutStore();
  const expandedWidth = 200; // mix 的侧边宽度通常比 side 略窄
  const collapsedWidth = 72;
  const leftMargin = collapsed ? collapsedWidth : expandedWidth;

  return (
    <div className="flex h-screen bg-muted/10">
      {/* 顶部 + 内容区的组合：先渲染 Topbar，再在下方左右布局 */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: `${leftMargin}px` }}
      >
        <Topbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* 侧边栏放在 DOM 的最后，仍使用 fixed 定位（Sidebar 组件里已 fixed） */}
      <Sidebar />
    </div>
  );
}
