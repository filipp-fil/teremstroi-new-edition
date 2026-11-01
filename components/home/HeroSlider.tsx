"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/forms/LeadDialog";

/**
 * Hero-баннер на главной: видео-ротация объектов.
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

export function HeroSlider() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
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
      className="relative h-[560px] w-full overflow-hidden md:h-[640px]"
      aria-roledescription="слайдер"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.video}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Видео на весь экран; постер — первое фото проекта для мгновенной отрисовки */}
          <video
            key={slide.video}
            src={slide.video}
            poster={slide.poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              if (!paused) go(1);
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Затемнение для читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Контент слайда (отступы, чтобы текст не залезал под стрелки и точки) */}
      <div className="container relative z-10 flex h-full flex-col justify-center pb-16 md:pl-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.video}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-5 text-white"
          >
            <p className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest">
              Дом под ключ
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Каркасный дом «{slide.title}»
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              {slide.area} м² · {slide.size} · Сухой пиломатериал камерной сушки · Rockwool · без предоплаты
            </p>
            <p className="text-2xl font-bold text-primary md:text-3xl">от {formatPrice(slide.price)}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LeadDialog
                source="hero"
                title="Оставить заявку"
                description={`Интересует дом «${slide.title}»? Оставьте телефон — перезвоним за 15 минут.`}
                trigger={
                  <Button variant="accent" size="lg">
                    Оставить заявку
                  </Button>
                }
              />
              <Button asChild variant="outline" size="lg">
                <Link href={slide.href}>Смотреть проект</Link>
              </Button>
            </div>
            {/* Плашка доверия */}
            <p className="flex items-center gap-2 pt-1 text-sm font-medium text-white/85">
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
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition-colors hover:bg-primary hover:text-forest md:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Следующий слайд"
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition-colors hover:bg-primary hover:text-forest md:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.video}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Слайд ${i + 1}: ${s.title}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-primary" : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
