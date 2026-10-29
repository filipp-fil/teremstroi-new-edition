import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

/** Блок отзывов на главной — превью 2–3 + ссылка на /reviews */
export function ReviewsPreview() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Отзывы клиентов"
            subtitle="Нас рекомендуют соседям, друзьям и родственникам"
            className="mb-0"
          />
          <Button asChild variant="outlineDark">
            <Link href="/reviews">Все отзывы</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <figure key={r.id} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <div className="mb-3 flex gap-0.5" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-forest">«{r.text}»</blockquote>
              <figcaption className="mt-4 border-t border-line pt-3">
                <p className="text-sm font-bold text-forest">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.object} · {r.date}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
