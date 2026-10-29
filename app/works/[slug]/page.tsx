import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { getWorkBySlug, works } from "@/content/works";
import { getWorkMap } from "@/content/maps";
import { materialLabels } from "@/content/projects";
import { workProjectLinks } from "@/content/work-projects";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectGallery } from "@/components/catalog/ProjectGallery";
import { YandexMap } from "@/components/YandexMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/forms/LeadDialog";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const work = getWorkBySlug(params.slug);
  if (!work) return {};
  return {
    title: work.title,
    description: `${work.title}, ${work.location}. ${work.description.slice(0, 100)}`,
    openGraph: { images: work.images[0] ? [work.images[0]] : [] },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) notFound();

  const map = getWorkMap(work.slug);

  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: "Наши работы", href: "/works" }, { label: work.title }]} />

      <div className="grid gap-10 lg:grid-cols-2">
        <ProjectGallery images={work.images} title={work.title} />

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="green">{work.type === "bath" ? "Баня" : "Дом"}</Badge>
            <Badge variant="default">{materialLabels[work.material]}</Badge>
            <Badge variant="default">{work.area} м²</Badge>
            <Badge variant="default">{work.size}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-forest md:text-4xl">{work.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary-dark" />
            {work.location}
          </p>
          {work.duration || work.year ? (
            <p className="mt-3 flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-5 w-5 text-primary-dark" />
              Построен за {work.duration ?? "—"} · {work.year ?? "—"} г.
            </p>
          ) : null}
          {work.price ? (
            <p className="mt-4 text-2xl font-bold text-forest">{formatPrice(work.price)} руб.</p>
          ) : null}

          <p className="mt-6 leading-relaxed text-forest">{work.summary ?? work.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <LeadDialog
              source="works"
              title="Хочу так же"
              description={`Интересует объект «${work.title}»? Рассчитаем похожий проект под ваш участок.`}
              trigger={
                <Button variant="accent" size="lg">
                  Хочу так же
                </Button>
              }
            />
            {workProjectLinks[work.slug] ? (
              <Button asChild variant="default" size="lg">
                <Link href={`/projects/${workProjectLinks[work.slug]}`}>Перейти к проекту</Link>
              </Button>
            ) : null}
            <Button asChild variant="outlineDark" size="lg">
              <Link href="/works">Смотреть все работы</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Карта объекта */}
      {map.code && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-forest md:text-3xl">Объект на карте</h2>
          <YandexMap code={map.code} title={`Карта: ${work.location}`} />
        </section>
      )}

      <div className="mt-12">
        <Button asChild variant="ghost">
          <Link href="/works">
            <ArrowLeft className="h-4 w-4" />
            Вернуться к списку работ
          </Link>
        </Button>
      </div>
    </div>
  );
}
