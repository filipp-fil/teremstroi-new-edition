import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calculator, Phone } from "lucide-react";
import { getProjectBySlug, getSimilarProjects, materialLabels, projects } from "@/content/projects";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectGallery } from "@/components/catalog/ProjectGallery";
import { ProjectCard } from "@/components/catalog/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeadDialog } from "@/components/forms/LeadDialog";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  // Статически пререндерим все проекты (можно убрать — будет динамика)
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — цена под ключ ${formatPrice(project.price)}`,
    description: `${project.title}: ${project.area} м², ${materialLabels[project.material].toLowerCase()}, ${project.size}. ${project.description.slice(0, 120)}`,
    openGraph: { images: project.images[0] ? [project.images[0]] : [] },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const similar = getSimilarProjects(project);
  const catalogHref = project.type === "bath" ? "/projects/baths" : "/projects/houses";
  const catalogLabel = project.type === "bath" ? "Проекты бань" : "Проекты домов";

  /** Микроразметка Schema.org: House + Product (оффер с ценой) */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["House", "Product"],
    name: project.title,
    description: project.description,
    image: project.images,
    floorSize: { "@type": "QuantitativeValue", value: project.area, unitCode: "MTK" },
    numberOfRooms: project.specs.find((s) => s.label === "Спальни")?.value,
    offers: {
      "@type": "Offer",
      price: project.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      description: "Цена под ключ зафиксирована в договоре",
    },
  };

  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { label: catalogLabel, href: catalogHref },
          { label: project.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Галерея */}
        <ProjectGallery images={project.images} title={project.title} />

        {/* Информация */}
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="green">{materialLabels[project.material]}</Badge>
            <Badge variant="default">{project.area} м²</Badge>
            <Badge variant="default">{project.size}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-forest md:text-4xl">{project.title}</h1>
          <p className="mt-3 text-muted-foreground">{project.description}</p>

          <p className="mt-6 text-3xl font-bold text-forest">
            от {formatPrice(project.price)}{" "}
            <span className="text-sm font-normal text-muted-foreground">под ключ, по договору</span>
          </p>

          {/* Характеристики */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-line">
            {project.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between border-b border-line bg-white px-4 py-3 text-sm last:border-0 [&:nth-child(odd)]:bg-sand"
              >
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-semibold text-forest">{s.value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-3">
            <LeadDialog
              source="project"
              title="Рассчитать проект"
              description={`Опишите, что хотите рассчитать по проекту «${project.title}». Менеджер перезвонит с готовым расчётом.`}
              withComment
              commentLabel="Что хотите рассчитать?"
              trigger={
                <Button variant="accent" size="lg">
                  <Calculator className="h-5 w-5" />
                  Рассчитать проект
                </Button>
              }
            />
            <LeadDialog
              source="callback"
              title="Заказать звонок"
              trigger={
                <Button variant="outlineDark" size="lg">
                  <Phone className="h-5 w-5" />
                  Заказать звонок
                </Button>
              }
            />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Оплата 0% / 70% / 30% · цена фиксируется в договоре · гарантия до 5 лет
          </p>
        </div>
      </div>

      {/* Перелинковка: вернуться в каталог */}
      <div className="mt-12">
        <Button asChild variant="ghost">
          <Link href={catalogHref}>
            <ArrowLeft className="h-4 w-4" />
            Вернуться в каталог
          </Link>
        </Button>
      </div>

      {/* Похожие проекты */}
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-forest md:text-3xl">Похожие проекты</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
