import { FileSignature, HardHat, KeyRound } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEP_ICONS = [FileSignature, HardHat, KeyRound];

/** Схема оплаты 0 / 70 / 30 — тёмная премиальная панель-степпер.
 *  Десктоп: три шага в ряд с соединяющей линией. Мобильный: вертикальный стек с линией слева. */
export function PaymentScheme() {
  return (
    <section className="bg-sand py-14 md:py-20">
      <div className="container">
        <SectionHeading
          center
          index="05"
          title="Схема оплаты 0% / 70% / 30%"
          subtitle="Никакой предоплаты. Платите по этапам — только за выполненную работу"
          className="mb-8 md:mb-12"
        />

        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2rem] bg-forest-ink px-5 py-10 shadow-deep sm:px-8 md:px-12 md:py-14">
            {/* Свечения */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            {/* Вертикальная линия (мобильный) */}
            <span
              aria-hidden
              className="absolute bottom-10 left-[43px] top-10 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:hidden"
            />
            {/* Горизонтальная линия (десктоп) */}
            <span
              aria-hidden
              className="absolute left-[12%] right-[12%] top-[76px] hidden h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 md:block"
            />

            <div role="list" className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {site.payment.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? FileSignature;
                return (
                  <Reveal key={i} delay={i * 0.15} role="listitem"
                    className="relative flex items-start gap-5 md:flex-col md:items-center md:text-center">
                      {/* Круг с процентом */}
                      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-heading text-xl font-bold text-forest shadow-glow md:h-24 md:w-24 md:text-3xl">
                        {step.percent}
                      </div>
                      <div className="md:mt-6">
                        <p className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary md:justify-center">
                          <Icon className="h-4 w-4" />
                          Шаг {i + 1}
                        </p>
                        <h3 className="font-heading text-base font-bold text-white md:text-lg">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 max-w-xs text-sm text-white/65">{step.text}</p>
                      </div>
                    </Reveal>
                );
              })}
            </div>

            <p className="relative mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Сумма и сроки фиксируются в договоре — не меняются в процессе
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
