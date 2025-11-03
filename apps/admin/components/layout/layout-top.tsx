import TopBar from "./components/TopBar";

export default function LayoutTop({ children }: { children: React.ReactNode }) {
  // Top 布局没有侧边栏，内容占满全宽
  return (
    <div className="flex flex-col h-screen">
      <TopBar variant="top" />
      <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
    </div>
  );
}
