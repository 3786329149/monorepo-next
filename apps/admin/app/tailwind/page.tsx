import { Button } from "@repo/shadcn/components/ui/Button";

import { Card } from "@repo/ui/card";

export default function tailwindPage() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button variant="destructive">aaa</Button>
      <Button className="bg-blue-1000 text-purple-1000">
        自定颜色(@repo/tailwind-config中配置的)
      </Button>
      <Card title="card" href="/">
        我是@repo/ui下的组件card , 注意查看html元素 我的 css 样式带有 ui:xxxx,
        主要是我在组件包使用了 的 styles中 `@import "tailwindcss" prefix(ui);`,
        这样就不会污染这个程序的tailwindcss
      </Card>
    </main>
  );
}
