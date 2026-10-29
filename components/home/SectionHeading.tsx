import { cn } from "@/lib/utils";

/** Заголовок секции с подзаголовком — единый стиль для всех страниц */
export function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", center && "mx-auto text-center", className)}>
      <h2 className="text-2xl font-bold text-forest md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
