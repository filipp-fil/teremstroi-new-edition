"use client";

import Image from "next/image";
import Link from "next/link";
import { Ruler } from "lucide-react";
import type { Project } from "@/content/projects";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/forms/LeadDialog";

/** Карточка проекта в каталоге и на главной */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-light">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
          {/* Лёгкое затемнение снизу при наведении */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest backdrop-blur-sm sm:left-4 sm:top-4">
            {project.type === "bath" ? "Баня" : "Дом"} · {project.size}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-5">
          <h3 className="font-heading text-sm font-bold text-forest transition-colors group-hover:text-primary-dark sm:text-base">
            {project.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <Ruler className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            {project.area} м² · {project.floors} этаж.
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <span className="text-sm font-bold text-forest sm:text-lg">от {formatPrice(project.price)}</span>
            <span className="hidden text-sm font-semibold text-primary-dark sm:inline">Подробнее →</span>
          </div>
        </div>
      </Link>
      {/* Кнопка «Получить смету» — под карточкой, видна и на мобильных */}
      <div className="px-3 pb-3 sm:px-5 sm:pb-5">
        <LeadDialog
          source="project"
          title="Получить смету"
          description={`Укажите имя и телефон — вышлем подробную смету по проекту «${project.title}» с учётом доставки на ваш участок.`}
          withComment
          commentLabel="Комментарий (необязательно)"
          trigger={
            <Button variant="default" size="sm" className="w-full">
              Получить смету
            </Button>
          }
        />
      </div>
    </div>
  );
}
