import { z } from "zod";

/** Схема заявки (Zod). Используется и на сервере, и для клиентской валидации. */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя (минимум 2 буквы)").max(100),
  phone: z
    .string()
    .trim()
    .min(10, "Укажите телефон полностью")
    .max(20)
    .regex(/^[+\d\s()\-]+$/, "Телефон может содержать только цифры, +, пробелы и скобки"),
  message: z.string().trim().max(2000).optional(),
  // honeypot-поле: реальные пользователи его не заполняют (скрыто через CSS)
  company: z.string().optional(),
  source: z.enum(["hero", "cta", "callback", "project", "works", "contact", "review"]).default("contact"),
});

export type LeadInput = z.infer<typeof leadSchema>;
