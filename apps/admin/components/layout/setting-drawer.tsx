"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@repo/shadcn/components/ui/drawer";
import { useLayoutStore } from "../../store/useLayoutStore";
import { Switch } from "@repo/shadcn/components/ui/switch";
import { Button } from "@repo/shadcn/components/ui/button";
import { Label } from "@repo/shadcn/components/ui/label";

export default function SettingDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const {
    mode,
    darkMode,

    setMode,
    toggleDark,
  } = useLayoutStore();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-sm ml-auto rounded-l-xl border-l shadow-lg">
        <DrawerHeader>
          <DrawerTitle>系统布局设置</DrawerTitle>
        </DrawerHeader>

        <div className="p-6 space-y-6">
          {/* Layout Type */}
          <div>
            <Label className="mb-2 block">布局模式</Label>
            <div className="flex gap-2">
              {(["side", "top", "mix"] as const).map((type) => (
                <Button
                  key={type}
                  variant={mode === type ? "default" : "outline"}
                  onClick={() => setMode(type)}
                >
                  {type === "side" ? "侧边" : type === "top" ? "顶部" : "混合"}
                </Button>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <Label>暗黑模式</Label>
            {/* 主题切换示例（可以替换为你的 ThemeProvider hook） */}
            {/* <Button variant="ghost" size="icon">
              <Sun className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Moon className="w-4 h-4" />
            </Button> */}
            <Switch checked={darkMode} onCheckedChange={toggleDark} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
