"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * Блок «Как мы строим» — таймлайн этапов.
 * Все номера-точки стоят строго на одной вертикальной линии:
 * сетка [карточка | 40px линия+точка | карточка], линия проходит по центру средней колонки.
 */
export function StagesTimeline() {
  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          center
          title="Как мы строим"
          subtitle="От заявки до акту приёмки — прозрачный процесс, каждый этап по расписанию"
        />
        <ol className="relative mx-auto max-w-4xl">
          {/* Вертикальная линия таймлайна — по центру средней колонки сетки */}
          <span
            className="absolute bottom-6 left-[19px] top-2 w-0.5 -translate-x-1/2 bg-primary/40 md:left-1/2"
            aria-hidden
          />
          {site.stages.map((stage, i) => {
            const even = i % 2 === 0; // чётные — слева от линии, нечётные — справа
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="relative mb-8 grid grid-cols-[40px_1fr] items-start gap-x-4 last:mb-0 md:grid-cols-[1fr_40px_1fr] md:gap-x-0"
              >
                {/* Номер-точка — всегда во второй колонке, строго на линии */}
                <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-forest shadow-soft md:col-start-2 md:row-start-1 md:justify-self-center">
                  {i + 1}
                </span>
                {/* Карточка: чётные — колонка 1 (справа по линии), нечётные — колонка 3 */}
                <div
                  className={
                    even
                      ? "md:col-start-1 md:row-start-1 md:mr-8 md:text-right"
                      : "md:col-start-3 md:row-start-1 md:ml-8"
                  }
                >
                  <div className="rounded-2xl border border-line bg-white p-5 text-left shadow-soft">
                    <h3 className="mb-1 font-heading text-base font-bold text-forest">{stage.title}</h3>
                    <p className="text-sm text-muted-foreground">{stage.text}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
