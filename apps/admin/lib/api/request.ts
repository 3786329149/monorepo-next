export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, { ...options, cache: "no-store" });

  if (!res.ok) throw new Error(`HTTP 错误：${res.status}`);

  const json: ApiResponse<T> = await res.json();

  if (json.code !== 0) {
    throw new Error(json.message || "请求失败");
  }

  return json.data;
}
