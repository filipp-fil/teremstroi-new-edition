import nodemailer from "nodemailer";

/**
 * Отправка заявки на почту через SMTP (настройки — в .env).
 * Если SMTP не настроен (нет SMTP_USER) — письмо не отправляется,
 * но заявка сохраняется в БД и пишется в лог сервера.
 */

const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.yandex.ru",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    })
  : null;

const MAIL_TO = process.env.MAIL_TO ?? "fhockeyboy20@yahoo.com";

const SOURCE_LABELS: Record<string, string> = {
  hero: "Заявка с баннера (главная)",
  cta: "Расчёт проекта (CTA на главной)",
  callback: "Заказ звонка",
  project: "Рассчитать проект (карточка проекта)",
  works: "Заявка со страницы работ",
  contact: "Контактная форма",
};

export async function sendLeadEmail(lead: {
  name: string;
  phone: string;
  message?: string | null;
  source: string;
}): Promise<void> {
  const subject = `Новая заявка с сайта: ${SOURCE_LABELS[lead.source] ?? lead.source}`;
  const text = [
    `Источник: ${SOURCE_LABELS[lead.source] ?? lead.source}`,
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    lead.message ? `Комментарий: ${lead.message}` : "",
    `Время: ${new Date().toLocaleString("ru-RU")}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!transporter) {
    console.warn("[mailer] SMTP не настроен — письмо не отправлено. Заявка сохранена в БД.\n" + text);
    return;
  }

  await transporter.sendMail({
    from: `"Красивый Дом (сайт)" <${process.env.SMTP_USER}>`,
    to: MAIL_TO,
    subject,
    text,
  });
}
