import type { Metadata } from "next";
import { Building2, Clock, Factory, Landmark, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { contactMaps } from "@/content/maps";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { YandexMap } from "@/components/YandexMap";
import { LeadForm } from "@/components/forms/LeadForm";
import { MessengerIcons } from "@/components/layout/MessengerIcons";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты строительной компании «Красивый Дом»: офисы в Москве и Санкт-Петербурге, производственная база в Пестово. Работаем по всей России!",
};

export default function ContactsPage() {
  const maxHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      <h1 className="mb-6 text-3xl font-bold text-forest md:text-4xl">Контакты</h1>

      <p className="mb-2 text-lg font-semibold text-forest">Работаем по всей России!</p>
      <a
        href={maxHref}
        className="mb-2 inline-flex items-center gap-3 text-2xl font-bold text-forest hover:text-primary-dark"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light">
          <Phone className="h-5 w-5 text-primary-dark" />
        </span>
        MAX: +7 (926) 372-22-03
      </a>
      <p className="mb-10 flex items-center gap-2 text-muted-foreground">
        <Clock className="h-5 w-5 text-primary-dark" />
        Офис работает по пропускам, по предварительной записи.
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Левая колонка: офисы, реквизиты, мессенджеры */}
        <div className="space-y-6">
          {/* Офис в Москве */}
          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-forest">
              <Landmark className="h-5 w-5 text-primary-dark" />
              Офис в Москве
            </h2>
            <p className="flex items-start gap-3 text-forest">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <MapPin className="h-4 w-4 text-primary-dark" />
              </span>
              {site.addressMoscow}
            </p>
            <a
              href={`tel:${site.phoneMoscow.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-3 font-semibold text-forest hover:text-primary-dark"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
                <Phone className="h-4 w-4 text-primary-dark" />
              </span>
              Телефон: {site.phoneMoscow}
            </a>
            <YandexMap code={contactMaps.moscow.code} title="Карта: офис в Москве" />
          </div>

          {/* Офис в Санкт-Петербурге */}
          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-forest">
              <Building2 className="h-5 w-5 text-primary-dark" />
              Офис в Санкт-Петербурге
            </h2>
            <p className="flex items-start gap-3 text-forest">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <MapPin className="h-4 w-4 text-primary-dark" />
              </span>
              {site.addressSpb}
            </p>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
                <Phone className="h-4 w-4 text-primary-dark" />
              </span>
              <div className="font-semibold text-forest">
                {site.phonesSpb.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/[^+\d]/g, "")}`}
                    className="block hover:text-primary-dark"
                  >
                    Телефон: {p}
                  </a>
                ))}
              </div>
            </div>
            <YandexMap code={contactMaps.spb.code} title="Карта: офис в Санкт-Петербурге" />
          </div>

          {/* Производственная база */}
          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-forest">
              <Factory className="h-5 w-5 text-primary-dark" />
              Производственная база
            </h2>
            <p className="flex items-start gap-3 text-forest">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <MapPin className="h-4 w-4 text-primary-dark" />
              </span>
              {site.addressProduction}
            </p>
            <YandexMap code={contactMaps.pestovo.code} title="Карта: производственная база в Пестово" />
          </div>

          {/* Реквизиты */}
          <div className="space-y-3 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="font-heading text-xl font-bold text-forest">Реквизиты</h2>
            <p className="text-forest">ОГРНИП {site.ogrnip}</p>
            <p className="text-forest">ИНН {site.inn}</p>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-forest hover:text-primary-dark"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
                <Mail className="h-4 w-4 text-primary-dark" />
              </span>
              Эл. почта: {site.email}
            </a>
          </div>

          {/* Мессенджеры */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="mb-3 font-heading text-xl font-bold text-forest">Мессенджеры</h2>
            <MessengerIcons />
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li>
                <a href="https://vk.com/krasivii_domm" target="_blank" rel="noopener noreferrer" className="hover:text-primary-dark">
                  ВКонтакте: vk.com/krasivii_domm
                </a>
              </li>
              <li>
                <a href="https://wa.me/79263722203" target="_blank" rel="noopener noreferrer" className="hover:text-primary-dark">
                  WhatsApp: +7 926 372-22-03
                </a>
              </li>
              <li>
                <a href="https://max.ru" target="_blank" rel="noopener noreferrer" className="hover:text-primary-dark">
                  Макс: +7 926 372-22 03 — личные сообщения
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Правая колонка: форма */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8 lg:sticky lg:top-24 lg:self-start">
          <h2 className="mb-2 font-heading text-xl font-bold text-forest">Напишите нам</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Ответим в течение часа в рабочее время.
          </p>
          <LeadForm source="contact" withComment submitLabel="Отправить сообщение" />
        </div>
      </div>
    </div>
  );
}
