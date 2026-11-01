import type { Metadata } from "next";
import { site } from "@/content/site";
import { HeroSlider } from "@/components/home/HeroSlider";
import { WhyUs } from "@/components/home/WhyUs";
import { PopularProjects } from "@/components/home/PopularProjects";
import { StagesTimeline } from "@/components/home/StagesTimeline";
import { WorksPreview } from "@/components/home/WorksPreview";
import { ReviewsPreview } from "@/components/home/ReviewsPreview";
import { CtaForm } from "@/components/home/CtaForm";
import { SectionHeading } from "@/components/home/SectionHeading";

export const metadata: Metadata = {
  title: `${site.name} — каркасные дома и бани под ключ в СПб и Ленобласти`,
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero-слайдер */}
      <HeroSlider />

      {/* 2. Почему мы */}
      <WhyUs />

      {/* 3. Популярные проекты */}
      <PopularProjects />

      {/* 4. Как мы строим */}
      <StagesTimeline />

      {/* 4.1 Схема оплаты */}
      <section className="bg-sand py-20">
        <div className="container">
          <SectionHeading
            center
            title="Схема оплаты 0% / 70% / 30%"
            subtitle="Никакой предоплаты. Платите по этапам — только за выполненную работу"
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {site.payment.map((step, i) => (
              <div key={i} className="relative rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
                <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-heading text-2xl font-bold text-forest">
                  {step.percent}
                </span>
                <h3 className="mb-2 font-heading text-base font-bold text-forest">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Наши работы */}
      <WorksPreview />

      {/* 6. Отзывы */}
      <ReviewsPreview />

      {/* 7. CTA + форма */}
      <CtaForm />
    </>
  );
}
