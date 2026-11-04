"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/forms/LeadDialog";

/**
 * Hero-баннер на главной: видео-ротация объектов на весь экран.
 * Следующее видео стартует, когда предыдущее закончилось (onEnded), по кругу.
 * Порядок: Дмитров → Подольск → Кондор-1.
 */

interface VideoSlide {
  video: string;
  poster: string;
  title: string;
  href: string;
  price: number;
  area: number;
  size: string;
}

const SLIDES: VideoSlide[] = [
  {
    video: "/videos/hero-dmitrov.mp4",
    poster: "/images/projects/odnoetazhnyj-karkasnyj-dom-dmitrov-8h11-5/01.jpg",
    title: "Дмитров",
    href: "/projects/odnoetazhnyj-karkasnyj-dom-dmitrov-8h11-5",
    price: 2542000,
    area: 83,
    size: "8×11.5 м",
  },
  {
    video: "/videos/hero-podolsk.mp4",
    poster: "/images/projects/podolsk/01.jpg",
    title: "Подольск",
    href: "/projects/podolsk",
    price: 2590000,
    area: 114,
    size: "8×8 м",
  },
  {
    video: "/videos/hero-kondor-1.mp4",
    poster: "/images/projects/kondor-1/01.jpg",
    title: "Кондор-1",
    href: "/projects/kondor-1",
    price: 1806000,
    area: 73,
    size: "7×7 м",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeroSlider() {
  const [index, setIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);

  const go = React.useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  );

  // Свайп на мобильных
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const slide = SLIDES[index];

  return (
    <section
      className="relative flex h-[94svh] min-h-[600px] w-full flex-col justify-end overflow-hidden bg-forest-ink"
      aria-roledescription="слайдер"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Видео — кинематографичный лёгкий зум (Кен Бёрнс) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.video}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <motion.video
            key={slide.video}
            src={slide.video}
            poster={slide.poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => go(1)}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Многослойное затемнение для глубины и читаемости */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-ink via-forest-ink/35 to-forest-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-ink/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Контент слайда */}
      <div className="container relative z-10 pb-40 md:pb-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.video}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="max-w-3xl text-white"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Дом под ключ · {slide.size}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Каркасный дом
              <br />
              <span className="text-primary">«{slide.title}»</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
              {slide.area} м² · сухой пиломатериал камерной сушки · утеплитель Rockwool · без предоплаты
            </p>
            <p className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
              от {formatPrice(slide.price)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <LeadDialog
                source="hero"
                title="Оставить заявку"
                description={`Интересует дом «${slide.title}»? Оставьте телефон — перезвоним за 15 минут.`}
                trigger={
                  <Button variant="default" size="lg" className="font-bold">
                    Оставить заявку
                  </Button>
                }
              />
              <LeadDialog
                source="project"
                title="Получить смету"
                description={`Укажите имя и телефон — вышлем подробную смету по проекту «${slide.title}» с учётом доставки на ваш участок.`}
                withComment
                commentLabel="Комментарий (необязательно)"
                trigger={
                  <Button variant="accent" size="lg" className="font-bold">
                    Получить смету
                  </Button>
                }
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 font-bold"
              >
                <Link href={slide.href}>
                  Смотреть проект
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-medium text-white/75">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              с 2011 года · 470+ домов · гарантия 5 лет · без предоплаты
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Стрелки */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Предыдущий слайд"
        className="absolute right-20 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-forest lg:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Следующий слайд"
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-forest lg:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Нижняя панель: стеклянная карточка объекта + точки + скролл-кью */}
      <div className="container absolute inset-x-0 bottom-0 z-10 pb-7">
        <div className="flex items-end justify-between gap-6">
          {/* Точки-индикаторы */}
          <div className="flex gap-2.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.video}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Слайд ${i + 1}: ${s.title}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-14 bg-primary" : "w-6 bg-white/35 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          {/* Скролл-подсказка (десктоп) */}
          <div className="hidden flex-col items-center gap-2 md:flex" aria-hidden>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
              Листайте
            </span>
            <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
              <span className="h-2 w-1 rounded-full bg-primary animate-scroll-cue" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
