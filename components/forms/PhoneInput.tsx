"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

/**
 * Форматирует ввод в маску российского номера: +7 (XXX) XXX-XX-XX.
 * Пользователь вводит цифры подряд — скобки, пробелы и дефисы ставятся автоматически.
 * Ведущая 8 заменяется на +7 (мы работаем только по России).
 */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  // Отбрасываем код страны (7 или 8) — оставляем до 10 цифр номера
  let body = digits;
  if (body.startsWith("8")) body = body.slice(1);
  if (body.startsWith("7")) body = body.slice(1);
  body = body.slice(0, 10);

  let result = "+7";
  if (body.length > 0) {
    result += " (" + body.slice(0, 3);
    if (body.length >= 3) {
      result += ")";
      if (body.length > 3) result += " " + body.slice(3, 6);
      if (body.length > 6) result += "-" + body.slice(6, 8);
      if (body.length > 8) result += "-" + body.slice(8, 10);
    }
  }
  return result;
}

interface PhoneInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
  onChange?: (value: string) => void;
}

/**
 * Поле телефона с авто-маской +7 (___) ___-__-__.
 * Поддерживает ref, name, required и все стандартные пропсы Input.
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ onChange, ...props }, ref) => {
    const [value, setValue] = React.useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatPhone(e.target.value);
      setValue(formatted);
      onChange?.(formatted);
    }

    return <Input ref={ref} type="tel" inputMode="tel" value={value} onChange={handleChange} {...props} />;
  }
);
PhoneInput.displayName = "PhoneInput";
