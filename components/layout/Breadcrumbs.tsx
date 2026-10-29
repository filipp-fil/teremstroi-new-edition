import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

/** Хлебные крошки: передаём массив, последний элемент — текущая страница (без ссылки) */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <nav aria-label="Хлебные крошки" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary-dark">
            Главная
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4" />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-primary-dark">
                {item.label}
              </Link>
            ) : (
              <span className="text-forest">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
