import { MapPin } from "lucide-react";

/**
 * Компонент Яндекс.Карты.
 * code — строка из content/maps.ts, три формата:
 *  - "um:<id>"      — карта Яндекс.Конструктора (рендерится через официальный виджет)
 *  - "text=<адрес>&z=<n>" — карта с поиском объекта по адресу (виджет ставит метку сам)
 *  - "ll=<lon>%2C<lat>&z=<zoom>" — простая карта по координатам (без меток)
 *  - ""             — заглушка с подсказкой
 */
export function YandexMap({ code, title }: { code: string; title?: string }) {
  if (!code) {
    return (
      <div className="flex h-[360px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-primary-light/40 p-6 text-center">
        <MapPin className="h-10 w-10 text-primary-dark" />
        <p className="font-semibold text-forest">{title ?? "Карта"}</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Карта появится после подключения кода конструктора в файле{" "}
          <code className="rounded bg-white px-1">content/maps.ts</code>.
        </p>
      </div>
    );
  }

  const src = code.startsWith("um:")
    ? `https://yandex.ru/map-widget/v1/?um=constructor:${code.slice(3)}&scroll=false`
    : `https://yandex.ru/map-widget/v1/?${code}&scroll=false`;

  return (
    <div className="yandex-map overflow-hidden rounded-2xl shadow-soft [&_iframe]:block">
      <iframe
        src={src}
        title={title ?? "Яндекс.Карта"}
        className="h-[420px] w-full border-0"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
