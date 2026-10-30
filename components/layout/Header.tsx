"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

const nav = [
  { href: "/about", label: "О компании" },
  { href: "/projects/houses", label: "Дома" },
  { href: "/projects/baths", label: "Бани" },
  { href: "/works", label: "Наши работы" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  // Стабильная ссылка на колбэк: иначе MobileMenu закрывается сразу после открытия
  const closeMenu = React.useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-white/90 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-3.5 md:py-5">
        {/* Логотип компании (файл public/logo.png) */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Красивый Дом — на главную">
          <Image src="/logo.png" alt="Красивый Дом" width={164} height={80} priority className="h-12 w-auto md:h-14" />
        </Link>

        {/* Десктопная навигация */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-primary-light",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-primary-dark"
                  : "text-forest"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="hidden items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-primary-dark md:flex"
          >
            <Phone className="h-4 w-4 text-primary-dark" />
            {site.phone}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#cta">Оставить заявку</Link>
          </Button>
          {/* Кнопка мобильного меню */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full p-2 text-forest hover:bg-primary-light lg:hidden"
            aria-label="Открыть меню"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={closeMenu} nav={nav} />
    </header>
  );
}
