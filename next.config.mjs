import path from "node:path";
import os from "node:os";

// OneDrive портит .next reparse-point'ами, и локальная сборка падает.
// Поэтому на машине разработчика (проект внутри OneDrive) сборка уводится в %TEMP%.
// На хостинге (Render/Vercel и т.п.) — стандартная директория .next.
const isOneDrive = process.cwd().toLowerCase().includes("onedrive");
const oneDriveDistDir = path.relative(
  process.cwd(),
  path.join(os.tmpdir(), "teremstroi-next-dist", "app")
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || (isOneDrive ? oneDriveDistDir : ".next"),
  // Оптимизатор отключён намеренно: на VPS с 2 ГБ RAM on-the-fly ресайз
  // (особенно до w=3840) съедает CPU и первое открытие каждой фотки занимает
  // секунды. Фото отдаются как есть — nginx отдаёт их с диска мгновенно,
  // плюс стоит жёсткий cache-control (см. конфиг nginx).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
