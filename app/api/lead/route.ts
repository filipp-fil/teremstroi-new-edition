import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendLeadEmail } from "@/lib/mailer";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { leadSchema } from "@/lib/validations";

/**
 * Приём заявок: POST /api/lead
 * Защита: zod-валидация + honeypot + rate-limit по IP.
 * Сохраняет в БД и отправляет письмо (если настроен SMTP).
 */
export async function POST(req: Request) {
  // 1. Rate-limit: не более 5 заявок за 10 минут с одного IP
  if (!rateLimit(getClientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Попробуйте позже." },
      { status: 429 }
    );
  }

  // 2. Парсим и валидируем тело
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" },
      { status: 400 }
    );
  }

  const { name, phone, message, company, source } = parsed.data;

  // 3. Honeypot: если заполнено скрытое поле — это бот. Притворяемся, что всё ок.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // 4. Сохраняем в БД
  try {
    await prisma.lead.create({
      data: { name, phone, message: message || null, source },
    });
  } catch (e) {
    console.error("[api/lead] Ошибка сохранения в БД:", e);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку. Позвоните нам, пожалуйста." },
      { status: 500 }
    );
  }

  // 5. Отправляем письмо (не блокируем ответ при ошибке SMTP)
  try {
    await sendLeadEmail({ name, phone, message, source });
  } catch (e) {
    console.error("[api/lead] Ошибка отправки письма:", e);
  }

  return NextResponse.json({ ok: true });
}
