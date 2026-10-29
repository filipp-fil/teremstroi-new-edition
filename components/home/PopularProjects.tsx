import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/catalog/ProjectCard";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

/** Блок «Популярные проекты» на главной */
export function PopularProjects() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Популярные проекты"
            subtitle="Проверенные планировки, которые заказывают чаще всего"
            className="mb-0"
          />
          <Button asChild variant="outlineDark">
            <Link href="/projects/houses">Все проекты домов</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {featuredProjects.slice(0, 6).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects/baths" className="text-sm font-semibold text-primary-dark hover:underline">
            Смотреть проекты бань →
          </Link>
        </div>
      </div>
    </section>
  );
}
