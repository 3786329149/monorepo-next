"use client";

import { useState, useRef, useCallback } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@repo/shadcn/components/ui/popover";

export function HoverPopover({
  trigger,
  content,
  side = "right",
  align = "start",
  openDelay = 80,
  closeDelay = 350,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  openDelay?: number;
  closeDelay?: number;
}) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearOpenTimer = useCallback(() => {
    if (openTimer.current) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    clearCloseTimer();
    clearOpenTimer();
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [openDelay, clearCloseTimer, clearOpenTimer]);

  const handleLeave = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay, clearOpenTimer, clearCloseTimer]);

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side={side}
          align={align}
          className="p-0 border rounded-md shadow-lg bg-popover text-popover-foreground min-w-[160px] max-w-[240px] w-auto" // 👈 控制宽度 "
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {content}
        </PopoverContent>
      </Popover>
    </div>
  );
}
