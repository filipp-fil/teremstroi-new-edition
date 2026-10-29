import type { Metadata } from "next";
import Script from "next/script";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallbackWidget } from "@/components/CallbackWidget";

// Шрифты подключаются через next/font и автоматически оптимизируются
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://teremdomstroi.ru"),
  title: {
    default: `${site.name} — каркасные дома и бани под ключ в СПб`,
    template: `%s | ${site.name}`,
  },
  description:
    "Строим каркасные дома и бани под ключ в Санкт-Петербурге и Ленобласти. Сухой пиломатериал камерной сушки, утеплитель Rockwool, без предоплаты, сроки 14–45 дней, гарантия до 5 лет.",
  keywords: [
    "каркасные дома спб",
    "строительство домов под ключ",
    "каркасные бани",
    "дома из пиломатериала",
    "Красивый Дом",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: `${site.name} — каркасные дома и бани под ключ в СПб`,
    description:
      "Каркасные дома и бани под ключ. Без предоплаты, сухой пиломатериал, гарантия до 5 лет.",
  },
};

/** Микроразметка Schema.org: LocalBusiness — на всех страницах */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.legalName,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://teremdomstroi.ru",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Санкт-Петербург",
    addressCountry: "RU",
  },
  areaServed: ["Санкт-Петербург", "Ленинградская область"],
  priceRange: "₽₽",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${unbounded.variable} ${manrope.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        {/* Виджет обратного звонка — на всех страницах */}
        <CallbackWidget />

        {/*
          Яндекс.Метрика. Подключается только если задан NEXT_PUBLIC_YANDEX_METRIKA_ID в .env.
          Иначе скрипт не рендерится и сайт работает без счётчика.
        */}
        {metrikaId && (
          <>
            <Script
              id="yandex-metrika"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
                  ym(${metrikaId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
                `,
              }}
            />
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://mc.yandex.ru/watch/${metrikaId}`} alt="" style={{ position: "absolute", left: -9999 }} />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
