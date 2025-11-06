import { useUserStore } from "#/store/useUserStore";

interface PermissionProps {
  code: string;
  children: React.ReactNode;
}

export function PermissionAction({ code, children }: PermissionProps) {
  const { hasPermission } = useUserStore();
  if (!hasPermission(code)) return null;
  return <>{children}</>;
}
