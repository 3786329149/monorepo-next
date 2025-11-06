"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "#/store/useUserStore";

export default function login() {
  const { login, loading } = useUserStore();
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(form);
    if (success) {
      const redirect = params.get("redirect") || "/dashboard";
      router.replace(redirect);
    } else {
      setError("用户名或密码错误");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input
        placeholder="用户名"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="border rounded px-3 py-2"
      />
      <input
        placeholder="密码"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border rounded px-3 py-2"
      />
      <button
        disabled={loading}
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "登录中..." : "登录"}
      </button>
    </div>
  );
}
