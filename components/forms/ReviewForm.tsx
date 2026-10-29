"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PuzzleCaptcha } from "./PuzzleCaptcha";

/**
 * Форма отзыва: оценка 1–5 звёзд + имя + комментарий.
 * Отправляется в /api/lead с source="review" (оценка подписывается в начале сообщения).
 */
export function ReviewForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, setState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [hovered, setHovered] = React.useState(0);
  const [captchaOk, setCaptchaOk] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) {
      setState("error");
      setError("Поставьте оценку от 1 до 5 звёзд");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);

    setState("loading");
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone") || "+7 (000) 000-00-00",
          message: `Оценка: ${rating} из 5.\n${fd.get("message") || ""}`.trim(),
          company: fd.get("company") || undefined, // honeypot
          source: "review",
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Что-то пошло не так");
      }

      setState("success");
      onSuccess?.();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl bg-primary-light p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary-dark" />
        <p className="text-lg font-bold text-forest">Спасибо за отзыв!</p>
        <p className="text-sm text-muted-foreground">Мы обязательно его прочитаем и учтём.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Оценка звёздами */}
      <div className="space-y-1.5">
        <Label>
          Ваша оценка <span className="text-accent">*</span>
        </Label>
        <div className="flex gap-1" role="radiogroup" aria-label="Оценка от 1 до 5 звёзд">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} звёзд`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              className="rounded p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  n <= (hovered || rating) ? "fill-primary text-primary" : "fill-transparent text-primary/40"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 self-center text-sm font-semibold text-forest">
            {rating ? `${rating} из 5` : "нажмите на звезду"}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="review-name">Ваше имя</Label>
        <Input id="review-name" name="name" placeholder="Иван" required minLength={2} autoComplete="name" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="review-phone">Телефон (не публикуется)</Label>
        <Input
          id="review-phone"
          name="phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          minLength={10}
          autoComplete="tel"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="review-message">
          Комментарий <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="review-message"
          name="message"
          required
          minLength={10}
          rows={4}
          placeholder="Расскажите, как прошло строительство: сроки, качество, общение с бригадой…"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Компания
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <PuzzleCaptcha onSolve={() => setCaptchaOk(true)} />

      {state === "error" && (
        <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm font-medium text-accent-dark" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={state === "loading" || !captchaOk}>
        {state === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        Отправить отзыв
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
      </p>
    </form>
  );
}
