"use client";

import * as React from "react";
import {
  Truck,
  TreePine,
  Wallet,
  ShieldCheck,
  Users,
  Clock,
  Layers,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  wood: TreePine,
  wallet: Wallet,
  shield: ShieldCheck,
  users: Users,
  clock: Clock,
  layers: Layers,
  badge: BadgeCheck,
};

const STATS = [
  { value: 14, suffix: " лет", label: "строим каркасные дома" },
  { value: 470, suffix: "+", label: "построенных домов и бань" },
  { value: 5, suffix: " лет", label: "гарантии по договору" },
  { value: 0, prefix: "", suffix: " ₽", label: "предоплата — платите по этапам" },
];

/** Анимированный счётчик: крутится, когда попадает в вьюпорт */
function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-heading text-4xl font-bold text-forest md:text-5xl">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Блок «Почему мы» — УТП + панель статистики с анимированными счётчиками.
 *  На мобильном показываем 4 пункта, остальные — по кнопке «Показать всё». */
export function WhyUs() {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <section className="relative overflow-hidden bg-sand py-20 md:py-28">
      {/* Декоративный контурный текст на фоне */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -top-6 right-0 select-none font-heading text-[11rem] font-bold leading-none opacity-60 hidden lg:block"
      >
        2011
      </span>

      <div className="container relative">
        <SectionHeading
          index="01"
          title="Почему нам доверяют"
          subtitle="Строим по договору, из качественных материалов, без предоплаты и сюрпризов в смете"
        />

        {/* Панель статистики */}
        <Reveal className="mb-12">
          <div className="grain relative overflow-hidden rounded-3xl bg-forest px-6 py-10 shadow-deep md:px-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="space-y-2">
                  <div className="[&>span]:text-white">
                    <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
                  </div>
                  <p className="text-sm text-white/65">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {site.advantages.map((a, i) => {
            const Icon = icons[a.icon] ?? BadgeCheck;
            return (
              <Reveal
                key={i}
                delay={(i % 4) * 0.08}
                className={i >= 4 && !showAll ? "hidden md:block" : ""}
              >
                <div className="group h-full rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lift sm:p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-primary/30 text-primary-dark transition-all duration-300 group-hover:from-primary group-hover:to-primary-dark group-hover:text-forest sm:mb-4 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-forest sm:mb-2 sm:text-base">{a.title}</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">{a.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        {!showAll && (
          <div className="mt-6 text-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
            >
              Показать все преимущества
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
