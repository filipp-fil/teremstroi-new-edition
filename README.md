# Красивый Дом — сайт строительной компании

Сайт строительной компании «Красивый Дом»: каталог каркасных домов и бань (~60 проектов,
~100 построенных объектов с картами), отзывы, формы заявок, админ-панель.

Перенос старого сайта (teremdomstroi.ru) на новый стек.

## Технологии

- **Next.js 14** (App Router, SSG/ISR) + TypeScript + Tailwind CSS
- **Prisma + SQLite** — заявки и отзывы из админ-панели
- **Nodemailer** — отправка заявок на почту
- Яндекс.Карты (конструктор + виджет поиска по адресу)

## Локальный запуск

```bash
npm install                 # поставит зависимости и сгенерирует Prisma-клиент (postinstall)
cp .env.example .env        # заполните SMTP и ADMIN_SECRET
npx prisma db push          # создать SQLite-базу
npm run dev -- -p 7100      # http://localhost:7100
```

Админ-панель: `/admin` (пароль — `ADMIN_PASSWORD` из `.env`).

Сборка: `npm run build` (outdir уводится в `%TEMP%\teremstroi-next-dist` скриптом
`scripts/prepare-dist.js`, чтобы не синхронизировать сборку через OneDrive).

## Деплой на Vercel

1. Залейте репозиторий на GitHub.
2. [vercel.com/new](https://vercel.com/new) → **Import** этого репозитория.
   Vercel сам определит Next.js — команды менять не нужно.
3. В **Environment Variables** добавьте переменные из `.env.example`:
   `ADMIN_PASSWORD`, `ADMIN_SECRET`, `DATABASE_URL`, `SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_YANDEX_METRIKA_ID`.
4. **Deploy**.

> ⚠️ **Важно про базу данных.** Сейчас используется SQLite — файл БД.
> На Vercel файловая система серверлесс-функций временная и только для чтения:
> админ-панель откроется, но новые заявки/отзывы **не будут сохраняться**.
> Для продакшена подключите бесплатный серверный Postgres (например, [Neon](https://neon.tech)):
> поменяйте `provider = "postgresql"` в `prisma/schema.prisma`, задайте `DATABASE_URL`
> из Neon и прогоните `npx prisma db push`. Заявки при этом всё равно дублируются на почту.

## Структура

```
app/            страницы (catalog, works, reviews, contacts, admin, api)
components/     UI-компоненты (layout, home, catalog, forms)
content/        весь контент сайта: проекты, работы, карты, отзывы, тексты
public/images/  фотографии проектов, работ и отзывов (со старого сайта)
prisma/         схема БД (Lead, Review)
scripts/        обёртки запуска (OneDrive-safe outdir, проброс --host)
```

## Контент

Весь текстовый контент — в `content/*.ts`: телефоны/адреса в `site.ts`, проекты домов и
бань в `projects.ts`, построенные объекты в `works.ts`, коды Яндекс.карт в `maps.ts`.
Картинки лежат в `public/images/` — папки названы по slug-ам объектов.
