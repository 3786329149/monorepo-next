import ProtectedRoute from "#/components/ProtectedRoute";

export default function Settings() {
  return (
    <ProtectedRoute permission="settings:access">
      <h1>系统设置页面</h1>
    </ProtectedRoute>
  );
}
