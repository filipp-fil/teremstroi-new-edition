/**
 * Готовит директорию сборки вне OneDrive:
 *   %TEMP%\teremstroi-next-dist\app        — сюда Next пишет сборку (distDir, см. next.config.mjs)
 *   %TEMP%\teremstroi-next-dist\node_modules — junction на node_modules проекта (нужен для типов)
 *
 * OneDrive заменяет файлы в .next reparse-point'ами, и сборка падает на их удалении,
 * поэтому .next внутри проекта использовать нельзя.
 *
 * ВАЖНО: актуально только на машине разработчика (проект лежит в OneDrive).
 * На хостинге (Render/Vercel) директория сборки — стандартная .next (см. next.config.mjs),
 * здесь же ничего делать не нужно.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const isOneDrive = projectRoot.toLowerCase().includes("onedrive");

if (!isOneDrive && !process.env.NEXT_DIST_DIR) {
  console.log("[prepare-dist] не OneDrive — стандартная директория .next, ничего не делаем");
  return;
}

const root = path.join(os.tmpdir(), "teremstroi-next-dist");
const link = path.join(root, "node_modules");
const target = path.join(projectRoot, "node_modules");

fs.mkdirSync(root, { recursive: true });

try {
  const stat = fs.lstatSync(link);
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    // Уже существует как обычная папка — оставляем
  }
} catch {
  try {
    fs.symlinkSync(target, link, "junction");
    console.log("[prepare-dist] junction создан:", link, "->", target);
  } catch (e) {
    console.warn("[prepare-dist] не удалось создать junction (типы в distDir могут не резолвиться):", e.message);
  }
}
