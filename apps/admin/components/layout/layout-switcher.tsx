"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import { Button } from "@repo/shadcn/components/ui/button";

export default function LayoutSwitcher() {
  const { layout, setLayout } = useLayoutStore();

  return (
    <div className="flex gap-2">
      <Button
        variant={layout === "side" ? "default" : "outline"}
        onClick={() => setLayout("side")}
      >
        侧边
      </Button>
      <Button
        variant={layout === "top" ? "default" : "outline"}
        onClick={() => setLayout("top")}
      >
        顶部
      </Button>
      <Button
        variant={layout === "mix" ? "default" : "outline"}
        onClick={() => setLayout("mix")}
      >
        混合
      </Button>
    </div>
  );
}
