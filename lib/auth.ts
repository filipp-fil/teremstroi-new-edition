import jwt from "jsonwebtoken";

/**
 * Аутентификация администратора.
 * Пароль: .env → ADMIN_PASSWORD (по умолчанию KLIK4231 — ОБЯЗАТЕЛЬНО поменяйте!).
 * Секрет подписи: .env → ADMIN_SECRET (если пусто — используется пароль, тоже работает,
 * но лучше задать случайную строку).
 */

export const ADMIN_COOKIE = "admin_token";

function getSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "KLIK4231";
}

/** Проверка пароля (const-time сравнение не критично здесь, но делаем аккуратно) */
export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "KLIK4231";
  return password.length === expected.length && password === expected;
}

/** Создание подписанного токена (срок — 7 дней) */
export function createAdminToken(): string {
  return jwt.sign({ role: "admin" }, getSecret(), { expiresIn: "7d" });
}

/** Проверка токена из cookie */
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const payload = jwt.verify(token, getSecret()) as { role?: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}
