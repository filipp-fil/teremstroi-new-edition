import { ShieldCheck, Wallet, Clock } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** CTA-блок «Рассчитаем ваш дом бесплатно» с формой (якорь #cta) */
export function CtaForm() {
  return (
    <section id="cta" className="grain relative overflow-hidden bg-forest-ink py-20 text-white md:py-28">
      {/* Свечения */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      {/* Гигантский контурный текст */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[10rem] font-bold leading-none opacity-40 hidden lg:block"
      >
        БЕСПЛАТНО
      </span>

      <div className="container relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            dark
            index="07"
            title={
              <>
                Рассчитаем ваш дом <span className="text-primary">бесплатно</span>
              </>
            }
            subtitle="Оставьте заявку — инженер свяжется с вами, уточнит задачу и подготовит расчёт с точной сметой. Никакого спама и навязчивых звонков."
            className="mb-8"
          />
          <ul className="space-y-4 text-sm text-white/80 md:text-base">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Wallet className="h-5 w-5" />
              </span>
              Цена фиксируется в договоре и не меняется
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              Перезвоним в течение 15 минут в рабочее время
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              Без предоплаты: 0% / 70% / 30% по этапам
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-3xl bg-white p-6 text-foreground shadow-deep md:p-8">
            <LeadForm
              source="cta"
              withComment
              commentLabel="Опишите, что хотите рассчитать (проект, размер, бюджет)"
              submitLabel="Получить расчёт"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
