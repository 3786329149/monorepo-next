"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
// import Sidebar from "./components/Sidebar";
// import TopBar from "../TopBar";
// import { cn } from "@repo/shadcn/lib/utils";

import LayoutSide from "./layout-side/index";

// import LayoutSide from "./layout-side";
import LayoutTop from "./layout-top";
import LayoutMix from "./layout-mix";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mode } = useLayoutStore();

  switch (mode) {
    case "top":
      return <LayoutTop>{children}</LayoutTop>;
    case "mix":
      return <LayoutMix>{children}</LayoutMix>;
    default:
      return <LayoutSide>{children}</LayoutSide>;
  }

  // // 🧭 三种布局结构
  // if (mode === "top") {
  //   return (
  //     <div className="flex flex-col h-screen">
  //       <TopBar variant="top" />
  //       <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
  //     </div>
  //   );
  // }

  // if (mode === "mix") {
  //   return (
  //     <div className="flex flex-col h-screen">
  //       <TopBar variant="mix" />
  //       <div className="flex flex-1 overflow-hidden">
  //         <Sidebar mix />
  //         <main
  //           className={cn(
  //             "flex-1 overflow-auto bg-muted/30 p-6 transition-all duration-300",
  //             collapsed ? "ml-[64px]" : "ml-[200px]"
  //           )}
  //         >
  //           {children}
  //         </main>
  //       </div>
  //     </div>
  //   );
  // }

  // // 默认 side
  // return (
  //   <div className="flex h-screen">
  //     <Sidebar />
  //     <div
  //       className={cn(
  //         "flex flex-col flex-1 transition-all duration-300",
  //         collapsed ? "ml-[64px]" : "ml-[200px]"
  //       )}
  //     >
  //       <TopBar variant="side" />
  //       <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
  //     </div>
  //   </div>
  // );
}
