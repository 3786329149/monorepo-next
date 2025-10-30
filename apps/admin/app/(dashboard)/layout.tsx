import { Sidebar } from "../../components/layout/Sidebar";
import { Topbar } from "../../components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 w-64">
        <Sidebar />
      </div>

      {/* Right Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
