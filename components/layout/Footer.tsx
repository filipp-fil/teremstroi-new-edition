import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { MessengerIcons } from "@/components/layout/MessengerIcons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-forest text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Колонка 1: бренд */}
        <div className="space-y-4">
          <Image src="/logo.png" alt="Красивый Дом" width={164} height={80} className="h-10 w-auto brightness-0 invert" />
          <p className="text-sm text-white/70">
            Строим каркасные дома и бани под ключ в Санкт-Петербурге и Ленобласти. Сухой пиломатериал,
            без предоплаты, гарантия до 5 лет.
          </p>
          <Link
            href="/politika-v-otnoshenii-obrabotki-personalnyh-dannyh"
            className="block text-xs text-white/50 underline-offset-2 transition-colors hover:text-primary hover:underline"
          >
            Политика в отношении обработки персональных данных
          </Link>
        </div>

        {/* Колонка 2: разделы */}
        <nav className="space-y-2 text-sm" aria-label="Карта сайта">
          <h3 className="mb-3 font-heading text-base font-bold">Разделы</h3>
          <FooterLink href="/about">О компании</FooterLink>
          <FooterLink href="/projects/houses">Проекты домов</FooterLink>
          <FooterLink href="/projects/baths">Проекты бань</FooterLink>
          <FooterLink href="/works">Наши работы</FooterLink>
          <FooterLink href="/reviews">Отзывы</FooterLink>
          <FooterLink href="/contacts">Контакты</FooterLink>
        </nav>

        {/* Колонка 3: контакты */}
        <div className="space-y-3 text-sm">
          <h3 className="mb-3 font-heading text-base font-bold">Контакты</h3>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4 text-primary" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4 text-primary" />
            {site.email}
          </a>
          <p className="flex items-center gap-2 text-white/70">
            <MapPin className="h-4 w-4 text-primary" />
            {site.address}
          </p>
        </div>

        {/* Колонка 4: мессенджеры */}
        <div className="space-y-3">
          <h3 className="mb-3 font-heading text-base font-bold">Мы в мессенджерах</h3>
          {/* TODO: заменить на реальные ссылки — править content/site.ts (см. README) */}
          <MessengerIcons />
          <p className="text-xs text-white/50">
            Работаем по договору. Оплата 0% / 70% / 30%.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.legalName}. Все права защищены.
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block text-white/80 transition-colors hover:text-primary">
      {children}
    </Link>
  );
}
