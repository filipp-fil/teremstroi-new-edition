import { ShieldCheck, Wallet, Clock } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";

/** CTA-блок «Рассчитаем ваш дом бесплатно» с формой (якорь #cta) */
export function CtaForm() {
  return (
    <section id="cta" className="bg-forest py-20 text-white">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold md:text-4xl">
            Рассчитаем ваш дом <span className="text-primary">бесплатно</span>
          </h2>
          <p className="text-white/80 md:text-lg">
            Оставьте заявку — инженер свяжется с вами, уточнит задачу и подготовит
            расчёт с точной сметой. Никакого спама и навязчивых звонков.
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <Wallet className="h-5 w-5 shrink-0 text-primary" />
              Цена фиксируется в договоре и не меняется
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary" />
              Перезвоним в течение 15 минут в рабочее время
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              Без предоплаты: 0% / 70% / 30% по этапам
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 text-foreground shadow-lift md:p-8">
          <LeadForm
            source="cta"
            withComment
            commentLabel="Опишите, что хотите рассчитать (проект, размер, бюджет)"
            submitLabel="Получить расчёт"
          />
        </div>
      </div>
    </section>
  );
}
