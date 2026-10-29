/**
 * Готовит директорию сборки вне OneDrive:
 *   %TEMP%\teremstroi-next-dist\app        — сюда Next пишет сборку (distDir, см. next.config.mjs)
 *   %TEMP%\teremstroi-next-dist\node_modules — junction на node_modules проекта (нужен для типов)
 *
 * OneDrive заменяет файлы в .next reparse-point'ами, и сборка падает на их удалении,
 * поэтому .next внутри проекта использовать нельзя.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.join(os.tmpdir(), "teremstroi-next-dist");
const link = path.join(root, "node_modules");
const target = path.join(__dirname, "..", "node_modules");

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
