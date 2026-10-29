"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/forms/LeadDialog";

const AUTOPLAY_MS = 7000;

/**
 * Hero-слайдер: автопрокрутка, стрелки, точки, свайп на мобильных, fade-переходы.
 * Слайды берутся из content/projects.ts (проекты с флагом hero).
 */
export function HeroSlider({ slides }: { slides: Project[] }) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const go = React.useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  );

  // Автопрокрутка
  React.useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, go, slides.length]);

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

  if (slides.length === 0) return null;
  const slide = slides[index];
  const catalogHref = slide.type === "bath" ? "/projects/baths" : "/projects/houses";

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
          key={slide.slug}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Фото на весь экран. Файлы слайдов: /public/images/projects/... (см. README) */}
          <Image
            src={slide.images[0]}
            alt={slide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Затемнение для читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Контент слайда (отступы, чтобы текст не залезал под стрелки и точки) */}
      <div className="container relative z-10 flex h-full flex-col justify-center pb-16 md:pl-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-5 text-white"
          >
            <p className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest">
              {slide.type === "bath" ? "Баня под ключ" : "Дом под ключ"}
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">{slide.title}</h1>
            <p className="text-lg text-white/90 md:text-xl">
              Сухой пиломатериал камерной сушки · Rockwool · без предоплаты · срок {slide.specs.find((s) => s.label === "Срок стройки")?.value ?? "14–45 дней"}
            </p>
            <p className="text-2xl font-bold text-primary md:text-3xl">от {formatPrice(slide.price)}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LeadDialog
                source="hero"
                title="Оставить заявку"
                description={`Интересует ${slide.title}? Оставьте телефон — перезвоним за 15 минут.`}
                trigger={
                  <Button variant="accent" size="lg">
                    Оставить заявку
                  </Button>
                }
              />
              <Button asChild variant="outline" size="lg">
                <Link href={catalogHref}>Смотреть проекты</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Стрелки */}
      {slides.length > 1 && (
        <>
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
        </>
      )}

      {/* Точки-индикаторы */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Слайд ${i + 1}: ${s.title}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-2.5 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
