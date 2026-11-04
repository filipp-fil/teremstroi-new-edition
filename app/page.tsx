import type { Metadata } from "next";
import { site } from "@/content/site";
import { HeroSlider } from "@/components/home/HeroSlider";
import { Marquee } from "@/components/home/Marquee";
import { WhyUs } from "@/components/home/WhyUs";
import { PopularProjects } from "@/components/home/PopularProjects";
import { StagesTimeline } from "@/components/home/StagesTimeline";
import { PaymentScheme } from "@/components/home/PaymentScheme";
import { WorksPreview } from "@/components/home/WorksPreview";
import { ReviewsPreview } from "@/components/home/ReviewsPreview";
import { CtaForm } from "@/components/home/CtaForm";

export const metadata: Metadata = {
  title: `${site.name} — каркасные дома и бани под ключ в СПб и Ленобласти`,
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero-слайдер на весь экран */}
      <HeroSlider />

      {/* 1.1 Бегущая строка с обещаниями */}
      <Marquee />

      {/* 2. Почему мы + статистика */}
      <WhyUs />

      {/* 3. Популярные проекты */}
      <PopularProjects />

      {/* 3. Как мы строим */}
      <StagesTimeline />

      {/* 4. Наши работы */}
      <WorksPreview />

      {/* 5. Схема оплаты 0 / 70 / 30 */}
      <PaymentScheme />

      {/* 6. Отзывы */}
      <ReviewsPreview />

      {/* 7. CTA + форма */}
      <CtaForm />
    </>
  );
}
