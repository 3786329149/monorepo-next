export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function loginApi(data: LoginParams): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("登录失败");
  return res.json();
}
