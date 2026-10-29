"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = React.useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("loading");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: fd.get("password") }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Ошибка входа");
      }

      // Возвращаем туда, откуда пришли (или в админку)
      const from = searchParams.get("from") ?? "/admin";
      router.replace(from);
      router.refresh();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Ошибка входа");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="space-y-1.5">
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" autoFocus />
      </div>
      {state === "error" && (
        <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm font-medium text-accent-dark" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={state === "loading"}>
        {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Войти
      </Button>
    </form>
  );
}
