import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/** Заголовок секции: номер · черта · крупный заголовок — единый стиль для всех страниц */
export function SectionHeading({
  title,
  subtitle,
  center = false,
  index,
  dark = false,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  /** Номер секции, напр. "01" — редакционный стиль */
  index?: string;
  /** Тёмный фон секции — текст становится белым */
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl md:mb-14", center && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-3", center && "justify-center")}>
        {index && (
          <span className="font-heading text-sm font-bold tracking-widest text-primary">{index}</span>
        )}
        <span className={cn("h-px w-12", dark ? "bg-primary/60" : "bg-primary")} />
      </div>
      <h2
        className={cn(
          "mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-[2.75rem]",
          dark ? "text-white" : "text-forest"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base md:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
