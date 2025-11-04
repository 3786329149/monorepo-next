import { useLayoutStore } from "#/store/useLayoutStore";
import { Button } from "@repo/shadcn/components/ui/button";
import { LayoutGrid } from "lucide-react";

/* 布局切换按钮 */
export function SwitchLayout() {
  const { mode, setMode } = useLayoutStore();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        setMode(mode === "side" ? "top" : mode === "top" ? "mix" : "side")
      }
    >
      <LayoutGrid size={16} className="mr-2" />
      {mode === "side" ? "Side" : mode === "top" ? "Top" : "Mix"}
    </Button>
  );
}
