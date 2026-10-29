import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { reviewPhotos } from "@/content/review-photos";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewDialog } from "@/components/forms/ReviewDialog";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description:
    "Отзывы о строительной компании «Красивый Дом»: каркасные дома и бани под ключ в СПб. Реальные истории клиентов, сроки, качество.",
};

export default function ReviewsPage() {
  /** Микроразметка Schema.org: Review-агрегат */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Строительство каркасных домов и бань под ключ",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(reviews.length + reviewPhotos.length),
    },
  };

  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Отзывы" }]} />
      <h1 className="mb-3 text-3xl font-bold text-forest md:text-4xl">Отзывы клиентов</h1>
      <p className="mb-10 max-w-2xl text-muted-foreground">
        Нас рекомендуют соседям, друзьям и родственникам — лучшая оценка нашей работы.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.id} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft">
            <div className="mb-3 flex gap-0.5" aria-label={`Оценка ${r.rating} из 5`}>
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-forest">«{r.text}»</blockquote>
            <footer className="mt-4 border-t border-line pt-3">
              <p className="text-sm font-bold text-forest">{r.name}</p>
              <p className="text-xs text-muted-foreground">
                {r.object} · {r.date}
              </p>
            </footer>
          </article>
        ))}
      </div>

      {/* Сканы рукописных отзывов со старого сайта */}
      <section className="mt-16">
        <h2 className="mb-2 text-2xl font-bold text-forest md:text-3xl">Благодарности от клиентов</h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Рукописные отзывы, которые нам оставляют после сдачи дома — как есть, без редактуры. Нажмите, чтобы
          рассмотреть.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {reviewPhotos.map((p) => (
            <a
              key={p.src}
              href={p.src}
              target="_blank"
              rel="noopener noreferrer"
              title={p.title}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Image
                src={p.src}
                alt={`Рукописный отзыв — ${p.title}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent px-3 pb-2 pt-8 text-xs font-semibold text-white">
                {p.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-14 rounded-2xl bg-primary-light p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold text-forest md:text-3xl">Построили с нами дом?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Расскажите о своём опыте — это займёт пару минут, а другим клиентам поможет с выбором.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ReviewDialog
            trigger={
              <Button variant="accent" size="lg">
                Оставить отзыв
              </Button>
            }
          />
          <Button asChild variant="outlineDark" size="lg">
            <Link href="/works">Смотреть наши работы</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
