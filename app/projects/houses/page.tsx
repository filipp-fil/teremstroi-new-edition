import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { filterProjects, type CatalogSearchParams } from "@/components/catalog/filterProjects";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ProjectCard } from "@/components/catalog/ProjectCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Проекты каркасных домов — цены и планировки",
  description:
    "Каталог проектов домов: каркасные дома и дома из бруса от 60 до 150 м². Цены под ключ, планировки, сроки строительства 14–45 дней. Без предоплаты.",
};

export default function HousesPage({ searchParams }: { searchParams: CatalogSearchParams }) {
  const items = filterProjects(projects, "house", searchParams);

  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: "Проекты домов" }]} />
      <h1 className="mb-3 text-3xl font-bold text-forest md:text-4xl">Проекты домов</h1>
      <p className="mb-10 max-w-2xl text-muted-foreground">
        Каркасные дома и дома из бруса под ключ. Все цены — с материалами и работой, фиксируются в договоре.
      </p>

      <Suspense>
        <CatalogFilters materialLabels={["Каркасный", "Из бруса"]} />
      </Suspense>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {items.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <p className="text-lg font-semibold text-forest">Ничего не найдено</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Попробуйте расширить диапазон цены или площади — или сбросьте фильтры.
          </p>
        </div>
      )}

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Не нашли подходящий проект?{" "}
        <a href="/#cta" className="font-semibold text-primary-dark hover:underline">
          Отправьте заявку — спроектируем индивидуально
        </a>
      </p>
    </div>
  );
}
