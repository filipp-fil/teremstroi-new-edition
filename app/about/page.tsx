import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { works } from "@/content/works";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { WhyUs } from "@/components/home/WhyUs";
import { StagesTimeline } from "@/components/home/StagesTimeline";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/forms/LeadDialog";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Строительная компания «Красивый Дом» (СПб): постоянные русские бригады, сухой пиломатериал камерной сушки, оплата без предоплаты 0/70/30, гарантия до 5 лет.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container">
        <Breadcrumbs items={[{ label: "О компании" }]} />
        <h1 className="mb-6 max-w-3xl text-3xl font-bold text-forest md:text-5xl">
          Строим дома, в которых живут поколения
        </h1>
        <div className="max-w-3xl space-y-4 text-muted-foreground md:text-lg">
          <p>
            «Красивый Дом» — строительная компания из Санкт-Петербурга. Мы строим каркасные дома и
            бани под ключ из пиломатериала камерной сушки по ГОСТ и СНиП.
          </p>
          <p>
            Работаем только постоянными русскими бригадами с опытом от 10 лет — без случайных
            подрядчиков. Утепляем дома каменной ватой Rockwool Лайт Баттс Скандик, ставим
            двухкамерные окна ПВХ, отделываем фасад имитацией бруса, а пол — шпунтованной доской.
          </p>
          <p>
            Мы работаем по договору: цена фиксируется до начала стройки и не меняется, сроки —
            14–45 дней в зависимости от проекта, гарантия на конструктив — до 5 лет. Предоплата
            не нужна: вы платите по этапам по факту выполненной работы.
          </p>
        </div>

        {/* Цифры */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: `${works.length * 38}+`, label: "построенных объектов" },
            { value: "14–45", label: "дней — сроки стройки" },
            { value: "5 лет", label: "гарантия по договору" },
            { value: "0 ₽", label: "предоплата" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-white p-6 text-center shadow-soft">
              <p className="font-heading text-3xl font-bold text-primary-dark">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Преимущества */}
      <div className="mt-20">
        <WhyUs />
      </div>

      {/* Этапы */}
      <div className="container mt-20">
        <StagesTimeline />
      </div>

      {/* Схема оплаты */}
      <div className="container mt-10">
        <SectionHeading center title="Схема оплаты 0% / 70% / 30%" subtitle="Платите по этапам — только за выполненную работу" />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {site.payment.map((step, i) => (
            <div key={i} className="rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
              <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-heading text-2xl font-bold text-forest">
                {step.percent}
              </span>
              <h3 className="mb-2 font-heading text-base font-bold text-forest">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <LeadDialog
            source="contact"
            title="Задать вопрос"
            trigger={
              <Button variant="accent" size="lg">
                Задать вопрос
              </Button>
            }
          />
          <Button asChild variant="outlineDark" size="lg">
            <Link href="/projects/houses">Смотреть проекты домов</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
