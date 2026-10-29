/**
 * Простой in-memory rate-limit по IP.
 * Ограничение: не более MAX_REQUESTS заданий за WINDOW_MS с одного IP.
 * Для одного инстанса сервера достаточно; на Vercel каждая функция — свой инстанс,
 * поэтому для железной защиты при больших объёмах спама лучше перейти на Upstash.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 минут
const MAX_REQUESTS = 5; // максимум 5 заявок с одного IP за окно

const buckets = new Map<string, { count: number; resetAt: number }>();

// Периодическая чистка протухших записей (чтобы Map не рос бесконечно)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, WINDOW_MS).unref?.();
}

/** Возвращает true, если запрос разрешён, и false при превышении лимита */
export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

/** IP клиента из заголовков (учитываем прокси/Vercel) */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
