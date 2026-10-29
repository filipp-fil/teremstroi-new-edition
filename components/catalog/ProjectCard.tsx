"use client";

import Image from "next/image";
import Link from "next/link";
import { Ruler } from "lucide-react";
import type { Project } from "@/content/projects";
import { formatPrice } from "@/lib/utils";

/** Карточка проекта в каталоге и на главной */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-light">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-forest backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
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
  );
}
