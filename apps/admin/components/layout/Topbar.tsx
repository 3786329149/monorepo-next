"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/ui/avatar";
import { MobileSidebar } from "./MobileSidebar";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 lg:ml-0 md:ml-64 sticky top-0 bg-background z-40">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <span className="font-semibold hidden md:block">控制面板</span>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
