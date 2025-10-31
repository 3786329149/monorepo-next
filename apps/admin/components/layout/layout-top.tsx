import Topbar from "../Topbar";

export default function LayoutTop({ children }: { children: React.ReactNode }) {
  // Top 布局没有侧边栏，内容占满全宽
  return (
    <div className="flex flex-col h-screen bg-muted/10">
      <Topbar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
