import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { works } from "@/content/works";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

/** Блок «Наши работы» на главной — превью объектов + ссылка на /works */
export function WorksPreview() {
  return (
    <section className="bg-sand py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Наши работы"
            subtitle="Реальные построенные дома и бани — на карте каждый объект"
            className="mb-0"
          />
          <Button asChild variant="outlineDark">
            <Link href="/works">Смотреть все работы</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {works.slice(0, 4).map((w) => (
            <Link
              key={w.slug}
              href={`/works/${w.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-soft"
            >
              <Image
                src={w.images[0]}
                alt={w.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="flex items-center gap-1 text-xs text-white/80">
                  <MapPin className="h-3.5 w-3.5" />
                  {w.location}
                </p>
                <h3 className="mt-1 font-heading text-sm font-bold leading-snug">{w.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
