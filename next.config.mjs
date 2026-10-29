import path from "node:path";
import os from "node:os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // OneDrive портит симлинки/reparse-point'ами внутри .next и сборка падает.
  // Директория сборки — вне синхронизации (%TEMP%/teremstroi-next-dist/app),
  // рядом лежит junction node_modules → node_modules проекта (для типов, см. scripts/prepare-dist.bat).
  distDir: process.env.NEXT_DIST_DIR ||
    path.relative(process.cwd(), path.join(os.tmpdir(), "teremstroi-next-dist", "app")),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
