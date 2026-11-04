import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/catalog/ProjectCard";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Блок «Популярные проекты» на главной */
export function PopularProjects() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="02"
            title="Популярные проекты"
            subtitle="Проверенные планировки, которые заказывают чаще всего"
            className="mb-0"
          />
          <Button asChild variant="outlineDark">
            <Link href="/projects/houses">Все проекты домов</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {featuredProjects.slice(0, 6).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/projects/baths"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-dark hover:underline"
          >
            Смотреть проекты бань
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
