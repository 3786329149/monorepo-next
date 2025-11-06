import * as Icons from "lucide-react";

export function getLucideIcon(name?: string) {
  if (!name) return null;
  const Icon = (Icons as unknown as Record<string, React.ComponentType<any>>)[
    name
  ];
  return Icon ?? null;
}
