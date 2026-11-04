import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { works } from "@/content/works";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Блок «Наши работы» на главной — превью объектов + ссылка на /works */
export function WorksPreview() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="04"
            title="Наши работы"
            subtitle="Реальные построенные дома и бани — на карте каждый объект"
            className="mb-0"
          />
          <Button asChild variant="outlineDark">
            <Link href="/works">Смотреть все работы</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {[
            works.find((w) => w.slug === "uspeh-1-lomonosov"),
            ...works.filter((w) => w.slug !== "uspeh-1-lomonosov"),
          ]
            .filter((w): w is NonNullable<typeof w> => Boolean(w))
            .slice(0, 4)
            .map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08} className="h-full">
              <Link
                href={`/works/${w.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-deep sm:aspect-[3/4]"
              >
                <Image
                  src={w.images[0]}
                  alt={w.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/90 via-forest-ink/10 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-white transition-transform duration-500 group-hover:translate-y-0">
                  <p className="flex items-center gap-1 text-xs text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                    {w.location}
                  </p>
                  <h3 className="mt-1 font-heading text-sm font-bold leading-snug">{w.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
