import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Вход в админку",
  robots: { index: false, follow: false }, // страницу входа не индексируем
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-forest">Админ-панель</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Введите пароль, чтобы посмотреть заявки
        </p>
        {/* Suspense обязателен: форма использует useSearchParams */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
