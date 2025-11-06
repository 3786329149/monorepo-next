export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-gray-500">您没有访问此页面的权限</p>
    </div>
  );
}
