import { Leaf } from "lucide-react";

const ITEMS = [
  "Без предоплаты",
  "Сухой пиломатериал камерной сушки",
  "Утеплитель Rockwool",
  "Гарантия до 5 лет",
  "С 2011 года на рынке",
  "470+ построенных домов",
  "Сроки фиксируем в договоре",
];

/** Тёмная бегущая строка с ключевыми обещаниями — сразу под hero */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-primary/20 bg-forest-ink py-4">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/85"
          >
            {item}
            <Leaf className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
