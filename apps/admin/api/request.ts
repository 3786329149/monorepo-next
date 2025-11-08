export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // 禁止缓存，确保实时数据
    ...options,
  });

  const json = await res.json();

  if (!res.ok || json.code !== 0) {
    throw new Error(json.message || "请求失败");
  }

  return json.data as T;
}
