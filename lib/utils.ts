import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Склейка классов Tailwind (стандарт для shadcn/ui) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Форматирование цены: 2500000 -> "2 500 000 ₽" */
export function formatPrice(price: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}
