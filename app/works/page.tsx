import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Ruler } from "lucide-react";
import { works } from "@/content/works";
import { workProjectLinks } from "@/content/work-projects";
import { WorksMap } from "@/components/WorksMap";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Наши работы — построенные дома и бани на карте",
  description:
    "Портфолио построенных объектов: каркасные дома и бани в СПб, Ленобласти и Московской области. Каждая точка на карте — реальный построенный дом. Фото, адреса, площади.",
};

export default function WorksPage() {
  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: "Наши работы" }]} />
      <h1 className="mb-3 text-3xl font-bold text-forest md:text-4xl">Наши работы</h1>
      <p className="mb-10 max-w-2xl text-muted-foreground">
        {works.length} построенных объектов в Санкт-Петербурге, Ленинградской и Московской областях. Каждая точка на
        карте — реальный дом или баня, сданные по акту.
      </p>

      {/* Большая карта всех объектов */}
      <WorksMap />

      <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
        {works.map((w) => {
          const projectSlug = workProjectLinks[w.slug];
          return (
            <div
              key={w.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link href={`/works/${w.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-primary-light">
                  <Image
                    src={w.images[0]}
                    alt={w.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3">
                    <Badge variant="accent">{w.type === "bath" ? "Баня" : "Дом"}</Badge>
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <Link href={`/works/${w.slug}`}>
                  <h2 className="font-heading text-sm font-bold text-forest transition-colors group-hover:text-primary-dark sm:text-base">
                    {w.title}
                  </h2>
                </Link>
                <p className="flex items-start gap-1.5 text-xs text-muted-foreground sm:text-sm">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  <span className="line-clamp-2">{w.location}</span>
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                  <Ruler className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  {w.area} м² · {w.size}
                  {w.price ? <span className="hidden sm:inline"> · {formatPrice(w.price)} руб.</span> : null}
                </p>
                {w.summary ? (
                  <p className="line-clamp-3 text-xs leading-relaxed text-forest/80">{w.summary}</p>
                ) : null}
                {w.duration || w.year ? (
                  <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Построен за {w.duration ?? "—"} · {w.year ?? "—"} г.
                  </p>
                ) : null}
                {projectSlug ? (
                  <Button asChild variant="default" size="sm" className="mt-auto w-full">
                    <Link href={`/projects/${projectSlug}`}>Перейти к проекту</Link>
                  </Button>
                ) : (
                  <Button asChild variant="default" size="sm" className="mt-auto w-full">
                    <Link href={`/works/${w.slug}`}>Смотреть работу</Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
