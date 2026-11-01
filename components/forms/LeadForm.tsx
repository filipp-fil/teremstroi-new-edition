"use client";

import * as React from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PuzzleCaptcha } from "./PuzzleCaptcha";
import { PhoneInput } from "./PhoneInput";

type LeadSource = "hero" | "cta" | "callback" | "project" | "works" | "contact";

interface LeadFormProps {
  source: LeadSource;
  /** Показать поле комментария (по умолчанию — только имя и телефон) */
  withComment?: boolean;
  commentLabel?: string;
  submitLabel?: string;
  /** Вызывается после успешной отправки (например, закрыть модалку) */
  onSuccess?: () => void;
}

/**
 * Универсальная форма заявки.
 * Отправляет POST /api/lead: сохранение в БД + письмо на почту.
 * Защита от спама: капча-пазл + honeypot-поле + rate-limit на сервере.
 * После отправки фиксирует цель Яндекс.Метрики LEAD_SUBMIT (если счётчик подключён).
 */
export function LeadForm({
  source,
  withComment = false,
  commentLabel = "Комментарий",
  submitLabel = "Отправить заявку",
  onSuccess,
}: LeadFormProps) {
  const [state, setState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = React.useState("");
  const [captchaOk, setCaptchaOk] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          phone: fd.get("phone"),
          message: fd.get("message") || undefined,
          company: fd.get("company") || undefined, // honeypot
          source,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Что-то пошло не так");
      }

      // Цель Яндекс.Метрики (если счётчик подключён через env)
      try {
        const w = window as unknown as { ym?: (id: number, event: string, goal: string) => void };
        const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
        if (w.ym && metrikaId) {
          w.ym(metrikaId, "reachGoal", "LEAD_SUBMIT");
          w.ym(metrikaId, "reachGoal", `LEAD_${source.toUpperCase()}`);
        }
      } catch {
        /* метрика не критична */
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
        <p className="text-lg font-bold text-forest">Заявка отправлена!</p>
        <p className="text-sm text-muted-foreground">
          Менеджер перезвонит вам в течение 15 минут в рабочее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="space-y-1.5">
        <Label htmlFor={`name-${source}`}>Ваше имя</Label>
        <Input id={`name-${source}`} name="name" placeholder="Иван" required minLength={2} autoComplete="name" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`phone-${source}`}>Телефон</Label>
        <PhoneInput
          id={`phone-${source}`}
          name="phone"
          placeholder="+7 (___) ___-__-__"
          required
          minLength={10}
          autoComplete="tel"
        />
      </div>

      {withComment && (
        <div className="space-y-1.5">
          <Label htmlFor={`message-${source}`}>{commentLabel}</Label>
          <Textarea
            id={`message-${source}`}
            name="message"
            placeholder="Например: дом 8×10, с мансардой, участок в Токсово"
          />
        </div>
      )}

      {/* Honeypot: скрыто от людей, заполняют только боты */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Компания
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Капча-пазл */}
      <PuzzleCaptcha onSolve={() => setCaptchaOk(true)} />

      {state === "error" && (
        <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm font-medium text-accent-dark" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={state === "loading" || !captchaOk}>
        {state === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        {submitLabel}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
      </p>

      {/* Плашка доверия */}
      <p className="flex items-center justify-center gap-2 rounded-lg bg-primary-light px-3 py-2 text-xs font-semibold text-forest">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary-dark" />
        с 2011 года · 470+ домов · гарантия 5 лет · без предоплаты
      </p>
    </form>
  );
}
