import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1>欢迎来到仪表盘</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>统计 {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">这里是统计数据。</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
