"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/shadcn/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Button } from "@repo/shadcn/components/ui/button";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
